// app/api/generateReport/route.ts

import { NextResponse } from "next/server";
import OpenAI from "openai";

const API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: API_KEY,
});

export async function POST(request: Request) {
  try {
    const { manualData, erpData } = await request.json();

    const prompt = `
    You are an assistant that produces a JSON-formatted ESG report. Use the provided data (manual and ERP-derived) to generate a comprehensive ESG report. The final JSON should include all the major sections (Executive Summary, Environmental, Social, Governance, Data and Metrics, Future Outlook) as described below.

    Structure of the ESG Report:
    {
      "Executive Summary": "<string>",
      "Environmental": {
        "Energy Consumption & Transition": "<string>",
        "Greenhouse Gas (GHG) Emissions": "<string>",
        "Waste Management": "<string>",
        "Material Sourcing": "<string>"
      },
      "Social": {
        "Workforce Engagement": "<string>",
        "Community Impact": "<string>",
        "Product Impact": "<string>"
      },
      "Governance": {
        "Ethical Standards": "<string>",
        "Compliance": "<string>",
        "Stakeholder Engagement": "<string>"
      },
      "Data and Metrics": "<string>",
      "Future Outlook": "<string>"
    }

    Incorporate the provided ERP data (transport distances, CO₂e, locally sourced materials percentage, progress toward certifications) into the relevant sections. Mention charts or diagrams that could represent these metrics. For example, show year-on-year comparisons or a pie chart for material sourcing breakdown.

    Manual Data:
    ${JSON.stringify(manualData)}

    ERP Data:
    ${JSON.stringify(erpData)}

    Produce only valid JSON as the final answer.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    const reportJSON = response.choices[0].message?.content ?? "{}";
    const parsedData = JSON.parse(reportJSON);

    return NextResponse.json(parsedData, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
