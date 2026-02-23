"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Armchair as Wheelchair,
  Plane,
  UserCheck,
  UserMinus,
  Globe,
} from "lucide-react";
// import { useActivity } from "@/contexts/activity-context";
import { createClient } from "@/lib/supabase/client";
import {
  youthMigrationData,
  youthPopulationByLGA,
  youthWithDisabilities,
  youthWithoutDisabilities,
  COLORS,
  youthByResidence,
} from "@/lib/constants";

const tabs = [
  { name: "Overview", value: "overview" },
  { name: "Analytics", value: "analytics" },
  { name: "Migration", value: "migration" },
  { name: "Youth with Disabilities", value: "with-disabilities" },
  { name: "Youth without Disabilities", value: "without-disabilities" },
];

export default function DashboardPage() {
  // const { trackActivity } = useActivity();
  const supabase = createClient();
  const [totalBeneficiaries, setTotalBeneficiaries] = useState(0);

  useEffect(() => {
    async function fetchBeneficiariesTotal() {
      if (!supabase) {
        console.log("[v0] Supabase client not available");
        return;
      }

      try {
        console.log("[v0] Fetching beneficiaries from database...");

        // Get beneficiaries from NYC activities
        const { data: nycData, error: nycError } = await supabase
          .from("nyc_activities")
          .select("beneficiaries");
        console.log(
          "[v0] NYC data:",
          nycData?.length,
          "records, error:",
          nycError,
        );

        // Get graduates from NYSS programs (using correct table name)
        const { data: nyssData, error: nyssError } = await supabase
          .from("nyss_programs")
          .select("total_graduates");
        console.log(
          "[v0] NYSS data:",
          nyssData?.length,
          "records, error:",
          nyssError,
        );

        // Count NSC participants (individual records, not aggregated)
        const { count: nscCount, error: nscError } = await supabase
          .from("nsc_participants")
          .select("*", { count: "exact", head: true });
        console.log(
          "[v0] NSC participant count:",
          nscCount,
          "error:",
          nscError,
        );

        let total = 0;

        // Sum NYC beneficiaries
        if (nycData) {
          const nycTotal = nycData.reduce(
            (sum, item) => sum + (item.beneficiaries || 0),
            0,
          );
          console.log("[v0] NYC total beneficiaries:", nycTotal);
          total += nycTotal;
        }

        // Sum NYSS graduates
        if (nyssData) {
          const nyssTotal = nyssData.reduce(
            (sum, item) => sum + (item.total_graduates || 0),
            0,
          );
          console.log("[v0] NYSS total graduates:", nyssTotal);
          total += nyssTotal;
        }

        // Add NSC participants count
        if (nscCount) {
          console.log("[v0] NSC total participants:", nscCount);
          total += nscCount;
        }

        console.log("[v0] Total beneficiaries calculated:", total);
        setTotalBeneficiaries(total);
      } catch (error) {
        console.error("[v0] Error fetching beneficiaries:", error);
      }
    }

    fetchBeneficiariesTotal();
  }, [supabase]);

  // Calculate totals
  const totalYouthWithoutDisabilities = youthWithoutDisabilities.reduce(
    (sum, item) => sum + item.value,
    0,
  );
  const totalYouthMigration = youthMigrationData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* <OverviewTabContent />
        <AnalyticsTabContent />
        <MigrationTabContent />
        <WithDisabilitiesTabContent />
        <WithoutDisabilitiesTabContent /> */}
      </Tabs>
    </div>
  );
}

