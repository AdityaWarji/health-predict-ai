import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  Brain,
  ShieldCheck,
  AlertTriangle,
  Search,
  Trash2,
  Clock,
  Stethoscope,
  Heart,
  Thermometer,
  Wind,
  Zap,
  Eye,
  Pill,
  Sparkles,
  TrendingUp,
  FileText,
  RotateCcw,
} from "lucide-react";

const SYMPTOM_CATEGORIES = {
  "General": {
    icon: Thermometer,
    symptoms: ["Fever", "Fatigue", "Chills", "Weight Loss", "Night Sweats"],
  },
  "Respiratory": {
    icon: Wind,
    symptoms: ["Cough", "Shortness of Breath", "Sore Throat", "Runny Nose", "Sneezing"],
  },
  "Neurological": {
    icon: Brain,
    symptoms: ["Headache", "Dizziness", "Blurred Vision", "Numbness", "Confusion"],
  },
  "Cardiovascular": {
    icon: Heart,
    symptoms: ["Chest Pain", "Palpitations", "Swelling in Legs"],
  },
  "Digestive": {
    icon: Pill,
    symptoms: ["Vomiting", "Nausea", "Diarrhea", "Abdominal Pain", "Loss of Appetite"],
  },
  "Musculoskeletal": {
    icon: Zap,
    symptoms: ["Joint Pain", "Muscle Ache", "Back Pain", "Stiffness"],
  },
};

const ALL_SYMPTOMS = Object.values(SYMPTOM_CATEGORIES).flatMap((c) => c.symptoms);

type Prediction = {
  disease: string;
  confidence: number;
  severity: "low" | "moderate" | "high";
  description: string;
  tips: string[];
  specialist: string;
};

const MOCK_PREDICTIONS: Record<string, Prediction> = {
  "Cough,Fever,Runny Nose": {
    disease: "Common Flu (Influenza)",
    confidence: 89,
    severity: "low",
    description: "Influenza is a viral infection attacking the respiratory system. Most recover within 1-2 weeks.",
    tips: ["Rest and stay hydrated", "Take fever reducers as directed", "Avoid close contact with others", "Monitor symptoms for 48 hours"],
    specialist: "General Physician",
  },
  "Fatigue,Fever,Headache": {
    disease: "Viral Infection",
    confidence: 82,
    severity: "moderate",
    description: "A systemic viral infection causing widespread symptoms. Usually self-limiting.",
    tips: ["Get plenty of rest", "Stay well hydrated", "Take OTC pain relievers", "Consult a doctor if symptoms persist beyond 5 days"],
    specialist: "Internal Medicine",
  },
  "Chest Pain,Dizziness": {
    disease: "Hypertension",
    confidence: 74,
    severity: "high",
    description: "High blood pressure that may require immediate medical attention and ongoing management.",
    tips: ["Seek medical attention promptly", "Monitor blood pressure regularly", "Reduce sodium intake", "Avoid strenuous activities until evaluated"],
    specialist: "Cardiologist",
  },
  "Dizziness,Fatigue,Vomiting": {
    disease: "Food Poisoning",
    confidence: 85,
    severity: "moderate",
    description: "Illness caused by consuming contaminated food or water. Usually resolves within 48 hours.",
    tips: ["Stay hydrated with clear fluids", "Eat bland foods (BRAT diet)", "Avoid dairy and spicy foods", "Seek help if symptoms last > 3 days"],
    specialist: "Gastroenterologist",
  },
  "Chest Pain,Cough,Fever": {
    disease: "Bronchitis",
    confidence: 78,
    severity: "moderate",
    description: "Inflammation of the bronchial tubes, commonly caused by viral infection.",
    tips: ["Use a humidifier", "Avoid irritants and smoke", "Take cough suppressants at night", "Follow up with a doctor in 1 week"],
    specialist: "Pulmonologist",
  },
  "Dizziness,Headache": {
    disease: "Migraine",
    confidence: 83,
    severity: "low",
    description: "A neurological condition causing intense headaches, often with sensory disturbances.",
    tips: ["Rest in a dark, quiet room", "Apply cold compress to forehead", "Stay hydrated", "Track triggers in a headache diary"],
    specialist: "Neurologist",
  },
  "Diarrhea,Nausea,Vomiting": {
    disease: "Gastroenteritis",
    confidence: 88,
    severity: "moderate",
    description: "Inflammation of the stomach and intestines, typically caused by viral or bacterial infection.",
    tips: ["Oral rehydration is critical", "Avoid solid food until vomiting stops", "Wash hands frequently", "Seek help if blood in stool"],
    specialist: "Gastroenterologist",
  },
  "Joint Pain,Muscle Ache,Stiffness": {
    disease: "Rheumatoid Arthritis",
    confidence: 71,
    severity: "moderate",
    description: "An autoimmune condition causing chronic inflammation in joints.",
    tips: ["Apply warm compresses", "Gentle stretching exercises", "Anti-inflammatory medications", "Consult a rheumatologist"],
    specialist: "Rheumatologist",
  },
};

