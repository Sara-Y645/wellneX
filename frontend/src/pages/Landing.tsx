import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import {
  Upload,
  Activity,
  Heart,
  ArrowRight,
  Shield,
  Sparkles,
  FileText,
  BarChart3,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      {/* Hero Section */}
      <section className="container py-20 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary animate-fade-in">
            <Sparkles className="h-4 w-4" />
            Your Personal Health Companion
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-in stagger-1">
            Understand Your Health,{" "}
            <span className="text-primary">Empower Your Wellness</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground animate-fade-in stagger-2">
            Upload your lab reports and get instant, rule-based analysis. Track your health
            metrics, receive wellness guidance, and take control of your preventive care
            journey.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in stagger-3">
            <Link to="/signup">
              <Button variant="hero">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/upload">
              <Button variant="heroOutline">
                <Upload className="mr-2 h-5 w-5" />
                Upload Report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            How WELLNEX Works
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Upload,
                step: "01",
                title: "Upload Your Report",
                description:
                  "Simply upload your lab or scan report in PDF or image format. We'll extract the key details automatically.",
              },
              {
                icon: BarChart3,
                step: "02",
                title: "Rule-Based Analysis",
                description:
                  "Your health values are analyzed against established medical reference ranges to identify any areas of concern.",
              },
              {
                icon: Heart,
                step: "03",
                title: "Health Insights",
                description:
                  "Receive your personalized health score, detailed analysis, and actionable wellness guidance.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-border/50 bg-card p-6 shadow-card transition-all duration-300 hover:shadow-elevated animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -top-4 left-6 rounded-lg bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
                  {item.step}
                </div>
                <div className="mb-4 mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground">
                Your Health Data, Clearly Understood
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                WELLNEX transforms complex lab reports into actionable insights, helping
                you understand what your numbers mean and how to improve.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: FileText,
                    title: "Smart Report Parsing",
                    description: "Automatic extraction of patient details and health values",
                  },
                  {
                    icon: Activity,
                    title: "Comprehensive Analysis",
                    description: "Rule-based evaluation with clear status indicators",
                  },
                  {
                    icon: Shield,
                    title: "Privacy First",
                    description: "Your health data is encrypted and never shared",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4 rounded-xl bg-accent/50 p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-elevated">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Health Score
                  </span>
                  <span className="rounded-full bg-status-good-bg px-3 py-1 text-sm font-semibold text-status-good">
                    Good
                  </span>
                </div>
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-status-good">85</span>
                  <span className="text-lg text-muted-foreground">/100</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Hemoglobin", value: "14.2 g/dL", status: "normal" },
                    { label: "Blood Glucose", value: "98 mg/dL", status: "normal" },
                    { label: "Cholesterol", value: "210 mg/dL", status: "moderate" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-accent/50 p-3"
                    >
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{item.value}</span>
                        <div
                          className={`h-2 w-2 rounded-full ${
                            item.status === "normal" ? "bg-status-good" : "bg-status-moderate"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating decoration */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-status-good/10 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-primary p-8 text-center shadow-elevated md:p-12">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">
            Start Your Health Journey Today
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-primary-foreground/80">
            Join thousands of users who trust WELLNEX for their preventive health insights.
            Upload your first report for free.
          </p>
          <Link to="/signup">
            <Button
              variant="secondary"
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 py-8">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Activity className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">WELLNEX</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 WELLNEX. For wellness support only – not medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
