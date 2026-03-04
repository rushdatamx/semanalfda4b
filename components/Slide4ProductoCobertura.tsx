"use client";
import Image from "next/image";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Chicharrón de Cerdo 75g", uds: 1568, estMxn: 90944, pctVal: "36.7%", pctUds: "23.4%", pvp: 58, color: "#ea580c" },
  { name: "Rodajitas Spicy Limón 30g", uds: 2307, estMxn: 63443, pctVal: "25.6%", pctUds: "34.4%", pvp: 27.5, color: "#fb923c" },
  { name: "Street Elote 125g", uds: 1228, estMxn: 57716, pctVal: "23.3%", pctUds: "18.3%", pvp: 47, color: "#fdba74" },
  { name: "Classic White 25g", uds: 1598, estMxn: 35955, pctVal: "14.5%", pctUds: "23.8%", pvp: 22.5, color: "#fed7aa" },
];

const totalUds = pieData.reduce((sum, p) => sum + p.uds, 0);
const totalMxn = pieData.reduce((sum, p) => sum + p.estMxn, 0);

const coverage = [
  { sku: "Rodajitas Spicy Limón 30g", tiendas: 410, pctCov: 100, color: "#fb923c" },
  { sku: "Classic White 25g", tiendas: 410, pctCov: 100, color: "#fed7aa" },
  { sku: "Street Elote 125g", tiendas: 410, pctCov: 100, color: "#fdba74" },
  { sku: "Chicharrón de Cerdo 75g", tiendas: 410, pctCov: 100, color: "#ea580c" },
];

const maxTiendas = 410; // Solo tiendas catalogadas

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
        {/* Left: Pie Chart (by MXN) + participation table */}
        <div className="w-[540px] flex flex-col gap-4">
          {/* Pie - now by estimated MXN */}
          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-4 flex items-center gap-4 h-[240px]">
            <div className="w-[200px] h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="estMxn"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={88}
                    innerRadius={42}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="white" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `$${v.toLocaleString()} MXN est.`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1">
              <div className="text-center mb-3">
                <p className="text-2xl font-extrabold text-gray-900">${(totalMxn / 1000).toFixed(0)}K</p>
                <p className="text-[10px] text-gray-400">Est. PVP · EF 2026</p>
                <p className="text-xs text-gray-500 mt-0.5">{totalUds.toLocaleString()} uds</p>
              </div>
              {pieData.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-xs mb-1.5">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                  <span className="text-gray-700 truncate flex-1">{p.name.split(" ").slice(0, 2).join(" ")}</span>
                  <span className="font-bold text-gray-800">{p.pctVal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product table with UDS + MXN */}
          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-4 flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-orange-800">Participación EF 2026</h3>
              <span className="text-[9px] text-gray-400 italic">* Estimado PVP, no dato oficial</span>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="p-2 text-left rounded-tl-lg">Producto</th>
                  <th className="p-2 text-right">PVP</th>
                  <th className="p-2 text-right">Uds</th>
                  <th className="p-2 text-right">% Uds</th>
                  <th className="p-2 text-right">Est. MXN*</th>
                  <th className="p-2 text-right rounded-tr-lg">% Valor</th>
                </tr>
              </thead>
              <tbody>
                {pieData.map((p, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                    <td className="p-2 font-medium">{p.name}</td>
                    <td className="p-2 text-right text-gray-500">${p.pvp}</td>
                    <td className="p-2 text-right">{p.uds.toLocaleString()}</td>
                    <td className="p-2 text-right text-gray-500">{p.pctUds}</td>
                    <td className="p-2 text-right font-bold">${(p.estMxn / 1000).toFixed(1)}K</td>
                    <td className="p-2 text-right">
                      <span className={`font-bold ${i === 0 ? "text-orange-700" : "text-gray-700"}`}>{p.pctVal}</span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-orange-100 font-bold border-t-2 border-orange-300">
                  <td className="p-2">Total</td>
                  <td className="p-2"></td>
                  <td className="p-2 text-right">{totalUds.toLocaleString()}</td>
                  <td className="p-2 text-right">100%</td>
                  <td className="p-2 text-right">${(totalMxn / 1000).toFixed(0)}K</td>
                  <td className="p-2 text-right">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Coverage with progress bars */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Key insight */}
          <div className="bg-orange-600 rounded-xl p-4 text-white">
            <p className="text-sm font-bold mb-1">Chicharrón = #1 en valor estimado</p>
            <p className="text-xs opacity-90">
              Con solo 23% de las unidades, aporta <strong>37% del valor</strong> (~$91K MXN est.) gracias a su precio ($58).
              Priorizar crecimiento de Chicharrón maximiza el valor por unidad vendida.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-orange-100 shadow-sm p-5 flex-1 flex flex-col">
            <h3 className="text-sm font-bold text-orange-800 mb-1">Cobertura en tiendas catalogadas</h3>
            <p className="text-[11px] text-gray-500 mb-4">410 tiendas catalogadas — los 4 SKUs están dados de alta</p>

            <div className="space-y-4 flex-1">
              {coverage.map((c, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-800">{c.sku}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold" style={{ color: c.color }}>{c.tiendas}</span>
                      <span className="text-[10px] text-gray-400">/ {maxTiendas}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3.5 relative overflow-hidden">
                    <div
                      className="h-3.5 rounded-full transition-all"
                      style={{ width: `${c.pctCov}%`, backgroundColor: c.color }}
                    />
                    <span className="absolute right-2 top-0 text-[10px] font-bold text-gray-500">
                      {c.pctCov}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Status */}
            <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-2.5">
              <div className="flex items-start gap-2">
                <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5">OK</span>
                <p className="text-xs text-gray-700">
                  Los <strong>4 SKUs están dados de alta</strong> en las 410 tiendas catalogadas. Cobertura al 100%.
                  El foco debe ser <strong className="text-orange-700">rotar Chicharrón</strong> por mayor valor unitario.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-8 pb-4 pt-1">
        <p className="text-[8px] text-gray-300 text-right italic">* Valor estimado basado en precio punto de venta. No representa dato de facturación oficial.</p>
      </div>
    </div>
  );
}