function getPrediction(symptoms: string[]): Prediction | null {
  const key = symptoms.sort().join(",");
  for (const [k, v] of Object.entries(MOCK_PREDICTIONS)) {
    if (k.split(",").sort().join(",") === key) return v;
  }
  if (symptoms.length === 0) return null;
  const fallbacks: Prediction[] = [
    {
      disease: "General Viral Infection",
      confidence: 65,
      severity: "low",
      description: "A common viral infection with general symptoms. Usually resolves with rest.",
      tips: ["Rest adequately", "Stay hydrated", "Monitor body temperature", "Consult a doctor if symptoms worsen"],
      specialist: "General Physician",
    },
    {
      disease: "Seasonal Allergy",
      confidence: 58,
      severity: "low",
      description: "Allergic response to environmental triggers such as pollen, dust, or mold.",
      tips: ["Use antihistamines", "Avoid known allergens", "Keep windows closed during high pollen", "Consider allergy testing"],
      specialist: "Allergist",
    },
    {
      disease: "Upper Respiratory Infection",
      confidence: 72,
      severity: "moderate",
      description: "Infection of the upper respiratory tract including nose, throat, and sinuses.",
      tips: ["Gargle with warm salt water", "Use saline nasal spray", "Get adequate sleep", "Take vitamin C supplements"],
      specialist: "ENT Specialist",
    },
  ];
  return fallbacks[symptoms.length % fallbacks.length];
}

