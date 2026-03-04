"use client";
import Image from "next/image";
import { TrendingDown, Store, AlertTriangle, ShieldOff } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";

const sellOutData = [
  { mes: "Ene", uds: 4392, year: 2025 },
  { mes: "Feb", uds: 3760, year: 2025 },
  { mes: "Mar", uds: 3960, year: 2025 },
  { mes: "Abr", uds: 3437, year: 2025 },
  { mes: "May", uds: 3567, year: 2025 },
  { mes: "Jun", uds: 3585, year: 2025 },
  { mes: "Jul", uds: 3500, year: 2025 },
  { mes: "Ago", uds: 3115, year: 2025 },
  { mes: "Sep", uds: 3086, year: 2025 },
  { mes: "Oct", uds: 3249, year: 2025 },
  { mes: "Nov", uds: 3539, year: 2025 },
  { mes: "Dic", uds: 3105, year: 2025 },
  { mes: "Ene", uds: 3473, year: 2026 },
  { mes: "Feb", uds: 3231, year: 2026 },
];

const avg2025 = Math.round(sellOutData.filter((d) => d.year === 2025).reduce((s, d) => s + d.uds, 0) / 12);

export default function Slide1Portada() {
  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-orange-50 to-white flex flex-col relative overflow-hidden">
      {/* Decorative accent bar */}
      <div className="h-2 bg-gradient-to-r from-orange-500 to-orange-300" />

      {/* Header */}
      <div className="flex items-center justify-between px-10 pt-5 pb-2">
        <Image src="/4buddies-logo.jpeg" alt="4BUDDIES" width={100} height={50} className="rounded-lg" />
        <div className="text-right">
          <h1 className="text-2xl font-extrabold text-orange-900 tracking-tight">Reporte Semanal</h1>
          <h2 className="text-lg font-bold text-orange-500">4BUDDIES × Farmacias del Ahorro</h2>
        </div>
      </div>

      {/* Main content: KPIs left + Sell-out chart right */}
      <div className="flex gap-5 px-10 flex-1 pt-2 pb-3">
        {/* Left: KPI Cards */}
        <div className="grid grid-cols-2 gap-3 w-[460px]">
          {/* Ventas */}
          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
            <TrendingDown className="w-6 h-6 text-orange-500 mb-2" />
            <p className="text-3xl font-extrabold text-gray-900">6,704</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Uds vendidas EF 2026</p>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full mt-2">-17.8% vs EF 25</span>
          </div>

          {/* Tiendas */}
          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
            <Store className="w-6 h-6 text-orange-500 mb-2" />
            <p className="text-3xl font-extrabold text-gray-900">554</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Tiendas activas</p>
            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mt-2">393 de 410 catalogadas</span>
          </div>

          {/* Restock */}
          <div className="bg-white rounded-xl border border-red-100 shadow-sm p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
            <AlertTriangle className="w-6 h-6 text-red-500 mb-2" />
            <p className="text-3xl font-extrabold text-red-600">120</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Restock urgente</p>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full mt-2">&lt;15 días cobertura</span>
          </div>

          {/* Bloqueadas */}
          <div className="bg-white rounded-xl border border-red-100 shadow-sm p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
            <ShieldOff className="w-6 h-6 text-red-500 mb-2" />
            <p className="text-3xl font-extrabold text-red-600">128</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Posiciones bloqueadas</p>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full mt-2">No Disponible a Compra</span>
          </div>
        </div>

        {/* Right: Sell-out chart */}
        <div className="flex-1 bg-white rounded-xl border border-orange-100 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-orange-800">Sell-Out Mensual (unidades)</h3>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-orange-300" /> 2025</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-orange-600" /> 2026</span>
              <span className="flex items-center gap-1"><span className="w-5 h-[1px] bg-gray-400 inline-block" /> Prom. 2025</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mb-3">Ene 2025 – Feb 2026 · Promedio 2025: {avg2025.toLocaleString()} uds/mes</p>

          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sellOutData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 5000]}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`}
                />
                <Tooltip
                  formatter={(v: number) => [`${v.toLocaleString()} uds`]}
                  labelFormatter={(_, payload) => {
                    if (payload && payload[0]) {
                      const d = payload[0].payload;
                      return `${d.mes} ${d.year}`;
                    }
                    return "";
                  }}
                  contentStyle={{ fontSize: 11, borderRadius: 8 }}
                />
                <ReferenceLine y={avg2025} stroke="#9ca3af" strokeDasharray="4 4" strokeWidth={1} />
                <Bar dataKey="uds" radius={[3, 3, 0, 0]} maxBarSize={36}>
                  {sellOutData.map((d, i) => (
                    <Cell
                      key={i}
                      fill={d.year === 2026 ? "#ea580c" : "#fdba74"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Mini YoY callouts */}
          <div className="flex gap-3 mt-2">
            <div className="flex-1 bg-red-50 rounded-lg p-2 text-center">
              <p className="text-[10px] text-gray-500">Ene YoY</p>
              <p className="text-sm font-bold text-red-600">-20.9%</p>
              <p className="text-[9px] text-gray-400">4,392 → 3,473</p>
            </div>
            <div className="flex-1 bg-red-50 rounded-lg p-2 text-center">
              <p className="text-[10px] text-gray-500">Feb YoY</p>
              <p className="text-sm font-bold text-red-600">-14.1%</p>
              <p className="text-[9px] text-gray-400">3,760 → 3,231</p>
            </div>
            <div className="flex-1 bg-orange-50 rounded-lg p-2 text-center">
              <p className="text-[10px] text-gray-500">YTD</p>
              <p className="text-sm font-bold text-red-600">-17.8%</p>
              <p className="text-[9px] text-gray-400">8,152 → 6,704</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer insight */}
      <div className="px-10 pb-5">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-2.5 flex items-center gap-3">
          <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0">DATO</span>
          <p className="text-xs text-gray-700">
            Venta Ene 2025 – Feb 2026 · Inventario al 1 Mar 2026 · 26 plazas crecen, 25 caen. <strong className="text-green-600">Top crecimiento:</strong> León +55%, México Centro +48%.
          </p>
        </div>
      </div>
    </div>
  );
}
