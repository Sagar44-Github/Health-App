import { useEffect } from "react";
import SymptomChecker from "@/components/SymptomChecker";
import { useNavigate } from "react-router-dom";

const Symptoms = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };

  return <SymptomChecker onBack={handleBack} />;
};

export default Symptoms;
