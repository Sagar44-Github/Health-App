import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Bot, User, Heart, Shield, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LoadingGame from "./LoadingGame";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI health assistant powered by advanced medical AI. I'm here to provide evidence-based health guidance and support. Please remember I'm designed to complement, not replace, professional medical care. How can I assist you today?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingGame, setShowLoadingGame] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setShowLoadingGame(true);

    try {
      const response = await supabase.functions.invoke("ai-health-assistant", {
        body: {
          messages: [{ text: inputMessage }],
          type: "health_chat",
        },
      });

      const aiResponse: Message = {
        id: messages.length + 2,
        text:
          response.data?.text ||
          "I apologize, but I'm having trouble responding right now. Please try again.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      const fallbackResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputMessage),
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, fallbackResponse]);
    } finally {
      setIsLoading(false);
      setShowLoadingGame(false);
    }
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("headache")) {
      return "Headaches can have various causes including stress, dehydration, lack of sleep, or tension. For mild headaches, try staying hydrated, resting in a quiet dark room, and consider over-the-counter pain relievers if appropriate. However, if you experience severe, sudden, or persistent headaches, please consult a healthcare provider immediately.";
    } else if (input.includes("fever")) {
      return "Fever is your body's natural response to infection. For adults, a fever is generally considered 100.4°F (38°C) or higher. Stay hydrated, rest, and consider fever reducers like acetaminophen or ibuprofen. Seek medical attention if fever exceeds 103°F (39.4°C), persists for more than 3 days, or if you have other concerning symptoms.";
    } else if (input.includes("cough")) {
      return "Coughs can be dry or productive and may result from infections, allergies, or other conditions. Stay hydrated, use honey (for those over 1 year), and consider a humidifier. Seek medical care if the cough persists for more than 2-3 weeks, produces blood, or is accompanied by high fever or difficulty breathing.";
    } else if (input.includes("stomach") || input.includes("nausea")) {
      return "Stomach issues and nausea can result from various causes including food, stress, or infections. Try clear fluids, bland foods (BRAT diet), and rest. Avoid dairy and fatty foods temporarily. Seek medical attention if you experience severe pain, persistent vomiting, signs of dehydration, or blood in vomit/stool.";
    } else {
      return "Thank you for your question. Based on the symptoms you've described, I recommend monitoring how you feel and considering these general wellness tips: stay hydrated, get adequate rest, maintain good hygiene, and eat nutritious foods. If symptoms persist, worsen, or you're concerned, please consult with a healthcare professional for proper evaluation and personalized advice.";
    }
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

  const suggestedQuestions = [
    "What should I do about a mild headache?",
    "When should I be concerned about a fever?",
    "How can I boost my immune system?",
    "What are signs I should see a doctor?",
  ];

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
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Online
              </span>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              AI Health Assistant
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Get instant medical insights and personalized health guidance 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer Banner */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-2xl px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
              This AI assistant provides general health information only and is
              not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Chat Area */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl mb-6 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-b border-blue-200 dark:border-blue-700">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Heart className="h-3 w-3 text-white" />
              </div>
              Health Consultation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96 p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-4 ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        message.sender === "ai"
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                          : "bg-gradient-to-br from-blue-500 to-cyan-500"
                      }`}
                    >
                      {message.sender === "ai" ? (
                        <Bot className="h-5 w-5 text-white" />
                      ) : (
                        <User className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div
                      className={`max-w-2xl ${
                        message.sender === "user" ? "text-right" : ""
                      }`}
                    >
                      <div
                        className={`p-4 rounded-2xl shadow-lg ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        {message.sender === "ai" ? (
                          <div
                            className="prose prose-gray dark:prose-invert max-w-none text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: formatAIResponse(message.text),
                            }}
                          />
                        ) : (
                          <p className="text-sm leading-relaxed">
                            {message.text}
                          </p>
                        )}
                      </div>
                      <p
                        className={`text-xs mt-2 ${
                          message.sender === "user"
                            ? "text-gray-500 dark:text-gray-400"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-2xl shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          AI is thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Input Area */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Describe your symptoms or ask a health question..."
                className="flex-1 min-h-[80px] resize-none text-base border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 transition-colors"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="lg"
                className="h-20 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Start Questions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setInputMessage(question)}
                className="p-4 h-auto text-left justify-start bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 rounded-2xl transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {question}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
