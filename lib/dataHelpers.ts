export async function getTransportData() {
  return [
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
  ];
}

export async function getMaterialSourcingData() {
  return {
    locally_sourced_percentage: "65",
    imported_percentage: "35",
    certifications_progress: "Working towards FSC certification",
  };
}
