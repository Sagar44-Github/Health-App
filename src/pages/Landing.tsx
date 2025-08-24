import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Brain,
  Shield,
  Star,
  Stethoscope,
  MessageCircle,
  Pill,
  FileText,
  MapPin,
  Lock,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Bot,
} from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const testimonials = [
    {
      name: "Aisha K.",
      text: "This platform helped me understand my symptoms quickly and guided me to the right care.",
    },
    {
      name: "Rahul S.",
      text: "The medication reminders and tips have been a lifesaver!",
    },
    {
      name: "Priya M.",
      text: "Clean UI and very practical features. Love the AI assistant!",
    },
  ];

  const features = [
    {
      icon: <MessageCircle className="h-5 w-5 text-primary" />,
      title: "24/7 AI Assistant",
      desc: "Ask questions anytime and get contextual guidance for everyday health decisions.",
      link: "/chat",
    },
    {
      icon: <Stethoscope className="h-5 w-5 text-primary" />,
      title: "Symptom Intelligence",
      desc: "Explain your symptoms in plain language and receive safe next-step suggestions.",
      link: "/symptoms",
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      title: "Prescription AI",
      desc: "Generate a well-structured draft prescription to discuss with your clinician.",
      link: "/prescription",
    },
    {
      icon: <Pill className="h-5 w-5 text-primary" />,
      title: "Medication & Reminders",
      desc: "Track meds, note allergies, and avoid missed doses with simple reminders.",
      link: "/medications",
    },
    {
      icon: <MapPin className="h-5 w-5 text-primary" />,
      title: "Nearby Care",
      desc: "Find hospitals and pharmacies around you in seconds with live location.",
      link: "/nearby",
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "Emergency Guidance",
      desc: "Direct access to emergency info and quick actions when time matters.",
      link: "/emergency",
    },
  ];

  const faqs = [
    {
      q: "Is HealthWise AI a replacement for a doctor?",
      a: "No. It provides guidance and drafts. Always consult a licensed clinician for medical decisions.",
    },
    {
      q: "How do you handle privacy?",
      a: "We keep things simple: data stays on your device for core features like profile and feedback. You control what you share.",
    },
    {
      q: "Does the AI store my chats?",
      a: "Chats are not automatically stored. If you save anything, it’s stored locally unless you connect a backend.",
    },
    {
      q: "Can I use HealthWise AI on mobile?",
      a: "Yes. The app is responsive and works on modern mobile browsers.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header with theme toggle */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">HealthWise AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero with dedicated background to ensure contrast */}
      <div className="w-full bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-900">
        <div className="container mx-auto px-4 pt-12 pb-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                  <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" /> Safety-first
                  <Brain className="h-4 w-4 ml-3" /> AI-Powered
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Your AI Companion for Better Health
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                HealthWise AI blends medical best-practices with responsible AI
                to guide your everyday health—symptoms, medications, and
                care—without the noise.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/dashboard">
                  <Button size="lg" className="px-7">
                    Get Started <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/symptoms">
                  <Button variant="outline" size="lg" className="px-7">
                    Try Symptom Checker
                  </Button>
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" /> Trusted by users
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" /> Privacy-respecting
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-primary" /> Built with modern
                  tech
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border shadow-sm">
                <img
                  src="/images/healthwise-hero.png"
                  alt="HealthWise AI illustration - doctor and mobile interface"
                  className="h-full w-full object-contain bg-white"
                  loading="eager"
                />
              </div>
              <div className="hidden md:block absolute -bottom-6 -left-6 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm border rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm">
                  <Bot className="h-4 w-4 text-primary" /> AI triage ready
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h2 className="text-2xl font-bold mb-6">How HealthWise AI works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {["Describe", "Understand", "Decide", "Act"].map((step, i) => (
            <Card key={i} className="content-card">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-2">{i + 1}</div>
                <div className="font-semibold mb-1">{step}</div>
                <p className="text-sm text-muted-foreground">
                  {i === 0 &&
                    "Tell us your symptoms, context, or goals in your own words."}
                  {i === 1 &&
                    "The AI summarizes key points responsibly and flags risks."}
                  {i === 2 &&
                    "Get next steps: self-care, appointment, or emergency guidance."}
                  {i === 3 &&
                    "Use built-in tools: prescriptions, reminders, and nearby care."}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Core Modules */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h2 className="text-2xl font-bold mb-6">Explore the modules</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card key={i} className="content-card hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  {f.icon}
                  <div className="font-semibold">{f.title}</div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{f.desc}</p>
                <Link to={f.link}>
                  <Button variant="outline" size="sm">
                    Open <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Deep dive: Prescription AI */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> AI Prescription
              (Draft)
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create a structured, printable prescription draft based on your
              profile and symptoms. The output is neatly formatted with
              medication lists, notes, and a clear layout for clinical review.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> Pulls
                your name, age, height, weight, allergies, and meds from Profile
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />{" "}
                Generates a well-structured, printable sheet with clinic header
                and notes
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />{" "}
                One-click follow-up revision after feedback
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/prescription">
                <Button size="sm">Try Prescription AI</Button>
              </Link>
            </div>
          </div>
          <div>
            <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border shadow-sm">
              <img
                src="\images\Health-Wise-Hero2.png"
                alt="Doctor consultation preview"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Privacy */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="content-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-primary" />
                <div className="font-semibold">Privacy by design</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your profile and feedback are stored locally per user. You
                control what you share.
              </p>
            </CardContent>
          </Card>
          <Card className="content-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <div className="font-semibold">Safety principles</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Clear disclaimers, conservative outputs, and prompts to contact
                real clinicians.
              </p>
            </CardContent>
          </Card>
          <Card className="content-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="h-5 w-5 text-primary" />
                <div className="font-semibold">Modern stack</div>
              </div>
              <p className="text-sm text-muted-foreground">
                React + Vite + Tailwind + shadcn/ui, with Better Auth and
                Supabase backend.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h2 className="text-2xl font-bold mb-6 text-center">What Users Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="content-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-2 text-yellow-500">
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">“{t.text}”</p>
                <div className="text-sm font-medium">{t.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((f, i) => (
            <Card key={i} className="content-card">
              <CardContent className="p-6">
                <div className="font-semibold mb-1">{f.q}</div>
                <p className="text-sm text-muted-foreground">{f.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6">
            Explore the dashboard, connect your profile, and try a guided
            symptom check.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/dashboard">
              <Button size="lg">Open Dashboard</Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" size="lg">
                Complete Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
