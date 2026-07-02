"use client";
import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
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
import Image from "next/image";

/* ================================================================
   DATA CONSTANTS — FDA Cierre al 30-Junio 2026
   Solo 410 tiendas catalogadas | Solo 4 SKUs core
   Datos reales calculados de ventas-fda.xlsx e inventario junio
   ================================================================ */

const KPI = {
  udsYtd26: 17463,
  udsYtd25: 15380,
  varUds: 13.5,
  estMxn26: 663916,
  estMxn25: 579304,
  varMxn: 14.6,
  deltaMxn: 84612,
  tiendasActivas: 409,
  tiendasCatalogadas: 410,
  liftPromo: 29.3, // Lift promo Mayo vs May-25
};

const VENTAS_MES = [
  { mes: "Ene", u2025: 2879, u2026: 2994, var: 4.0 },
  { mes: "Feb", u2025: 2510, u2026: 2775, var: 10.6 },
  { mes: "Mar", u2025: 2656, u2026: 2867, var: 7.9 },
  { mes: "Abr", u2025: 2270, u2026: 2714, var: 19.6 },
  { mes: "May", u2025: 2489, u2026: 3219, var: 29.3 },
  { mes: "Jun", u2025: 2576, u2026: 2894, var: 12.3 },
];

// Estimado PVP por SKU: Rod 27.5 · CW 22.5 · Chich 58 · Street 47
const PRODUCTOS_YTD = [
  { corto: "Rodajitas",      uds26: 5230, uds25: 4894, varYtd: 6.9,  pctTotal: 29.9, mxn26: 143825, mxn25: 134585, varMxn: 6.9 },
  { corto: "Chicharrón",     uds26: 4345, uds25: 3601, varYtd: 20.7, pctTotal: 24.9, mxn26: 252010, mxn25: 208858, varMxn: 20.7 },
  { corto: "Classic White",  uds26: 4190, uds25: 3581, varYtd: 17.0, pctTotal: 24.0, mxn26: 94275,  mxn25: 80573,  varMxn: 17.0 },
  { corto: "Street Elote",   uds26: 3698, uds25: 3304, varYtd: 11.9, pctTotal: 21.2, mxn26: 173806, mxn25: 155288, varMxn: 11.9 },
];

const PIVOTE_MENSUAL = [
  { mes: "Ene", u26: 2994, u25: 2879 },
  { mes: "Feb", u26: 2775, u25: 2510 },
  { mes: "Mar", u26: 2867, u25: 2656 },
  { mes: "Abr", u26: 2714, u25: 2270 },
  { mes: "May", u26: 3219, u25: 2489 },
  { mes: "Jun", u26: 2894, u25: 2576 },
];

const PIE_COLORS = ["#ea580c", "#f97316", "#fb923c", "#fdba74"];

// Promo Mayo (mecánicas reales): 20% desc en 3 SKUs + 2x$30 Classic White
const PROMO_DATA = [
  { sku: "Street Elote 125g", mec: "20% desc",   may25: 531, abr26: 558, may26: 791, lift: 49.0, pvp: 47.0 },
  { sku: "Classic White 25g", mec: "2x$30",      may25: 563, abr26: 643, may26: 781, lift: 38.7, pvp: 22.5 },
  { sku: "Chicharrón 75g",    mec: "20% desc",   may25: 630, abr26: 715, may26: 774, lift: 22.9, pvp: 58.0 },
  { sku: "Rodajitas 30g",     mec: "20% desc",   may25: 765, abr26: 798, may26: 873, lift: 14.1, pvp: 27.5 },
];

const PROMO_TOTAL = {
  may25: 2489,
  abr26: 2714,
  may26: 3219,
  liftVsMay25: 29.3,
  liftVsAbr26: 18.6,
  deltaPvp: 4652,
  deltaUds: 730,
};

// Junio: mes SIN promo que sostuvo el nivel elevado por la promo de mayo
const JUNIO = {
  uds26: 2894,
  uds25: 2576,
  yoy: 12.3,
  promedioEneAbr: 2838, // promedio Ene-Abr 2026
  porSku: [
    { corto: "Rodajitas",     jun25: 735, jun26: 883, yoy: 20.1 },
    { corto: "Chicharrón",    jun25: 660, jun26: 757, yoy: 14.7 },
    { corto: "Street Elote",  jun25: 518, jun26: 661, yoy: 27.6 },
    { corto: "Classic White", jun25: 663, jun26: 593, yoy: -10.6 },
  ],
};

