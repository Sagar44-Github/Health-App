import { useEffect } from "react";
import { MedicationManager } from "@/components/MedicationManager";
import { useNavigate } from "react-router-dom";

const Medications = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };

  return <MedicationManager onBack={handleBack} />;
};

export default Medications;
