import { useEffect } from "react";
import HealthTipsComponent from "@/components/HealthTips";
import { useNavigate } from "react-router-dom";

const HealthTips = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };

  return <HealthTipsComponent onBack={handleBack} />;
};

export default HealthTips;
