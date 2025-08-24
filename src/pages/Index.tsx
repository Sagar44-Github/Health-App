import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  Pill,
  Book,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

export default function Index() {
  const { user } = useAuth();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });
  const statsInView = useInView(statsRef, { once: true });
  const testimonialsInView = useInView(testimonialsRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden transition-colors duration-300">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/30"
        style={{ y: y1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent dark:to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative">
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="h-9 w-9 text-white" />
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-2 text-sm font-medium">
                <Shield className="h-4 w-4 mr-2" />
                Medically Verified AI
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Revolutionary
              </span>
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Healthcare AI
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Experience the future of healthcare with our advanced AI
              assistant. Get instant medical insights, personalized
              recommendations, and 24/7 support from the world's most
              sophisticated health intelligence system.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/chat">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg group"
                >
                  <MessageCircle className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Start Free Consultation
                  <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="lg"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-8 py-6 rounded-2xl font-semibold text-lg group transition-all duration-300"
              >
                <Play className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </Button>
            </motion.div>

            {user && (
              <motion.div
                variants={fadeInUp}
                className="mt-8 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 max-w-md mx-auto"
              >
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
              </motion.div>
            )}
          </motion.div>

          {/* Floating Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
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
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 text-center group cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Health Monitoring Section */}
      <motion.section
        ref={statsRef}
        className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900"
        style={{ y: y2 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Your Health at a Glance
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Monitor your vital health metrics with our comprehensive tracking
              system
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            {[
              {
                value: "72",
                unit: "BPM",
                label: "Heart Rate",
                icon: Heart,
                color: "from-red-500 to-pink-500",
                status: "Normal",
                trend: "+2%",
              },
              {
                value: "8,547",
                unit: "steps",
                label: "Daily Steps",
                icon: Activity,
                color: "from-green-500 to-emerald-500",
                status: "Active",
                trend: "+15%",
              },
              {
                value: "420",
                unit: "kcal",
                label: "Calories Burned",
                icon: Zap,
                color: "from-orange-500 to-amber-500",
                status: "Good",
                trend: "+8%",
              },
              {
                value: "7.5",
                unit: "hours",
                label: "Sleep Duration",
                icon: Clock,
                color: "from-purple-500 to-indigo-500",
                status: "Quality",
                trend: "+0.5h",
              },
            ].map((metric, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <metric.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-600 font-medium">
                      {metric.trend}
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {metric.value}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {metric.unit}
                    </span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium mb-2">
                    {metric.label}
                  </div>
                  <div
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      metric.status === "Normal" || metric.status === "Quality"
                        ? "bg-green-100 text-green-700"
                        : metric.status === "Active" || metric.status === "Good"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {metric.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        className="py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Revolutionary Healthcare Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how our AI-powered platform is transforming healthcare
              delivery
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
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
                icon: Pill,
                title: "Medication Manager",
                description:
                  "Track your medications, set reminders, and manage prescriptions with intelligent dosage recommendations and interaction warnings.",
                color: "from-orange-500 to-amber-500",
                link: "/medications",
              },
              {
                icon: Video,
                title: "Telehealth Consultations",
                description:
                  "Connect with licensed healthcare professionals through secure video consultations from the comfort of your home.",
                color: "from-teal-500 to-cyan-500",
                link: "/telehealth",
              },
              {
                icon: Book,
                title: "Health Tips & Insights",
                description:
                  "Discover personalized health tips, wellness insights, and educational content tailored to your health profile and goals.",
                color: "from-pink-500 to-rose-500",
                link: "/tips",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group cursor-pointer"
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
                        Start Now
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        ref={testimonialsRef}
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-slate-900"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What our users say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real experiences from people who trust HealthWise AI with their
              healthcare journey
            </p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
          >
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Healthcare Professional",
                content:
                  "HealthWise AI has revolutionized how I approach patient consultations. The accuracy and speed are remarkable.",
                rating: 5,
              },
              {
                name: "Michael Rodriguez",
                role: "Patient",
                content:
                  "Having 24/7 access to reliable health information has given me peace of mind. The AI responses are incredibly helpful.",
                rating: 5,
              },
              {
                name: "Emily Thompson",
                role: "Caregiver",
                content:
                  "Managing my family's health has become so much easier. The personalized recommendations are spot-on.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 group cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <motion.div
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Ready to transform your healthcare?
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto"
            >
              Join millions of users who trust HealthWise AI for their health
              and wellness journey. Start your free consultation today.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/chat">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg group"
                >
                  <MessageCircle className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Start Free Consultation
                  <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>

              <Link to="/symptoms">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-10 py-6 rounded-2xl font-semibold text-lg group transition-all duration-300 hover:scale-105"
                >
                  <Activity className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Check Symptoms
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-12 flex items-center justify-center gap-8 text-blue-100"
            >
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
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">HealthWise AI</h3>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Revolutionizing healthcare with AI-powered insights,
                personalized recommendations, and 24/7 medical assistance.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/chat"
                    className="hover:text-white transition-colors"
                  >
                    AI Health Chat
                  </Link>
                </li>
                <li>
                  <Link
                    to="/symptoms"
                    className="hover:text-white transition-colors"
                  >
                    Symptom Checker
                  </Link>
                </li>
                <li>
                  <Link
                    to="/prescription"
                    className="hover:text-white transition-colors"
                  >
                    Prescription AI
                  </Link>
                </li>
                <li>
                  <Link
                    to="/medications"
                    className="hover:text-white transition-colors"
                  >
                    Medications
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/feedback"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/emergency"
                    className="hover:text-white transition-colors"
                  >
                    Emergency
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 HealthWise AI. All rights reserved. Powered by
              advanced medical AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
