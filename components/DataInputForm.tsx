import React, { useState } from "react";

const DataInputForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [executiveSummary, setExecutiveSummary] = useState("");
  const [environmentalData, setEnvironmentalData] = useState({
    energyTransition: "",
    ghgTargets: "",
    wasteRoadmap: "",
    materialCertProgress: "",
  });
  // Similarly for Social and Governance fields...

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      executiveSummary,
      environmentalData,
      // ...other sections
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Executive Summary</h2>
      <textarea
        value={executiveSummary}
        onChange={(e) => setExecutiveSummary(e.target.value)}
      />

      <h2>Environmental</h2>
      <label>Steps toward adopting green energy:</label>
      <input
        value={environmentalData.energyTransition}
        onChange={(e) =>
          setEnvironmentalData({
            ...environmentalData,
            energyTransition: e.target.value,
          })
        }
      />
      <label>GHG Reduction Targets & Progress:</label>
      <input
        value={environmentalData.ghgTargets}
        onChange={(e) =>
          setEnvironmentalData({
            ...environmentalData,
            ghgTargets: e.target.value,
          })
        }
      />
      {/* Add other fields similarly */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default DataInputForm;