// function OverviewTabContent() {
//   return (
//     <TabsContent value="overview" className="space-y-4">
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Youth Population
//             </CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">918,346</div>
//             <p className="text-xs text-muted-foreground">
//               37.9% of total population
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Beneficiaries
//             </CardTitle>
//             <UserCheck className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {totalBeneficiaries > 0
//                 ? totalBeneficiaries.toLocaleString()
//                 : "Loading..."}
//             </div>
//             <p className="text-xs text-muted-foreground">Across all programs</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Youth with Disabilities
//             </CardTitle>
//             <Wheelchair className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">5,273</div>
//             <p className="text-xs text-muted-foreground">
//               0.6% of youth population
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Youth without Disabilities
//             </CardTitle>
//             <UserMinus className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {totalYouthWithoutDisabilities.toLocaleString()}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               99.4% of youth population
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//         <Card className="col-span-4">
//           <CardHeader>
//             <CardTitle>Youth Population by LGA</CardTitle>
//           </CardHeader>
//           <CardContent className="pl-2">
//             <ResponsiveContainer width="100%" height={350}>
//               <BarChart
//                 data={youthPopulationByLGA}
//                 margin={{
//                   top: 5,
//                   right: 30,
//                   left: 20,
//                   bottom: 5,
//                 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="value" fill="#8884d8" name="Population" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//         <Card className="col-span-3">
//           <CardHeader>
//             <CardTitle>Youth by Age Group</CardTitle>
//             <CardDescription>
//               Distribution of youth population by age group
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={youthWithoutDisabilities}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) =>
//                     `${name}: ${(percent * 100).toFixed(0)}%`
//                   }
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {youthWithoutDisabilities.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   formatter={(value) =>
//                     new Intl.NumberFormat().format(value as number)
//                   }
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>
//     </TabsContent>
//   );
// }

// function AnalyticsTabContent() {
//   return (
//     <TabsContent value="analytics" className="space-y-4">
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
//         <Card className="col-span-1">
//           <CardHeader>
//             <CardTitle>Youth by Residence</CardTitle>
//             <CardDescription>Urban vs Rural distribution</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={youthByResidence}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) =>
//                     `${name}: ${(percent * 100).toFixed(0)}%`
//                   }
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   <Cell fill="#0088FE" />
//                   <Cell fill="#00C49F" />
//                 </Pie>
//                 <Tooltip
//                   formatter={(value) =>
//                     new Intl.NumberFormat().format(value as number)
//                   }
//                 />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//         <Card className="col-span-1">
//           <CardHeader>
//             <CardTitle>Youth with Disabilities by Type</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart
//                 data={youthWithDisabilities}
//                 margin={{
//                   top: 5,
//                   right: 30,
//                   left: 20,
//                   bottom: 5,
//                 }}
//                 layout="vertical"
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis type="number" />
//                 <YAxis dataKey="name" type="category" width={80} />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="value" fill="#82ca9d" name="Count" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//         <Card className="col-span-1">
//           <CardHeader>
//             <CardTitle>Youth without Disabilities by Age</CardTitle>
//             <CardDescription>Age group distribution</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart
//                 data={youthWithoutDisabilities}
//                 margin={{
//                   top: 5,
//                   right: 30,
//                   left: 20,
//                   bottom: 5,
//                 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="value" fill="#8884d8" name="Population" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>
//     </TabsContent>
//   );
// }

// function MigrationTabContent() {
//   return (
//     <TabsContent value="migration" className="space-y-4">
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Voluntary Return
//             </CardTitle>
//             <UserCheck className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">450</div>
//             <p className="text-xs text-muted-foreground">Voluntary returnees</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Deportation</CardTitle>
//             <Plane className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">320</div>
//             <p className="text-xs text-muted-foreground">Deported youth</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Irregular Migration
//             </CardTitle>
//             <Globe className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">580</div>
//             <p className="text-xs text-muted-foreground">Irregular cases</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Regular Migration
//             </CardTitle>
//             <UserCheck className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">230</div>
//             <p className="text-xs text-muted-foreground">Regular migration</p>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Youth Migration Distribution</CardTitle>
//             <CardDescription>Migration cases by type</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={350}>
//               <PieChart>
//                 <Pie
//                   data={youthMigrationData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, value, percent }) =>
//                     `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
//                   }
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {youthMigrationData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   formatter={(value) =>
//                     new Intl.NumberFormat().format(value as number)
//                   }
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Migration Summary</CardTitle>
//             <CardDescription>Key statistics and trends</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Total Cases</span>
//               <span className="text-2xl font-bold text-blue-600">
//                 {totalYouthMigration}
//               </span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Highest Category</span>
//               <span className="text-2xl font-bold text-orange-600">580</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Return Rate</span>
//               <span className="text-2xl font-bold text-green-600">48.1%</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">
//                 Irregular Migration Rate
//               </span>
//               <span className="text-2xl font-bold text-red-600">36.9%</span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </TabsContent>
//   );
// }

// function WithDisabilitiesTabContent() {
//   return (
//     <TabsContent value="with-disabilities" className="space-y-4">
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Youth with Disabilities
//             </CardTitle>
//             <Wheelchair className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">5,273</div>
//             <p className="text-xs text-muted-foreground">
//               0.6% of youth population
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Seeing Difficulties
//             </CardTitle>
//             <Wheelchair className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">1,675</div>
//             <p className="text-xs text-muted-foreground">
//               31.8% of disabilities
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Hearing Difficulties
//             </CardTitle>
//             <Wheelchair className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">1,692</div>
//             <p className="text-xs text-muted-foreground">
//               32.1% of disabilities
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Physical Difficulties
//             </CardTitle>
//             <Wheelchair className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">1,757</div>
//             <p className="text-xs text-muted-foreground">
//               33.3% of disabilities
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Disabilities by Type</CardTitle>
//             <CardDescription>
//               Distribution of youth with disabilities by type
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={350}>
//               <PieChart>
//                 <Pie
//                   data={youthWithDisabilities}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, value, percent }) =>
//                     `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
//                   }
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {youthWithDisabilities.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   formatter={(value) =>
//                     new Intl.NumberFormat().format(value as number)
//                   }
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Disability Statistics</CardTitle>
//             <CardDescription>Key metrics and insights</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">
//                 Total with Disabilities
//               </span>
//               <span className="text-2xl font-bold text-blue-600">5,273</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Most Common Type</span>
//               <span className="text-lg font-bold text-orange-600">
//                 Physical (1,757)
//               </span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Percentage of Youth</span>
//               <span className="text-2xl font-bold text-green-600">0.6%</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Support Programs</span>
//               <span className="text-2xl font-bold text-purple-600">Active</span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </TabsContent>
//   );
// }

// function WithoutDisabilitiesTabContent() {
//   return (
//     <TabsContent value="without-disabilities" className="space-y-4">
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Youth without Disabilities
//             </CardTitle>
//             <UserMinus className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {totalYouthWithoutDisabilities.toLocaleString()}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               99.4% of youth population
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Age 15-19</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">284,757</div>
//             <p className="text-xs text-muted-foreground">31.4% of age group</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Age 20-24</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">241,131</div>
//             <p className="text-xs text-muted-foreground">26.6% of age group</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Age 25-29</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">191,770</div>
//             <p className="text-xs text-muted-foreground">21.2% of age group</p>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Distribution by Age Group</CardTitle>
//             <CardDescription>
//               Youth without disabilities across age groups
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={350}>
//               <BarChart
//                 data={youthWithoutDisabilities}
//                 margin={{
//                   top: 5,
//                   right: 30,
//                   left: 20,
//                   bottom: 5,
//                 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip
//                   formatter={(value) =>
//                     new Intl.NumberFormat().format(value as number)
//                   }
//                 />
//                 <Legend />
//                 <Bar dataKey="value" fill="#0088FE" name="Population" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Age Group Distribution</CardTitle>
//             <CardDescription>Percentage breakdown by age</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={350}>
//               <PieChart>
//                 <Pie
//                   data={youthWithoutDisabilities}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) =>
//                     `${name}: ${(percent * 100).toFixed(1)}%`
//                   }
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {youthWithoutDisabilities.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   formatter={(value) =>
//                     new Intl.NumberFormat().format(value as number)
//                   }
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>
//     </TabsContent>
//   );
// }