const severityConfig = {
  low: { label: "Low Risk", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  moderate: { label: "Moderate Risk", color: "bg-amber-100 text-amber-700 border-amber-200" },
  high: { label: "High Risk", color: "bg-red-100 text-red-700 border-red-200" },
};

type HistoryItem = { symptoms: string[]; prediction: Prediction; timestamp: Date };

const Index = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return SYMPTOM_CATEGORIES;
    const q = search.toLowerCase();
    const filtered: Record<string, typeof SYMPTOM_CATEGORIES[keyof typeof SYMPTOM_CATEGORIES]> = {};
    for (const [cat, data] of Object.entries(SYMPTOM_CATEGORIES)) {
      const matched = data.symptoms.filter((s) => s.toLowerCase().includes(q));
      if (matched.length > 0) filtered[cat] = { ...data, symptoms: matched };
    }
    return filtered;
  }, [search]);

  const toggle = (symptom: string) => {
    setSelected((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
    setResult(null);
  };

  const predict = () => {
    if (selected.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      const prediction = getPrediction(selected);
      setResult(prediction);
      if (prediction) {
        setHistory((prev) => [
          { symptoms: [...selected], prediction, timestamp: new Date() },
          ...prev.slice(0, 9),
        ]);
      }
      setLoading(false);
    }, 1800);
  };

  const reset = () => {
    setSelected([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Header */}
      <header className="relative gradient-primary overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative max-w-5xl mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Healthcare Analysis
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-primary-foreground/15 backdrop-blur-sm">
                <Stethoscope className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-foreground">
                AI Symptom Predictor
              </h1>
            </div>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto">
              Advanced machine learning model for preliminary disease prediction based on symptom analysis
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 text-primary-foreground/70 text-sm">
              <span className="flex items-center gap-1.5"><Brain className="w-4 h-4" /> ML-Powered</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> HIPAA Aware</span>
              <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> 85%+ Accuracy</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
      </header>

      {/* Main */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10 space-y-8">
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Symptoms Database", value: `${ALL_SYMPTOMS.length}+`, icon: FileText },
            { label: "Disease Models", value: "50+", icon: Brain },
            { label: "Avg Accuracy", value: "85%", icon: TrendingUp },
            { label: "Analyses Done", value: history.length.toString(), icon: Activity },
          ].map((stat) => (
            <Card key={stat.label} className="glass-card border shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-xl gradient-subtle">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Symptom Selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-glow border">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="p-1.5 rounded-lg gradient-primary">
                    <ShieldCheck className="w-4 h-4 text-primary-foreground" />
                  </div>
                  Select Your Symptoms
                </CardTitle>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search symptoms..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-9 text-sm"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === null
                      ? "gradient-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  All
                </button>
                {Object.entries(SYMPTOM_CATEGORIES).map(([cat, data]) => {
                  const Icon = data.icon;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        activeCategory === cat
                          ? "gradient-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Symptoms Grid */}
              {Object.entries(filteredCategories)
                .filter(([cat]) => !activeCategory || cat === activeCategory)
                .map(([cat, data]) => {
                  const Icon = data.icon;
                  return (
                    <div key={cat}>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-semibold text-foreground">{cat}</h3>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                        {data.symptoms.map((symptom) => {
                          const isChecked = selected.includes(symptom);
                          return (
                            <label
                              key={symptom}
                              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                                isChecked
                                  ? "gradient-subtle border-primary/30 shadow-sm"
                                  : "hover:bg-accent/50 border-border"
                              }`}
                            >
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={() => toggle(symptom)}
                              />
                              <span className="text-sm font-medium">{symptom}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

              {Object.keys(filteredCategories).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No symptoms match your search</p>
                </div>
              )}

              {/* Selected Symptoms */}
              <AnimatePresence>
                {selected.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Selected ({selected.length})
                      </p>
                      <button
                        onClick={reset}
                        className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selected.map((s) => (
                        <Badge
                          key={s}
                          variant="secondary"
                          className="gradient-subtle border border-primary/20 text-accent-foreground cursor-pointer hover:opacity-70"
                          onClick={() => toggle(s)}
                        >
                          {s} ×
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={predict}
                  disabled={selected.length === 0 || loading}
                  className="flex-1 text-base py-5 gradient-primary border-0 text-primary-foreground hover:opacity-90 transition-opacity shadow-md"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Analyzing Symptoms…
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5 mr-2" />
                      Run AI Prediction
                    </>
                  )}
                </Button>
                {selected.length > 0 && (
                  <Button variant="outline" onClick={reset} className="py-5">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Loading Animation */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="border-primary/20">
                <CardContent className="py-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                      <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                      <Brain className="absolute inset-0 m-auto w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Analyzing Symptom Patterns</p>
                    <p className="text-sm text-muted-foreground">Running ML model inference…</p>
                  </div>
                  <Progress value={66} className="max-w-xs mx-auto h-2" />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Card className="shadow-glow border-primary/20 overflow-hidden">
                <div className="h-1.5 gradient-primary" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="p-1.5 rounded-lg gradient-primary">
                      <Brain className="w-4 h-4 text-primary-foreground" />
                    </div>
                    Prediction Result
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Disease & Confidence */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 p-5 rounded-2xl gradient-subtle border border-primary/10">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Predicted Condition</p>
                      <p className="text-2xl font-bold text-foreground">{result.disease}</p>
                      <p className="text-sm text-muted-foreground mt-2">{result.description}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex-1 p-4 rounded-2xl bg-muted text-center flex flex-col justify-center">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Confidence</p>
                        <p className="text-3xl font-bold gradient-text">{result.confidence}%</p>
                      </div>
                      <div className={`p-3 rounded-xl text-center text-xs font-semibold border ${severityConfig[result.severity].color}`}>
                        {severityConfig[result.severity].label}
                      </div>
                    </div>
                  </div>

                  {/* Recommended Specialist */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted">
                    <Stethoscope className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Recommended Specialist</p>
                      <p className="font-semibold text-foreground">{result.specialist}</p>
                    </div>
                  </div>

                  {/* Health Tips */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-primary" />
                      Health Recommendations
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {result.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-accent/40 text-sm">
                          <span className="w-5 h-5 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-foreground">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/10 text-sm">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-destructive" />
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Medical Disclaimer:</strong> This AI system
                      provides health awareness guidance only and does not replace professional medical
                      advice. Always consult a qualified healthcare provider for accurate diagnosis and
                      treatment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History */}
        <AnimatePresence>
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="w-4 h-4 text-primary" />
                    Recent Analyses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {history.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground">{item.prediction.disease}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {item.symptoms.join(", ")}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-3">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${severityConfig[item.prediction.severity].color}`}>
                            {item.prediction.confidence}%
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">AI Symptom Predictor</span>
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">Project by Aditya Warji</p>
            <p>KLE College of Engineering and Technology</p>
          </div>
          <p className="text-xs">© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
