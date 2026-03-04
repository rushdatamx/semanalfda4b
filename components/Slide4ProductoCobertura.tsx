"use client";
import Image from "next/image";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Rodajitas Spicy Limón 30g", value: 2307, pct: "34.4%", color: "#ea580c" },
  { name: "Classic White 25g", value: 1598, pct: "23.8%", color: "#fb923c" },
  { name: "Chicharrón de Cerdo 75g", value: 1568, pct: "23.4%", color: "#fdba74" },
  { name: "Street Elote 125g", value: 1228, pct: "18.3%", color: "#fed7aa" },
];

const totalUds = pieData.reduce((sum, p) => sum + p.value, 0);

const coverage = [
  { sku: "Rodajitas Spicy Limón 30g", tiendas: 695, pctCov: 94, color: "#ea580c" },
  { sku: "Classic White 25g", tiendas: 498, pctCov: 68, color: "#fb923c" },
  { sku: "Street Elote 125g", tiendas: 502, pctCov: 68, color: "#fed7aa" },
  { sku: "Chicharrón de Cerdo 75g", tiendas: 495, pctCov: 67, color: "#fdba74" },
];

const maxTiendas = 736; // Total stores in inventory

export default function Slide4ProductoCobertura() {
  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-orange-50 to-white flex flex-col overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-orange-500 to-orange-300" />

      {/* Header */}
      <div className="flex items-center gap-3 px-8 pt-5 pb-3">
        <Image src="/4buddies-logo.jpeg" alt="4BUDDIES" width={48} height={24} className="rounded" />
        <h2 className="text-xl font-bold text-orange-900">Producto + Cobertura</h2>
        <span className="text-xs text-orange-400 ml-auto">EF 2026 (Ene-Feb) · Inventario al 1 Mar 2026</span>
      </div>

      <div className="flex gap-5 px-8 flex-1 overflow-hidden">
        {/* Left: Pie Chart + participation table */}
        <div className="w-[520px] flex flex-col gap-4">
          {/* Pie */}
          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-4 flex items-center gap-4 h-[260px]">
            <div className="w-[220px] h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={95}
                    innerRadius={45}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="white" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v.toLocaleString()} uds`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              <div className="text-center mb-2">
                <p className="text-3xl font-extrabold text-gray-900">{totalUds.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Uds EF 2026</p>
              </div>
              {pieData.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                  <span className="text-gray-700 truncate flex-1">{p.name.split(" ").slice(0, 3).join(" ")}</span>
                  <span className="font-bold text-gray-800">{p.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product table */}
          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-4 flex-1">
            <h3 className="text-sm font-bold text-orange-800 mb-3">Participación EF 2026</h3>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="p-2 text-left rounded-tl-lg">Producto</th>
                  <th className="p-2 text-right">Uds</th>
                  <th className="p-2 text-right">Part.</th>
                  <th className="p-2 text-right rounded-tr-lg">Tiendas</th>
                </tr>
              </thead>
              <tbody>
                {pieData.map((p, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                    <td className="p-2 font-medium">{p.name}</td>
                    <td className="p-2 text-right font-bold">{p.value.toLocaleString()}</td>
                    <td className="p-2 text-right">{p.pct}</td>
                    <td className="p-2 text-right text-gray-600">
                      {coverage.find((c) => c.sku === p.name)?.tiendas || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Coverage with progress bars */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-5 flex-1 flex flex-col">
            <h3 className="text-sm font-bold text-orange-800 mb-1">Cobertura por SKU</h3>
            <p className="text-[11px] text-gray-500 mb-5">Tiendas con inventario de 736 totales en sistema</p>

            <div className="space-y-5 flex-1">
              {coverage.map((c, i) => {
                const gap = maxTiendas - c.tiendas;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-800">{c.sku}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-extrabold" style={{ color: c.color }}>{c.tiendas}</span>
                        <span className="text-xs text-gray-400">/ {maxTiendas}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-4 relative overflow-hidden">
                      <div
                        className="h-4 rounded-full transition-all"
                        style={{ width: `${c.pctCov}%`, backgroundColor: c.color }}
                      />
                      <span className="absolute right-2 top-0.5 text-[10px] font-bold text-gray-500">
                        {c.pctCov}%
                      </span>
                    </div>
                    {gap > 100 && (
                      <p className="text-[10px] text-gray-500 mt-1">
                        Gap: <strong className="text-orange-600">{gap} tiendas</strong> sin este SKU
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Gap summary */}
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5">OPORTUNIDAD</span>
                <p className="text-xs text-gray-700">
                  <strong>3 SKUs</strong> están en ~500 tiendas vs Rodajitas en 695. Solicitar alta en <strong className="text-green-700">~200 tiendas</strong> para igualar cobertura — potencial de <strong>+660 uds/mes</strong> incrementales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom space */}
      <div className="h-5" />
    </div>
  );
}
