import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Pill,
  Activity,
  User,
  MessageCircle,
  Search,
  Book,
  FileText,
  Heart,
  Clock,
  TrendingUp,
  Bell,
  Stethoscope,
} from "lucide-react";

interface HealthDashboardProps {
  onNavigate: (section: string) => void;
}

export const HealthDashboard = ({ onNavigate }: HealthDashboardProps) => {
  const [activeMedications, setActiveMedications] = useState([]);
  const { toast } = useToast();

  // Use localStorage for demonstration without authentication
  const fetchDashboardData = () => {
    // Get medications from localStorage
    const stored = localStorage.getItem("medications");
    if (stored) {
      const medications = JSON.parse(stored);
      setActiveMedications(
        medications.filter((med: any) => med.is_active).slice(0, 5)
      );
    }
  };

  useState(() => {
    fetchDashboardData();
  });

  const getProfileCompleteness = () => {
    return 85; // Mock completion percentage
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Health Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Take control of your health journey today
            </p>
          </div>
          <Button variant="outline" onClick={() => onNavigate("home")}>
            Back to Home
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Profile Complete</p>
                  <p className="text-2xl font-bold">
                    {getProfileCompleteness()}%
                  </p>
                </div>
                <User className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Active Medications</p>
                  <p className="text-2xl font-bold">
                    {activeMedications.length}
                  </p>
                </div>
                <Pill className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Health Tips Today</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <Heart className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Health Score</p>
                  <p className="text-2xl font-bold">8.5</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNavigate("chat")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-primary" />
                AI Health Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Chat with our AI assistant for personalized health guidance and
                support.
              </p>
              <Button className="w-full">Start Conversation</Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNavigate("symptoms")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Search className="h-6 w-6 text-primary" />
                Symptom Checker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Get AI-powered insights about your symptoms and when to seek
                care.
              </p>
              <Button className="w-full">Check Symptoms</Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNavigate("tips")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Book className="h-6 w-6 text-primary" />
                Health Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Discover personalized tips and educational content for better
                health.
              </p>
              <Button className="w-full">Explore Tips</Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                Prescription AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Get AI-generated prescription recommendations based on your
                symptoms and health data.
              </p>
              <Button
                onClick={() => onNavigate("prescription-ai")}
                className="w-full"
              >
                Generate Prescription
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Pill className="h-5 w-5 text-primary" />
                Medication Manager
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Track your medications and set up reminders for timely intake.
              </p>
              <Button
                onClick={() => onNavigate("medication-manager")}
                className="w-full"
              >
                Manage Medications
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Stethoscope className="h-5 w-5 text-primary" />
                Telehealth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Connect with healthcare professionals through secure video
                consultations.
              </p>
              <Button
                onClick={() => onNavigate("telehealth")}
                className="w-full"
              >
                Book Consultation
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Active Medications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Pill className="h-5 w-5 text-primary" />
              Active Medications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeMedications.length > 0 ? (
              <div className="space-y-3">
                {activeMedications.map((medication: any, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {medication.medication_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {medication.dosage}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {medication.frequency}
                      </p>
                      <Badge
                        variant={medication.is_active ? "default" : "secondary"}
                      >
                        {medication.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => onNavigate("medication-manager")}
                  className="w-full"
                >
                  Manage All Medications
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No active medications</p>
                <Button onClick={() => onNavigate("medication-manager")}>
                  Add Medication
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
