import { Header } from "@/components/layout/Header";
import { HealthScoreCard } from "@/components/cards/HealthScoreCard";
import { AnalysisCard } from "@/components/cards/AnalysisCard";
import { WellnessCard } from "@/components/cards/WellnessCard";
import { AlertBanner } from "@/components/cards/AlertBanner";
import { TrendChart } from "@/components/charts/TrendChart";
import { Button } from "@/components/ui/button";
import { Stethoscope, User, Calendar, Activity } from "lucide-react";

// Sample data
const patientInfo = {
  name: "John Doe",
  age: 35,
  gender: "Male",
  lastReport: "January 10, 2026",
};

const labResults = [
  {
    parameter: "Hemoglobin",
    value: 14.2,
    unit: "g/dL",
    status: "normal" as const,
    referenceRange: "13.5-17.5 g/dL",
    icon: "blood" as const,
  },
  {
    parameter: "Blood Glucose",
    value: 98,
    unit: "mg/dL",
    status: "normal" as const,
    referenceRange: "70-100 mg/dL",
    icon: "heart" as const,
  },
  {
    parameter: "Total Cholesterol",
    value: 210,
    unit: "mg/dL",
    status: "moderate" as const,
    referenceRange: "<200 mg/dL",
    icon: "activity" as const,
  },
  {
    parameter: "HDL Cholesterol",
    value: 45,
    unit: "mg/dL",
    status: "low" as const,
    referenceRange: ">40 mg/dL",
    icon: "beaker" as const,
  },
];

const wellnessTips = [
  {
    icon: "food" as const,
    title: "Heart-Healthy Diet",
    description:
      "Include more omega-3 rich foods like salmon, walnuts, and flaxseeds to help improve your cholesterol levels.",
  },
  {
    icon: "exercise" as const,
    title: "Regular Exercise",
    description:
      "Aim for 30 minutes of moderate cardio 5 days a week to boost HDL (good) cholesterol.",
  },
  {
    icon: "sleep" as const,
    title: "Quality Sleep",
    description:
      "7-9 hours of sleep supports metabolic health and helps regulate cholesterol production.",
  },
];

const trendData = [
  { date: "Sep", value: 225 },
  { date: "Oct", value: 218 },
  { date: "Nov", value: 215 },
  { date: "Dec", value: 212 },
  { date: "Jan", value: 210 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Patient Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <User className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Welcome, {patientInfo.name}
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{patientInfo.age} years</span>
                <span>•</span>
                <span>{patientInfo.gender}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Last report: {patientInfo.lastReport}
                </span>
              </div>
            </div>
          </div>
          <Button>
            <Activity className="mr-2 h-4 w-4" />
            Upload New Report
          </Button>
        </div>

        {/* Alert Banner */}
        <div className="mb-6 animate-fade-in stagger-1">
          <AlertBanner
            type="warning"
            title="Attention Recommended"
            message="Your cholesterol levels are slightly elevated. Consider dietary adjustments and regular exercise."
            actionLabel="View recommendations"
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Health Score & Analysis */}
          <div className="space-y-6 lg:col-span-2">
            {/* Health Score */}
            <div className="animate-fade-in stagger-2">
              <HealthScoreCard score={85} status="good" trend="up" />
            </div>

            {/* Analysis Cards */}
            <div className="animate-fade-in stagger-3">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Activity className="h-5 w-5 text-primary" />
                Lab Results Analysis
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {labResults.map((result, index) => (
                  <AnalysisCard
                    key={index}
                    parameter={result.parameter}
                    value={result.value}
                    unit={result.unit}
                    status={result.status}
                    referenceRange={result.referenceRange}
                    icon={result.icon}
                  />
                ))}
              </div>
            </div>

            {/* Trend Chart */}
            <div className="animate-fade-in stagger-4">
              <TrendChart
                data={trendData}
                parameter="Total Cholesterol"
                unit="mg/dL"
              />
            </div>
          </div>

          {/* Right Column - Wellness & Doctor */}
          <div className="space-y-6">
            {/* Wellness Card */}
            <div className="animate-fade-in stagger-3">
              <WellnessCard tips={wellnessTips} />
            </div>

            {/* Doctor Support */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-card animate-fade-in stagger-4">
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-lg bg-status-low/10 p-2">
                  <Stethoscope className="h-5 w-5 text-status-low" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Need Medical Advice?
                </h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                While WELLNEX provides wellness guidance, certain findings may require
                professional medical consultation.
              </p>
              <Button variant="outline" className="w-full">
                <Stethoscope className="mr-2 h-4 w-4" />
                Find a Doctor
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="rounded-xl bg-muted/50 p-4 animate-fade-in stagger-5">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold">Important:</span> WELLNEX uses
                rule-based analysis for wellness insights only. This is not a medical
                diagnosis. Always consult healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


