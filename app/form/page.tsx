"use client";
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// shadcn/ui components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

export default function ESGInputFormPage() {
  const router = useRouter();

  const [executiveSummary, setExecutiveSummary] = useState("");
  const [energyTransition, setEnergyTransition] = useState("");
  const [ghgTargets, setGhgTargets] = useState("");
  const [wasteRoadmap, setWasteRoadmap] = useState("");
  const [materialCertProgress, setMaterialCertProgress] = useState("");

  const [communityImpact, setCommunityImpact] = useState("");
  const [productImpact, setProductImpact] = useState("");
  const [ethicalStandards, setEthicalStandards] = useState("");
  const [compliance, setCompliance] = useState("");
  const [stakeholderEngagement, setStakeholderEngagement] = useState("");
  const [futureOutlook, setFutureOutlook] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Construct manualData based on the ESG structure
    const manualData = {
      "Executive Summary": executiveSummary,
      Environmental: {
        "Energy Consumption & Transition": energyTransition,
        "Greenhouse Gas (GHG) Emissions": ghgTargets,
        "Waste Management": wasteRoadmap,
        "Material Sourcing": materialCertProgress,
      },
      Social: {
        "Workforce Engagement": "No data (example)",
        "Community Impact": communityImpact,
        "Product Impact": productImpact,
      },
      Governance: {
        "Ethical Standards": ethicalStandards,
        Compliance: compliance,
        "Stakeholder Engagement": stakeholderEngagement,
      },
      "Data and Metrics": "No manual data provided here",
      "Future Outlook": futureOutlook,
    };

    // In a real scenario, fetch ERP data from your endpoints or from the backend.
    const transportRes = await fetch("/api/mocktransportdata");
    const transportation = await transportRes.json();
    const materialsRes = await fetch("/api/mockmaterialsdata");
    const materials = await materialsRes.json();

    const erpData = {
      transportation,
      materials,
    };

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ manualData, erpData }),
    });

    const reportJSON = await res.json();
    setLoading(false);

    // Store the report in localStorage to use it in the report page
    window.localStorage.setItem("esgReport", JSON.stringify(reportJSON));
    router.push("/report");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="mb-8  text-center">
        <h1 className="text-3xl font-bold">ESG Data Input</h1>
        <p className="text-gray-600 mt-2">
          Provide the necessary information to generate your ESG report.
        </p>
      </header>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Enter ESG Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="executiveSummary">Executive Summary</Label>
              <Textarea
                id="executiveSummary"
                value={executiveSummary}
                onChange={(e) => setExecutiveSummary(e.target.value)}
                placeholder="Describe the company's sustainability goals and achievements"
              />
            </div>

            <div>
              <Label htmlFor="energyTransition">
                Steps toward adopting green energy
              </Label>
              <Input
                id="energyTransition"
                value={energyTransition}
                onChange={(e) => setEnergyTransition(e.target.value)}
                placeholder="e.g., Installing solar panels, transitioning to renewable suppliers"
              />
            </div>

            <div>
              <Label htmlFor="ghgTargets">
                GHG Reduction Targets & Progress
              </Label>
              <Input
                id="ghgTargets"
                value={ghgTargets}
                onChange={(e) => setGhgTargets(e.target.value)}
                placeholder="e.g., Reduce GHG emissions by 50% by 2030"
              />
            </div>

            <div>
              <Label htmlFor="wasteRoadmap">Waste Management Roadmap</Label>
              <Textarea
                id="wasteRoadmap"
                value={wasteRoadmap}
                onChange={(e) => setWasteRoadmap(e.target.value)}
                placeholder="Describe your plan to reduce, reuse, and recycle waste"
              />
            </div>

            <div>
              <Label htmlFor="materialCertProgress">
                Material Sourcing & Certifications
              </Label>
              <Input
                id="materialCertProgress"
                value={materialCertProgress}
                onChange={(e) => setMaterialCertProgress(e.target.value)}
                placeholder="e.g., Progress towards FSC certification"
              />
            </div>

            <div>
              <Label htmlFor="communityImpact">Community Impact</Label>
              <Textarea
                id="communityImpact"
                value={communityImpact}
                onChange={(e) => setCommunityImpact(e.target.value)}
                placeholder="Describe contributions to local communities or partnerships"
              />
            </div>

            <div>
              <Label htmlFor="productImpact">Product Impact</Label>
              <Textarea
                id="productImpact"
                value={productImpact}
                onChange={(e) => setProductImpact(e.target.value)}
                placeholder="Describe sustainable and ethical production practices, customer satisfaction metrics"
              />
            </div>

            <div>
              <Label htmlFor="ethicalStandards">Ethical Standards</Label>
              <Input
                id="ethicalStandards"
                value={ethicalStandards}
                onChange={(e) => setEthicalStandards(e.target.value)}
                placeholder="e.g., Anti-corruption policies, fair business practices"
              />
            </div>

            <div>
              <Label htmlFor="compliance">Compliance</Label>
              <Input
                id="compliance"
                value={compliance}
                onChange={(e) => setCompliance(e.target.value)}
                placeholder="e.g., Adherence to ISO14001"
              />
            </div>

            <div>
              <Label htmlFor="stakeholderEngagement">
                Stakeholder Engagement
              </Label>
              <Input
                id="stakeholderEngagement"
                value={stakeholderEngagement}
                onChange={(e) => setStakeholderEngagement(e.target.value)}
                placeholder="e.g., Transparent reporting, supplier engagement"
              />
            </div>

            <div>
              <Label htmlFor="futureOutlook">Future Outlook</Label>
              <Textarea
                id="futureOutlook"
                value={futureOutlook}
                onChange={(e) => setFutureOutlook(e.target.value)}
                placeholder="Describe long-term sustainability goals and visions"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <p>Generating..</p>
                    <Loader2Icon className="w-4 h-4 ml-1 animate-spin" />
                  </>
                ) : (
                  "Generate ESG Report"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
