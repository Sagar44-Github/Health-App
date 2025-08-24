import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

async function generateWithGemini(systemPrompt: string, userText: string): Promise<string> {
  if (!GEMINI_API_KEY) return '';
  try {
    const prompt = `${systemPrompt}\n\nUser message:\n${userText}`;
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: prompt }] }
        ]
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Gemini API error response:', res.status, errorText);
      return '';
    }

    const data = await res.json();
    const parts = data.candidates?.[0]?.content?.parts || [];
    const text = parts.map((p: any) => p.text).filter(Boolean).join('');
    return text || '';
  } catch (err) {
    console.error('Gemini API error:', err);
    return '';
  }
}

function getSymptomAnalysisFallback(symptoms: string): string {
  const lowerSymptoms = symptoms.toLowerCase();
  
  // Determine urgency based on symptoms
  let urgency = "Medium";
  let urgencyColor = "🟡";
  
  if (lowerSymptoms.includes('chest pain') || lowerSymptoms.includes('difficulty breathing') || 
      lowerSymptoms.includes('severe pain') || lowerSymptoms.includes('blood') ||
      lowerSymptoms.includes('unconscious') || lowerSymptoms.includes('seizure')) {
    urgency = "High";
    urgencyColor = "🔴";
  } else if (lowerSymptoms.includes('mild') || lowerSymptoms.includes('minor') ||
             lowerSymptoms.includes('occasional')) {
    urgency = "Low";
    urgencyColor = "🟢";
  }
  
  return `**🔍 AI Symptom Analysis**

Based on the symptoms you've described: "${symptoms}", here's my analysis:

**🩺 Possible Conditions to Consider:**
• **Common causes** - Could be related to stress, fatigue, or minor infections
• **Lifestyle factors** - May be influenced by diet, sleep, or activity levels
• **Environmental factors** - Could be related to allergies or environmental triggers

**${urgencyColor} Urgency Level: ${urgency}**
${urgency === "High" ? "⚠️ **Seek immediate medical attention**" : 
  urgency === "Medium" ? "📞 **Consider consulting a healthcare provider within 24-48 hours**" : 
  "👩‍⚕️ **Monitor symptoms and consult if they worsen or persist**"}

**💡 General Recommendations:**
• Monitor your symptoms and note any changes
• Stay hydrated and get adequate rest
• Avoid known triggers if applicable
• Keep a symptom diary to track patterns

**⚠️ Important Medical Disclaimer**
This AI analysis is for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment, especially if symptoms persist or worsen.

**🔄 Next Steps:**
• Contact your healthcare provider if symptoms continue
• Seek immediate care if you experience severe or worsening symptoms
• Call emergency services if you feel this is a medical emergency`;
}

