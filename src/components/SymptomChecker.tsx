import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SymptomCheckerProps {
  onBack: () => void;
}

interface Symptom {
  id: string;
  name: string;
  category: string;
}

interface Analysis {
  condition: string;
  likelihood: number;
  urgency: "low" | "medium" | "high";
  description: string;
  recommendations: string[];
}

const SymptomChecker = ({ onBack }: SymptomCheckerProps) => {
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [analysis, setAnalysis] = useState<Analysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const symptoms: Symptom[] = [
    { id: "headache", name: "Headache", category: "head" },
    { id: "fever", name: "Fever", category: "general" },
    { id: "cough", name: "Cough", category: "respiratory" },
    { id: "sore_throat", name: "Sore Throat", category: "respiratory" },
    { id: "nausea", name: "Nausea", category: "digestive" },
    { id: "fatigue", name: "Fatigue", category: "general" },
    { id: "muscle_aches", name: "Muscle Aches", category: "general" },
    { id: "runny_nose", name: "Runny Nose", category: "respiratory" },
    { id: "stomach_pain", name: "Stomach Pain", category: "digestive" },
    { id: "dizziness", name: "Dizziness", category: "head" },
    { id: "chest_pain", name: "Chest Pain", category: "respiratory" },
    {
      id: "shortness_breath",
      name: "Shortness of Breath",
      category: "respiratory",
    },
  ];

  const categories = ["general", "head", "respiratory", "digestive"];
  const categoryLabels = {
    general: "General Symptoms",
    head: "Head & Neurological",
    respiratory: "Respiratory",
    digestive: "Digestive",
  };

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const addCustomSymptom = () => {
    if (
      customSymptom.trim() &&
      !selectedSymptoms.includes(customSymptom.trim())
    ) {
      setSelectedSymptoms((prev) => [...prev, customSymptom.trim()]);
      setCustomSymptom("");
    }
  };

  const removeSymptom = (symptomToRemove: string) => {
    setSelectedSymptoms((prev) =>
      prev.filter((symptom) => symptom !== symptomToRemove)
    );
  };

  const parseAIResponse = (aiText: string) => {
    // Extract urgency level from AI response
    let urgency: "low" | "medium" | "high" = "medium";
    let likelihood = 70;

    if (
      aiText.toLowerCase().includes("high priority") ||
      aiText.toLowerCase().includes("urgent") ||
      aiText.toLowerCase().includes("immediate")
    ) {
      urgency = "high";
      likelihood = 85;
    } else if (
      aiText.toLowerCase().includes("low priority") ||
      aiText.toLowerCase().includes("mild") ||
      aiText.toLowerCase().includes("monitor")
    ) {
      urgency = "low";
      likelihood = 40;
    }

    return { urgency, likelihood, description: aiText };
  };

  const formatAIResponse = (text: string): string => {
    return (
      text
        // Convert **text** to bold
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // Convert bullet points (• text) to proper list items
        .replace(/^• (.+)$/gm, "<li>$1</li>")
        // Convert numbered lists (1. text) to proper numbered list items
        .replace(/^\d+\.\s(.+)$/gm, "<li>$1</li>")
        // Convert headings (text that starts with ** and ends with **)
        .replace(
          /^\*\*(.*?)\*\*$/gm,
          '<h4 class="font-semibold mt-3 mb-2 text-foreground">$1</h4>'
        )
        // Convert line breaks to <br> tags
        .replace(/\n\n/g, '</p><p class="mb-2">')
        .replace(/\n/g, "<br>")
        // Wrap everything in paragraph tags
        .replace(/^(.+)/, '<p class="mb-2">$1')
        .replace(/(.+)$/, "$1</p>")
        // Handle lists by wrapping consecutive <li> items in <ul>
        .replace(/(<li>.*?<\/li>)(?:\s*<br>)*(?=\s*<li>)/g, "$1")
        .replace(
          /(<li>.*?<\/li>)(?:\s*<br>)*(?!\s*<li>)/g,
          '<ul class="list-disc list-inside ml-4 mb-2">$1</ul>'
        )
        .replace(
          /(?<!<ul[^>]*>)(<li>.*?<\/li>)/g,
          '<ul class="list-disc list-inside ml-4 mb-2">$1</ul>'
        )
    );
  };

  const analyzeSymptoms = async () => {
    setIsAnalyzing(true);

    try {
      console.log("Starting symptom analysis...");

      const selectedSymptomsData = symptoms.filter((s) =>
        selectedSymptoms.includes(s.id)
      );
      const customSymptomsList = selectedSymptoms.filter(
        (s) => !symptoms.find((sym) => sym.id === s)
      );
      const allSymptomsList = [
        ...selectedSymptomsData.map((s) => s.name),
        ...customSymptomsList,
      ].join(", ");

      const response = await supabase.functions.invoke("ai-health-assistant", {
        body: {
          messages: [
            {
              text: `Please analyze these symptoms: ${allSymptomsList}. Provide a structured response with possible conditions, urgency level (low/medium/high), and recommendations. Format as medical analysis.`,
            },
          ],
          type: "symptom_analysis",
        },
      });

      console.log("AI Response received:", response);

      if (response.error) {
        console.error("Supabase function error:", response.error);
        throw new Error(response.error.message || "AI service error");
      }

      const aiResponse = response.data?.text || "";
      console.log("AI Response text:", aiResponse);

      if (!aiResponse) {
        throw new Error("No response from AI service");
      }

      // Parse the AI response
      const parsedResponse = parseAIResponse(aiResponse);

      const analysisResult: Analysis[] = [
        {
          condition: "AI Health Analysis",
          likelihood: parsedResponse.likelihood,
          urgency: parsedResponse.urgency,
          description: parsedResponse.description,
          recommendations: [
            "Follow the specific recommendations provided in the analysis above",
            "Consult with a healthcare professional for proper medical evaluation",
            "Keep track of any changes in your symptoms",
            "Seek immediate medical care if symptoms worsen or if you're concerned",
          ],
        },
      ];

      // Save to health records (optional functionality)
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          // Note: health_records table needs to be created in the database
          console.log("Would save to health records for user:", user.id);
          console.log("Analysis data:", {
            symptoms: selectedSymptoms,
            analysis: parsedResponse.description,
            urgency: parsedResponse.urgency,
            likelihood: parsedResponse.likelihood,
          });
        }
      } catch (recordError) {
        console.warn("Could not save to health records:", recordError);
      }

      setAnalysis(analysisResult);
      setStep(3);
    } catch (error: any) {
      console.error("Error analyzing symptoms:", error);
      toast({
        title: "Analysis Error",
        description:
          error.message || "Unable to complete AI analysis. Please try again.",
        variant: "destructive",
      });

      // Fallback analysis
      const fallbackAnalysis: Analysis[] = [
        {
          condition: "Symptom Assessment",
          likelihood: 50,
          urgency: "medium",
          description:
            "I'm currently experiencing technical difficulties with the AI analysis service. However, based on your symptoms, I recommend monitoring your condition closely and consulting with a healthcare professional for proper evaluation.",
          recommendations: [
            "Consult with a healthcare professional",
            "Monitor your symptoms closely",
            "Seek medical attention if symptoms worsen or you're concerned",
            "Keep a detailed record of your symptoms for your healthcare provider",
          ],
        },
      ];

      setAnalysis(fallbackAnalysis);
      setStep(3);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-destructive bg-destructive/10 border-destructive/20";
      case "medium":
        return "text-warning bg-warning/10 border-warning/20";
      case "low":
        return "text-success bg-success/10 border-success/20";
      default:
        return "text-muted-foreground bg-muted border-border";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />;
      case "medium":
        return <Clock className="h-4 w-4" />;
      case "low":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/30">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <Badge
              variant="outline"
              className="bg-white/50 dark:bg-gray-800/50"
            >
              Step {step} of 3
            </Badge>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              AI Symptom Checker
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Get AI-powered insights about your symptoms and when to seek care
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Progress
            </span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {Math.round((step / 3) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  Select Your Symptoms
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Choose all symptoms you're currently experiencing
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                {categories.map((category) => (
                  <div key={category} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {
                          categoryLabels[
                            category as keyof typeof categoryLabels
                          ]
                        }
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {symptoms
                        .filter((symptom) => symptom.category === category)
                        .map((symptom) => (
                          <div
                            key={symptom.id}
                            className={`group relative p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                              selectedSymptoms.includes(symptom.id)
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md"
                                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600"
                            }`}
                            onClick={() => toggleSymptom(symptom.id)}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox
                                id={symptom.id}
                                checked={selectedSymptoms.includes(symptom.id)}
                                onCheckedChange={() =>
                                  toggleSymptom(symptom.id)
                                }
                                className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                              />
                              <label
                                htmlFor={symptom.id}
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                              >
                                {symptom.name}
                              </label>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}

                {/* Custom Symptom Input */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Add Custom Symptom
                    </h3>
                  </div>
                  <div className="flex gap-3">
                    <Input
                      value={customSymptom}
                      onChange={(e) => setCustomSymptom(e.target.value)}
                      placeholder="Enter a symptom not listed above..."
                      className="flex-1 h-12 text-base border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCustomSymptom();
                        }
                      }}
                    />
                    <Button
                      onClick={addCustomSymptom}
                      disabled={!customSymptom.trim()}
                      size="lg"
                      className="h-12 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                  {selectedSymptoms.filter(
                    (s) => !symptoms.find((sym) => sym.id === s)
                  ).length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Custom Symptoms:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSymptoms
                          .filter((s) => !symptoms.find((sym) => sym.id === s))
                          .map((customSym) => (
                            <Badge
                              key={customSym}
                              className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700 hover:shadow-md transition-shadow px-3 py-1 rounded-lg"
                            >
                              {customSym}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2 h-4 w-4 p-0 hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full"
                                onClick={() => removeSymptom(customSym)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
                    <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                      {selectedSymptoms.length} symptom
                      {selectedSymptoms.length !== 1 ? "s" : ""} selected
                    </p>
                  </div>
                  <Button
                    onClick={() => setStep(2)}
                    disabled={selectedSymptoms.length === 0}
                    size="lg"
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  Review Your Symptoms
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Please confirm the symptoms you selected
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Selected Symptoms
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedSymptoms.map((symptomId) => {
                      const symptom = symptoms.find((s) => s.id === symptomId);
                      const isCustom = !symptom;
                      return (
                        <div
                          key={symptomId}
                          className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                            isCustom
                              ? "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700"
                              : "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-medium ${
                                isCustom
                                  ? "text-purple-700 dark:text-purple-300"
                                  : "text-blue-700 dark:text-blue-300"
                              }`}
                            >
                              {symptom?.name || symptomId}
                            </span>
                            {isCustom && (
                              <Badge className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full">
                                custom
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-800 dark:text-amber-200 text-lg">
                        Important Disclaimer
                      </h4>
                      <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                        This tool provides general information only and should
                        not replace professional medical advice. Always consult
                        with a healthcare provider for proper diagnosis and
                        treatment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-xl transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={analyzeSymptoms}
                    disabled={isAnalyzing}
                    size="lg"
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Analyzing...
                      </div>
                    ) : (
                      "Analyze Symptoms"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  Symptom Analysis Complete
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Based on the symptoms you provided, here are some possible
                  considerations:
                </p>
              </CardHeader>
            </Card>

            {analysis.map((item, index) => (
              <Card
                key={index}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.condition}
                    </CardTitle>
                    <Badge
                      className={`${getUrgencyColor(
                        item.urgency
                      )} border-2 px-4 py-2 rounded-xl text-sm font-medium`}
                    >
                      <div className="flex items-center gap-2">
                        {getUrgencyIcon(item.urgency)}
                        <span className="capitalize">
                          {item.urgency} Priority
                        </span>
                      </div>
                    </Badge>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Likelihood Assessment</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        {item.likelihood}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.likelihood}%` }}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div
                    className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: formatAIResponse(item.description),
                    }}
                  />
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-lg">
                        Recommended Actions
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {item.recommendations.map((rec, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-blue-700 dark:text-blue-300"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center pt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setStep(1);
                  setSelectedSymptoms([]);
                  setAnalysis([]);
                }}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-xl transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Start Over
              </Button>
              <Button
                onClick={onBack}
                size="lg"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
