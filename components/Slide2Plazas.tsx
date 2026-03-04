"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

const plazaData = [
  { plaza: "MTY Oriente", u25: 997, u26: 834, var: -16.3 },
  { plaza: "Guadalajara", u25: 499, u26: 505, var: 1.2 },
  { plaza: "Culiacán", u25: 434, u26: 314, var: -27.6 },
  { plaza: "Cancún", u25: 330, u26: 287, var: -13.0 },
  { plaza: "Chihuahua", u25: 271, u26: 285, var: 5.2 },
  { plaza: "Hermosillo", u25: 400, u26: 284, var: -29.0 },
  { plaza: "Mérida", u25: 225, u26: 277, var: 23.1 },
  { plaza: "México Centro", u25: 139, u26: 206, var: 48.2 },
  { plaza: "BCS", u25: 215, u26: 194, var: -9.8 },
  { plaza: "Mazatlán", u25: 286, u26: 189, var: -33.9 },
  { plaza: "León", u25: 122, u26: 189, var: 54.9 },
  { plaza: "Veracruz", u25: 162, u26: 162, var: 0.0 },
  { plaza: "Nvo Laredo", u25: 239, u26: 156, var: -34.7 },
  { plaza: "MTY Poniente", u25: 201, u26: 155, var: -22.9 },
  { plaza: "Tijuana", u25: 158, u26: 133, var: -15.8 },
  { plaza: "Querétaro", u25: 121, u26: 131, var: 8.3 },
  { plaza: "Puebla", u25: 177, u26: 122, var: -31.1 },
  { plaza: "BCN", u25: 22, u26: 93, var: 322.7 },
];

export default function Slide2Plazas() {
  const maxVal = Math.max(...plazaData.map((d) => Math.max(d.u25, d.u26)));

  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-orange-50 to-white flex flex-col overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-orange-500 to-orange-300" />

      {/* Header */}
      <div className="flex items-center gap-3 px-8 pt-5 pb-3">
        <Image src="/4buddies-logo.jpeg" alt="4BUDDIES" width={48} height={24} className="rounded" />
        <h2 className="text-xl font-bold text-orange-900">Desempeño por Plaza — Ene-Feb YoY</h2>
        <span className="text-xs text-orange-400 ml-auto">Solo 410 tiendas catalogadas</span>
      </div>

      <div className="flex gap-4 px-8 flex-1 overflow-hidden pb-4">
        {/* Bar Chart */}
        <div className="w-[520px] bg-white rounded-xl border border-orange-100 shadow-sm p-4 flex flex-col">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={plazaData}
              layout="vertical"
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              barGap={2}
              barSize={10}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="plaza"
                type="category"
                width={95}
                tick={{ fontSize: 10, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(v: number, name: string) =>
                  [`${v.toLocaleString()} uds`, name === "u25" ? "EF 2025" : "EF 2026"]
                }
                contentStyle={{ fontSize: 11, borderRadius: 8 }}
              />
              <Bar dataKey="u25" name="EF 2025" fill="#fdba74" radius={[0, 4, 4, 0]} />
              <Bar dataKey="u26" name="EF 2026" radius={[0, 4, 4, 0]}>
                {plazaData.map((d, i) => (
                  <Cell key={i} fill={d.var >= 0 ? "#22c55e" : "#ea580c"} />
                ))}
              </Bar>
              <Legend
                verticalAlign="top"
                height={24}
                iconType="circle"
                formatter={(value: string) => (
                  <span style={{ fontSize: 11, color: "#6b7280" }}>
                    {value === "u25" ? "EF 2025" : "EF 2026"}
                  </span>
                )}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table with variance badges */}
        <div className="flex-1 bg-white rounded-xl border border-orange-100 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-orange-600 text-white px-4 py-2 text-sm font-bold flex items-center justify-between">
            <span>Comparativo por Plaza</span>
            <span className="text-[10px] font-normal opacity-80">Unidades Ene-Feb</span>
          </div>
          <div className="overflow-auto flex-1">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-orange-800 border-b border-orange-200 bg-orange-50">
                  <th className="p-2 text-left">Plaza</th>
                  <th className="p-2 text-right">EF 25</th>
                  <th className="p-2 text-right">EF 26</th>
                  <th className="p-2 text-right">Var %</th>
                  <th className="p-2 w-24"></th>
                </tr>
              </thead>
              <tbody>
                {plazaData.map((d, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-orange-50 transition-colors`}>
                    <td className="p-2 font-medium text-gray-800">{d.plaza}</td>
                    <td className="p-2 text-right text-gray-500">{d.u25.toLocaleString()}</td>
                    <td className="p-2 text-right font-bold text-gray-800">{d.u26.toLocaleString()}</td>
                    <td className="p-2 text-right">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          d.var > 0
                            ? "bg-green-100 text-green-700"
                            : d.var < 0
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {d.var > 0 ? "+" : ""}
                        {d.var}%
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${d.var >= 0 ? "bg-green-400" : "bg-orange-400"}`}
                          style={{ width: `${(d.u26 / maxVal) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="px-8 pb-5">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex items-start gap-3">
          <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 mt-0.5">INSIGHT</span>
          <p className="text-sm text-gray-700">
            <strong>7 plazas en crecimiento</strong> lideradas por León (+55%), México Centro (+48%) y Mérida (+23%).
            <strong className="text-red-600"> 10 plazas caen</strong> — las más críticas: Nuevo Laredo (-35%), Mazatlán (-34%), Puebla (-31%).
            <strong> MTY Oriente sigue siendo la #1</strong> pero cayó -16%.
          </p>
        </div>
      </div>
    </div>
  );
}
