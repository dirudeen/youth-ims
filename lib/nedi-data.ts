// NEDI (National Enterprise Development Initiative) Data
export type NEDIProgram = {
  id: string
  programName: string
  targetGroup: string
  beneficiaries: number
  serviceType: string
  description: string
  status: string
  location: string
  maleParticipants?: number
  femaleParticipants?: number
  startDate: string
  endDate?: string
  implementingPartner?: string
  fundingSource?: string
}

export const nediProgramsData: NEDIProgram[] = [
  {
    id: "1",
    programName: "Migrant Returnees Entrepreneurship Training",
    targetGroup: "Migrant Returnees",
    beneficiaries: 570,
    serviceType: "Training",
    description: "General entrepreneurship and financial literacy training for migrant returnees",
    status: "Completed",
    location: "National",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    implementingPartner: "NEDI",
    fundingSource: "Government/IOM",
  },
  {
    id: "2",
    programName: "Youth and Women Mentoring Services",
    targetGroup: "Youth and Women Entrepreneurs",
    beneficiaries: 150,
    serviceType: "Mentoring & Coaching",
    description: "Mentoring and coaching services for youth and women entrepreneurs",
    status: "Ongoing",
    location: "National",
    startDate: "2024-01-01",
    implementingPartner: "NEDI",
    fundingSource: "Government",
  },
  {
    id: "3",
    programName: "Business Advisory Services",
    targetGroup: "Youth and Women",
    beneficiaries: 210,
    serviceType: "Business Advisory",
    description: "Business advisory services focusing on business formalization",
    status: "Completed",
    location: "National",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    implementingPartner: "NEDI",
    fundingSource: "Government",
  },
  {
    id: "4",
    programName: "VYWoSP Entrepreneurship Training",
    targetGroup: "General Beneficiaries",
    beneficiaries: 300,
    serviceType: "Training",
    description: "Entrepreneurship and small ruminant & poultry production training under VYWoSP project",
    status: "Completed",
    location: "National",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    implementingPartner: "NEDI",
    fundingSource: "VYWoSP",
  },
  {
    id: "5",
    programName: "VYWoSP Coaching Refresher Training",
    targetGroup: "Coaches",
    beneficiaries: 20,
    serviceType: "Training",
    description: "Coaching refresher training for coaches under the VYWoSP project",
    status: "Completed",
    location: "National",
    startDate: "2024-10-01",
    endDate: "2024-11-30",
    implementingPartner: "NEDI",
    fundingSource: "VYWoSP",
  },
  {
    id: "6",
    programName: "Shanghai Study Tour",
    targetGroup: "Entrepreneurs",
    beneficiaries: 6,
    serviceType: "Study Tour",
    description: "3-week study tour to Shanghai, China for entrepreneurs",
    status: "Completed",
    location: "Shanghai, China",
    maleParticipants: 3,
    femaleParticipants: 3,
    startDate: "2024-09-01",
    endDate: "2024-09-21",
    implementingPartner: "MoYS",
    fundingSource: "Government",
  },
  {
    id: "7",
    programName: "Migrant Returnees Reintegration Assistance",
    targetGroup: "Trained Migrant Returnees",
    beneficiaries: 420,
    serviceType: "Financial Assistance",
    description: "Reintegration assistance (Access to finance) for trained migrant returnees",
    status: "Completed",
    location: "National",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    implementingPartner: "IOM",
    fundingSource: "IOM",
  },
  {
    id: "8",
    programName: "GCCI Trade Fair Support",
    targetGroup: "Youth and Women Entrepreneurs",
    beneficiaries: 10,
    serviceType: "Trade Fair Support",
    description: "Support with stalls at GCCI International trade fair",
    status: "Completed",
    location: "Banjul",
    maleParticipants: 4,
    femaleParticipants: 6,
    startDate: "2024-11-01",
    endDate: "2024-11-07",
    implementingPartner: "NEDI",
    fundingSource: "Government",
  },
  {
    id: "9",
    programName: "Regional Business Formalization Centers",
    targetGroup: "General Public",
    beneficiaries: 0,
    serviceType: "Infrastructure",
    description: "2 regional business formalization centers fully operational (LRR and URR)",
    status: "Operational",
    location: "LRR and URR",
    startDate: "2024-01-01",
    implementingPartner: "NEDI",
    fundingSource: "Government",
  },
  {
    id: "10",
    programName: "Q1 2025 Monitoring and Evaluation",
    targetGroup: "NEDI Grant Beneficiaries",
    beneficiaries: 0,
    serviceType: "Monitoring & Evaluation",
    description: "First quarter 2025 monitoring and evaluation conducted to NEDI grant beneficiaries",
    status: "Completed",
    location: "National",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    implementingPartner: "NEDI",
    fundingSource: "Government",
  },
]

// Export aliases for backward compatibility
export const nediPrograms = nediProgramsData
export const nediData = nediProgramsData
