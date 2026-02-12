import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Activity, Brain, ShieldCheck, AlertTriangle } from "lucide-react";

const SYMPTOMS = [
  "Fever",
  "Cough",
  "Headache",
  "Fatigue",
  "Vomiting",
  "Cold",
  "Chest Pain",
  "Dizziness",
];

// Mock predictions for demo purposes
const MOCK_PREDICTIONS: Record<string, { disease: string; confidence: number }> = {
  "Fever,Cough,Cold": { disease: "Common Flu", confidence: 87 },
  "Fever,Headache,Fatigue": { disease: "Viral Infection", confidence: 79 },
  "Chest Pain,Dizziness": { disease: "Hypertension", confidence: 72 },
  "Vomiting,Fatigue,Dizziness": { disease: "Food Poisoning", confidence: 83 },
  "Fever,Cough,Chest Pain": { disease: "Bronchitis", confidence: 76 },
  "Headache,Dizziness": { disease: "Migraine", confidence: 81 },
};

function getPrediction(symptoms: string[]) {
  const key = symptoms.sort().join(",");
  for (const [k, v] of Object.entries(MOCK_PREDICTIONS)) {
    const mockSymptoms = k.split(",").sort().join(",");
    if (key === mockSymptoms) return v;
  }
  // Fallback for any combination
  if (symptoms.length === 0) return null;
  const fallbacks = [
    { disease: "General Viral Infection", confidence: 65 },
    { disease: "Seasonal Allergy", confidence: 58 },
    { disease: "Mild Flu", confidence: 71 },
  ];
  return fallbacks[symptoms.length % fallbacks.length];
}

const Index = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<{ disease: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);

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
      setResult(getPrediction(selected));
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Activity className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              AI Symptom Prediction System
            </h1>
          </div>
          <p className="text-primary-foreground/80 text-lg">
            AI-powered healthcare decision support tool
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10 space-y-8">
        {/* Symptom Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Select Your Symptoms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SYMPTOMS.map((symptom) => (
                <label
                  key={symptom}
                  className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent has-[button[data-state=checked]]:bg-accent has-[button[data-state=checked]]:border-primary/40"
                >
                  <Checkbox
                    checked={selected.includes(symptom)}
                    onCheckedChange={() => toggle(symptom)}
                  />
                  <span className="text-sm font-medium">{symptom}</span>
                </label>
              ))}
            </div>

            {selected.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {selected.map((s) => (
                  <Badge key={s} variant="secondary" className="bg-accent text-accent-foreground">
                    {s}
                  </Badge>
                ))}
              </div>
            )}

            <Button
              onClick={predict}
              disabled={selected.length === 0 || loading}
              className="mt-6 w-full text-base py-5"
            >
              <Brain className="w-5 h-5 mr-2" />
              {loading ? "Analyzing symptoms…" : "Predict Disease"}
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card className="border-primary/30 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Brain className="w-5 h-5 text-primary" />
                Prediction Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 p-4 rounded-lg bg-accent/50 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Predicted Disease</p>
                  <p className="text-2xl font-bold text-foreground">{result.disease}</p>
                </div>
                <div className="flex-1 p-4 rounded-lg bg-accent/50 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                  <p className="text-2xl font-bold text-primary">{result.confidence}%</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted text-muted-foreground text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>
                  This system provides health awareness guidance only and does not replace
                  professional medical advice. Please consult a qualified healthcare provider for
                  accurate diagnosis and treatment.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6 px-4 text-center text-sm text-muted-foreground">
        <p className="font-medium">Project by Aditya Warji</p>
        <p>KLE College of Engineering and Technology</p>
      </footer>
    </div>
  );
};

export default Index;
