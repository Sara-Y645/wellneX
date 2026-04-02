import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload as UploadIcon,
  User,
  Calendar,
  X,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { LAB_CONFIG } from "@/config/labConfig";
import { evaluateLab } from "@/services/labApi";

export default function Upload() {
  const navigate = useNavigate();

  /* ---------------- State ---------------- */

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [extracted, setExtracted] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
  });

  const [labValues, setLabValues] = useState<Record<string, string>>({});

  /* ---------------- Drag & Drop ---------------- */

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      setFile(droppedFile);

      // Simulate OCR extraction
      setTimeout(() => {
        setExtracted(true);
        setFormData({
          patientName: "John Doe",
          age: "35",
          gender: "male",
        });

        setLabValues({
          hemoglobin: "14.2",
          creatinine: "1.1",
        });
      }, 1500);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    setTimeout(() => {
      setExtracted(true);
      setFormData({
        patientName: "John Doe",
        age: "35",
        gender: "male",
      });
    }, 1500);
  };

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submit clicked");
    console.log("labValues:", labValues);
    console.log("formData:", formData);
    const firstLab = Object.entries(labValues)[0];
    if (!firstLab) return;

    const [parameter, value] = firstLab;

    const result = await evaluateLab({
      parameter,
      value: Number(value),
      age: Number(formData.age),
      gender: formData.gender,
    });

    console.log("Lab evaluation result:", result);

    navigate("/dashboard");
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <div className="container py-12">
        <div className="mx-auto max-w-3xl">

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Upload Your Health Report</h1>
            <p className="mt-2 text-muted-foreground">
              Upload a lab or scan report to get your personalized analysis
            </p>
          </div>

          {/* Upload Area */}
          <div
            className={`mb-8 rounded-2xl border-2 border-dashed p-8 text-center ${
              isDragging
                ? "border-primary bg-primary/5"
                : file
                ? "border-status-good bg-status-good-bg/30"
                : "border-border bg-card"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex items-center justify-center gap-4">
                <CheckCircle2 className="h-7 w-7 text-status-good" />
                <span>{file.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setFile(null);
                    setExtracted(false);
                    setLabValues({});
                  }}
                >
                  <X />
                </Button>
              </div>
            ) : (
              <>
                <UploadIcon className="mx-auto h-8 w-8 text-primary mb-3" />
                <p className="font-medium">Drop your report here</p>
                <p className="text-sm text-muted-foreground mb-4">
                  PDF, JPG, PNG
                </p>
                <input
                  type="file"
                  hidden
                  id="file-upload"
                  onChange={handleFileSelect}
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  Browse Files
                </Button>
              </>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="rounded-2xl bg-card p-6 shadow-card">

              {/* Patient Info */}
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <User className="h-5 w-5" />
                Patient Information
              </h2>

              <div className="grid gap-4 sm:grid-cols-3 mb-6">
                <Input
                  placeholder="Name"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({ ...formData, patientName: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                />
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData({ ...formData, gender: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Labs */}
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Calendar className="h-5 w-5" />
                Health Values
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 mb-6">
                {LAB_CONFIG.map((lab) => (
                  <div key={lab.key}>
                    <Label>
                      {lab.label} ({lab.unit})
                    </Label>
                    <Input
                      type="number"
                      value={labValues[lab.key] || ""}
                      onChange={(e) =>
                        setLabValues({
                          ...labValues,
                          [lab.key]: e.target.value,
                        })
                      }
                      placeholder={`Enter ${lab.label}`}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Analyze Report
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
}