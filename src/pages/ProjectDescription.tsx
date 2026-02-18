import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Brain,
  Stethoscope,
  Target,
  Lightbulb,
  Layers,
  Workflow,
  Cpu,
  Building2,
  Globe,
  Rocket,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  ArrowRight,
  Database,
  Monitor,
  Cog,
  HeartPulse,
  Smartphone,
  Cloud,
  MessageSquare,
  MapPin,
  Mic,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Users,
  Ambulance,
  BotMessageSquare,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const stagger = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const SectionHeading = ({ icon: Icon, title, number }: { icon: any; title: string; number: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary text-primary-foreground font-bold text-sm shrink-0">
      {number}
    </div>
    <div className="p-2 rounded-lg gradient-subtle">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <h2 className="text-2xl font-bold text-foreground tracking-tight">{title}</h2>
  </div>
);

const ProjectDescription = () => {
  const features = [
    { label: "Symptom Selection Interface", icon: CheckCircle2 },
    { label: "AI Disease Prediction", icon: Brain },
    { label: "Confidence Score Display", icon: BarChart3 },
    { label: "Fast Real-time Prediction", icon: Sparkles },
    { label: "Simple & Clean UI", icon: Monitor },
  ];

  const techStack = [
    { name: "Python", desc: "Core programming language", color: "bg-blue-100 text-blue-700 border-blue-200" },
    { name: "Pandas", desc: "Data manipulation & analysis", color: "bg-purple-100 text-purple-700 border-purple-200" },
    { name: "Scikit-learn", desc: "Machine learning library", color: "bg-orange-100 text-orange-700 border-orange-200" },
    { name: "Streamlit", desc: "Web application framework", color: "bg-red-100 text-red-700 border-red-200" },
    { name: "Decision Tree", desc: "Classification algorithm", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  ];

  const workflowSteps = [
    { label: "Dataset", icon: Database, desc: "Symptom-disease data loaded" },
    { label: "Model Training", icon: Cpu, desc: "Decision Tree classifier trained" },
    { label: "Model Saved", icon: Cog, desc: "Trained model serialized (.pkl)" },
    { label: "User Input", icon: Users, desc: "User selects symptoms" },
    { label: "Prediction", icon: Brain, desc: "AI analyzes input" },
    { label: "Result", icon: Target, desc: "Disease & confidence shown" },
  ];

  const architectureLayers = [
    { label: "Frontend", detail: "Streamlit UI", icon: Monitor, accent: "border-l-blue-500" },
    { label: "Backend", detail: "Python Application", icon: Cog, accent: "border-l-purple-500" },
    { label: "ML Model", detail: "Trained Classifier", icon: Brain, accent: "border-l-emerald-500" },
    { label: "Dataset", detail: "Symptom-Disease CSV", icon: Database, accent: "border-l-amber-500" },
  ];

  const applications = [
    { label: "Healthcare Awareness Tools", icon: HeartPulse, desc: "Empower individuals with early health insights" },
    { label: "Telemedicine Support", icon: Stethoscope, desc: "Assist remote consultations with pre-screening" },
    { label: "Rural Healthcare Assistance", icon: Globe, desc: "Bring AI-powered health checks to underserved areas" },
    { label: "AI Health Assistants", icon: BotMessageSquare, desc: "Power intelligent chatbots for symptom analysis" },
  ];

  const futureImprovements = [
    { label: "Mobile App Version", icon: Smartphone },
    { label: "Cloud Deployment", icon: Cloud },
    { label: "Chatbot Integration", icon: MessageSquare },
    { label: "Hospital Locator", icon: MapPin },
    { label: "Voice Input", icon: Mic },
    { label: "Larger Dataset Training", icon: Database },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero */}
      <header className="relative gradient-primary overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Project Documentation
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-primary-foreground/15 backdrop-blur-sm">
                <Stethoscope className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-foreground">
                AI Symptom Prediction System
              </h1>
            </div>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Machine Learning–Based Healthcare Decision Support
            </p>
            <Link to="/">
              <Button variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Predictor
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10 space-y-10">
        {/* 1. Project Overview */}
        <motion.section {...fadeUp}>
          <SectionHeading icon={Lightbulb} title="Project Overview" number="01" />
          <Card className="glass-card border shadow-sm">
            <CardContent className="p-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The <strong className="text-foreground">AI Symptom Prediction System</strong> is a machine learning–based healthcare
                decision-support application that predicts possible diseases from user-selected symptoms. By leveraging a trained
                classification model, the system analyzes symptom combinations and returns the most probable diagnosis along with a
                confidence score.
              </p>
              <p>
                Designed for <strong className="text-foreground">educational purposes and health awareness</strong>, this tool demonstrates
                how Artificial Intelligence can assist in early health screening and preventive healthcare — empowering users with
                quick, data-driven insights before consulting a medical professional.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* 2. Problem Statement */}
        <motion.section {...fadeUp}>
          <SectionHeading icon={Target} title="Problem Statement" number="02" />
          <Card className="glass-card border shadow-sm">
            <CardContent className="p-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Millions of people experience health symptoms daily but lack immediate access to medical expertise for guidance.
                Delayed diagnosis can lead to worsening conditions, unnecessary anxiety, or overcrowded emergency rooms.
              </p>
              <p>
                In <strong className="text-foreground">rural and underserved areas</strong>, the doctor-to-patient ratio is critically low, making
                timely health assessments nearly impossible. Patients often rely on guesswork or unverified online sources.
              </p>
              <p>
                This project addresses the need for a <strong className="text-foreground">fast, accessible, and intelligent</strong> symptom
                analysis tool that can provide preliminary health insights — bridging the gap between symptom onset and professional consultation.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* 3. Solution */}
        <motion.section {...fadeUp}>
          <SectionHeading icon={Sparkles} title="Solution" number="03" />
          <Card className="glass-card border shadow-sm">
            <CardContent className="p-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The system uses a <strong className="text-foreground">trained Decision Tree Classifier</strong> to predict diseases based on
                symptom patterns. The workflow is straightforward:
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li>A comprehensive dataset mapping symptoms to diseases is used for training.</li>
                <li>The machine learning model learns the relationship between symptom combinations and conditions.</li>
                <li>Users select their symptoms through an intuitive web interface.</li>
                <li>The trained model processes the input and predicts the most likely disease.</li>
                <li>Results are displayed with a confidence percentage, helping users understand the prediction strength.</li>
              </ol>
              <p>
                Additionally, the live version of this app integrates <strong className="text-foreground">Google Gemini AI</strong> for
                enhanced, real-time analysis with detailed medical context, specialist recommendations, and urgency assessments.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* 4. Features */}
        <motion.section {...fadeUp}>
          <SectionHeading icon={Layers} title="Features" number="04" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.label} {...stagger} transition={{ delay: i * 0.08 }}>
                <Card className="glass-card border shadow-sm h-full hover:shadow-glow transition-shadow">
                  <CardContent className="p-5 flex items-start gap-3">
                    <div className="p-2 rounded-lg gradient-subtle shrink-0">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{f.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 5. Technology Stack */}
        <motion.section {...fadeUp}>
          <SectionHeading icon={Cpu} title="Technology Stack" number="05" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech, i) => (
              <motion.div key={tech.name} {...stagger} transition={{ delay: i * 0.08 }}>
                <Card className="glass-card border shadow-sm h-full">
                  <CardContent className="p-5">
                    <Badge className={`${tech.color} border mb-3`}>{tech.name}</Badge>
                    <p className="text-sm text-muted-foreground">{tech.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 6. System Workflow */}
        <motion.section {...fadeUp}>
          <SectionHeading icon={Workflow} title="System Workflow" number="06" />
          <Card className="glass-card border shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {workflowSteps.map((step, i) => (
                  <motion.div
                    key={step.label}
                    {...stagger}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-3 shadow-md">
                        <step.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      {i < workflowSteps.length - 1 && (
                        <ArrowRight className="hidden lg:block absolute -right-5 top-4 w-4 h-4 text-primary/40" />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-foreground">{step.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* 7. Machine Learning Model */}
        <motion.section {...fadeUp}>
          <SectionHeading icon={Brain} title="Machine Learning Model" number="07" />
          <Card className="glass-card border shadow-sm">
            <CardContent className="p-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The system uses a <strong className="text-foreground">Decision Tree Classifier</strong> — one of the most interpretable
                machine learning algorithms. It works by learning a series of simple yes/no questions about the symptoms to arrive at a
                diagnosis, similar to how a doctor would narrow down possibilities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {[
                  { title: "How It Works", desc: "The algorithm splits data into branches based on symptom features, creating a tree-like structure of decisions that leads to a disease prediction." },
                  { title: "Why Decision Trees?", desc: "They are easy to interpret, require minimal data preprocessing, and produce transparent, explainable results — crucial for healthcare applications." },
                  { title: "Training Process", desc: "The model is trained on a labeled dataset of symptoms and diseases, learning patterns that generalize to new, unseen symptom combinations." },
                ].map((item) => (
                  <Card key={item.title} className="border bg-muted/30">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-foreground text-sm mb-2">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* 8. Project Architecture */}
        <motion.section {...fadeUp}>
          <SectionHeading icon={Building2} title="Project Architecture" number="08" />
          <div className="space-y-3">
            {architectureLayers.map((layer, i) => (
              <motion.div key={layer.label} {...stagger} transition={{ delay: i * 0.1 }}>
                <Card className={`glass-card border shadow-sm border-l-4 ${layer.accent}`}>
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="p-2.5 rounded-xl gradient-subtle shrink-0">
                      <layer.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{layer.label}</h4>
                      <p className="text-sm text-muted-foreground">{layer.detail}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 9. Real-world Applications */}
        <motion.section {...fadeUp}>
          <SectionHeading icon={Globe} title="Real-world Applications" number="09" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {applications.map((app, i) => (
              <motion.div key={app.label} {...stagger} transition={{ delay: i * 0.1 }}>
                <Card className="glass-card border shadow-sm h-full hover:shadow-glow transition-shadow">
                  <CardContent className="p-5 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg gradient-primary shrink-0">
                        <app.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm">{app.label}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{app.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 10. Future Improvements */}
        <motion.section {...fadeUp}>
          <SectionHeading icon={Rocket} title="Future Improvements" number="10" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {futureImprovements.map((item, i) => (
              <motion.div key={item.label} {...stagger} transition={{ delay: i * 0.06 }}>
                <Card className="glass-card border shadow-sm hover:shadow-glow transition-shadow">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-1.5 rounded-lg gradient-subtle shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 11. Conclusion */}
        <motion.section {...fadeUp}>
          <SectionHeading icon={ShieldCheck} title="Conclusion" number="11" />
          <Card className="shadow-glow border gradient-subtle">
            <CardContent className="p-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The <strong className="text-foreground">AI Symptom Prediction System</strong> demonstrates the powerful potential of
                Artificial Intelligence in the healthcare domain. By combining machine learning with an intuitive interface, this project
                shows how technology can democratize access to health awareness — especially for communities lacking immediate medical resources.
              </p>
              <p>
                While this system is <strong className="text-foreground">not a substitute for professional medical advice</strong>, it serves
                as a valuable first step in empowering individuals to understand their symptoms, make informed decisions, and seek timely
                medical attention when needed.
              </p>
              <Separator className="my-4" />
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Author: Aditya Warji</p>
                  <p className="text-xs text-muted-foreground">KLE College of Engineering and Technology (KLECET)</p>
                </div>
                <Link to="/">
                  <Button className="gradient-primary text-primary-foreground border-0 hover:opacity-90">
                    Try the Predictor <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Disclaimer */}
        <motion.div {...fadeUp} className="text-center text-xs text-muted-foreground pb-8">
          <p>⚠️ This project is for educational and awareness purposes only and should not be used as a substitute for professional medical advice.</p>
        </motion.div>
      </main>
    </div>
  );
};

export default ProjectDescription;
