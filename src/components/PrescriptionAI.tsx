import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  FileText,
  Loader2,
  User,
  Calendar,
  Ruler,
  Weight,
  AlertTriangle,
  ShoppingCart,
  Download,
  MessageCircle,
} from "lucide-react";

interface PrescriptionAIProps {
  onBack: () => void;
  prefill?: Partial<{
    fullName: string;
    height: string;
    weight: string;
    allergies: string;
    currentMedications: string;
    age: string;
    gender: string;
  }>;
}

export const PrescriptionAI = ({ onBack, prefill }: PrescriptionAIProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [patientData, setPatientData] = useState({
    fullName: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    bloodPressure: "",
    allergies: "",
    currentMedications: "",
    symptoms: "",
    medicalHistory: "",
    additionalNotes: "",
  });
  const [prescription, setPrescription] = useState("");
  const [followUp, setFollowUp] = useState<string>("");
  const [showFollowUp, setShowFollowUp] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (prefill) {
      setPatientData((prev) => ({
        ...prev,
        fullName: prefill.fullName ?? prev.fullName,
        height: prefill.height ?? prev.height,
        weight: prefill.weight ?? prev.weight,
        allergies: prefill.allergies ?? prev.allergies,
        currentMedications:
          prefill.currentMedications ?? prev.currentMedications,
        age: prefill.age ?? prev.age,
        gender: prefill.gender ?? prev.gender,
      }));
    }
  }, [prefill]);

  const handleInputChange = (field: string, value: string) => {
    setPatientData((prev) => ({ ...prev, [field]: value }));
  };

  const generatePrescription = async () => {
    if (!patientData.fullName || !patientData.age || !patientData.symptoms) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least name, age, and symptoms.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const prompt = `
        Generate a detailed prescription for the following patient:
        
        Patient Name: ${patientData.fullName}
        Age: ${patientData.age}
        Gender: ${patientData.gender}
        Height: ${patientData.height} cm
        Weight: ${patientData.weight} kg
        Blood Pressure: ${patientData.bloodPressure}
        Known Allergies: ${patientData.allergies || "None reported"}
        Current Medications: ${patientData.currentMedications || "None"}
        
        Presenting Symptoms: ${patientData.symptoms}
        Medical History: ${patientData.medicalHistory || "None provided"}
        Additional Notes: ${patientData.additionalNotes || "None"}
        
        Please provide a comprehensive prescription with medications, dosages, timing, duration, and detailed instructions.
      `;

      const { data, error } = await supabase.functions.invoke(
        "ai-health-assistant",
        {
          body: {
            messages: [{ text: prompt }],
            type: "prescription_ai",
          },
        }
      );

      if (error) throw error;

      setPrescription(data.text);

      // No need to save to health records without authentication

      setStep(3);
      toast({
        title: "Prescription Generated",
        description: "Your AI prescription has been created successfully.",
      });
    } catch (error: any) {
      console.error("Error generating prescription:", error);
      toast({
        title: "Error",
        description: "Failed to generate prescription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUp = async () => {
    if (!followUp.trim()) return;

    setLoading(true);
    try {
      const response = await supabase.functions.invoke("ai-health-assistant", {
        body: {
          messages: [
            {
              text: `Previous prescription: ${prescription}\n\nPatient feedback: ${followUp}\n\nPlease modify the prescription based on this feedback.`,
            },
          ],
          type: "prescription_ai",
        },
      });

      const updatedPrescription =
        response.data?.text || "Unable to update prescription at this time.";
      setPrescription(updatedPrescription);
      setFollowUp("");
      setShowFollowUp(false);
    } catch (error) {
      console.error("Error updating prescription:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMedicationBuyLink = (medicationName: string) => {
    // Indian pharmacy links
    const cleanName = medicationName.toLowerCase().replace(/[^a-z0-9]/g, "");
    return `https://www.1mg.com/search/all?name=${cleanName}`;
  };

  const extractMedications = (prescriptionText: string) => {
    // Simple extraction - in real app would use more sophisticated parsing
    const lines = prescriptionText.split("\n");
    const medications: string[] = [];

    lines.forEach((line) => {
      if (line.includes("**Medication Name**:") || line.includes("• **")) {
        const match = line.match(/\*\*(.*?)\*\*/);
        if (
          match &&
          match[1] &&
          !match[1].includes("PATIENT") &&
          !match[1].includes("PRESCRIBED")
        ) {
          medications.push(match[1]);
        }
      }
    });

    return medications.length > 0 ? medications : ["Paracetamol", "Vitamin D3"]; // Fallback
  };

  const resetForm = () => {
    setStep(1);
    setPatientData({
      fullName: "",
      age: "",
      gender: "",
      height: "",
      weight: "",
      bloodPressure: "",
      allergies: "",
      currentMedications: "",
      symptoms: "",
      medicalHistory: "",
      additionalNotes: "",
    });
    setPrescription("");
  };

  if (step === 1) {
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
            </div>
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                Prescription AI
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Generate AI-powered prescription recommendations
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Important Medical Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4">
                <p className="text-amber-800 font-medium mb-2">
                  ⚠️ This is for informational purposes only
                </p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>
                    • This AI cannot replace professional medical consultation
                  </li>
                  <li>
                    • Always consult a licensed healthcare provider for medical
                    decisions
                  </li>
                  <li>• Do not use this as actual medical prescription</li>
                  <li>• Seek immediate medical attention for emergencies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={patientData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="Enter patient's full name"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={patientData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Enter age in years"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={patientData.height}
                    onChange={(e) =>
                      handleInputChange("height", e.target.value)
                    }
                    placeholder="Enter height in cm"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={patientData.weight}
                    onChange={(e) =>
                      handleInputChange("weight", e.target.value)
                    }
                    placeholder="Enter weight in kg"
                  />
                </div>
                <div>
                  <Label htmlFor="bloodPressure">Blood Pressure</Label>
                  <Input
                    id="bloodPressure"
                    value={patientData.bloodPressure}
                    onChange={(e) =>
                      handleInputChange("bloodPressure", e.target.value)
                    }
                    placeholder="e.g., 120/80 mmHg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="allergies">Known Allergies</Label>
                <Textarea
                  id="allergies"
                  value={patientData.allergies}
                  onChange={(e) =>
                    handleInputChange("allergies", e.target.value)
                  }
                  placeholder="List any known allergies (medications, food, environmental)"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="currentMedications">Current Medications</Label>
                <Textarea
                  id="currentMedications"
                  value={patientData.currentMedications}
                  onChange={(e) =>
                    handleInputChange("currentMedications", e.target.value)
                  }
                  placeholder="List all current medications with dosages"
                  rows={2}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Continue to Symptoms
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/30">
        {/* Header */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <Button
                onClick={() => setStep(1)}
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Patient Info
              </Button>
            </div>
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                Symptoms & Medical History
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Describe symptoms and relevant medical information
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl">
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="symptoms">Current Symptoms *</Label>
                <Textarea
                  id="symptoms"
                  value={patientData.symptoms}
                  onChange={(e) =>
                    handleInputChange("symptoms", e.target.value)
                  }
                  placeholder="Describe current symptoms in detail (duration, severity, triggers, etc.)"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  value={patientData.medicalHistory}
                  onChange={(e) =>
                    handleInputChange("medicalHistory", e.target.value)
                  }
                  placeholder="Previous medical conditions, surgeries, chronic diseases, family history"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={patientData.additionalNotes}
                  onChange={(e) =>
                    handleInputChange("additionalNotes", e.target.value)
                  }
                  placeholder="Any other relevant information (lifestyle, recent changes, concerns)"
                  rows={3}
                />
              </div>

              <div className="flex gap-4 justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={generatePrescription}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Prescription...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Prescription
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              AI-Generated Prescription
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Review your personalized prescription recommendations
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Prescription Details
                </span>
                <Badge variant="outline">AI Generated</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-card border rounded-lg p-6">
                {/* Structured Prescription Layout */}
                <div className="prescription-sheet">
                  <div className="prescription-header">
                    <div>
                      <div className="prescription-clinic">
                        HealthWise Care Clinic
                      </div>
                      <div className="prescription-sub">
                        123 Wellness Ave, Your City • +1 (000) 000-0000
                      </div>
                    </div>
                    <div className="prescription-rx">℞</div>
                  </div>

                  <div className="prescription-info">
                    <div>
                      <strong>Patient:</strong> {patientData.fullName || "—"}
                    </div>
                    <div>
                      <strong>Age:</strong> {patientData.age || "—"}
                    </div>
                    <div>
                      <strong>Gender:</strong> {patientData.gender || "—"}
                    </div>
                    <div>
                      <strong>Height:</strong>{" "}
                      {patientData.height ? `${patientData.height} cm` : "—"}
                    </div>
                    <div>
                      <strong>Weight:</strong>{" "}
                      {patientData.weight ? `${patientData.weight} kg` : "—"}
                    </div>
                    <div>
                      <strong>BP:</strong> {patientData.bloodPressure || "—"}
                    </div>
                    <div>
                      <strong>Date:</strong> {new Date().toLocaleDateString()}
                    </div>
                  </div>

                  <div className="prescription-body">
                    <div className="prescription-section-title">
                      Medications
                    </div>
                    <ul className="prescription-med-list">
                      {extractMedications(prescription).map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>

                    <div className="prescription-section-title">
                      Notes & Instructions
                    </div>
                    <div
                      className="prescription-notes"
                      dangerouslySetInnerHTML={{
                        __html: prescription
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(/•/g, "&bull;")
                          .replace(/\n/g, "<br>"),
                      }}
                    />
                  </div>

                  <div className="prescription-footer">
                    <div className="prescription-sign">Doctor's Signature</div>
                    <div className="prescription-stamp">
                      — Verified AI Draft —
                    </div>
                  </div>
                </div>
              </div>

              {/* Buy Medications */}
              <div className="space-y-3 mt-4">
                <h4 className="font-medium text-foreground">
                  Buy Medications:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {extractMedications(prescription).map((med, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(getMedicationBuyLink(med), "_blank")
                      }
                      className="text-xs"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Buy {med}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button onClick={() => window.print()} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download/Print
                </Button>
                <Button
                  onClick={() => setShowFollowUp(!showFollowUp)}
                  variant="secondary"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Follow-up
                </Button>
              </div>

              {/* Follow-up Section */}
              {showFollowUp && (
                <Card className="mt-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Follow-up Consultation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="followUp">
                        How are you feeling? Any side effects or concerns?
                      </Label>
                      <Textarea
                        id="followUp"
                        value={followUp}
                        onChange={(e) => setFollowUp(e.target.value)}
                        placeholder="Describe your experience with the prescribed medications..."
                        rows={3}
                      />
                    </div>
                    <Button
                      onClick={handleFollowUp}
                      disabled={!followUp.trim() || loading}
                    >
                      {loading ? "Updating..." : "Update Prescription"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">
                ⚠️ Important Medical Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 border-2 border-red-200 dark:border-red-700 rounded-2xl p-4">
                <ul className="text-red-800 space-y-2">
                  <li>
                    • This prescription is AI-generated and for informational
                    purposes only
                  </li>
                  <li>• Do NOT use this as an actual medical prescription</li>
                  <li>
                    • Always consult with a licensed healthcare professional
                    before taking any medication
                  </li>
                  <li>
                    • This does not constitute a doctor-patient relationship
                  </li>
                  <li>• Seek immediate medical attention for emergencies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={resetForm} variant="outline">
              Generate New Prescription
            </Button>
            <Button onClick={onBack}>Return to Dashboard</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
