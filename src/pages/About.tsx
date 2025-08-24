import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <Card className="content-card">
        <CardHeader>
          <CardTitle>About HealthWise AI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 leading-relaxed text-sm text-muted-foreground">
          <p>
            HealthWise AI is a comprehensive digital health companion designed
            to empower individuals with reliable guidance, actionable insights,
            and tools that simplify everyday wellness. We blend clinical best
            practices with responsible AI to help you make informed decisions.
          </p>
          <p>
            Our platform brings together symptom triage, AI-generated
            prescription drafts, medication tracking, telehealth guidance, and
            local care discovery—wrapped in a calm, distraction-free interface.
            We believe great health experiences should be accessible, respectful
            of privacy, and rooted in transparency.
          </p>
          <p>
            HealthWise AI does not replace professional medical advice. We
            emphasize safety through consistent disclaimers, conservative
            recommendations, and encouraging users to consult licensed
            practitioners for diagnosis and treatment.
          </p>
          <p>
            We are continually improving our models and UX with user feedback.
            Your experience helps us refine features, enhance clarity, and focus
            on what truly matters: delivering practical support that fits
            seamlessly into daily life.
          </p>
          <p>
            If you’re a clinician, researcher, or partner interested in
            collaborating, we would love to connect. Together, we can build a
            more supportive, human-centered future for digital health.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
