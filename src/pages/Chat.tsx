import { useEffect } from "react";
import ChatInterface from "@/components/ChatInterface";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };

  return <ChatInterface onBack={handleBack} />;
};

export default Chat;
