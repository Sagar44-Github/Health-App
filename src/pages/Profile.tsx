import { useEffect } from "react";
import { ProfileManager } from "@/components/ProfileManager";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading user profile...</p>
      </div>
    );
  }

  return <ProfileManager onBack={handleBack} user={user} />;
};

export default Profile;
