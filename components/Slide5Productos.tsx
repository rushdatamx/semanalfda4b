"use client";
import Image from "next/image";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Rodajitas Spicy Limón 30g", value: 15570, pct: "34.4%", color: "#ea580c" },
  { name: "Classic White 25g", value: 10766, pct: "23.8%", color: "#fb923c" },
  { name: "Chicharrón de Cerdo 75g", value: 10201, pct: "22.6%", color: "#fdba74" },
  { name: "Street Elote 125g", value: 8689, pct: "19.2%", color: "#fed7aa" },
];

const trend = [
  { prod: "Rodajitas 30g", sep: 938, oct: 1092, nov: 1084, dic: 933, ene26: 1124, feb26: 1183 },
  { prod: "Classic White 25g", sep: 810, oct: 799, nov: 966, dic: 865, ene26: 875, feb26: 723 },
  { prod: "Chicharrón 75g", sep: 728, oct: 708, nov: 769, dic: 694, ene26: 822, feb26: 746 },
  { prod: "Street Elote 125g", sep: 547, oct: 615, nov: 712, dic: 612, ene26: 649, feb26: 579 },
];

export default function Slide5Productos() {
  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col p-8 overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <Image src="/4buddies-logo.jpeg" alt="4BUDDIES" width={48} height={24} className="rounded" />
        <h2 className="text-2xl font-bold text-orange-900">Venta por Producto</h2>
        <span className="text-sm text-orange-500 ml-auto">Acumulado Ene 2025 – Feb 2026</span>
      </div>

      <div className="flex gap-5 flex-1">
        {/* Pie Chart */}
        <div className="w-[380px] bg-white rounded-xl border border-orange-200 shadow-sm p-4 flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} innerRadius={50} paddingAngle={3}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="white" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => `${v.toLocaleString()} uds`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
            {pieData.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }}></div>
                <span className="text-gray-700">{p.name.split(" ").slice(0, 2).join(" ")}</span>
                <span className="font-bold text-orange-900 ml-auto">{p.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabla + Tendencia */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Participación */}
          <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-4">
            <h3 className="text-sm font-bold text-orange-800 mb-3">Participación por producto</h3>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="p-2 text-left rounded-tl-lg">Producto</th>
                  <th className="p-2 text-right">Uds Total</th>
                  <th className="p-2 text-right">Part. %</th>
                  <th className="p-2 text-right rounded-tr-lg">Feb 26</th>
                </tr>
              </thead>
              <tbody>
                {pieData.map((p, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                    <td className="p-2 font-medium">{p.name}</td>
                    <td className="p-2 text-right font-bold">{p.value.toLocaleString()}</td>
                    <td className="p-2 text-right">{p.pct}</td>
                    <td className="p-2 text-right">{trend[i].feb26.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tendencia mensual */}
          <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-4 flex-1">
            <h3 className="text-sm font-bold text-orange-800 mb-3">Tendencia últimos 6 meses (unidades)</h3>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="p-2 text-left rounded-tl-lg">Producto</th>
                  <th className="p-2 text-right">Sep</th>
                  <th className="p-2 text-right">Oct</th>
                  <th className="p-2 text-right">Nov</th>
                  <th className="p-2 text-right">Dic</th>
                  <th className="p-2 text-right">Ene 26</th>
                  <th className="p-2 text-right rounded-tr-lg">Feb 26</th>
                </tr>
              </thead>
              <tbody>
                {trend.map((t, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                    <td className="p-2 font-medium">{t.prod}</td>
                    <td className="p-2 text-right">{t.sep}</td>
                    <td className="p-2 text-right">{t.oct}</td>
                    <td className="p-2 text-right">{t.nov}</td>
                    <td className="p-2 text-right">{t.dic}</td>
                    <td className="p-2 text-right">{t.ene26}</td>
                    <td className="p-2 text-right font-bold">{t.feb26}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-3 bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-2">
        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded mt-0.5">INSIGHT</span>
        <p className="text-sm text-orange-800">
          <strong>Rodajitas es el motor</strong> con 34% de participación y la mayor cobertura (94%). Classic White tuvo caída importante en Feb (-17% MoM) — verificar surtido.
        </p>
      </div>
    </div>
  );
}
