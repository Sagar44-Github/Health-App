import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  Star,
  Users,
  ArrowLeft,
  Stethoscope,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Telehealth = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Practitioner",
      rating: 4.9,
      experience: "15 years",
      image: "/placeholder.svg",
      available: true,
      consultationFee: "$50",
      nextAvailable: "Today 2:00 PM",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Cardiologist",
      rating: 4.8,
      experience: "12 years",
      image: "/placeholder.svg",
      available: false,
      consultationFee: "$75",
      nextAvailable: "Tomorrow 10:00 AM",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Dermatologist",
      rating: 4.9,
      experience: "10 years",
      image: "/placeholder.svg",
      available: true,
      consultationFee: "$60",
      nextAvailable: "Today 4:30 PM",
    },
  ];

  const upcomingConsultations = [
    {
      doctor: "Dr. Sarah Johnson",
      date: "Dec 15, 2024",
      time: "2:00 PM",
      type: "Video Call",
      reason: "Follow-up consultation",
    },
    {
      doctor: "Dr. Michael Chen",
      date: "Dec 18, 2024",
      time: "10:30 AM",
      type: "Phone Call",
      reason: "Cardiology check-up",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/30">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBack}
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
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              Telemedicine
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Connect with healthcare professionals from the comfort of your
              home
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Available Doctors */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  Available Doctors
                </CardTitle>
                <CardDescription>
                  Choose from our network of certified healthcare professionals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={doctor.image} alt={doctor.name} />
                            <AvatarFallback>
                              {doctor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{doctor.name}</h3>
                              {doctor.available && (
                                <Badge variant="secondary" className="text-xs">
                                  Available
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              {doctor.specialty}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {doctor.rating}
                              </span>
                              <span>{doctor.experience} experience</span>
                              <span>{doctor.consultationFee}/consultation</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-2">
                            Next available:
                          </p>
                          <p className="text-sm font-medium mb-3">
                            {doctor.nextAvailable}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                alert(
                                  `Starting video call with ${doctor.name}...`
                                )
                              }
                              className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-all duration-200"
                            >
                              <Video className="h-4 w-4 mr-1" />
                              Video
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                alert(
                                  `Starting phone call with ${doctor.name}...`
                                )
                              }
                              className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-all duration-200"
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Consultation */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  Quick Consultation
                </CardTitle>
                <CardDescription>
                  Get instant medical advice through our AI-powered triage
                  system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Describe your symptoms and get immediate guidance on whether
                    you need urgent care, can wait for a scheduled appointment,
                    or can manage the condition at home.
                  </p>
                  <Button
                    className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    size="lg"
                    onClick={() =>
                      alert(
                        "Quick consultation feature will be available soon. This would normally connect you to our AI triage system."
                      )
                    }
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Quick Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Consultations */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 shadow-xl rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Calendar className="h-3 w-3 text-white" />
                  </div>
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingConsultations.map((consultation, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-blue-900 dark:text-blue-100">
                        {consultation.doctor}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {consultation.type === "Video Call" ? (
                          <Video className="h-3 w-3 mr-1" />
                        ) : (
                          <Phone className="h-3 w-3 mr-1" />
                        )}
                        {consultation.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {consultation.date}
                      </p>
                      <p className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {consultation.time}
                      </p>
                      <p className="mt-2 text-xs">{consultation.reason}</p>
                    </div>
                  </div>
                ))}

                {upcomingConsultations.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No upcoming consultations
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Emergency Notice */}
            <Card className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border-red-200 dark:border-red-800 shadow-xl rounded-3xl">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="text-red-500">
                    <Phone className="h-8 w-8 mx-auto" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-600 mb-1">
                      Emergency?
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      For life-threatening emergencies, call 911 immediately
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-xl shadow-lg transition-all duration-200"
                      onClick={() => window.open("tel:911")}
                    >
                      Call Emergency Services
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Telehealth;
