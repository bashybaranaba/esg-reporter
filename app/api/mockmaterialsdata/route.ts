import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    locally_sourced_percentage: 65,
    imported_percentage: 35,
    certifications_progress: "Working towards FSC",
  };

  return NextResponse.json(data, { status: 200 });
}
