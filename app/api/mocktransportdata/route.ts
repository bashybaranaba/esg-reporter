import { NextResponse } from "next/server";

export async function GET() {
  // Example data
  const data = [
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
      freight_type: "road",s
    },
  ];

  return NextResponse.json(data, { status: 200 });
}
