"use client";

import { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

// Importing shadcn/ui components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

interface TransportData {
  date: string;
  distance_km: number;
  co2e_kg: number;
  freight_type: string;
}

interface MaterialsData {
  locally_sourced_percentage: number;
  imported_percentage: number;
  certifications_progress: string;
}

interface ERPData {
  transportation?: TransportData[];
  materials?: MaterialsData;
}

interface ESGReport {
  "Executive Summary": string;
  Environmental: {
    "Energy Consumption & Transition": string;
    "Greenhouse Gas (GHG) Emissions": string;
    "Waste Management": string;
    "Material Sourcing": string;
  };
  Social: {
    "Workforce Engagement": string;
    "Community Impact": string;
    "Product Impact": string;
  };
  Governance: {
    "Ethical Standards": string;
    Compliance: string;
    "Stakeholder Engagement": string;
  };
  "Data and Metrics": string;
  "Future Outlook": string;
  erpData?: ERPData;
}

export default function ESGReportPage() {
  const [report, setReport] = useState<ESGReport | null>(null);

  useEffect(() => {
    let parsedReport: ESGReport | null = null;
    const storedReport = localStorage.getItem("esgReport");
    if (storedReport) {
      try {
        parsedReport = JSON.parse(storedReport);
      } catch (error) {
        console.error("Error parsing report:", error);
      }
    }

    // If no data in localStorage or failed to parse, use dummy data
    if (!parsedReport) {
      parsedReport = {
        "Executive Summary":
          "Our company is committed to sustainability and aims to reduce GHG emissions by 50% by 2030.",
        Environmental: {
          "Energy Consumption & Transition":
            "Installed solar panels and moved 20% of energy sourcing to renewables.",
          "Greenhouse Gas (GHG) Emissions":
            "Current emissions: 1000 tons CO2e/year, goal: 500 tons by 2030.",
          "Waste Management":
            "Recycling 40% of waste, aiming for 60% next year.",
          "Material Sourcing": "65% locally sourced materials, 35% imported.",
        },
        Social: {
          "Workforce Engagement":
            "Annual employee surveys show 85% satisfaction.",
          "Community Impact":
            "Donated furniture to local schools and sponsored community events.",
          "Product Impact":
            "All products are designed with longevity and recyclability in mind.",
        },
        Governance: {
          "Ethical Standards":
            "Strong anti-corruption and fair trade policies in place.",
          Compliance:
            "Adhering to ISO14001 standards and local environmental regulations.",
          "Stakeholder Engagement":
            "Regular sustainability reports shared with stakeholders.",
        },
        "Data and Metrics": "See charts below for year-on-year comparisons.",
        "Future Outlook":
          "Plan to achieve net-zero emissions by 2040, increase renewable energy to 80%.",
        erpData: {
          transportation: [
            {
              date: "2023-06-06",
              distance_km: 10,
              co2e_kg: 10.76,
              freight_type: "road",
            },
            {
              date: "2023-06-07",
              distance_km: 10,
              co2e_kg: 3.04,
              freight_type: "road",
            },
          ],
          materials: {
            locally_sourced_percentage: 65,
            imported_percentage: 35,
            certifications_progress: "Working towards FSC certification",
          },
        },
      };
    }

    // Ensure we have ERP data even if missing
    if (!parsedReport.erpData) {
      parsedReport.erpData = {
        transportation: [
          {
            date: "2023-06-06",
            distance_km: 10,
            co2e_kg: 10.76,
            freight_type: "road",
          },
        ],
        materials: {
          locally_sourced_percentage: 40,
          imported_percentage: 60,
          certifications_progress: "No certifications yet",
        },
      };
    }

    setReport(parsedReport);
  }, []);

  if (!report) return <p className="p-4">Loading report...</p>;

  const { erpData } = report;

  // Always ensure we have transportation and materials data
  const transportationData = erpData?.transportation || [
    { date: "2023-01-01", distance_km: 20, co2e_kg: 5, freight_type: "road" },
  ];

  const materialsData = erpData?.materials || {
    locally_sourced_percentage: 50,
    imported_percentage: 50,
    certifications_progress: "No certifications yet",
  };

  // Prepare data for Pie Chart (material sourcing)
  const materialPieData = {
    labels: ["Locally Sourced", "Imported"],
    datasets: [
      {
        data: [
          materialsData.locally_sourced_percentage,
          materialsData.imported_percentage,
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  // Prepare data for a line chart from transportation data (CO2e over time)
  const transportDates = transportationData.map((t) => t.date);
  const transportCO2 = transportationData.map((t) => t.co2e_kg);

  const co2LineData = {
    labels: transportDates,
    datasets: [
      {
        label: "CO₂e (kg)",
        data: transportCO2,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">ESG Report</h1>

      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{report["Executive Summary"]}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="environmental" className="w-full">
        <TabsList>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
        </TabsList>

        <TabsContent value="environmental">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Environmental</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Energy Consumption &amp; Transition:</strong>{" "}
                {report.Environmental["Energy Consumption & Transition"]}
              </p>
              <p>
                <strong>Greenhouse Gas (GHG) Emissions:</strong>{" "}
                {report.Environmental["Greenhouse Gas (GHG) Emissions"]}
              </p>
              <p>
                <strong>Waste Management:</strong>{" "}
                {report.Environmental["Waste Management"]}
              </p>
              <p>
                <strong>Material Sourcing:</strong>{" "}
                {report.Environmental["Material Sourcing"]}
              </p>
              <div className="my-6">
                <h3 className="text-xl font-semibold mb-2">
                  Material Sourcing Breakdown
                </h3>
                <div className="w-64">
                  <Pie data={materialPieData} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Social</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Workforce Engagement:</strong>{" "}
                {report.Social["Workforce Engagement"]}
              </p>
              <p>
                <strong>Community Impact:</strong>{" "}
                {report.Social["Community Impact"]}
              </p>
              <p>
                <strong>Product Impact:</strong>{" "}
                {report.Social["Product Impact"]}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Governance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Ethical Standards:</strong>{" "}
                {report.Governance["Ethical Standards"]}
              </p>
              <p>
                <strong>Compliance:</strong> {report.Governance["Compliance"]}
              </p>
              <p>
                <strong>Stakeholder Engagement:</strong>{" "}
                {report.Governance["Stakeholder Engagement"]}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator />

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="data-and-metrics">
          <AccordionTrigger>Data and Metrics</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Data and Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{report["Data and Metrics"]}</p>
                <div className="my-6">
                  <h3 className="text-xl font-semibold mb-2">
                    CO₂e Emissions Over Time (Transport)
                  </h3>
                  <div className="w-96">
                    <Line data={co2LineData} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="future-outlook">
          <AccordionTrigger>Future Outlook</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Future Outlook</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{report["Future Outlook"]}</p>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="erp-data">
          <AccordionTrigger>ERP Data</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>ERP Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Transportation</h3>
                  {transportationData.map((item, index) => (
                    <div key={index} className="border p-2 rounded mb-2">
                      <p>
                        <strong>Date:</strong> {item.date}
                      </p>
                      <p>
                        <strong>Distance:</strong> {item.distance_km} km
                      </p>
                      <p>
                        <strong>CO₂e:</strong> {item.co2e_kg} kg
                      </p>
                      <p>
                        <strong>Freight Type:</strong> {item.freight_type}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Materials</h3>
                  <p>
                    <strong>Locally Sourced:</strong>{" "}
                    {materialsData.locally_sourced_percentage}%
                  </p>
                  <p>
                    <strong>Imported:</strong>{" "}
                    {materialsData.imported_percentage}%
                  </p>
                  <p>
                    <strong>Certifications Progress:</strong>{" "}
                    {materialsData.certifications_progress}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Raw ERP Data</h3>
                  <pre className="bg-gray-100 p-2 rounded">
                    {JSON.stringify(erpData, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
