"use client";
import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Store,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
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
   DATA CONSTANTS — FDA Mayo 2026 (solo venta, sin inventario)
   Datos: Ene 2024 – Abr 2026 | Solo 410 tiendas catalogadas
   ================================================================ */

const KPI = {
  udsYtd26: 11350,
  udsYtd25: 10315,
  varUds: 10.0,
  estPvp26: 427669,
  tiendasActivas: 409,
  tiendasCatalogadas: 410,
};

const VENTAS_MES = [
  { mes: "Ene", u2025: 2879, u2026: 2994 },
  { mes: "Feb", u2025: 2510, u2026: 2775 },
  { mes: "Mar", u2025: 2656, u2026: 2867 },
  { mes: "Abr", u2025: 2270, u2026: 2714 },
  { mes: "May", u2025: 2489, u2026: 0 },
  { mes: "Jun", u2025: 2576, u2026: 0 },
  { mes: "Jul", u2025: 2675, u2026: 0 },
  { mes: "Ago", u2025: 2520, u2026: 0 },
  { mes: "Sep", u2025: 2622, u2026: 0 },
  { mes: "Oct", u2025: 2769, u2026: 0 },
  { mes: "Nov", u2025: 3049, u2026: 0 },
  { mes: "Dic", u2025: 2714, u2026: 0 },
];

const PRODUCTOS = [
  {
    nombre: "Rodajitas Spicy Limón 30g",
    corto: "Rodajitas",
    upc: "7500462860042",
    uds26: 3474,
    uds25: 3394,
    var: 2.4,
    pctTotal: 30.6,
    tend3m: [909, 921, 798],
    precioPvp: 27.5,
  },
  {
    nombre: "Chicharrón de Cerdo 75g",
    corto: "Chicharrón",
    upc: "7503028921317",
    uds26: 2814,
    uds25: 2311,
    var: 21.8,
    pctTotal: 24.8,
    tend3m: [681, 667, 715],
    precioPvp: 58.0,
  },
  {
    nombre: "Palomitas Classic White 25g",
    corto: "Classic White",
    upc: "7500462417833",
    uds26: 2816,
    uds25: 2355,
    var: 19.6,
    pctTotal: 24.8,
    tend3m: [661, 700, 643],
    precioPvp: 22.5,
  },
  {
    nombre: "Palomitas Street Elote 125g",
    corto: "Street Elote",
    upc: "7500462860004",
    uds26: 2246,
    uds25: 2255,
    var: -0.4,
    pctTotal: 19.8,
    tend3m: [524, 579, 558],
    precioPvp: 47.0,
  },
];

const PIE_PRODUCTOS = PRODUCTOS.map((p) => ({ name: p.corto, value: p.uds26 }));
const PIE_COLORS = ["#ea580c", "#f97316", "#fb923c", "#fdba74"];

const ZONAS = [
  { zona: "NORTE", u25: 4353, u26: 4231, var: -2.8 },
  { zona: "OCCIDENTE", u25: 1736, u26: 1958, var: 12.8 },
  { zona: "PENINSULA", u25: 1292, u26: 1613, var: 24.8 },
  { zona: "PACIFICO", u25: 1760, u26: 1227, var: -30.3 },
  { zona: "METRO", u25: 564, u26: 840, var: 48.9 },
  { zona: "NOROESTE", u25: 0, u26: 824, var: 0 },
  { zona: "CENTRO - SUR", u25: 610, u26: 560, var: -8.2 },
  { zona: "SUR", u25: 0, u26: 97, var: 0 },
];

