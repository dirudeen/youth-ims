const DEMO_USERS = [
  {
    id: "demo-admin",
    email: "admin@doys.gov.gm",
    role: "admin" as const,
    name: "System Administrator",
    full_name: "System Administrator",
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-viewer",
    email: "viewer@doys.gov.gm",
    role: "viewer" as const,
    name: "Viewer",
    full_name: "Viewer",
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-dataentry",
    email: "dataentry@doys.gov.gm",
    role: "data_entry" as const,
    name: "Data Entry",
    full_name: "Data Entry",
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-smanneh",
    email: "smanneh@doys.gov.gm",
    role: "viewer" as const,
    name: "Sainey Manneh",
    full_name: "Sainey Manneh",
    created_at: new Date().toISOString(),
  },
];

const youthPopulationByLGA = [
  { name: "Banjul", value: 10817 },
  { name: "Kanifing", value: 156992 },
  { name: "Brikama", value: 459860 },
  { name: "Mansakonko", value: 31093 },
  { name: "Kerewan", value: 81598 },
  { name: "Kuntaur", value: 38429 },
  { name: "Janjanbureh", value: 50523 },
  { name: "Basse", value: 89034 },
];

const youthByResidence = [
  { name: "Urban", value: 560787 },
  { name: "Rural", value: 344629 },
];

const youthWithDisabilities = [
  { name: "Seeing", value: 1675 },
  { name: "Hearing", value: 1692 },
  { name: "Physical", value: 1757 },
  { name: "Learning", value: 1437 },
  { name: "Selfcare", value: 1239 },
  { name: "Speech", value: 1749 },
];

const youthWithoutDisabilities = [
  { name: "15-19", value: 285807 - 1050 },
  { name: "20-24", value: 242231 - 1100 },
  { name: "25-29", value: 192893 - 1123 },
  { name: "30-34", value: 162532 - 1000 },
  { name: "35", value: 34883 - 1000 },
];

const youthMigrationData = [
  { name: "Voluntary Return", value: 450 },
  { name: "Deportation", value: 320 },
  { name: "Irregular Migration", value: 580 },
  { name: "Regular Migration", value: 230 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];
