"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NyssGraduatesType, NyssProgramsType } from "@/db/schema";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16"];

interface NyssAnalyticsProps {
  programs: NyssProgramsType[];
  graduates: NyssGraduatesType[];
}

export function NyssAnalytics({ programs, graduates }: NyssAnalyticsProps) {
  const totalGraduates = programs.reduce((sum, item) => sum + Number(item.totalGraduates ?? 0), 0);
  const totalMale = programs.reduce((sum, item) => sum + Number(item.maleGraduates ?? 0), 0);
  const totalFemale = programs.reduce((sum, item) => sum + Number(item.femaleGraduates ?? 0), 0);
  const employmentWithValue = programs.filter((item) => Number(item.employmentRate ?? 0) > 0);
  const avgEmploymentRate =
    employmentWithValue.length === 0
      ? 0
      : employmentWithValue.reduce((sum, item) => sum + Number(item.employmentRate ?? 0), 0) /
        employmentWithValue.length;

  const sectorData = [...new Set(programs.map((item) => item.sector).filter(Boolean))].map((sector) => ({
    name: sector!,
    value: programs
      .filter((item) => item.sector === sector)
      .reduce((sum, item) => sum + Number(item.totalGraduates ?? 0), 0),
  }));

  const yearlyData = [...new Set(programs.map((item) => item.year))]
    .sort((a, b) => Number(a) - Number(b))
    .map((year) => {
      const rows = programs.filter((item) => item.year === year);
      return {
        year: String(year),
        graduates: rows.reduce((sum, item) => sum + Number(item.totalGraduates ?? 0), 0),
        programs: rows.length,
      };
    });

  const employmentStatusData = [
    "Employed",
    "Self-Employed",
    "Seeking Employment",
    "Further Education",
  ].map((status) => ({
    name: status,
    value: graduates.filter((item) => item.employmentStatus === status).length,
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Graduates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGraduates.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalMale.toLocaleString()} M / {totalFemale.toLocaleString()} F
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Average Employment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgEmploymentRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Registered Graduates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{graduates.length.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Programs and Graduates by Year</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="programs" fill="#3B82F6" />
                <Bar dataKey="graduates" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Graduates by Sector</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={sectorData} dataKey="value" nameKey="name" outerRadius={100} label>
                  {sectorData.map((entry, index) => (
                    <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Graduate Employment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={employmentStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

