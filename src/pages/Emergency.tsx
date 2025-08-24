import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  MapPin,
  AlertTriangle,
  Heart,
  Brain,
  Bone,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Emergency = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };
  const emergencyContacts = [
    {
      name: "Emergency Services",
      number: "911",
      type: "General Emergency",
      icon: AlertTriangle,
    },
    {
      name: "Poison Control",
      number: "1-800-222-1222",
      type: "Poisoning",
      icon: AlertTriangle,
    },
    {
      name: "Crisis Hotline",
      number: "988",
      type: "Mental Health",
      icon: Brain,
    },
    {
      name: "Cardiac Emergency",
      number: "911",
      type: "Heart Attack",
      icon: Heart,
    },
  ];

  const emergencyTips = [
    {
      title: "Heart Attack",
      symptoms: "Chest pain, shortness of breath, nausea",
      action: "Call 911 immediately, take aspirin if not allergic",
    },
    {
      title: "Stroke",
      symptoms: "Face drooping, arm weakness, speech difficulty",
      action: "Call 911 immediately, note time symptoms started",
    },
    {
      title: "Choking",
      symptoms: "Cannot speak, cough, or breathe",
      action: "Perform Heimlich maneuver, call 911 if unsuccessful",
    },
    {
      title: "Severe Bleeding",
      symptoms: "Heavy, uncontrolled bleeding",
      action: "Apply direct pressure, elevate wound, call 911",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-red-950/30">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBack}
              variant="ghost"
              size="sm"
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Emergency Resources
                </h1>
                <Badge
                  variant="destructive"
                  className="mt-1 bg-red-500 hover:bg-red-600"
                >
                  24/7 Available
                </Badge>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Quick access to emergency contacts and first aid guidance
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Emergency Contacts */}
        <Card className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border-red-200 dark:border-red-800 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-red-600">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Phone className="h-4 w-4 text-white" />
              </div>
              Emergency Contacts
            </CardTitle>
            <CardDescription>
              Immediate help numbers - Call these in emergencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 border-red-200 dark:border-red-700 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <contact.icon className="h-5 w-5 text-red-500" />
                    <div>
                      <h3 className="font-semibold">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {contact.type}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => window.open(`tel:${contact.number}`)}
                    className="font-bold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-xl shadow-lg transition-all duration-200"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {contact.number}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Tips */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              Emergency First Aid
            </CardTitle>
            <CardDescription>
              Basic first aid guidance for common emergencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {emergencyTips.map((tip, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300"
                >
                  <h3 className="font-semibold text-red-600 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm mb-2">
                    <strong>Symptoms:</strong> {tip.symptoms}
                  </p>
                  <p className="text-sm">
                    <strong>Action:</strong> {tip.action}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Preparation */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
              Emergency Preparation
            </CardTitle>
            <CardDescription>
              Important information for emergency situations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  During an Emergency:
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Stay calm and call 911 immediately</li>
                  <li>• Clearly state your address and landmark references</li>
                  <li>• Describe the nature of the emergency</li>
                  <li>• Follow the dispatcher's instructions</li>
                  <li>• Keep your phone line open</li>
                </ul>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  Before an Emergency:
                </h4>
                <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                  <li>• Know your exact address and nearby landmarks</li>
                  <li>• Keep emergency contact information handy</li>
                  <li>• Have a basic first aid kit available</li>
                  <li>• Know the location of nearest hospital</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800 shadow-xl rounded-3xl">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-amber-700 dark:text-amber-300 mb-1">
                  Important Disclaimer
                </p>
                <p className="text-amber-600 dark:text-amber-400">
                  This information is for guidance only and does not replace
                  professional medical advice. In a true emergency, always call
                  911 or your local emergency services immediately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Emergency;
