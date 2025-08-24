import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Calendar,
  Ruler,
  Weight,
  Phone,
  Heart,
  Pill,
  AlertTriangle,
  Loader2,
  Home,
  Droplet,
  Save,
  Edit,
  Mail,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";

interface ProfileManagerProps {
  onBack: () => void;
  user: any;
}

export const ProfileManager = ({ onBack, user }: ProfileManagerProps) => {
  const { updateProfile } = useAuth();
  const [profile, setProfile] = useState({
    // Basic Auth Info (from Better Auth)
    fullName: user?.name || user?.fullName || "",
    email: user?.email || "",
    avatar: user?.image || user?.avatar || "",

    // Extended Profile Info
    date_of_birth: "",
    age_years: "",
    gender: "",

    // Contact & Address
    phone: user?.phoneNumber || "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",

    // Physical
    height_cm: "",
    weight_kg: "",
    blood_type: "",

    // Emergency
    emergency_contact_name: "",
    emergency_contact_phone: "",

    // Medical
    medical_conditions: [] as string[],
    allergies: [] as string[],
    medications: [] as string[],

    // Lifestyle
    smoker: "no",
    alcohol: "no",
    exercise_frequency: "",
    diet_notes: "",

    // Other
    insurance_provider: "",
    insurance_number: "",
    primary_physician: "",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [newCondition, setNewCondition] = useState("");
  const [newAllergy, setNewAllergy] = useState("");
  const [newMedication, setNewMedication] = useState("");
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const { toast } = useToast();

  const storageKey = `profile:${user?.id ?? "guest"}`;

  useEffect(() => {
    setIsLoadingProfile(true);
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        setProfile((prev) => ({ ...prev, ...data }));
      } catch {}
    }
    setIsLoadingProfile(false);
  }, [storageKey]);

  const saveProfile = async () => {
    setIsLoading(true);
    try {
      // Save extended profile to localStorage
      localStorage.setItem(storageKey, JSON.stringify(profile));

      // Update basic user info in Better Auth if it changed
      if (
        isEditingBasic &&
        (profile.fullName !== user?.name || profile.email !== user?.email)
      ) {
        const result = await updateProfile({
          name: profile.fullName,
          fullName: profile.fullName,
          email: profile.email,
          phoneNumber: profile.phone,
        });

        if (!result.success) {
          throw new Error(result.error || "Failed to update user profile");
        }
      }

      toast({
        title: "Profile saved!",
        description: "Your health profile has been updated successfully.",
      });

      setIsEditingBasic(false);
    } catch (error: any) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = (
    type: "medical_conditions" | "allergies" | "medications",
    value: string
  ) => {
    if (value.trim()) {
      setProfile((prev) => ({
        ...prev,
        [type]: [...prev[type], value.trim()],
      }));
      if (type === "medical_conditions") setNewCondition("");
      if (type === "allergies") setNewAllergy("");
      if (type === "medications") setNewMedication("");
    }
  };

  const removeItem = (
    type: "medical_conditions" | "allergies" | "medications",
    index: number
  ) => {
    setProfile((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const setField = (key: keyof typeof profile, value: string) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-blue-50 p-4">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          onBack={onBack}
          icon={User}
          title="Health Profile"
          subtitle="Manage detailed personal health information"
        />

        {isLoadingProfile ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your profile...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Identity */}
              <Card className="content-card">
                <CardHeader>
                  <CardTitle>Identity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={profile.fullName}
                      onChange={(e) => setField("fullName", e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <Input
                        type="date"
                        value={profile.date_of_birth}
                        onChange={(e) =>
                          setField("date_of_birth", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Age (years)</Label>
                      <Input
                        type="number"
                        value={profile.age_years}
                        onChange={(e) => setField("age_years", e.target.value)}
                        placeholder="28"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      value={profile.gender}
                      onValueChange={(v) => setField("gender", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer_not_to_say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Contact & Address */}
              <Card className="content-card">
                <CardHeader>
                  <CardTitle>Contact & Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        value={profile.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        placeholder="+1 555 000 0000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Address line 1</Label>
                    <Input
                      value={profile.address_line1}
                      onChange={(e) =>
                        setField("address_line1", e.target.value)
                      }
                      placeholder="Street, House/Flat"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address line 2</Label>
                    <Input
                      value={profile.address_line2}
                      onChange={(e) =>
                        setField("address_line2", e.target.value)
                      }
                      placeholder="Area, Landmark"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        value={profile.city}
                        onChange={(e) => setField("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input
                        value={profile.state}
                        onChange={(e) => setField("state", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Postal Code</Label>
                      <Input
                        value={profile.postal_code}
                        onChange={(e) =>
                          setField("postal_code", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Input
                        value={profile.country}
                        onChange={(e) => setField("country", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Physical */}
              <Card className="content-card">
                <CardHeader>
                  <CardTitle>Physical Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Height (cm)</Label>
                      <Input
                        type="number"
                        value={profile.height_cm}
                        onChange={(e) => setField("height_cm", e.target.value)}
                        placeholder="175"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Weight (kg)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={profile.weight_kg}
                        onChange={(e) => setField("weight_kg", e.target.value)}
                        placeholder="70.5"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Blood Type</Label>
                    <Select
                      value={profile.blood_type}
                      onValueChange={(v) => setField("blood_type", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                          (b) => (
                            <SelectItem key={b} value={b}>
                              {b}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency */}
              <Card className="content-card">
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={profile.emergency_contact_name}
                      onChange={(e) =>
                        setField("emergency_contact_name", e.target.value)
                      }
                      placeholder="Contact name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={profile.emergency_contact_phone}
                      onChange={(e) =>
                        setField("emergency_contact_phone", e.target.value)
                      }
                      placeholder="+1 555 000 0000"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Medical Info */}
              <Card className="md:col-span-2 content-card">
                <CardHeader>
                  <CardTitle>Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Conditions */}
                  <div className="space-y-3">
                    <Label>Medical Conditions</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        placeholder="Add condition"
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          addItem("medical_conditions", newCondition)
                        }
                      />
                      <Button
                        size="sm"
                        onClick={() =>
                          addItem("medical_conditions", newCondition)
                        }
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.medical_conditions.map((c, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeItem("medical_conditions", i)}
                        >
                          {c} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Allergies */}
                  <div className="space-y-3">
                    <Label>Allergies</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newAllergy}
                        onChange={(e) => setNewAllergy(e.target.value)}
                        placeholder="Add allergy"
                        onKeyPress={(e) =>
                          e.key === "Enter" && addItem("allergies", newAllergy)
                        }
                      />
                      <Button
                        size="sm"
                        onClick={() => addItem("allergies", newAllergy)}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.allergies.map((a, i) => (
                        <Badge
                          key={i}
                          variant="destructive"
                          className="cursor-pointer"
                          onClick={() => removeItem("allergies", i)}
                        >
                          {a} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Medications */}
                  <div className="space-y-3">
                    <Label>Current Medications</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newMedication}
                        onChange={(e) => setNewMedication(e.target.value)}
                        placeholder="Add medication"
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          addItem("medications", newMedication)
                        }
                      />
                      <Button
                        size="sm"
                        onClick={() => addItem("medications", newMedication)}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.medications.map((m, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => removeItem("medications", i)}
                        >
                          {m} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lifestyle */}
              <Card className="content-card">
                <CardHeader>
                  <CardTitle>Lifestyle</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Smoker</Label>
                      <Select
                        value={profile.smoker}
                        onValueChange={(v) => setField("smoker", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="occasional">Occasional</SelectItem>
                          <SelectItem value="yes">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Alcohol</Label>
                      <Select
                        value={profile.alcohol}
                        onValueChange={(v) => setField("alcohol", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="occasional">Occasional</SelectItem>
                          <SelectItem value="yes">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Exercise Frequency</Label>
                    <Input
                      value={profile.exercise_frequency}
                      onChange={(e) =>
                        setField("exercise_frequency", e.target.value)
                      }
                      placeholder="e.g., 3x/week"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Diet Notes</Label>
                    <Textarea
                      rows={3}
                      value={profile.diet_notes}
                      onChange={(e) => setField("diet_notes", e.target.value)}
                      placeholder="Vegetarian, low-salt, etc."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Other / Insurance */}
              <Card className="content-card">
                <CardHeader>
                  <CardTitle>Other & Insurance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Insurance Provider</Label>
                    <Input
                      value={profile.insurance_provider}
                      onChange={(e) =>
                        setField("insurance_provider", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Insurance Number</Label>
                    <Input
                      value={profile.insurance_number}
                      onChange={(e) =>
                        setField("insurance_number", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Physician</Label>
                    <Input
                      value={profile.primary_physician}
                      onChange={(e) =>
                        setField("primary_physician", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Additional Notes</Label>
                    <Textarea
                      rows={3}
                      value={profile.notes}
                      onChange={(e) => setField("notes", e.target.value)}
                      placeholder="Anything else we should know"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={saveProfile}
                disabled={isLoading}
                size="lg"
                className="medical-button"
              >
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
