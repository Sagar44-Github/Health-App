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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

import {
  ArrowLeft,
  Plus,
  Pill,
  Clock,
  Calendar,
  Trash2,
  Edit3,
  Bell,
  AlertCircle,
  Check,
  Loader2,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

interface MedicationManagerProps {
  onBack: () => void;
}

interface Medication {
  id?: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  times_per_day: number;
  reminder_times: string[];
  start_date: string;
  end_date?: string;
  notes?: string;
  is_active: boolean;
  before_food?: boolean;
  after_food?: boolean;
  with_food?: boolean;
}

export const MedicationManager = ({ onBack }: MedicationManagerProps) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(
    null
  );
  const [isLoadingMedications, setIsLoadingMedications] = useState(true);
  const [formData, setFormData] = useState<Medication>({
    medication_name: "",
    dosage: "",
    frequency: "daily",
    times_per_day: 1,
    reminder_times: [""],
    start_date: new Date().toISOString().split("T")[0],
    end_date: "",
    notes: "",
    is_active: true,
    before_food: false,
    after_food: false,
    with_food: false,
  });
  const { toast } = useToast();

  // Without authentication, we'll use localStorage for demonstration
  const fetchMedications = () => {
    setIsLoadingMedications(true);
    const stored = localStorage.getItem("medications");
    if (stored) {
      setMedications(JSON.parse(stored));
    }
    setIsLoadingMedications(false);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    fetchMedications();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateReminderTimes = (index: number, time: string) => {
    const newTimes = [...formData.reminder_times];
    newTimes[index] = time;
    setFormData((prev) => ({ ...prev, reminder_times: newTimes }));
  };

  const addReminderTime = () => {
    if (formData.reminder_times.length < formData.times_per_day) {
      setFormData((prev) => ({
        ...prev,
        reminder_times: [...prev.reminder_times, ""],
      }));
    }
  };

  const removeReminderTime = (index: number) => {
    const newTimes = formData.reminder_times.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, reminder_times: newTimes }));
  };

  const updateTimesPerDay = (times: number) => {
    const currentTimes = formData.reminder_times.length;
    let newTimes = [...formData.reminder_times];

    if (times > currentTimes) {
      // Add empty time slots
      for (let i = currentTimes; i < times; i++) {
        newTimes.push("");
      }
    } else if (times < currentTimes) {
      // Remove excess time slots
      newTimes = newTimes.slice(0, times);
    }

    setFormData((prev) => ({
      ...prev,
      times_per_day: times,
      reminder_times: newTimes,
    }));
  };

  const saveMedication = () => {
    if (!formData.medication_name || !formData.dosage) {
      toast({
        title: "Missing Information",
        description: "Please fill in medication name and dosage.",
        variant: "destructive",
      });
      return;
    }

    // Filter out empty reminder times
    const validReminderTimes = formData.reminder_times.filter(
      (time) => time.trim() !== ""
    );

    if (validReminderTimes.length === 0) {
      toast({
        title: "Missing Reminder Times",
        description: "Please set at least one reminder time.",
        variant: "destructive",
      });
      return;
    }

    const medicationData = {
      id: editingMedication?.id || Date.now().toString(),
      medication_name: formData.medication_name,
      dosage: formData.dosage,
      frequency: formData.frequency,
      times_per_day: formData.times_per_day,
      reminder_times: validReminderTimes,
      start_date: formData.start_date,
      end_date: formData.end_date || null,
      notes: formData.notes,
      is_active: formData.is_active,
    };

    const stored = localStorage.getItem("medications");
    let medications = stored ? JSON.parse(stored) : [];

    if (editingMedication?.id) {
      medications = medications.map((med: any) =>
        med.id === editingMedication.id ? medicationData : med
      );
      toast({
        title: "Success",
        description: "Medication updated successfully",
      });
    } else {
      medications.push(medicationData);
      toast({
        title: "Success",
        description: "Medication added successfully",
      });
    }

    localStorage.setItem("medications", JSON.stringify(medications));
    resetForm();
    fetchMedications();
  };

  const deleteMedication = (id: string) => {
    const stored = localStorage.getItem("medications");
    const medications = stored ? JSON.parse(stored) : [];
    const filtered = medications.filter((med: any) => med.id !== id);
    localStorage.setItem("medications", JSON.stringify(filtered));

    toast({
      title: "Success",
      description: "Medication deleted successfully",
    });
    fetchMedications();
  };

  const toggleMedicationStatus = (medication: any) => {
    const stored = localStorage.getItem("medications");
    const medications = stored ? JSON.parse(stored) : [];
    const updated = medications.map((med: any) =>
      med.id === medication.id ? { ...med, is_active: !med.is_active } : med
    );
    localStorage.setItem("medications", JSON.stringify(updated));

    toast({
      title: "Success",
      description: `Medication ${
        !medication.is_active ? "activated" : "deactivated"
      }`,
    });
    fetchMedications();
  };

  const editMedication = (medication: any) => {
    setEditingMedication(medication);
    setFormData({
      medication_name: medication.medication_name,
      dosage: medication.dosage,
      frequency: medication.frequency,
      times_per_day: medication.times_per_day,
      reminder_times: medication.reminder_times,
      start_date: medication.start_date,
      end_date: medication.end_date || "",
      notes: medication.notes || "",
      is_active: medication.is_active,
      before_food: false,
      after_food: false,
      with_food: false,
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      medication_name: "",
      dosage: "",
      frequency: "daily",
      times_per_day: 1,
      reminder_times: [""],
      start_date: new Date().toISOString().split("T")[0],
      end_date: "",
      notes: "",
      is_active: true,
      before_food: false,
      after_food: false,
      with_food: false,
    });
    setEditingMedication(null);
    setShowAddForm(false);
  };

  const getFoodInstructions = (medication: any) => {
    const notes = medication.notes?.toLowerCase() || "";
    if (notes.includes("before food") || notes.includes("empty stomach")) {
      return {
        text: "Before food",
        color: "bg-info/20 text-info border-info/30",
      };
    }
    if (notes.includes("after food") || notes.includes("with meal")) {
      return {
        text: "After food",
        color: "bg-success/20 text-success border-success/30",
      };
    }
    if (notes.includes("with food")) {
      return {
        text: "With food",
        color: "bg-warning/20 text-warning border-warning/30",
      };
    }
    return null;
  };

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/30">
        {/* Header */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <Button
                onClick={resetForm}
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Medications
              </Button>
            </div>
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Pill className="h-5 w-5 text-white" />
                </div>
                {editingMedication ? "Edit Medication" : "Add New Medication"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Set up medication reminders and instructions
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Medication Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="medication_name">Medication Name *</Label>
                  <Input
                    id="medication_name"
                    value={formData.medication_name}
                    onChange={(e) =>
                      handleInputChange("medication_name", e.target.value)
                    }
                    placeholder="e.g., Paracetamol, Aspirin"
                  />
                </div>
                <div>
                  <Label htmlFor="dosage">Dosage *</Label>
                  <Input
                    id="dosage"
                    value={formData.dosage}
                    onChange={(e) =>
                      handleInputChange("dosage", e.target.value)
                    }
                    placeholder="e.g., 500mg, 1 tablet"
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    value={formData.frequency}
                    onValueChange={(value) =>
                      handleInputChange("frequency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="twice-daily">Twice Daily</SelectItem>
                      <SelectItem value="three-times-daily">
                        Three Times Daily
                      </SelectItem>
                      <SelectItem value="four-times-daily">
                        Four Times Daily
                      </SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="as-needed">As Needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="times_per_day">Times Per Day</Label>
                  <Select
                    value={formData.times_per_day.toString()}
                    onValueChange={(value) =>
                      updateTimesPerDay(parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Reminder Times</Label>
                <div className="space-y-3 mt-2">
                  {formData.reminder_times.map((time, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) =>
                          updateReminderTimes(index, e.target.value)
                        }
                        className="w-40"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeReminderTime(index)}
                        disabled={formData.reminder_times.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {formData.reminder_times.length < formData.times_per_day && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addReminderTime}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Reminder Time
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) =>
                      handleInputChange("start_date", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date (Optional)</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) =>
                      handleInputChange("end_date", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Instructions & Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="e.g., Take with food, Before meals, Avoid alcohol, etc."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    handleInputChange("is_active", checked)
                  }
                />
                <Label htmlFor="is_active">Active medication</Label>
              </div>

              <div className="flex gap-4 justify-end">
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  onClick={saveMedication}
                  size="lg"
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {editingMedication ? "Update Medication" : "Add Medication"}
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
        <div className="max-w-6xl mx-auto px-6 py-6">
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
            <Button
              onClick={() => setShowAddForm(true)}
              size="lg"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Pill className="h-5 w-5 text-white" />
              </div>
              Medication Manager
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage your medications and set reminders
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {isLoadingMedications ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">
                Loading your medications...
              </p>
            </div>
          </div>
        ) : medications.length === 0 ? (
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl">
            <CardContent className="text-center py-12">
              <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Medications Added
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start by adding your medications to set up reminders and track
                your treatment.
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                size="lg"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Medication
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {medications.map((medication) => {
              const foodInstructions = getFoodInstructions(medication);
              return (
                <Card
                  key={medication.id}
                  className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${
                    medication.is_active
                      ? "ring-2 ring-green-500/30"
                      : "opacity-80"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Pill
                            className={`h-5 w-5 ${
                              medication.is_active
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          />
                          {medication.medication_name}
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">
                          {medication.dosage}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            medication.is_active ? "default" : "secondary"
                          }
                          className={
                            medication.is_active
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-gray-100 text-gray-500 border-gray-200"
                          }
                        >
                          {medication.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <Clock className="h-4 w-4" />
                          Frequency
                        </div>
                        <p className="font-medium">{medication.frequency}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4" />
                          Duration
                        </div>
                        <p className="font-medium">
                          {medication.start_date}{" "}
                          {medication.end_date && `to ${medication.end_date}`}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground mb-2">
                        <Bell className="h-4 w-4" />
                        Reminder Times
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {medication.reminder_times.map((time, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {time}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {foodInstructions && (
                      <div>
                        <Badge className={foodInstructions.color}>
                          {foodInstructions.text}
                        </Badge>
                      </div>
                    )}

                    {medication.notes && (
                      <div>
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <AlertCircle className="h-4 w-4" />
                          Instructions
                        </div>
                        <p className="text-sm text-foreground bg-background p-2 rounded border">
                          {medication.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => editMedication(medication)}
                        className="hover:bg-accent transition-all duration-200"
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleMedicationStatus(medication)}
                        className="hover:bg-accent transition-all duration-200"
                      >
                        {medication.is_active ? (
                          <>
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Activate
                          </>
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteMedication(medication.id)}
                        className="hover:bg-destructive/90 transition-all duration-200"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            n{" "}
          </div>
        )}
      </div>
    </div>
  );
};
