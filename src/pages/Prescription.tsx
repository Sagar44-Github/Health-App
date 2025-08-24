import { useEffect, useState } from "react";
import { PrescriptionAI } from "@/components/PrescriptionAI";
import { supabase } from "@/integrations/supabase/client";

const Prescription = () => {
  const [prefill, setPrefill] = useState<any | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    const load = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, height_cm, weight_kg, allergies, medications")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profile) {
        setPrefill({
          fullName: profile.full_name ?? "",
          height: profile.height_cm ? String(profile.height_cm) : "",
          weight: profile.weight_kg ? String(profile.weight_kg) : "",
          allergies: (profile.allergies ?? []).join(", "),
          currentMedications: (profile.medications ?? []).join(", "),
        });
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen">
      <PrescriptionAI
        onBack={() => history.back()}
        prefill={prefill ?? undefined}
      />
    </div>
  );
};

export default Prescription;
