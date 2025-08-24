import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Activity,
  Brain,
  Stethoscope,
  Shield,
  Star,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  Heart,
  Award,
  TrendingUp,
  Globe,
  Lock,
  Smartphone,
  Database,
  PhoneCall,
  FileText,
  AlertCircle,
  Headphones,
  Monitor,
  Calendar,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function SimpleIndex() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent dark:to-transparent" />

        <div className="w-full px-6 py-20 relative">
          <div className="text-center mb-16 max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="h-9 w-9 text-white" />
              </div>
              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 px-4 py-2 text-sm font-medium">
                <Shield className="h-4 w-4 mr-2" />
                Medically Verified AI
              </Badge>
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
              Revolutionary
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Healthcare AI
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Experience the future of healthcare with our advanced AI
              assistant. Get instant medical insights, personalized
              recommendations, and 24/7 support from the world's most
              sophisticated health intelligence system.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/chat">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg group"
                >
                  <MessageCircle className="h-6 w-6 mr-3" />
                  Start Free Consultation
                  <ArrowRight className="h-5 w-5 ml-3" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="lg"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-8 py-6 rounded-2xl font-semibold text-lg group transition-all duration-300"
              >
                <Play className="h-6 w-6 mr-3" />
                Watch Demo
              </Button>
            </div>

            {user && (
              <div className="mt-8 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 max-w-md mx-auto">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Welcome back,{" "}
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    {user.name || user.email?.split("@")[0] || "there"}
                  </span>
                  !
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Continue your health journey
                </p>
              </div>
            )}
          </div>

          {/* Floating Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered",
                desc: "Advanced machine learning",
              },
              {
                icon: Shield,
                title: "HIPAA Compliant",
                desc: "Your data is secure",
              },
              {
                icon: Clock,
                title: "24/7 Available",
                desc: "Always here for you",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 text-center group cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="w-full px-6">
          <div className="text-center mb-16 max-w-5xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted by millions worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Join the healthcare revolution and experience the power of
              AI-driven medical assistance
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                number: "10M+",
                label: "Health Queries Answered",
                icon: MessageCircle,
                color: "from-blue-500 to-cyan-500",
              },
              {
                number: "500K+",
                label: "Active Users",
                icon: Users,
                color: "from-green-500 to-emerald-500",
              },
              {
                number: "98%",
                label: "AI Accuracy Rate",
                icon: CheckCircle,
                color: "from-emerald-500 to-green-500",
              },
              {
                number: "24/7",
                label: "Available Support",
                icon: Clock,
                color: "from-indigo-500 to-purple-500",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/30 text-center group cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="w-full px-6">
          <div className="text-center mb-20 max-w-5xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Revolutionary Healthcare Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Discover how our AI-powered platform is transforming healthcare
              delivery with cutting-edge technology
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              {
                icon: Brain,
                title: "AI Health Assessment",
                description:
                  "Get comprehensive health evaluations powered by medical-grade AI. Analyze symptoms, risk factors, and receive evidence-based recommendations.",
                color: "from-blue-500 to-cyan-500",
                link: "/symptoms",
              },
              {
                icon: MessageCircle,
                title: "24/7 AI Health Chat",
                description:
                  "Instant access to medical knowledge through our conversational AI assistant. Get immediate answers to your health questions anytime.",
                color: "from-green-500 to-emerald-500",
                link: "/chat",
              },
              {
                icon: Stethoscope,
                title: "Smart Prescription AI",
                description:
                  "Advanced medication analysis and prescription recommendations based on your symptoms, medical history, and current medications.",
                color: "from-purple-500 to-indigo-500",
                link: "/prescription",
              },
              {
                icon: PhoneCall,
                title: "Telehealth Integration",
                description:
                  "Connect with certified healthcare professionals through secure video consultations integrated with AI insights.",
                color: "from-indigo-500 to-blue-500",
                link: "/telehealth",
              },
              {
                icon: AlertCircle,
                title: "Emergency Support",
                description:
                  "Instant emergency guidance and rapid response protocols with direct connections to emergency services.",
                color: "from-red-500 to-pink-500",
                link: "/emergency",
              },
              {
                icon: Heart,
                title: "Wellness Tracking",
                description:
                  "Monitor your health journey with personalized wellness plans, progress tracking, and lifestyle recommendations.",
                color: "from-pink-500 to-rose-500",
                link: "/tips",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group cursor-pointer hover:scale-102 transition-transform duration-300"
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 shadow-xl rounded-3xl overflow-hidden h-full transition-all duration-500 group-hover:shadow-2xl">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
                      {feature.description}
                    </p>
                    <Link to={feature.link}>
                      <Button
                        className={`w-full bg-gradient-to-r ${feature.color} hover:shadow-xl text-white rounded-2xl py-3 font-semibold transition-all duration-300 group-hover:scale-105`}
                      >
                        Learn More
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How HealthWise AI Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience seamless healthcare assistance in just three simple
              steps
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Describe Your Symptoms",
                description:
                  "Share your health concerns through our intelligent chat interface or symptom checker tool.",
                icon: MessageCircle,
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                title: "AI Analysis & Insights",
                description:
                  "Our advanced AI analyzes your information against medical databases to provide accurate insights.",
                icon: Brain,
                color: "from-indigo-500 to-purple-500",
              },
              {
                step: "03",
                title: "Get Personalized Care",
                description:
                  "Receive tailored recommendations, treatment options, and connect with healthcare professionals if needed.",
                icon: Heart,
                color: "from-purple-500 to-pink-500",
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl mx-auto flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full border-4 border-gray-100 dark:border-gray-700 flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      {step.step}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What our users say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real experiences from people who trust HealthWise AI with their
              healthcare journey
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Healthcare Professional",
                content:
                  "HealthWise AI has revolutionized how I approach patient consultations. The accuracy and speed are remarkable, helping me provide better care.",
                rating: 5,
                image: "👩‍⚕️",
              },
              {
                name: "Michael Rodriguez",
                role: "Patient & Caregiver",
                content:
                  "Having 24/7 access to reliable health information has given me peace of mind. The AI responses are incredibly helpful and accurate.",
                rating: 5,
                image: "👨‍💼",
              },
              {
                name: "Emily Thompson",
                role: "Mother of Three",
                content:
                  "Managing my family's health has become so much easier. The personalized recommendations and emergency guidance are invaluable.",
                rating: 5,
                image: "👩‍👧‍👦",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 group cursor-pointer hover:scale-105 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 italic text-lg">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-slate-900">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Security & Trust
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Your health data deserves the highest level of protection. We
              implement enterprise-grade security measures.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                {
                  icon: Shield,
                  title: "HIPAA Compliant",
                  description:
                    "Full compliance with healthcare privacy regulations ensuring your medical information remains confidential.",
                },
                {
                  icon: Lock,
                  title: "End-to-End Encryption",
                  description:
                    "Advanced encryption protocols protect your data both in transit and at rest with military-grade security.",
                },
                {
                  icon: Database,
                  title: "Secure Cloud Infrastructure",
                  description:
                    "Built on enterprise-grade cloud infrastructure with 99.9% uptime and automatic backups.",
                },
                {
                  icon: Award,
                  title: "Certified & Audited",
                  description:
                    "Regular security audits and certifications ensure we meet the highest industry standards.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Security Features
              </h3>
              <div className="space-y-4">
                {[
                  "256-bit SSL encryption",
                  "Multi-factor authentication",
                  "Real-time threat monitoring",
                  "Automated security updates",
                  "Data anonymization",
                  "Secure API endpoints",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to transform your healthcare?
          </h2>

          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join millions of users who trust HealthWise AI for their health and
            wellness journey. Start your free consultation today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link to="/auth/register">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg group"
              >
                <MessageCircle className="h-6 w-6 mr-3" />
                Start Free Consultation
                <ArrowRight className="h-5 w-5 ml-3" />
              </Button>
            </Link>

            <Link to="/symptoms">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-10 py-6 rounded-2xl font-semibold text-lg group transition-all duration-300 hover:scale-105"
              >
                <Activity className="h-6 w-6 mr-3" />
                Check Symptoms
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 text-blue-100 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">HIPAA compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">24/7 support</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">10M+ users trust us</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold">HealthWise AI</h3>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md mb-6">
                Revolutionizing healthcare with AI-powered insights,
                personalized recommendations, and 24/7 medical assistance. Your
                health, our intelligent care.
              </p>
              <div className="flex gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
                  Download App
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-3 rounded-xl"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Features</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link
                    to="/chat"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" /> AI Health Chat
                  </Link>
                </li>
                <li>
                  <Link
                    to="/symptoms"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" /> Symptom Checker
                  </Link>
                </li>
                <li>
                  <Link
                    to="/prescription"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" /> Prescription AI
                  </Link>
                </li>
                <li>
                  <Link
                    to="/telehealth"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" /> Telehealth
                  </Link>
                </li>
                <li>
                  <Link
                    to="/medications"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" /> Medications
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" /> About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/feedback"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" /> Contact Support
                  </Link>
                </li>
                <li>
                  <Link
                    to="/emergency"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" /> Emergency
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" /> Privacy Policy
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" /> Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="mb-4">
              &copy; 2024 HealthWise AI. All rights reserved. Powered by
              advanced medical AI technology.
            </p>
            <p className="text-sm">
              This platform is for informational purposes only and should not
              replace professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