// Próximo salto: promo confirmada en JULIO (y otra en septiembre)
const PROXIMO = {
  udsPiso: 4863,        // existencia en piso, catalogadas, core (jun)
  tiendasConStock: 407, // de 410 ya tienen producto
  stockCedis: 4396,     // stock CEDIS core disponible
  upsideUdsMes: 730,    // repetir el delta que dejó la promo de mayo
  upsidePvpMes: 4652,
  zonasStock: [
    { zona: "NOROESTE",  uds: 1516 },
    { zona: "NORTE",     uds: 1153 },
    { zona: "OCCIDENTE", uds: 1027 },
    { zona: "PENÍNSULA", uds: 553 },
    { zona: "METRO",     uds: 373 },
    { zona: "SUR",       uds: 241 },
  ],
};

/* ================================================================
   HELPERS
   ================================================================ */

const fmtU = (n: number) =>
  n.toLocaleString("es-MX", { maximumFractionDigits: 0 });
const fmtPct = (n: number) => (n >= 0 ? "+" : "") + n.toFixed(1) + "%";
const fmtPVP = (n: number) =>
  "$" + n.toLocaleString("es-MX", { maximumFractionDigits: 0 });

const VarBadge = ({ v }: { v: number }) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
      v >= 0
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {v >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
    {fmtPct(v)}
  </span>
);

/* ================================================================
   SLIDE 1 — PORTADA
   ================================================================ */

function Slide1() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-orange-50 to-orange-100">
      <Image
        src="/4buddies-logo.jpeg"
        alt="4BUDDIES"
        width={180}
        height={180}
        className="h-24 w-auto mb-6 rounded-xl shadow-lg"
      />
      <h1 className="text-3xl font-extrabold text-orange-900 mb-1 text-center">
        Update Ejecutivo — 4BUDDIES x FDA
      </h1>
      <p className="text-orange-600 text-lg mb-1">
        Farmacias del Ahorro
      </p>
      <p className="text-orange-500 text-sm mb-6">
        Cierre al 30-Junio 2026 | 410 tiendas catalogadas | 4 SKUs core
      </p>

      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        <div className="bg-white rounded-xl shadow border border-orange-200 px-5 py-4 text-center min-w-[170px]">
          <p className="text-xs text-orange-500 font-medium mb-1">Unidades YTD</p>
          <p className="text-2xl font-extrabold text-orange-900">{fmtU(KPI.udsYtd26)}</p>
          <div className="mt-1"><VarBadge v={KPI.varUds} /></div>
        </div>
        <div className="bg-white rounded-xl shadow border border-orange-200 px-5 py-4 text-center min-w-[170px]">
          <p className="text-xs text-orange-500 font-medium mb-1">Venta MXN YTD</p>
          <p className="text-2xl font-extrabold text-orange-900">{fmtPVP(KPI.estMxn26)}</p>
          <div className="mt-1"><VarBadge v={KPI.varMxn} /></div>
        </div>
        <div className="bg-white rounded-xl shadow border border-orange-200 px-5 py-4 text-center min-w-[170px]">
          <p className="text-xs text-orange-500 font-medium mb-1">Tiendas activas</p>
          <p className="text-2xl font-extrabold text-orange-900">{KPI.tiendasActivas} / {KPI.tiendasCatalogadas}</p>
          <span className="text-xs text-orange-500">99.8% penetración</span>
        </div>
        <div className="bg-white rounded-xl shadow border border-green-300 px-5 py-4 text-center min-w-[170px]">
          <p className="text-xs text-green-600 font-medium mb-1">Junio sin promo</p>
          <p className="text-2xl font-extrabold text-green-700">+{JUNIO.yoy.toFixed(1)}%</p>
          <span className="text-xs text-green-600">crecimiento base vs 2025</span>
        </div>
      </div>

      <div className="bg-white border-l-4 border-orange-600 rounded px-5 py-3 shadow max-w-3xl">
        <p className="text-sm text-orange-900 font-semibold mb-1">Agenda</p>
        <p className="text-xs text-gray-600">
          1) KPIs YTD &nbsp;·&nbsp; 2) Tendencia Mensual &nbsp;·&nbsp; 3) Impacto Promo Mayo &nbsp;·&nbsp; 4) Próximo Salto: Julio
        </p>
      </div>

      <p className="text-[10px] text-gray-400 mt-4">
        Estimado PVP: precio de anaquel referencial, no facturación real. Solo unidades — FDA no reporta monto en pesos.
      </p>
    </div>
  );
}