const TOP20_TIENDAS = [
  { tienda: "CLOUTHIER", code: "LGCL", zona: "OCCIDENTE", plaza: "LEON", uds: 140, estPvp: 4549 },
  { tienda: "CELENES", code: "CLCL", zona: "PACIFICO", plaza: "CULIACAN", uds: 124, estPvp: 3514 },
  { tienda: "MEDITERRANEO", code: "MAME", zona: "PACIFICO", plaza: "MAZATLAN", uds: 117, estPvp: 4846 },
  { tienda: "OBISPADO", code: "MTHD", zona: "NORTE", plaza: "MTY ORIENTE", uds: 114, estPvp: 3795 },
  { tienda: "CORPORATIVO", code: "MTCW", zona: "NORTE", plaza: "MTY ORIENTE", uds: 97, estPvp: 3425 },
  { tienda: "GLORIETA CALZADA", code: "MTGT", zona: "NORTE", plaza: "MTY ORIENTE", uds: 93, estPvp: 3272 },
  { tienda: "PROL CAMPESTRE", code: "LGPC", zona: "OCCIDENTE", plaza: "LEON", uds: 88, estPvp: 2556 },
  { tienda: "ROBERTO GARZA SADA", code: "MTRS", zona: "NORTE", plaza: "MTY ORIENTE", uds: 87, estPvp: 2739 },
  { tienda: "DZITYA REAL MONTEJO", code: "MEDZ", zona: "PENINSULA", plaza: "MERIDA", uds: 82, estPvp: 2621 },
  { tienda: "CALZADA", code: "MTCA", zona: "NORTE", plaza: "NUEVA 2025", uds: 82, estPvp: 2893 },
  { tienda: "LUIS BARRAGAN", code: "MXBN", zona: "METRO", plaza: "MEXICO CENTRO", uds: 81, estPvp: 3635 },
  { tienda: "COLOSIO", code: "CNCL", zona: "PENINSULA", plaza: "CANCUN", uds: 80, estPvp: 3376 },
  { tienda: "UMA", code: "MTUA", zona: "NORTE", plaza: "MTY ORIENTE", uds: 79, estPvp: 2501 },
  { tienda: "PLAZA 404", code: "MTP4", zona: "NORTE", plaza: "MTY ORIENTE", uds: 76, estPvp: 2566 },
  { tienda: "VALLE ALTO", code: "MTVL", zona: "NORTE", plaza: "MTY ORIENTE", uds: 76, estPvp: 2458 },
  { tienda: "VASCONCELOS PONIENTE", code: "MTVP", zona: "NORTE", plaza: "MTY ORIENTE", uds: 72, estPvp: 2344 },
  { tienda: "COCOYOLES AQUA", code: "MECY", zona: "PENINSULA", plaza: "MERIDA", uds: 67, estPvp: 2968 },
  { tienda: "RICARDO MARGAIN", code: "MTAI", zona: "NORTE", plaza: "MONTERREY", uds: 64, estPvp: 2166 },
  { tienda: "ANTONIO ROSALES", code: "CLAR", zona: "PACIFICO", plaza: "CULIACAN", uds: 63, estPvp: 2472 },
  { tienda: "DEGOLLADO", code: "LRDG", zona: "NORTE", plaza: "NUEVO LAREDO", uds: 63, estPvp: 1979 },
];

const OPORTUNIDADES = {
  tiendasNoCatVendiendo: 266,
  udsNoCat: 1928,
  pctNoCat: 14.5,
  top5NoCat: [
    { tienda: "LAS MERCEDES", code: "SAME", uds: 125 },
    { tienda: "EJERCITO", code: "JZEJ", uds: 56 },
    { tienda: "COSTA AZUL", code: "ACCA", uds: 52 },
    { tienda: "CARRETERA NACIONAL", code: "MTCN", uds: 43 },
    { tienda: "PROL JALISCO", code: "MMPJ", uds: 36 },
  ],
};

