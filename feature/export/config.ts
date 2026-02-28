export const youthPopulationExportConfig = {
  columns: [
    { key: "lga", header: "LGA", required: true },
    { key: "year", header: "Year", required: true },
    { key: "totalPopulation", header: "Total Population", required: true },
    { key: "youthPopulation", header: "Youth Population", required: true },
    {
      key: "youthShare",
      header: "Youth Share (%)",
      //   transform: (value) => Number(value).toFixed(2),
    },
    { key: "maleYouth", header: "Male Youth" },
    { key: "femaleYouth", header: "Female Youth" },
    { key: "urbanYouth", header: "Urban Youth" },
    { key: "ruralYouth", header: "Rural Youth" },
  ] as const,

  excludeFields: ["id", "version", "created_at", "updated_at"],
};