function getFallbackResponse(userMessage: string, type: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  // Common health responses based on keywords
  if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
    return `**🤕 Headache Relief Tips**

**💡 Immediate Steps:**
• Rest in a quiet, dark room
• Apply a cold or warm compress to your head or neck
• Stay hydrated - drink plenty of water
• Try gentle neck and shoulder stretches
• Consider over-the-counter pain relievers like ibuprofen or acetaminophen

**⚠️ When to See a Doctor:**
• Sudden, severe headache unlike any you've had before
• Headache with fever, stiff neck, confusion, or vision changes
• Headaches that worsen or become more frequent
• Headache after a head injury

**⚠️ Important:** This is general information only. Please consult a healthcare professional for proper diagnosis and treatment.`;
  }
  
  if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
    return `**🌡️ Fever Management**

**💡 Immediate Steps:**
• Rest and stay hydrated
• Take acetaminophen or ibuprofen as directed
• Use lukewarm water to sponge bathe
• Dress in light clothing
• Monitor your temperature regularly

**⚠️ Seek Medical Attention If:**
• Fever over 103°F (39.4°C)
• Fever lasting more than 3 days
• Accompanied by severe symptoms like difficulty breathing, chest pain, or severe headache
• Signs of dehydration

**⚠️ Important:** This is general information only. Please consult a healthcare professional for proper diagnosis and treatment.`;
  }
  
  if (lowerMessage.includes('cough') || lowerMessage.includes('throat')) {
    return `**😷 Cough & Throat Care**

**💡 Relief Measures:**
• Stay hydrated with warm liquids like tea with honey
• Use a humidifier or breathe steam from a hot shower
• Gargle with warm salt water
• Avoid irritants like smoke
• Consider throat lozenges or cough drops

**⚠️ See a Doctor If:**
• Cough persists for more than 2 weeks
• Coughing up blood or yellow/green phlegm
• Accompanied by high fever, difficulty breathing, or chest pain
• Severe sore throat with difficulty swallowing

**⚠️ Important:** This is general information only. Please consult a healthcare professional for proper diagnosis and treatment.`;
  }
  
  if (lowerMessage.includes('stomach') || lowerMessage.includes('nausea') || lowerMessage.includes('digestive')) {
    return `**🤢 Digestive Comfort**

**💡 Soothing Steps:**
• Eat small, bland meals (bananas, rice, applesauce, toast)
• Stay hydrated with clear fluids
• Avoid dairy, fatty, or spicy foods
• Consider ginger tea for nausea
• Rest and avoid physical activity

**⚠️ Seek Medical Care If:**
• Severe abdominal pain
• Persistent vomiting or inability to keep fluids down
• Signs of dehydration
• Blood in vomit or stool
• Symptoms lasting more than 24-48 hours

**⚠️ Important:** This is general information only. Please consult a healthcare professional for proper diagnosis and treatment.`;
  }
  
  // General health chat fallback
  if (type === 'health_chat') {
    return `**🩺 Health Information**

I'm currently experiencing technical difficulties with my AI services, but I'm here to help with basic health guidance.

**💡 General Health Tips:**
• Maintain a balanced diet with plenty of fruits and vegetables
• Stay hydrated by drinking adequate water throughout the day
• Get regular exercise and adequate sleep
• Practice stress management techniques
• Schedule regular check-ups with your healthcare provider

**⚠️ For Medical Concerns:**
Please consult with a qualified healthcare professional for proper medical advice, diagnosis, and treatment.

**🔄 Try Again:** My full AI capabilities should be restored shortly. Please try your question again in a few minutes.`;
  }
  
  // Symptom analysis fallback
  if (type === 'symptom_analysis') {
    return getSymptomAnalysisFallback(userMessage);
  }
  
  // Default fallback
  return `**🩺 HealthWise AI Assistant**

I'm currently experiencing technical difficulties but want to ensure you get the help you need.

**💡 Basic Health Guidance:**
For immediate health concerns, please contact your healthcare provider or local emergency services if urgent.

**📞 Emergency Contacts:**
• Emergency: 911 (US) or your local emergency number
• Poison Control: 1-800-222-1222 (US)
• Mental Health Crisis: 988 (US)

**🔄 Service Update:**
My full AI capabilities should be restored shortly. Please try again in a few minutes.

**⚠️ Important:** This is not a substitute for professional medical advice. Always consult healthcare professionals for medical concerns.`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, type = 'general' } = await req.json();

    let systemPrompt = '';
    switch (type) {
      case 'symptom_analysis':
        systemPrompt = `You are a medical AI assistant specializing in comprehensive symptom analysis with disease probability assessment.

CRITICAL INSTRUCTIONS:
- Analyze symptoms to provide structured medical guidance with likelihood percentages
- NEVER provide definitive diagnoses - only suggest possible conditions with probability ranges
- Always emphasize the need for professional medical consultation
- Be empathetic and supportive while being medically responsible
- Assess urgency level based on symptom severity

REQUIRED RESPONSE FORMAT:
**🔬 Comprehensive Symptom Analysis**
[Brief empathetic acknowledgment of their concerns]

**🎯 Possible Conditions & Likelihood:**

**[Condition Name 1]**
• **Likelihood:** [X-Y]%
• **Key Indicators:** [matching symptoms]
• **Typical Duration:** [timeframe]
• **Action:** [immediate recommendation]

**[Condition Name 2]**
• **Likelihood:** [X-Y]%
• **Key Indicators:** [matching symptoms]
• **Typical Duration:** [timeframe]
• **Action:** [immediate recommendation]

**[Condition Name 3]**
• **Likelihood:** [X-Y]%
• **Key Indicators:** [matching symptoms]
• **Typical Duration:** [timeframe]
• **Action:** [immediate recommendation]

**🚨 Priority Level Assessment:**
**[HIGH/MEDIUM/LOW] PRIORITY** - [Clear explanation and immediate action needed]

**📋 Recommended Actions:**
• **Immediate:** [urgent steps]
• **24-48 hours:** [next steps]
• **If worsening:** [escalation plan]
• **Prevention:** [preventive measures]

**⚕️ Medical Consultation Recommended If:**
• [Specific warning signs]
• [Duration thresholds]
• [Severity indicators]

**📱 Track Your Health:**
• [Monitoring suggestions]
• [Symptom tracking tips]

**⚠️ Important Medical Disclaimer**
This AI analysis is for informational purposes only and should not replace professional medical advice. Always consult healthcare professionals for proper diagnosis and treatment.
        
Be thorough, precise with percentages (realistic ranges), and focus on being helpful while maintaining medical responsibility.`;
        break;
      case 'health_chat':
        systemPrompt = `You are a friendly health AI assistant. 
        
        IMPORTANT FORMATTING RULES:
        - Structure your response with clear sections using **headings**
        - Use bullet points for lists  
        - Highlight key information with **bold text**
        - Use emojis appropriately to make content engaging
        - Keep paragraphs short and scannable
        - Use line breaks between sections

        Provide general health information, wellness tips, and answer health-related questions.
        Always encourage users to consult healthcare professionals for medical advice.
        Be supportive, informative, and maintain a caring tone.

        Structure your responses clearly with headings and bullet points where appropriate.`;
        break;
      case 'prescription_ai':
        systemPrompt = `You are a medical AI assistant that generates detailed prescription-style recommendations.

        IMPORTANT FORMATTING RULES:
        - Use clear medical document formatting
        - Structure with proper headings and sections
        - Use bullet points and numbered lists
        - Highlight dosages and timings clearly
        - Include all necessary medical details

        Based on the patient information provided, generate a comprehensive prescription-style document including:

        **📋 PATIENT INFORMATION**
        [Patient details summary]

        **💊 PRESCRIBED MEDICATIONS**
        For each medication:
        • **Medication Name**: [Generic + Brand if applicable]
        • **Dosage**: [Strength and form]
        • **Frequency**: [Times per day with specific hours]
        • **Duration**: [Number of days/weeks]
        • **Instructions**: [Before/after food, special instructions]

        **⚠️ IMPORTANT INSTRUCTIONS**
        • [General medication guidelines]
        • [What to avoid]
        • [Side effects to watch for]

        **🔄 FOLLOW-UP**
        • [When to return]
        • [Monitoring requirements]

        **⚠️ MEDICAL DISCLAIMER**
        This is an AI-generated recommendation and not a substitute for professional medical consultation.`;
        break;
      default:
        systemPrompt = `You are a helpful AI health assistant. 
        
        IMPORTANT FORMATTING RULES:
        - Always structure your response with clear **headings**
        - Use bullet points for lists
        - Highlight important information with **bold text**
        - Use line breaks between sections for readability
        - Keep responses well-organized and scannable

        Provide accurate health information while always reminding users to consult healthcare professionals for medical advice.`;
    }

    let generatedText = '';
    
    // Check if OpenAI API key is available
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set');
      const userText = messages[messages.length - 1]?.text || '';
      if (GEMINI_API_KEY) {
        console.log('Trying Gemini as fallback');
        generatedText = await generateWithGemini(systemPrompt, userText);
      }
      if (!generatedText) {
        generatedText = getFallbackResponse(userText, type);
      }
    } else {
      // Try OpenAI API first
      try {
        console.log('Making OpenAI API request with model: gpt-4o');
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: messages[messages.length - 1]?.text || '' }
            ],
            temperature: 0.7,
            max_tokens: 1024,
          }),
        });

        console.log('OpenAI API response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          generatedText = data.choices?.[0]?.message?.content || '';
          console.log('Successfully received OpenAI response');
        } else {
          const errorText = await response.text();
          console.error('OpenAI API error response:', response.status, errorText);
          
          if (response.status === 429 || response.status === 400) {
            const userText = messages[messages.length - 1]?.text || '';
            if (GEMINI_API_KEY) {
              console.log('OpenAI failed; trying Gemini');
              generatedText = await generateWithGemini(systemPrompt, userText);
            }
            if (!generatedText) {
              generatedText = getFallbackResponse(userText, type);
            }
          } else {
            throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
          }
        }
      } catch (error: any) {
        console.error('OpenAI API error:', error.message);
        console.error('Error details:', error);
        const userText = messages[messages.length - 1]?.text || '';
        if (GEMINI_API_KEY) {
          console.log('OpenAI exception; trying Gemini');
          generatedText = await generateWithGemini(systemPrompt, userText);
        }
        if (!generatedText) {
          generatedText = getFallbackResponse(userText, type);
        }
      }
    }

    if (!generatedText) {
      generatedText = 'I apologize, but I\'m experiencing technical difficulties. Please try again later or consult with a healthcare professional for medical advice.';
    }

    return new Response(JSON.stringify({ 
      text: generatedText,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-health-assistant function:', error as any);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate AI response',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});