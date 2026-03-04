"use client";
import Image from "next/image";
import { TrendingDown, Store, AlertTriangle, Eye } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";

const sellOutData = [
  { mes: "Ene", uds: 3415, year: 2025 },
  { mes: "Feb", uds: 2974, year: 2025 },
  { mes: "Mar", uds: 3157, year: 2025 },
  { mes: "Abr", uds: 2688, year: 2025 },
  { mes: "May", uds: 2942, year: 2025 },
  { mes: "Jun", uds: 2975, year: 2025 },
  { mes: "Jul", uds: 2908, year: 2025 },
  { mes: "Ago", uds: 2603, year: 2025 },
  { mes: "Sep", uds: 2665, year: 2025 },
  { mes: "Oct", uds: 2794, year: 2025 },
  { mes: "Nov", uds: 3055, year: 2025 },
  { mes: "Dic", uds: 2715, year: 2025 },
  { mes: "Ene", uds: 2994, year: 2026 },
  { mes: "Feb", uds: 2775, year: 2026 },
];

const avg2025 = Math.round(sellOutData.filter((d) => d.year === 2025).reduce((s, d) => s + d.uds, 0) / 12);

export default function Slide1Portada() {
  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-orange-50 to-white flex flex-col relative overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-orange-500 to-orange-300" />

      {/* Header */}
      <div className="flex items-center justify-between px-10 pt-5 pb-2">
        <Image src="/4buddies-logo.jpeg" alt="4BUDDIES" width={100} height={50} className="rounded-lg" />
        <div className="text-right">
          <h1 className="text-2xl font-extrabold text-orange-900 tracking-tight">Reporte Semanal</h1>
          <h2 className="text-lg font-bold text-orange-500">4BUDDIES × Farmacias del Ahorro</h2>
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-5 px-10 flex-1 pt-2 pb-3">
        {/* Left: KPI Cards */}
        <div className="grid grid-cols-2 gap-3 w-[460px]">
          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
            <TrendingDown className="w-6 h-6 text-orange-500 mb-2" />
            <p className="text-3xl font-extrabold text-gray-900">5,769</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Uds vendidas EF 2026</p>
            <p className="text-[10px] text-gray-400 mt-0.5">~$217K MXN est. PVP</p>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1">-9.7% uds · +7.1% valor</span>
          </div>

          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
            <Store className="w-6 h-6 text-orange-500 mb-2" />
            <p className="text-3xl font-extrabold text-gray-900">406</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Tiendas activas</p>
            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mt-2">de 410 catalogadas</span>
          </div>

          <div className="bg-white rounded-xl border border-red-100 shadow-sm p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
            <AlertTriangle className="w-6 h-6 text-red-500 mb-2" />
            <p className="text-3xl font-extrabold text-red-600">85</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Restock urgente</p>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full mt-2">74 tiendas · &lt;15 días</span>
          </div>

          <div className="bg-white rounded-xl border border-amber-100 shadow-sm p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
            <Eye className="w-6 h-6 text-amber-500 mb-2" />
            <p className="text-3xl font-extrabold text-amber-600">578</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Problema de anaquel</p>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mt-2">Con stock, sin venta Feb</span>
          </div>
        </div>

        {/* Right: Sell-out chart */}
        <div className="flex-1 bg-white rounded-xl border border-orange-100 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-orange-800">Sell-Out Mensual — 410 tiendas catalogadas</h3>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-orange-300" /> 2025</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-orange-600" /> 2026</span>
              <span className="flex items-center gap-1"><span className="w-5 h-[1px] bg-gray-400 inline-block" /> Prom. 25</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mb-3">Ene 2025 – Feb 2026 · Promedio 2025: {avg2025.toLocaleString()} uds/mes</p>

          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sellOutData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} domain={[0, 4000]} tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
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
                    <Cell key={i} fill={d.year === 2026 ? "#ea580c" : "#fdba74"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Mini YoY callouts */}
          <div className="flex gap-3 mt-2">
            <div className="flex-1 bg-red-50 rounded-lg p-2 text-center">
              <p className="text-[10px] text-gray-500">Ene YoY</p>
              <p className="text-sm font-bold text-red-600">-12.3%</p>
              <p className="text-[9px] text-gray-400">3,415 → 2,994 uds</p>
            </div>
            <div className="flex-1 bg-red-50 rounded-lg p-2 text-center">
              <p className="text-[10px] text-gray-500">Feb YoY</p>
              <p className="text-sm font-bold text-red-600">-6.7%</p>
              <p className="text-[9px] text-gray-400">2,974 → 2,775 uds</p>
            </div>
            <div className="flex-1 bg-green-50 rounded-lg p-2 text-center">
              <p className="text-[10px] text-gray-500">YTD Est. PVP</p>
              <p className="text-sm font-bold text-green-600">+7.1%</p>
              <p className="text-[9px] text-gray-400">$202K → $217K MXN</p>
            </div>
          </div>
          <p className="text-[8px] text-gray-300 text-right mt-1 italic">* Estimado basado en precio punto de venta</p>
        </div>
      </div>

      {/* Footer insight */}
      <div className="px-10 pb-5">
        <div className="bg-green-50 border border-green-200 rounded-xl p-2.5 flex items-center gap-3">
          <span className="bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0">CLAVE</span>
          <p className="text-xs text-gray-700">
            Caen unidades (-9.7%) pero <strong className="text-green-600">el valor estimado crece +7.1%</strong> gracias al mix de producto — Chicharrón ($58) gana participación. 26 plazas crecen, 25 caen.
          </p>
        </div>
      </div>
    </div>
  );
}
