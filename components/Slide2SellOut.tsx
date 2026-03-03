"use client";
import Image from "next/image";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { mes: "Ene", "2025": 4392, "2026": 3473 },
  { mes: "Feb", "2025": 3760, "2026": 3231 },
  { mes: "Mar", "2025": 3960, "2026": 0 },
  { mes: "Abr", "2025": 3437, "2026": 0 },
  { mes: "May", "2025": 3567, "2026": 0 },
  { mes: "Jun", "2025": 3585, "2026": 0 },
  { mes: "Jul", "2025": 3500, "2026": 0 },
  { mes: "Ago", "2025": 3115, "2026": 0 },
  { mes: "Sep", "2025": 3086, "2026": 0 },
  { mes: "Oct", "2025": 3249, "2026": 0 },
  { mes: "Nov", "2025": 3539, "2026": 0 },
  { mes: "Dic", "2025": 3105, "2026": 0 },
];

const table = [
  { mes: "Ene", u25: "4,392", u26: "3,473", var: "-20.9%" },
  { mes: "Feb", u25: "3,760", u26: "3,231", var: "-14.1%" },
  { mes: "Mar", u25: "3,960", u26: "-", var: "-" },
  { mes: "Abr", u25: "3,437", u26: "-", var: "-" },
  { mes: "May", u25: "3,567", u26: "-", var: "-" },
  { mes: "Jun", u25: "3,585", u26: "-", var: "-" },
  { mes: "Jul", u25: "3,500", u26: "-", var: "-" },
  { mes: "Ago", u25: "3,115", u26: "-", var: "-" },
  { mes: "Sep", u25: "3,086", u26: "-", var: "-" },
  { mes: "Oct", u25: "3,249", u26: "-", var: "-" },
  { mes: "Nov", u25: "3,539", u26: "-", var: "-" },
  { mes: "Dic", u25: "3,105", u26: "-", var: "-" },
  { mes: "YTD", u25: "8,152", u26: "6,704", var: "-3.5%" },
];

export default function Slide2SellOut() {
  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col p-8 overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <Image src="/4buddies-logo.jpeg" alt="4BUDDIES" width={48} height={24} className="rounded" />
        <h2 className="text-2xl font-bold text-orange-900">Sell-Out Mensual — Unidades 2025 vs 2026</h2>
      </div>

      <div className="flex gap-5 flex-1">
        {/* Chart */}
        <div className="flex-1 bg-white rounded-xl border border-orange-200 shadow-sm p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="20%">
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="2025" fill="#fb923c" radius={[4, 4, 0, 0]} />
              <Bar dataKey="2026" fill="#ea580c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="w-[360px] bg-white rounded-xl border border-orange-200 shadow-sm p-3 overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-orange-600 text-white">
                <th className="p-1.5 text-left rounded-tl-lg">Mes</th>
                <th className="p-1.5 text-right">2025</th>
                <th className="p-1.5 text-right">2026</th>
                <th className="p-1.5 text-right rounded-tr-lg">Var %</th>
              </tr>
            </thead>
            <tbody>
              {table.map((r, i) => (
                <tr key={r.mes} className={`${r.mes === "YTD" ? "bg-orange-100 font-bold" : i % 2 === 0 ? "bg-orange-50" : ""}`}>
                  <td className="p-1.5 font-medium">{r.mes}</td>
                  <td className="p-1.5 text-right">{r.u25}</td>
                  <td className="p-1.5 text-right">{r.u26}</td>
                  <td className={`p-1.5 text-right font-semibold ${r.var.startsWith("-") ? "text-red-600" : r.var === "-" ? "text-gray-400" : "text-green-600"}`}>{r.var}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accionable */}
      <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded mt-0.5">ACCIÓN</span>
        <p className="text-sm text-red-800">
          <strong>YTD -3.5%.</strong> Zona Norte cayó -24% (42% de la venta) → revisar surtido en CEDIS MTNA y CLCD. Occidente fue la única zona que creció (+1.3%) → oportunidad de refuerzo.
        </p>
      </div>
    </div>
  );
}
