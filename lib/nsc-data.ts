export interface RegionalNSCStats {
  region: string
  amateurM: number
  amateurF: number
  professionalM: number
  professionalF: number
  paralympicM: number
  paralympicF: number
  studentAthleteM: number
  studentAthleteF: number
  nationalTeamM: number
  nationalTeamF: number
  internationalM: number
  internationalF: number
  total: number
}

export interface NSCColumnTotals {
  amateurM: number
  amateurF: number
  professionalM: number
  professionalF: number
  paralympicM: number
  paralympicF: number
  studentAthleteM: number
  studentAthleteF: number
  nationalTeamM: number
  nationalTeamF: number
  internationalM: number
  internationalF: number
  grandTotal: number
}

export interface NSCParticipant {
  id: string
  name: string
  age: number
  gender: "Male" | "Female"
  region: string
  category: string
  sport: string
  level: string
  status: "Active" | "Inactive" | "Retired"
  achievements: string[]
  dateRegistered: string
  contact?: string
}

// Regional NSC Statistics - Updated with correct data from attachment
export const regionalNSCStats: RegionalNSCStats[] = [
  {
    region: "Banjul",
    amateurM: 120,
    amateurF: 95,
    professionalM: 40,
    professionalF: 30,
    paralympicM: 10,
    paralympicF: 8,
    studentAthleteM: 85,
    studentAthleteF: 75,
    nationalTeamM: 15,
    nationalTeamF: 12,
    internationalM: 8,
    internationalF: 5,
    total: 503,
  },
  {
    region: "KM",
    amateurM: 200,
    amateurF: 180,
    professionalM: 55,
    professionalF: 40,
    paralympicM: 12,
    paralympicF: 10,
    studentAthleteM: 150,
    studentAthleteF: 140,
    nationalTeamM: 20,
    nationalTeamF: 18,
    internationalM: 10,
    internationalF: 7,
    total: 842,
  },
  {
    region: "WCR",
    amateurM: 180,
    amateurF: 160,
    professionalM: 50,
    professionalF: 35,
    paralympicM: 14,
    paralympicF: 12,
    studentAthleteM: 130,
    studentAthleteF: 120,
    nationalTeamM: 18,
    nationalTeamF: 15,
    internationalM: 12,
    internationalF: 8,
    total: 754,
  },
  {
    region: "CRR",
    amateurM: 150,
    amateurF: 140,
    professionalM: 45,
    professionalF: 35,
    paralympicM: 10,
    paralympicF: 8,
    studentAthleteM: 110,
    studentAthleteF: 100,
    nationalTeamM: 12,
    nationalTeamF: 10,
    internationalM: 5,
    internationalF: 3,
    total: 628,
  },
  {
    region: "NBR",
    amateurM: 170,
    amateurF: 150,
    professionalM: 50,
    professionalF: 40,
    paralympicM: 11,
    paralympicF: 9,
    studentAthleteM: 125,
    studentAthleteF: 115,
    nationalTeamM: 16,
    nationalTeamF: 14,
    internationalM: 7,
    internationalF: 5,
    total: 712,
  },
  {
    region: "LRR",
    amateurM: 160,
    amateurF: 145,
    professionalM: 48,
    professionalF: 38,
    paralympicM: 13,
    paralympicF: 11,
    studentAthleteM: 120,
    studentAthleteF: 110,
    nationalTeamM: 14,
    nationalTeamF: 12,
    internationalM: 6,
    internationalF: 4,
    total: 681,
  },
  {
    region: "URR",
    amateurM: 140,
    amateurF: 130,
    professionalM: 42,
    professionalF: 30,
    paralympicM: 9,
    paralympicF: 7,
    studentAthleteM: 100,
    studentAthleteF: 90,
    nationalTeamM: 10,
    nationalTeamF: 8,
    internationalM: 4,
    internationalF: 3,
    total: 573,
  },
]

// Column totals - Exact totals from attachment
export const nscColumnTotals: NSCColumnTotals = {
  amateurM: 1120,
  amateurF: 1000,
  professionalM: 330,
  professionalF: 248,
  paralympicM: 79,
  paralympicF: 65,
  studentAthleteM: 820,
  studentAthleteF: 750,
  nationalTeamM: 105,
  nationalTeamF: 89,
  internationalM: 52,
  internationalF: 35,
  grandTotal: 4693,
}