const PLAN_ACCION = {
  urgente: [
    {
      accion: "Revisar surtido Pacífico",
      detalle: "Zona cayó -30.3% YoY — Culiacán y Mazatlán lideran pero la zona pierde fuerza",
      impacto: "Recuperar ~530 uds/cuatrimestre",
    },
    {
      accion: "Monitorear Street Elote",
      detalle: "Único SKU plano (-0.4%). Verificar exhibición y rotación en tiendas top",
      impacto: "Proteger 20% de la venta",
    },
  ],
  estaSemana: [
    {
      accion: "Reforzar Centro-Sur",
      detalle: "Zona cayó -8.2% YoY — revisar disponibilidad y surtido",
      impacto: "Estabilizar 560 uds/cuatrimestre",
    },
    {
      accion: "Investigar caída Rodajitas Abr",
      detalle: "Rodajitas bajó de 921 (Mar) a 798 (Abr) — tendencia a monitorear",
      impacto: "Rodajitas es 30.6% de la venta total",
    },
  ],
  esteMes: [
    {
      accion: "Catalogar top 10 tiendas no catalogadas",
      detalle: "266 tiendas venden sin catálogo formal — 14.7% de la venta total",
      impacto: "+1,928 uds YTD recuperables en catálogo",
    },
    {
      accion: "Capitalizar crecimiento Metro",
      detalle: "Metro creció +48.9% — la mayor alza relativa. Evaluar expansión",
      impacto: "840 uds con momentum positivo",
    },
  ],
  estrategico: [
    {
      accion: "Consolidar Chicharrón y Classic White",
      detalle: "Ambos crecen +20% YoY — los motores de crecimiento del portafolio",
      impacto: "5,630 uds combinadas con tendencia positiva",
    },
    {
      accion: "Evaluar expansión Noroeste",
      detalle: "Zona nueva con 824 uds en primer cuatrimestre — potencial significativo",
      impacto: "Zona en fase de construcción, asegurar cobertura",
    },
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

const PriorBadge = ({ p }: { p: string }) => {
  const colors: Record<string, string> = {
    Urgente: "bg-red-100 text-red-700 border-red-300",
    "Esta semana": "bg-yellow-100 text-yellow-700 border-yellow-300",
    "Este mes": "bg-green-100 text-green-700 border-green-300",
    Estratégico: "bg-blue-100 text-blue-700 border-blue-300",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-semibold border ${
        colors[p] || ""
      }`}
    >
      {p}
    </span>
  );
};

const ZonaBadge = ({ crece }: { crece: boolean }) => (
  <span
    className={`px-2 py-0.5 rounded text-xs font-semibold ${
      crece ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
    }`}
  >
    {crece ? "Crece" : "Cae"}
  </span>
);

const MESES_TEND = ["Feb", "Mar", "Abr"];

/* ================================================================
   SLIDES
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
      <h1 className="text-3xl font-extrabold text-orange-900 mb-1">
        Reporte de Ventas — 4BUDDIES x FDA
      </h1>
      <p className="text-orange-600 text-lg mb-1">
        Farmacias del Ahorro
      </p>
      <p className="text-orange-500 text-sm mb-6">
        Enero – Abril 2026 | 410 tiendas catalogadas
      </p>

      <div className="flex gap-4 mb-6">
        {[
          {
            label: "Unidades YTD",
            value: fmtU(KPI.udsYtd26),
            sub: <VarBadge v={KPI.varUds} />,
          },
          {
            label: "Est. PVP YTD",
            value: fmtPVP(KPI.estPvp26),
            sub: <span className="text-[10px] text-gray-400">precio anaquel estimado</span>,
          },
          {
            label: "Tiendas activas",
            value: `${KPI.tiendasActivas} / ${KPI.tiendasCatalogadas}`,
            sub: <span className="text-xs text-orange-500">catalogadas</span>,
          },
          {
            label: "SKUs Core",
            value: "4",
            sub: <span className="text-xs text-orange-500">activos</span>,
          },
        ].map((k, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow border border-orange-200 px-5 py-4 text-center min-w-[160px]"
          >
            <p className="text-xs text-orange-500 font-medium mb-1">
              {k.label}
            </p>
            <p className="text-2xl font-extrabold text-orange-900">
              {k.value}
            </p>
            <div className="mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-gray-400">
        * Estimado PVP: precio de anaquel estimado, no facturación real. Solo unidades — FDA no reporta monto en pesos.
      </p>
    </div>
  );
}

function Slide2() {
  const dataMeses = VENTAS_MES.filter((m) => m.u2025 > 0 || m.u2026 > 0);
  const ytd25 = VENTAS_MES.slice(0, 4).reduce((s, m) => s + m.u2025, 0);
  const ytd26 = VENTAS_MES.slice(0, 4).reduce((s, m) => s + m.u2026, 0);

  return (
    <div className="flex flex-col h-full p-6 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="flex items-center gap-3 mb-1">
        <Image src="/4buddies-logo.jpeg" alt="" width={40} height={40} className="h-8 w-auto rounded-lg" />
        <h2 className="text-xl font-extrabold text-orange-900">
          Sell-Out Mensual — 2025 vs 2026
        </h2>
      </div>
      <p className="text-xs text-orange-500 mb-3">
        Solo unidades — FDA no reporta monto en pesos | 410 tiendas catalogadas
      </p>

      <div className="flex gap-4 flex-1 min-h-0">
        <div className="flex-1 bg-white rounded-xl shadow border border-orange-200 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataMeses} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fde8d0" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => fmtU(v)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="u2025" name="2025" fill="#fdba74" radius={[3, 3, 0, 0]} />
              <Bar dataKey="u2026" name="2026" fill="#ea580c" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-[300px] bg-white rounded-xl shadow border border-orange-200 p-3 overflow-auto">
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
              {VENTAS_MES.slice(0, 4).map((m, i) => {
                const v = m.u2025 > 0 ? ((m.u2026 - m.u2025) / m.u2025) * 100 : 0;
                return (
                  <tr key={i} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                    <td className="p-1.5 font-medium">{m.mes}</td>
                    <td className="p-1.5 text-right">{fmtU(m.u2025)}</td>
                    <td className="p-1.5 text-right font-semibold">{fmtU(m.u2026)}</td>
                    <td className="p-1.5 text-right">
                      <VarBadge v={v} />
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-orange-100 font-bold border-t-2 border-orange-300">
                <td className="p-1.5">YTD</td>
                <td className="p-1.5 text-right">{fmtU(ytd25)}</td>
                <td className="p-1.5 text-right">{fmtU(ytd26)}</td>
                <td className="p-1.5 text-right">
                  <VarBadge v={KPI.varUds} />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-3 text-[10px] text-gray-500">
            <p>2025 completo: {fmtU(VENTAS_MES.reduce((s, m) => s + m.u2025, 0))} uds (12 meses)</p>
          </div>
        </div>
      </div>

      <div className="mt-3 bg-orange-100 border border-orange-300 rounded-lg px-4 py-2 text-xs text-orange-800">
        <strong>Accionable:</strong> Pacífico cayó -30.3% YoY → revisar surtido y disponibilidad.
        Metro creció +48.9% → oportunidad de refuerzo con exhibición adicional.
      </div>
    </div>
  );
}

function Slide3() {
  return (
    <div className="flex flex-col h-full p-6 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="flex items-center gap-3 mb-1">
        <Image src="/4buddies-logo.jpeg" alt="" width={40} height={40} className="h-8 w-auto rounded-lg" />
        <h2 className="text-xl font-extrabold text-orange-900">
          Venta por Producto — 4 SKUs Core
        </h2>
      </div>
      <p className="text-xs text-orange-500 mb-3">YTD Ene–Abr 2026 vs 2025 | 410 tiendas catalogadas</p>

      <div className="flex gap-4 flex-1 min-h-0">
        <div className="w-[280px] bg-white rounded-xl shadow border border-orange-200 p-4 flex flex-col">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_PRODUCTOS}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ strokeWidth: 1 }}
                  fontSize={11}
                >
                  {PIE_PRODUCTOS.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => fmtU(v) + " uds"} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-orange-600 mt-2">
            Rodajitas lidera con 30.6% de participación
          </p>
        </div>

        <div className="flex-1 bg-white rounded-xl shadow border border-orange-200 p-3 overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-orange-600 text-white">
                <th className="p-1.5 text-left rounded-tl-lg">Producto</th>
                <th className="p-1.5 text-right">YTD 26</th>
                <th className="p-1.5 text-right">YTD 25</th>
                <th className="p-1.5 text-right">Var</th>
                <th className="p-1.5 text-right">% Part</th>
                <th className="p-1.5 text-center" colSpan={3}>Feb → Mar → Abr</th>
                <th className="p-1.5 text-right rounded-tr-lg">PVP*</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTOS.map((p, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                  <td className="p-1.5 font-medium">{p.corto}</td>
                  <td className="p-1.5 text-right font-semibold">{fmtU(p.uds26)}</td>
                  <td className="p-1.5 text-right text-gray-500">{fmtU(p.uds25)}</td>
                  <td className="p-1.5 text-right"><VarBadge v={p.var} /></td>
                  <td className="p-1.5 text-right">{p.pctTotal}%</td>
                  {p.tend3m.map((t, j) => (
                    <td key={j} className="p-1.5 text-center text-gray-600">{fmtU(t)}</td>
                  ))}
                  <td className="p-1.5 text-right text-gray-400">{fmtPVP(p.precioPvp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-gray-400 mt-2">
            *PVP = Precio estimado de anaquel, no facturación real
          </p>

          <div className="mt-3 space-y-1.5">
            <div className="flex items-start gap-2">
              <TrendingUp size={14} className="text-green-600 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-700">
                <strong>Chicharrón</strong> (+21.8%) y <strong>Classic White</strong> (+19.6%) son los motores de crecimiento del portafolio.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <TrendingDown size={14} className="text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-700">
                <strong>Street Elote</strong> plano (-0.4%) — monitorear exhibición. <strong>Rodajitas</strong> bajó en abril (921→798).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide4() {
  const zonasChart = ZONAS.filter((z) => z.u26 > 0);

  return (
    <div className="flex flex-col h-full p-6 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="flex items-center gap-3 mb-1">
        <Image src="/4buddies-logo.jpeg" alt="" width={40} height={40} className="h-8 w-auto rounded-lg" />
        <h2 className="text-xl font-extrabold text-orange-900">
          Venta por Zona Geográfica
        </h2>
      </div>
      <p className="text-xs text-orange-500 mb-3">YTD Ene–Abr 2026 vs 2025 | Unidades</p>

      <div className="flex gap-4 flex-1 min-h-0">
        <div className="flex-1 bg-white rounded-xl shadow border border-orange-200 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={zonasChart} layout="vertical" barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fde8d0" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="zona" type="category" tick={{ fontSize: 10 }} width={100} />
              <Tooltip formatter={(v: number) => fmtU(v) + " uds"} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="u25" name="2025" fill="#fdba74" radius={[0, 3, 3, 0]} />
              <Bar dataKey="u26" name="2026" fill="#ea580c" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-[420px] bg-white rounded-xl shadow border border-orange-200 p-3 overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-orange-600 text-white">
                <th className="p-1.5 text-left rounded-tl-lg">Zona</th>
                <th className="p-1.5 text-right">2025</th>
                <th className="p-1.5 text-right">2026</th>
                <th className="p-1.5 text-right">Var %</th>
                <th className="p-1.5 text-center rounded-tr-lg">Estado</th>
              </tr>
            </thead>
            <tbody>
              {ZONAS.map((z, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                  <td className="p-1.5 font-medium">{z.zona}</td>
                  <td className="p-1.5 text-right">{fmtU(z.u25)}</td>
                  <td className="p-1.5 text-right font-semibold">{fmtU(z.u26)}</td>
                  <td className="p-1.5 text-right">
                    {z.u25 > 0 ? <VarBadge v={z.var} /> : <span className="text-xs text-blue-500">Nueva</span>}
                  </td>
                  <td className="p-1.5 text-center">
                    {z.u25 > 0 ? (
                      <ZonaBadge crece={z.var >= 0} />
                    ) : (
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                        Nueva
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 space-y-1">
            <div className="flex items-start gap-2">
              <MapPin size={13} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-[11px] text-gray-700">
                <strong>Pacífico</strong> cae -30.3% — la mayor caída. Revisar surtido en CEDIS PEBO.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={13} className="text-green-500 mt-0.5 shrink-0" />
              <p className="text-[11px] text-gray-700">
                <strong>Metro</strong> +48.9% y <strong>Península</strong> +24.8% — zonas con mayor momentum.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={13} className="text-blue-500 mt-0.5 shrink-0" />
              <p className="text-[11px] text-gray-700">
                <strong>Noroeste</strong> (824 uds) y <strong>Sur</strong> (97 uds) — zonas nuevas en 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide5() {
  return (
    <div className="flex flex-col h-full p-6 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="flex items-center gap-3 mb-1">
        <Image src="/4buddies-logo.jpeg" alt="" width={40} height={40} className="h-8 w-auto rounded-lg" />
        <h2 className="text-xl font-extrabold text-orange-900">
          Top 20 Tiendas Catalogadas — YTD 2026
        </h2>
      </div>
      <p className="text-xs text-orange-500 mb-3">Unidades vendidas Ene–Abr 2026</p>

      <div className="flex-1 bg-white rounded-xl shadow border border-orange-200 p-3 overflow-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-orange-600 text-white">
              <th className="p-1 text-center rounded-tl-lg w-8">#</th>
              <th className="p-1 text-left">Sucursal</th>
              <th className="p-1 text-left">Zona</th>
              <th className="p-1 text-left">Plaza</th>
              <th className="p-1 text-right">Uds</th>
              <th className="p-1 text-right">Est. PVP*</th>
              <th className="p-1 text-left rounded-tr-lg w-[180px]"></th>
            </tr>
          </thead>
          <tbody>
            {TOP20_TIENDAS.map((t, i) => {
              const maxUds = TOP20_TIENDAS[0].uds;
              const pct = (t.uds / maxUds) * 100;
              return (
                <tr key={i} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                  <td className="p-1 text-center font-bold text-orange-600">
                    {i + 1}
                  </td>
                  <td className="p-1 font-medium">{t.tienda}</td>
                  <td className="p-1 text-gray-600">{t.zona}</td>
                  <td className="p-1 text-gray-600">{t.plaza}</td>
                  <td className="p-1 text-right font-semibold">{fmtU(t.uds)}</td>
                  <td className="p-1 text-right text-gray-500">{fmtPVP(t.estPvp)}</td>
                  <td className="p-1">
                    <div className="w-full bg-orange-100 rounded-full h-3">
                      <div
                        className="bg-orange-500 h-3 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-[10px] text-gray-400 mt-2">
        *Estimado PVP: precio de anaquel estimado, no facturación real. Norte domina con 10 tiendas en el top 20.
      </p>
    </div>
  );
}

function Slide6() {
  return (
    <div className="flex flex-col h-full p-6 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="flex items-center gap-3 mb-1">
        <Image src="/4buddies-logo.jpeg" alt="" width={40} height={40} className="h-8 w-auto rounded-lg" />
        <h2 className="text-xl font-extrabold text-orange-900">
          Oportunidades de Crecimiento
        </h2>
      </div>
      <p className="text-xs text-orange-500 mb-4">Tiendas vendiendo fuera de catálogo</p>

      <div className="flex gap-4 flex-1 min-h-0">
        <div className="flex-1 bg-white rounded-xl shadow border border-green-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Store size={18} className="text-green-600" />
            <h3 className="text-sm font-bold text-green-800">
              Tiendas Sin Catalogar
            </h3>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700 border border-green-300">
              Oportunidad
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-extrabold text-green-800">{OPORTUNIDADES.tiendasNoCatVendiendo}</p>
              <p className="text-[10px] text-green-600">tiendas vendiendo</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-extrabold text-green-800">{fmtU(OPORTUNIDADES.udsNoCat)}</p>
              <p className="text-[10px] text-green-600">uds YTD</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-extrabold text-green-800">{OPORTUNIDADES.pctNoCat}%</p>
              <p className="text-[10px] text-green-600">de la venta total</p>
            </div>
          </div>

          <h4 className="text-xs font-bold text-gray-700 mb-2">Top 5 por venta:</h4>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-1.5 text-left rounded-tl-lg">Sucursal</th>
                <th className="p-1.5 text-left">Código</th>
                <th className="p-1.5 text-right rounded-tr-lg">Uds YTD</th>
              </tr>
            </thead>
            <tbody>
              {OPORTUNIDADES.top5NoCat.map((t, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-green-50" : ""}>
                  <td className="p-1.5 font-medium">{t.tienda}</td>
                  <td className="p-1.5 text-gray-500">{t.code}</td>
                  <td className="p-1.5 text-right font-semibold">{fmtU(t.uds)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow border border-orange-200 p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Target size={18} className="text-orange-600" />
              <h3 className="text-sm font-bold text-orange-800">
                Contexto del Portafolio
              </h3>
            </div>
            <div className="space-y-3">
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="text-xs font-bold text-orange-800 mb-1">Crecimiento sólido</p>
                <p className="text-xs text-gray-600">
                  El portafolio crece +10% YTD. 3 de 4 SKUs en positivo. Chicharrón (+21.8%) y Classic White (+19.6%) lideran.
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="text-xs font-bold text-orange-800 mb-1">Cobertura casi total</p>
                <p className="text-xs text-gray-600">
                  409 de 410 tiendas catalogadas activas. Solo 1 tienda sin venta en el periodo.
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="text-xs font-bold text-orange-800 mb-1">Zonas nuevas</p>
                <p className="text-xs text-gray-600">
                  Noroeste (824 uds) y Sur (97 uds) son zonas nuevas en 2026 con potencial de crecimiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 bg-green-100 border border-green-300 rounded-lg px-4 py-2 text-xs text-green-800">
        <strong>Accionable:</strong> Proponer catalogar las top 10 tiendas no catalogadas con mayor venta — representan venta incremental recurrente sin inversión adicional.
      </div>
    </div>
  );
}

function Slide7() {
  const sections = [
    {
      title: "URGENTE",
      color: "border-red-300 bg-red-50",
      titleColor: "text-red-700",
      icon: <Zap size={16} className="text-red-600" />,
      items: PLAN_ACCION.urgente,
    },
    {
      title: "ESTA SEMANA",
      color: "border-yellow-300 bg-yellow-50",
      titleColor: "text-yellow-700",
      icon: <Zap size={16} className="text-yellow-600" />,
      items: PLAN_ACCION.estaSemana,
    },
    {
      title: "ESTE MES",
      color: "border-green-300 bg-green-50",
      titleColor: "text-green-700",
      icon: <Target size={16} className="text-green-600" />,
      items: PLAN_ACCION.esteMes,
    },
    {
      title: "ESTRATÉGICO",
      color: "border-blue-300 bg-blue-50",
      titleColor: "text-blue-700",
      icon: <TrendingUp size={16} className="text-blue-600" />,
      items: PLAN_ACCION.estrategico,
    },
  ];

  return (
    <div className="flex flex-col h-full p-6 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="flex items-center gap-3 mb-1">
        <Image src="/4buddies-logo.jpeg" alt="" width={40} height={40} className="h-8 w-auto rounded-lg" />
        <h2 className="text-xl font-extrabold text-orange-900">Plan de Acción</h2>
      </div>
      <p className="text-xs text-orange-500 mb-4">Prioridades por nivel de urgencia</p>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {sections.map((s, i) => (
          <div key={i} className={`rounded-xl border-2 ${s.color} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              {s.icon}
              <h3 className={`text-sm font-extrabold ${s.titleColor}`}>{s.title}</h3>
            </div>
            <div className="space-y-2.5">
              {s.items.map((item, j) => (
                <div key={j} className="bg-white/70 rounded-lg p-2.5">
                  <p className="text-xs font-bold text-gray-800">{item.accion}</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">{item.detalle}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Impacto: {item.impacto}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   MAIN — CAROUSEL
   ================================================================ */

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7];
const SLIDE_NAMES = [
  "Portada",
  "Sell-Out Mensual",
  "Productos",
  "Zonas",
  "Top 20 Tiendas",
  "Oportunidades",
  "Plan de Acción",
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

        {/* Navigation */}
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
