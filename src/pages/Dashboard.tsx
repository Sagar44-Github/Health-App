import { HealthDashboard } from "@/components/HealthDashboard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (section: string) => {
    switch (section) {
      case "home":
        navigate("/");
        break;
      case "chat":
        navigate("/chat");
        break;
      case "symptoms":
        navigate("/symptoms");
        break;
      case "tips":
        navigate("/tips");
        break;
      case "medication-manager":
        navigate("/medications");
        break;
      case "telehealth":
        navigate("/telehealth");
        break;
      case "prescription-ai":
        navigate("/prescription");
        break;
      default:
        navigate(`/${section}`);
        break;
    }
  };

  return <HealthDashboard onNavigate={handleNavigation} />;
};

export default Dashboard;