// Sample individual NSC participants data
export const nscParticipantsData: NSCParticipant[] = [
  {
    id: "NSC001",
    name: "Amadou Jallow",
    age: 24,
    gender: "Male",
    region: "Banjul",
    category: "Professional",
    sport: "Football",
    level: "Professional",
    status: "Active",
    achievements: ["National League Champion 2023", "Top Scorer 2022"],
    dateRegistered: "2023-01-15",
    contact: "amadou.jallow@email.com",
  },
  {
    id: "NSC002",
    name: "Fatou Ceesay",
    age: 22,
    gender: "Female",
    region: "KM",
    category: "National Team",
    sport: "Athletics",
    level: "Professional",
    status: "Active",
    achievements: ["100m National Record Holder", "West African Games Gold Medal"],
    dateRegistered: "2023-02-20",
    contact: "fatou.ceesay@email.com",
  },
  {
    id: "NSC003",
    name: "Ousman Darboe",
    age: 19,
    gender: "Male",
    region: "WCR",
    category: "Student Athlete",
    sport: "Basketball",
    level: "Advanced",
    status: "Active",
    achievements: ["University League MVP", "Regional Championship Winner"],
    dateRegistered: "2023-03-10",
    contact: "ousman.darboe@email.com",
  },
  {
    id: "NSC004",
    name: "Mariama Sanneh",
    age: 26,
    gender: "Female",
    region: "CRR",
    category: "Paralympic",
    sport: "Swimming",
    level: "Professional",
    status: "Active",
    achievements: ["Paralympic Qualifier", "African Para Games Silver Medal"],
    dateRegistered: "2023-04-05",
    contact: "mariama.sanneh@email.com",
  },
  {
    id: "NSC005",
    name: "Lamin Touray",
    age: 28,
    gender: "Male",
    region: "NBR",
    category: "Professional",
    sport: "Wrestling",
    level: "Professional",
    status: "Active",
    achievements: ["National Champion 2022", "Commonwealth Games Participant"],
    dateRegistered: "2023-05-12",
    contact: "lamin.touray@email.com",
  },
  {
    id: "NSC006",
    name: "Awa Baldeh",
    age: 20,
    gender: "Female",
    region: "LRR",
    category: "Amateur",
    sport: "Volleyball",
    level: "Intermediate",
    status: "Active",
    achievements: ["Regional Tournament Winner", "Youth League Champion"],
    dateRegistered: "2023-06-18",
    contact: "awa.baldeh@email.com",
  },
  {
    id: "NSC007",
    name: "Modou Jatta",
    age: 23,
    gender: "Male",
    region: "URR",
    category: "International-based",
    sport: "Football",
    level: "Professional",
    status: "Active",
    achievements: ["European League Player", "National Team Captain"],
    dateRegistered: "2023-07-22",
    contact: "modou.jatta@email.com",
  },
  {
    id: "NSC008",
    name: "Binta Jammeh",
    age: 21,
    gender: "Female",
    region: "Banjul",
    category: "Student Athlete",
    sport: "Tennis",
    level: "Advanced",
    status: "Active",
    achievements: ["University Champion", "National Junior Champion"],
    dateRegistered: "2023-08-14",
    contact: "binta.jammeh@email.com",
  },
  {
    id: "NSC009",
    name: "Ebrima Colley",
    age: 25,
    gender: "Male",
    region: "KM",
    category: "Professional",
    sport: "Boxing",
    level: "Professional",
    status: "Active",
    achievements: ["National Boxing Champion", "Olympic Qualifier"],
    dateRegistered: "2023-09-08",
    contact: "ebrima.colley@email.com",
  },
  {
    id: "NSC010",
    name: "Isatou Sarr",
    age: 27,
    gender: "Female",
    region: "WCR",
    category: "National Team",
    sport: "Handball",
    level: "Professional",
    status: "Active",
    achievements: ["National Team Vice Captain", "African Championship Bronze"],
    dateRegistered: "2023-10-03",
    contact: "isatou.sarr@email.com",
  },
]

// NSC statistics summary
export const nscStats = {
  totalParticipants: nscColumnTotals.grandTotal,
  totalProfessional: nscColumnTotals.professionalM + nscColumnTotals.professionalF,
  totalParalympic: nscColumnTotals.paralympicM + nscColumnTotals.paralympicF,
  totalNationalTeam: nscColumnTotals.nationalTeamM + nscColumnTotals.nationalTeamF,
  totalAmateur: nscColumnTotals.amateurM + nscColumnTotals.amateurF,
  totalStudentAthletes: nscColumnTotals.studentAthleteM + nscColumnTotals.studentAthleteF,
  totalInternational: nscColumnTotals.internationalM + nscColumnTotals.internationalF,
}

// Export aliases for backward compatibility
export const nscParticipants = nscParticipantsData
export const nscData = nscParticipantsData
export const nycParticipantsData = nscParticipantsData // NYC alias
export const nycData = nscParticipantsData // NYC alias
export const sportsData = nscParticipantsData // Sports alias
export const sportsAthletesData = nscParticipantsData // Sports alias