/* ================================================================
   SLIDE 2 — KPIs YTD + VENTA POR PRODUCTO
   ================================================================ */

function Slide2() {
  return (
    <div className="flex flex-col h-full p-6 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="flex items-center gap-3 mb-1">
        <Image src="/4buddies-logo.jpeg" alt="" width={40} height={40} className="h-8 w-auto rounded-lg" />
        <h2 className="text-xl font-extrabold text-orange-900">
          ¿Cómo vamos? — KPIs YTD 2026 vs 2025
        </h2>
      </div>
      <p className="text-xs text-orange-500 mb-3">
        Ene → Jun (6 meses cerrados) | 410 tiendas catalogadas | 4 SKUs core | Venta MXN estimada PVP
      </p>

      {/* KPIs row */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-white rounded-xl shadow border border-orange-200 p-4">
          <p className="text-[11px] text-orange-500 font-medium mb-1">Unidades YTD 2026</p>
          <p className="text-3xl font-extrabold text-orange-900">{fmtU(KPI.udsYtd26)}</p>
          <p className="text-xs text-gray-500 mt-1">vs {fmtU(KPI.udsYtd25)} en 2025</p>
          <div className="mt-2"><VarBadge v={KPI.varUds} /></div>
        </div>
        <div className="bg-white rounded-xl shadow border-2 border-orange-400 p-4">
          <p className="text-[11px] text-orange-600 font-medium mb-1">Venta MXN YTD 2026</p>
          <p className="text-3xl font-extrabold text-orange-900">{fmtPVP(KPI.estMxn26)}</p>
          <p className="text-xs text-gray-500 mt-1">vs {fmtPVP(KPI.estMxn25)} en 2025 mismo periodo</p>
          <div className="mt-2"><VarBadge v={KPI.varMxn} /></div>
        </div>
        <div className="bg-white rounded-xl shadow border border-orange-200 p-4">
          <p className="text-[11px] text-orange-500 font-medium mb-1">SKUs core activos</p>
          <p className="text-3xl font-extrabold text-orange-900">4 / 4</p>
          <p className="text-xs text-gray-500 mt-1">todos crecen vs 2025</p>
          <p className="text-[10px] text-green-600 mt-2 font-semibold">portafolio sano</p>
        </div>
        <div className="bg-white rounded-xl shadow border border-green-300 p-4">
          <p className="text-[11px] text-green-600 font-medium mb-1">Penetración tiendas</p>
          <p className="text-3xl font-extrabold text-green-700">99.8%</p>
          <p className="text-xs text-gray-500 mt-1">{KPI.tiendasActivas} de {KPI.tiendasCatalogadas} activas</p>
          <p className="text-[10px] text-green-600 mt-2 font-semibold">solo 1 sin venta</p>
        </div>
      </div>

      {/* Pivote mensual + Pie */}
      <div className="flex gap-3 flex-1 min-h-0">
        {/* Tabla pivote mensual */}
        <div className="flex-1 bg-white rounded-xl shadow border border-orange-200 p-3 overflow-auto">
          <p className="text-sm font-bold text-orange-900 mb-2">Unidades Mensuales — 2026 vs 2025</p>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-orange-600 text-white">
                <th className="p-1.5 text-left rounded-tl-lg">Mes</th>
                <th className="p-1.5 text-right">Uds 2026</th>
                <th className="p-1.5 text-right">Uds 2025</th>
                <th className="p-1.5 text-right rounded-tr-lg">Var</th>
              </tr>
            </thead>
            <tbody>
              {PIVOTE_MENSUAL.map((m, i) => {
                const varUds = ((m.u26 - m.u25) / m.u25) * 100;
                return (
                  <tr key={i} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                    <td className="p-1.5 font-semibold">{m.mes}</td>
                    <td className="p-1.5 text-right font-bold">{fmtU(m.u26)}</td>
                    <td className="p-1.5 text-right text-gray-500">{fmtU(m.u25)}</td>
                    <td className="p-1.5 text-right"><VarBadge v={varUds} /></td>
                  </tr>
                );
              })}
              <tr className="bg-orange-100 font-bold border-t-2 border-orange-300">
                <td className="p-1.5">YTD</td>
                <td className="p-1.5 text-right">{fmtU(KPI.udsYtd26)}</td>
                <td className="p-1.5 text-right">{fmtU(KPI.udsYtd25)}</td>
                <td className="p-1.5 text-right"><VarBadge v={KPI.varUds} /></td>
              </tr>
            </tbody>
          </table>
          <p className="text-[10px] text-gray-400 mt-2">
            6 meses cerrados (Ene–Jun) | Total MXN 2026 visible en el KPI superior
          </p>
        </div>

        {/* Pie chart + insight crecimiento */}
        <div className="w-[360px] bg-white rounded-xl shadow border border-orange-200 p-3 flex flex-col">
          <p className="text-sm font-bold text-orange-900 mb-1">Participación por Producto</p>
          <p className="text-[10px] text-orange-500 mb-1">% Unidades YTD 2026</p>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PRODUCTOS_YTD.map(p => ({ name: p.corto, value: p.uds26 }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={{ strokeWidth: 1 }}
                  fontSize={10}
                >
                  {PRODUCTOS_YTD.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => fmtU(v) + " uds"} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 bg-green-50 border border-green-300 rounded p-2 text-[11px]">
            <p className="font-bold text-green-700 mb-1">🚀 Mayor crecimiento YoY</p>
            <div className="space-y-0.5 text-gray-700">
              <p>• <strong>Chicharrón</strong> <span className="text-green-700 font-bold">+20.7%</span></p>
              <p>• <strong>Classic White</strong> <span className="text-green-700 font-bold">+17.0%</span></p>
              <p className="text-[10px] text-gray-500 mt-1">Motores del crecimiento del portafolio · los 4 SKUs crecen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 3 — TENDENCIA MENSUAL 2025 vs 2026
   ================================================================ */

function Slide3() {
  return (
    <div className="flex flex-col h-full p-6 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="flex items-center gap-3 mb-1">
        <Image src="/4buddies-logo.jpeg" alt="" width={40} height={40} className="h-8 w-auto rounded-lg" />
        <h2 className="text-xl font-extrabold text-orange-900">
          Sell-Out Mensual — 2025 vs 2026
        </h2>
      </div>
      <p className="text-xs text-orange-500 mb-3">
        Solo unidades — 4 SKUs core | 410 tiendas catalogadas | Junio mes completo
      </p>

      <div className="flex gap-4 flex-1 min-h-0">
        <div className="flex-1 bg-white rounded-xl shadow border border-orange-200 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={VENTAS_MES} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fde8d0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 3500]} />
              <Tooltip formatter={(v: number) => fmtU(v) + " uds"} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="u2025" name="2025" fill="#fdba74" radius={[4, 4, 0, 0]} />
              <Bar dataKey="u2026" name="2026" fill="#ea580c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-[340px] bg-white rounded-xl shadow border border-orange-200 p-3 overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-orange-600 text-white">
                <th className="p-2 text-left rounded-tl-lg">Mes</th>
                <th className="p-2 text-right">2025</th>
                <th className="p-2 text-right">2026</th>
                <th className="p-2 text-right rounded-tr-lg">Var %</th>
              </tr>
            </thead>
            <tbody>
              {VENTAS_MES.map((m, i) => (
                <tr key={i} className={i === 5 ? "bg-green-50 border-l-4 border-green-500" : i % 2 === 0 ? "bg-orange-50" : ""}>
                  <td className="p-2 font-semibold">{m.mes}</td>
                  <td className="p-2 text-right">{fmtU(m.u2025)}</td>
                  <td className="p-2 text-right font-bold">{fmtU(m.u2026)}</td>
                  <td className="p-2 text-right"><VarBadge v={m.var} /></td>
                </tr>
              ))}
              <tr className="bg-orange-100 font-bold border-t-2 border-orange-300">
                <td className="p-2">YTD</td>
                <td className="p-2 text-right">{fmtU(KPI.udsYtd25)}</td>
                <td className="p-2 text-right">{fmtU(KPI.udsYtd26)}</td>
                <td className="p-2 text-right"><VarBadge v={KPI.varUds} /></td>
              </tr>
            </tbody>
          </table>
          <div className="mt-3 text-[10px] text-gray-500 space-y-1">
            <p><strong>Jun:</strong> mes completo 2026 vs 2025, <strong>sin promoción</strong></p>
            <p>Junio sostuvo +12.3% YoY sin mecánica activa → la venta base subió de nivel</p>
          </div>
        </div>
      </div>

      <div className="mt-3 bg-green-50 border border-green-300 rounded-lg px-4 py-2 text-xs text-green-800">
        <strong>✓ Tendencia:</strong> 6 meses consecutivos por arriba de 2025. Mayo despegó con promo (+29.3%) y Junio <strong>sostuvo el nivel sin promoción</strong> (+12.3%): la promo dejó una base de venta más alta. Con la promo de Julio confirmada, el siguiente escalón está a la vista.
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 4 — IMPACTO PROMO MAYO
   ================================================================ */

function Slide4() {
  const chartData = PROMO_DATA.map(p => ({
    sku: p.sku.split(" ")[0],
    May25: p.may25,
    Abr26: p.abr26,
    May26: p.may26,
  }));

  return (
    <div className="flex flex-col h-full p-6 bg-gradient-to-br from-green-50 to-orange-50">
      <div className="flex items-center gap-3 mb-1">
        <Image src="/4buddies-logo.jpeg" alt="" width={40} height={40} className="h-8 w-auto rounded-lg" />
        <h2 className="text-xl font-extrabold text-orange-900 flex items-center gap-2">
          <Sparkles size={22} className="text-green-600" />
          Impacto de la Promoción de Mayo
        </h2>
      </div>
      <p className="text-xs text-orange-500 mb-3">
        Mecánicas activas: 20% desc (3 SKUs) + 2x$30 (Classic White) | Mayo mes completo vs 2025
      </p>

      {/* KPIs row */}
      <div className="grid grid-cols-4 gap-3 mb-3">
        <div className="bg-white rounded-xl shadow border-2 border-green-400 p-3 text-center">
          <p className="text-[10px] text-green-600 font-medium">Lift vs May-25</p>
          <p className="text-3xl font-extrabold text-green-700">+{PROMO_TOTAL.liftVsMay25.toFixed(1)}%</p>
          <p className="text-[10px] text-gray-500">{fmtU(PROMO_TOTAL.may25)} → {fmtU(PROMO_TOTAL.may26)} uds</p>
        </div>
        <div className="bg-white rounded-xl shadow border border-orange-200 p-3 text-center">
          <p className="text-[10px] text-orange-500 font-medium">Lift vs Abr-26</p>
          <p className="text-3xl font-extrabold text-orange-700">+{PROMO_TOTAL.liftVsAbr26.toFixed(1)}%</p>
          <p className="text-[10px] text-gray-500">mes previo sin promo</p>
        </div>
        <div className="bg-white rounded-xl shadow border border-orange-200 p-3 text-center">
          <p className="text-[10px] text-orange-500 font-medium">Δ Estimado PVP</p>
          <p className="text-3xl font-extrabold text-orange-900">+{fmtPVP(PROMO_TOTAL.deltaPvp)}</p>
          <p className="text-[10px] text-gray-500">vs mismo periodo 2025</p>
        </div>
        <div className="bg-white rounded-xl shadow border border-orange-200 p-3 text-center">
          <p className="text-[10px] text-orange-500 font-medium">SKUs en promo</p>
          <p className="text-3xl font-extrabold text-orange-900">4 / 4</p>
          <p className="text-[10px] text-green-600 font-semibold">todos crecieron</p>
        </div>
      </div>

      <div className="flex gap-3 flex-1 min-h-0">
        {/* Chart */}
        <div className="flex-1 bg-white rounded-xl shadow border border-orange-200 p-3">
          <p className="text-xs font-bold text-orange-900 mb-1">Unidades vendidas — comparativo por SKU</p>
          <ResponsiveContainer width="100%" height="92%">
            <BarChart data={chartData} barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fde8d0" />
              <XAxis dataKey="sku" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: number) => fmtU(v) + " uds"} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="May25" name="May-25" fill="#fdba74" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Abr26" name="Abr-26" fill="#fb923c" radius={[3, 3, 0, 0]} />
              <Bar dataKey="May26" name="May-26 PROMO" fill="#16a34a" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabla SKU detalle */}
        <div className="w-[420px] bg-white rounded-xl shadow border border-orange-200 p-3">
          <p className="text-xs font-bold text-orange-900 mb-2">Detalle por SKU</p>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="bg-orange-600 text-white">
                <th className="p-1.5 text-left rounded-tl-lg">SKU</th>
                <th className="p-1.5 text-left">Mec</th>
                <th className="p-1.5 text-right">May-25</th>
                <th className="p-1.5 text-right">May-26</th>
                <th className="p-1.5 text-right rounded-tr-lg">Lift</th>
              </tr>
            </thead>
            <tbody>
              {PROMO_DATA.map((p, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                  <td className="p-1.5 font-semibold">{p.sku.replace(" 125g","").replace(" 25g","").replace(" 30g","").replace(" 75g","")}</td>
                  <td className="p-1.5 text-gray-600">{p.mec}</td>
                  <td className="p-1.5 text-right text-gray-500">{fmtU(p.may25)}</td>
                  <td className="p-1.5 text-right font-bold">{fmtU(p.may26)}</td>
                  <td className="p-1.5 text-right"><VarBadge v={p.lift} /></td>
                </tr>
              ))}
              <tr className="bg-green-100 font-bold border-t-2 border-green-400">
                <td className="p-1.5" colSpan={2}>TOTAL</td>
                <td className="p-1.5 text-right">{fmtU(PROMO_TOTAL.may25)}</td>
                <td className="p-1.5 text-right">{fmtU(PROMO_TOTAL.may26)}</td>
                <td className="p-1.5 text-right"><VarBadge v={PROMO_TOTAL.liftVsMay25} /></td>
              </tr>
            </tbody>
          </table>

          <div className="mt-3 space-y-1.5 text-[11px]">
            <p className="flex items-start gap-2">
              <span className="text-green-600 font-bold">★</span>
              <span><strong>Street Elote 125g</strong> es el gran ganador: +50.8% vs 2025. El 20% desc en SKU premium funciona muy bien.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-600 font-bold">★</span>
              <span><strong>Classic White</strong> respondió fuerte al 2x$30 (+46%). La mecánica de pack genera ticket más alto.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 bg-green-100 border-2 border-green-400 rounded-lg px-4 py-2.5 text-xs text-green-900">
        <strong className="text-sm">🎯 Conclusión:</strong> Las promociones de mayo funcionaron en los 4 SKUs sin excepción.
        Generaron <strong>+{fmtU(PROMO_TOTAL.deltaUds)} unidades</strong> y <strong>+{fmtPVP(PROMO_TOTAL.deltaPvp)}</strong> de venta incremental vs 2025.
        Y lo mejor: en <strong>junio, sin promo, la venta se mantuvo elevada (+12.3% YoY)</strong> — la mecánica es la mejor evidencia para repetir en Julio y Septiembre.
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 5 — OPORTUNIDAD DE ACTIVACIÓN (Próximo Salto)
   ================================================================ */

function Slide5() {
  return (
    <div className="flex flex-col h-full p-6 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="flex items-center gap-3 mb-1">
        <Image src="/4buddies-logo.jpeg" alt="" width={40} height={40} className="h-8 w-auto rounded-lg" />
        <h2 className="text-xl font-extrabold text-orange-900 flex items-center gap-2">
          <Target size={22} className="text-orange-600" />
          Próximo Salto — Promoción de Julio
        </h2>
      </div>
      <p className="text-xs text-orange-500 mb-3">
        Inventario al 30-Jun | 410 tiendas catalogadas | Listos para repetir la mecánica ganadora de Mayo
      </p>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3 mb-3">
        <div className="bg-white rounded-xl shadow border border-green-300 p-3 text-center">
          <p className="text-[10px] text-green-600 font-medium">Tiendas con producto</p>
          <p className="text-3xl font-extrabold text-green-700">{PROXIMO.tiendasConStock}<span className="text-lg">/410</span></p>
          <p className="text-[10px] text-green-600 font-semibold">ya tienen stock en piso</p>
        </div>
        <div className="bg-white rounded-xl shadow border border-orange-200 p-3 text-center">
          <p className="text-[10px] text-orange-500 font-medium">Unidades en piso</p>
          <p className="text-3xl font-extrabold text-orange-900">{fmtU(PROXIMO.udsPiso)}</p>
          <p className="text-[10px] text-gray-500">producto disponible para vender</p>
        </div>
        <div className="bg-white rounded-xl shadow border border-green-300 p-3 text-center">
          <p className="text-[10px] text-green-600 font-medium">Stock CEDIS disponible</p>
          <p className="text-3xl font-extrabold text-green-700">{fmtU(PROXIMO.stockCedis)}</p>
          <p className="text-[10px] text-green-600 font-semibold">respaldo para resurtir</p>
        </div>
        <div className="bg-white rounded-xl shadow border-2 border-green-400 p-3 text-center">
          <p className="text-[10px] text-green-600 font-medium">Upside que dejó Mayo</p>
          <p className="text-3xl font-extrabold text-green-700">~{fmtU(PROXIMO.upsideUdsMes)}</p>
          <p className="text-[10px] text-green-600 font-semibold">uds incrementales repetibles</p>
        </div>
      </div>

      <div className="flex gap-3 flex-1 min-h-0">
        {/* Zonas */}
        <div className="flex-1 bg-white rounded-xl shadow border border-orange-200 p-3">
          <p className="text-xs font-bold text-orange-900 mb-2">Producto en piso por Zona — Base lista para activar</p>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={PROXIMO.zonasStock} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#fde8d0" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="zona" tick={{ fontSize: 11 }} width={80} />
              <Tooltip formatter={(v: number) => fmtU(v) + " uds"} />
              <Bar dataKey="uds" name="Uds en piso" fill="#f97316" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Insights simples */}
        <div className="w-[440px] flex flex-col gap-3">
          <div className="bg-white rounded-xl shadow border-2 border-green-400 p-4 flex-1 flex flex-col justify-center">
            <p className="text-sm font-bold text-green-700 mb-3 flex items-center gap-1">
              <Zap size={16} /> Lo que vemos
            </p>
            <div className="space-y-3 text-sm text-gray-800">
              <p>El producto <strong>ya está en piso</strong> en 407 de 410 tiendas.</p>
              <p>Mayo demostró que <strong>cuando se activa, vende</strong> (+29.3%) y Junio sostuvo el nivel.</p>
              <p className="text-green-700 font-semibold">→ Con promo en Julio, esperamos el próximo salto.</p>
            </div>
          </div>

          <div className="bg-orange-600 text-white rounded-xl shadow p-4">
            <p className="text-xs font-bold mb-2">Próximos pasos</p>
            <div className="space-y-1.5 text-sm">
              <p>• <strong>Julio:</strong> repetir mecánica ganadora (20% desc + 2x$30)</p>
              <p>• Reforzar exhibición en <strong>Noroeste + Norte + Occidente</strong></p>
              <p>• Stock CEDIS suficiente, <strong>no hay que comprar</strong></p>
              <p>• Preparar segunda ola para <strong>Septiembre</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN — CAROUSEL
   ================================================================ */

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5];
const SLIDE_NAMES = [
  "Portada",
  "KPIs YTD",
  "Tendencia Mensual",
  "Impacto Promo",
  "Próximo Salto",
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => Math.min(c + 1, SLIDES.length - 1)),
    [],
  );
  const prev = useCallback(
    () => setCurrent((c) => Math.max(c - 1, 0)),
    [],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const CurrentSlide = SLIDES[current];

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-950 p-4">
      <div className="relative w-[1280px] aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-orange-700">
        <CurrentSlide />

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-orange-900/90 backdrop-blur rounded-full px-4 py-1.5 shadow-lg flex items-center gap-3">
          <button
            onClick={prev}
            disabled={current === 0}
            className="text-white disabled:opacity-30 hover:text-orange-300 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current
                    ? "bg-orange-400 w-6"
                    : "bg-orange-700 hover:bg-orange-500"
                }`}
                title={SLIDE_NAMES[i]}
              />
            ))}
          </div>

          <span className="text-orange-300 text-xs font-mono min-w-[40px] text-center">
            {current + 1}/{SLIDES.length}
          </span>

          <button
            onClick={next}
            disabled={current === SLIDES.length - 1}
            className="text-white disabled:opacity-30 hover:text-orange-300 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
