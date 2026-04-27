"use client";
import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Package,
  Store,
  AlertTriangle,
  ShieldCheck,
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

/* ================================================================
   DATA CONSTANTS
   ================================================================ */

const KPI = {
  udsYtd26: 10905,
  udsYtd25: 10315,
  varYtd: 5.7,
  pvpYtd26: 411236,
  pvpYtd25: 386346,
  varPvp: 6.4,
  tiendasActivas: 384,
  tiendasCatalogadas: 410,
  stockTotal: 4883,
  diasCobGlobal: 54,
  sinStock: 24,
  restockUrgente: 70,
  bloqueadas: 0,
};

const VENTAS_MES = [
  { mes: "Ene", uds25: 2879, uds26: 2994, pvp25: 108589, pvp26: 112588 },
  { mes: "Feb", uds25: 2510, uds26: 2775, pvp25: 93590, pvp26: 103996 },
  { mes: "Mar", uds25: 2656, uds26: 2867, pvp25: 99173, pvp26: 106976 },
  { mes: "Abr", uds25: 2270, uds26: 2269, pvp25: 84993, pvp26: 87676 },
  { mes: "May", uds25: 2489, uds26: 0, pvp25: 95202, pvp26: 0 },
  { mes: "Jun", uds25: 2576, uds26: 0, pvp25: 97756, pvp26: 0 },
  { mes: "Jul", uds25: 2675, uds26: 0, pvp25: 100660, pvp26: 0 },
  { mes: "Ago", uds25: 2520, uds26: 0, pvp25: 95454, pvp26: 0 },
  { mes: "Sep", uds25: 2622, uds26: 0, pvp25: 98442, pvp26: 0 },
  { mes: "Oct", uds25: 2769, uds26: 0, pvp25: 102727, pvp26: 0 },
  { mes: "Nov", uds25: 3049, uds26: 0, pvp25: 112870, pvp26: 0 },
  { mes: "Dic", uds25: 2714, uds26: 0, pvp25: 101360, pvp26: 0 },
];

const PRODUCTOS = [
  {
    nombre: "Rodajitas Spicy Limón 30g",
    short: "Rodajitas",
    uds25: 3394,
    uds26: 3322,
    var: -2.1,
    stock: 1232,
    vtaDia: 25.6,
    diasCob: 48,
    pvp26: 91355,
    mix: 30.5,
    cobertura: 99.5,
    color: "#ea580c",
  },
  {
    nombre: "Classic White 25g",
    short: "Classic White",
    uds25: 2355,
    uds26: 2706,
    var: 14.9,
    stock: 1229,
    vtaDia: 20.9,
    diasCob: 59,
    pvp26: 60885,
    mix: 24.8,
    cobertura: 98.0,
    color: "#f97316",
  },
  {
    nombre: "Chicharrón de Cerdo 75g",
    short: "Chicharrón",
    uds25: 2311,
    uds26: 2707,
    var: 17.1,
    stock: 1229,
    vtaDia: 24.0,
    diasCob: 51,
    pvp26: 157006,
    mix: 24.8,
    cobertura: 99.3,
    color: "#fb923c",
  },
  {
    nombre: "Street Elote 125g",
    short: "Street Elote",
    uds25: 2255,
    uds26: 2170,
    var: -3.8,
    stock: 1193,
    vtaDia: 19.5,
    diasCob: 61,
    pvp26: 101990,
    mix: 19.9,
    cobertura: 95.4,
    color: "#fdba74",
  },
];

const TOP_TIENDAS = [
  { rank: 1, codigo: "LGCL", nombre: "Clouthier", plaza: "León", uds: 136, pvp: 4348 },
  { rank: 2, codigo: "MAME", nombre: "Mediterráneo", plaza: "Mazatlán", uds: 115, pvp: 4772 },
  { rank: 3, codigo: "CLCL", nombre: "Celenes", plaza: "Culiacán", uds: 115, pvp: 3267 },
  { rank: 4, codigo: "MTHD", nombre: "Obispado", plaza: "Monterrey Ote", uds: 107, pvp: 3592 },
  { rank: 5, codigo: "MTGT", nombre: "Glorieta Calzada", plaza: "Monterrey Ote", uds: 89, pvp: 3052 },
  { rank: 6, codigo: "MTCW", nombre: "Corporativo", plaza: "Monterrey Ote", uds: 88, pvp: 3139 },
  { rank: 7, codigo: "LGPC", nombre: "Prol Campestre", plaza: "León", uds: 88, pvp: 2556 },
  { rank: 8, codigo: "MTRS", nombre: "Roberto Garza Sada", plaza: "Monterrey Ote", uds: 85, pvp: 2684 },
  { rank: 9, codigo: "MTCA", nombre: "Calzada", plaza: "Monterrey Ote", uds: 80, pvp: 2838 },
  { rank: 10, codigo: "MXBN", nombre: "Luis Barragán", plaza: "México Centro", uds: 80, pvp: 3612 },
];

const ALERTAS_STOCK = [
  { producto: "Street Elote 125g", sinStock: 17, restock: 17 },
  { producto: "Classic White 25g", sinStock: 6, restock: 12 },
  { producto: "Rodajitas Spicy Limón 30g", sinStock: 0, restock: 25 },
  { producto: "Chicharrón de Cerdo 75g", sinStock: 1, restock: 16 },
];

const RESTOCK_ZONA = [
  { zona: "Norte", count: 31 },
  { zona: "Occidente", count: 18 },
  { zona: "Noroeste", count: 16 },
  { zona: "Pacífico", count: 8 },
  { zona: "Centro-Sur", count: 6 },
  { zona: "Península", count: 6 },
  { zona: "Metro", count: 4 },
];

/* ================================================================
   HELPERS
   ================================================================ */

const fmtU = (n: number) => n.toLocaleString("es-MX");
const fmtK = (n: number) => "$" + (n / 1000).toFixed(0) + "K";
const fmtP = (n: number) => "$" + n.toLocaleString("es-MX", { maximumFractionDigits: 0 });

function VarBadge({ v, size = "sm" }: { v: number; size?: "sm" | "lg" }) {
  const positive = v >= 0;
  const Icon = positive ? TrendingUp : TrendingDown;
  const cls =
    size === "lg"
      ? `inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
          positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`
      : `inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
          positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`;
  return (
    <span className={cls}>
      <Icon className={size === "lg" ? "w-4 h-4" : "w-3 h-3"} />
      {v >= 0 ? "+" : ""}
      {v.toFixed(1)}%
    </span>
  );
}

function EstadoBadge({ dias }: { dias: number }) {
  if (dias >= 45)
    return <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Holgado</span>;
  if (dias >= 30)
    return <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">OK</span>;
  if (dias >= 15)
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Vigilar</span>
    );
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">Urgente</span>
  );
}

/* ================================================================
   SLIDE HEADER
   ================================================================ */

function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center justify-between px-8 py-4 border-b border-orange-200">
      <div className="flex items-center gap-4">
        <img src="/4buddies-logo.jpeg" alt="4BUDDIES" className="h-10 rounded-lg" />
        <div>
          <h1 className="text-lg font-bold text-orange-900">{title}</h1>
          {subtitle && <p className="text-xs text-orange-600">{subtitle}</p>}
        </div>
      </div>
      <p className="text-xs text-orange-400">4BUDDIES x Farmacias del Ahorro | Abril 2026</p>
    </div>
  );
}

/* ================================================================
   SLIDE 1 — Portada + Scorecard
   ================================================================ */

function Slide1() {
  return (
    <div className="w-[1280px] aspect-video bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col">
      {/* Header grande */}
      <div className="flex flex-col items-center pt-8 pb-4">
        <img src="/4buddies-logo.jpeg" alt="4BUDDIES" className="h-20 rounded-2xl shadow-lg mb-4" />
        <h1 className="text-3xl font-black text-orange-900 tracking-tight">Salud del Negocio</h1>
        <p className="text-lg text-orange-600 font-medium mt-1">4BUDDIES x Farmacias del Ahorro</p>
        <p className="text-sm text-orange-400 mt-2">YTD 2026 (Ene — Abr 26) vs 2025 | Solo tiendas catalogadas (410)</p>
        <p className="text-xs text-orange-500 mt-1 font-medium bg-orange-100 px-4 py-1 rounded-full">
          Abril aún no cierra (al día 26 de 30) — proyección: ~2,618 uds (+15.3% vs Abr 2025)
        </p>
      </div>

      {/* 4 KPI cards */}
      <div className="flex-1 px-12 pb-8 grid grid-cols-4 gap-6">
        {/* Uds YTD */}
        <div className="bg-white rounded-2xl shadow-md border border-orange-200 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <Package className="w-5 h-5" />
            <span className="text-sm font-semibold">Unidades YTD</span>
          </div>
          <p className="text-4xl font-black text-orange-900">{fmtU(KPI.udsYtd26)}</p>
          <div className="mt-2 flex items-center gap-2">
            <VarBadge v={KPI.varYtd} size="lg" />
            <span className="text-xs text-gray-500">vs {fmtU(KPI.udsYtd25)} en 2025</span>
          </div>
        </div>

        {/* PVP estimado */}
        <div className="bg-white rounded-2xl shadow-md border border-orange-200 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-semibold">Estimado PVP YTD</span>
          </div>
          <p className="text-4xl font-black text-orange-900">{fmtK(KPI.pvpYtd26)}</p>
          <div className="mt-2 flex items-center gap-2">
            <VarBadge v={KPI.varPvp} size="lg" />
            <span className="text-xs text-gray-500">vs {fmtK(KPI.pvpYtd25)} en 2025</span>
          </div>
        </div>

        {/* Tiendas activas */}
        <div className="bg-white rounded-2xl shadow-md border border-orange-200 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <Store className="w-5 h-5" />
            <span className="text-sm font-semibold">Tiendas Activas</span>
          </div>
          <p className="text-4xl font-black text-orange-900">
            {KPI.tiendasActivas}
            <span className="text-lg text-orange-400 font-medium"> / {KPI.tiendasCatalogadas}</span>
          </p>
          <div className="mt-2">
            <span className="text-xs text-gray-500">
              {((KPI.tiendasActivas / KPI.tiendasCatalogadas) * 100).toFixed(0)}% de cobertura activa en abril
            </span>
          </div>
        </div>

        {/* Inventario */}
        <div className="bg-white rounded-2xl shadow-md border border-orange-200 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm font-semibold">Inventario Total</span>
          </div>
          <p className="text-4xl font-black text-orange-900">{fmtU(KPI.stockTotal)}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
              {KPI.diasCobGlobal} días cobertura
            </span>
          </div>
        </div>
      </div>

      {/* Barra inferior con mini alertas */}
      <div className="px-12 pb-6">
        <div className="bg-white/70 rounded-xl px-6 py-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-gray-600">{KPI.sinStock} posiciones sin stock</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-gray-600">{KPI.restockUrgente} restock urgente (&lt;15d)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-gray-600">{KPI.bloqueadas} posiciones bloqueadas</span>
            </span>
          </div>
          <span className="text-orange-400 text-xs">Datos al 26 de abril 2026</span>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 2 — Venta Mensual 2025 vs 2026
   ================================================================ */

function Slide2() {
  const chartData = VENTAS_MES.filter((m) => m.uds25 > 0).map((m) => ({
    ...m,
    mes: m.uds26 === 0 ? m.mes : m.mes === "Abr" ? "Abr*" : m.mes,
    uds26display: m.uds26 || undefined,
  }));

  const ytdRow = VENTAS_MES.filter((m) => m.uds26 > 0);
  const ytd25 = ytdRow.reduce((s, m) => s + m.uds25, 0);
  const ytd26 = ytdRow.reduce((s, m) => s + m.uds26, 0);
  const pvp25 = ytdRow.reduce((s, m) => s + m.pvp25, 0);
  const pvp26 = ytdRow.reduce((s, m) => s + m.pvp26, 0);

  return (
    <div className="w-[1280px] aspect-video bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col">
      <Header title="Venta Mensual — 2025 vs 2026" subtitle="Unidades vendidas por mes | Solo 4 SKUs activos en 410 tiendas catalogadas" />

      <div className="flex-1 grid grid-cols-2 gap-6 px-8 py-4">
        {/* Gráfica */}
        <div className="bg-white rounded-xl shadow border border-orange-200 p-4">
          <h3 className="text-sm font-bold text-orange-900 mb-2">Unidades por mes</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value: number, name: string) => [fmtU(value), name === "uds25" ? "2025" : "2026"]}
              />
              <Legend
                formatter={(value: string) => (value === "uds25" ? "2025" : "2026")}
              />
              <Bar dataKey="uds25" fill="#fdba74" radius={[4, 4, 0, 0]} />
              <Bar dataKey="uds26display" fill="#ea580c" radius={[4, 4, 0, 0]} name="uds26" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow border border-orange-200 p-4 flex flex-col">
          <h3 className="text-sm font-bold text-orange-900 mb-2">Detalle mensual</h3>
          <div className="overflow-auto flex-1">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="py-1.5 px-2 text-left rounded-tl-lg">Mes</th>
                  <th className="py-1.5 px-2 text-right">Uds 2025</th>
                  <th className="py-1.5 px-2 text-right">Uds 2026</th>
                  <th className="py-1.5 px-2 text-right">Var %</th>
                  <th className="py-1.5 px-2 text-right rounded-tr-lg">Est PVP 2026</th>
                </tr>
              </thead>
              <tbody>
                {VENTAS_MES.map((m, i) => {
                  const v = m.uds25 > 0 && m.uds26 > 0 ? ((m.uds26 - m.uds25) / m.uds25) * 100 : null;
                  return (
                    <tr key={m.mes} className={i % 2 === 0 ? "bg-orange-50/50" : ""}>
                      <td className="py-1.5 px-2 font-medium text-orange-900">
                        {m.mes}
                        {m.mes === "Abr" && m.uds26 > 0 ? "*" : ""}
                      </td>
                      <td className="py-1.5 px-2 text-right text-gray-700">{fmtU(m.uds25)}</td>
                      <td className="py-1.5 px-2 text-right text-gray-700">
                        {m.uds26 > 0 ? fmtU(m.uds26) : "—"}
                      </td>
                      <td className="py-1.5 px-2 text-right">
                        {v !== null ? <VarBadge v={v} /> : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="py-1.5 px-2 text-right text-gray-700">
                        {m.pvp26 > 0 ? fmtP(m.pvp26) : "—"}
                      </td>
                    </tr>
                  );
                })}
                {/* YTD row */}
                <tr className="bg-orange-100 font-bold border-t-2 border-orange-300">
                  <td className="py-2 px-2 text-orange-900">YTD</td>
                  <td className="py-2 px-2 text-right text-orange-900">{fmtU(ytd25)}</td>
                  <td className="py-2 px-2 text-right text-orange-900">{fmtU(ytd26)}</td>
                  <td className="py-2 px-2 text-right">
                    <VarBadge v={((ytd26 - ytd25) / ytd25) * 100} />
                  </td>
                  <td className="py-2 px-2 text-right text-orange-900">{fmtP(pvp26)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-orange-400 mt-2">* Abril 2026 parcial (al día 26 de 30) — proyección cierre: ~2,618 uds (+15.3% vs Abr 2025) | Est PVP = estimado a precio de venta al público</p>
        </div>
      </div>

      {/* Insight bar */}
      <div className="px-8 pb-4">
        <div className="bg-white/70 rounded-xl px-6 py-3 text-sm text-gray-700">
          <span className="font-semibold text-orange-900">Insight:</span> Los 4 SKUs core crecen{" "}
          <span className="font-bold text-green-700">+5.7%</span> YTD en unidades y{" "}
          <span className="font-bold text-green-700">+6.4%</span> en valor estimado.
          Ene-Mar 2026 superan a 2025. Abril aún no cierra (al día 26): lleva 2,269 uds vs 2,270 del 2025 completo —{" "}
          <span className="font-bold text-green-700">proyección a cierre: ~2,618 uds (+15.3%)</span>.
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 3 — Salud por Producto + Inventario
   ================================================================ */

function Slide3() {
  const pieData = PRODUCTOS.map((p) => ({ name: p.short, value: p.mix }));

  return (
    <div className="w-[1280px] aspect-video bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col">
      <Header title="Salud por Producto — YTD 2026 vs 2025" subtitle="Participación, crecimiento e inventario por SKU | 410 tiendas catalogadas" />

      <div className="flex-1 grid grid-cols-5 gap-6 px-8 py-4">
        {/* Pie chart — 2 cols */}
        <div className="col-span-2 bg-white rounded-xl shadow border border-orange-200 p-4 flex flex-col items-center">
          <h3 className="text-sm font-bold text-orange-900 mb-1">Mix de Producto (Uds YTD 2026)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={95}
                dataKey="value"
                label={({ name, value }: { name: string; value: number }) => `${name} ${value}%`}
                labelLine={false}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PRODUCTOS[i].color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>

          {/* Cobertura mini cards */}
          <div className="grid grid-cols-2 gap-2 w-full mt-2">
            {PRODUCTOS.map((p) => (
              <div key={p.short} className="flex items-center gap-2 px-2 py-1 rounded-lg bg-orange-50 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-gray-700">{p.short}</span>
                <span className="ml-auto font-bold text-orange-900">{p.cobertura}%</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-orange-400 mt-1">% = tiendas con stock / 410 catalogadas</p>
        </div>

        {/* Tabla salud — 3 cols */}
        <div className="col-span-3 bg-white rounded-xl shadow border border-orange-200 p-4 flex flex-col">
          <h3 className="text-sm font-bold text-orange-900 mb-2">Salud por Producto</h3>
          <div className="overflow-auto flex-1">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="py-2 px-2 text-left rounded-tl-lg">Producto</th>
                  <th className="py-2 px-2 text-right">YTD 25</th>
                  <th className="py-2 px-2 text-right">YTD 26</th>
                  <th className="py-2 px-2 text-right">Var%</th>
                  <th className="py-2 px-2 text-right">Stock</th>
                  <th className="py-2 px-2 text-right">Vta/día</th>
                  <th className="py-2 px-2 text-right">Días Cob</th>
                  <th className="py-2 px-2 text-center rounded-tr-lg">Estado</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTOS.map((p, i) => (
                  <tr key={p.short} className={i % 2 === 0 ? "bg-orange-50/50" : ""}>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="font-medium text-orange-900">{p.nombre}</span>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-right text-gray-700">{fmtU(p.uds25)}</td>
                    <td className="py-2 px-2 text-right font-semibold text-orange-900">{fmtU(p.uds26)}</td>
                    <td className="py-2 px-2 text-right">
                      <VarBadge v={p.var} />
                    </td>
                    <td className="py-2 px-2 text-right text-gray-700">{fmtU(p.stock)}</td>
                    <td className="py-2 px-2 text-right text-gray-700">{p.vtaDia.toFixed(1)}</td>
                    <td className="py-2 px-2 text-right font-semibold text-orange-900">{p.diasCob}</td>
                    <td className="py-2 px-2 text-center">
                      <EstadoBadge dias={p.diasCob} />
                    </td>
                  </tr>
                ))}
                {/* Total */}
                <tr className="bg-orange-100 font-bold border-t-2 border-orange-300">
                  <td className="py-2 px-2 text-orange-900">TOTAL</td>
                  <td className="py-2 px-2 text-right text-orange-900">{fmtU(KPI.udsYtd25)}</td>
                  <td className="py-2 px-2 text-right text-orange-900">{fmtU(KPI.udsYtd26)}</td>
                  <td className="py-2 px-2 text-right">
                    <VarBadge v={KPI.varYtd} />
                  </td>
                  <td className="py-2 px-2 text-right text-orange-900">{fmtU(KPI.stockTotal)}</td>
                  <td className="py-2 px-2 text-right text-orange-900">90.0</td>
                  <td className="py-2 px-2 text-right text-orange-900">{KPI.diasCobGlobal}</td>
                  <td className="py-2 px-2 text-center">
                    <EstadoBadge dias={KPI.diasCobGlobal} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* PVP mini table */}
          <div className="mt-3 bg-orange-50 rounded-lg p-3">
            <h4 className="text-xs font-bold text-orange-800 mb-1">Valor Estimado PVP — YTD 2026</h4>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {PRODUCTOS.map((p) => (
                <div key={p.short} className="flex justify-between">
                  <span className="text-gray-600">{p.short}:</span>
                  <span className="font-bold text-orange-900">{fmtP(p.pvp26)}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-orange-400 mt-1">PVP estimado. No es dato de facturación oficial.</p>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="px-8 pb-4">
        <div className="bg-white/70 rounded-xl px-6 py-3 text-sm text-gray-700">
          <span className="font-semibold text-orange-900">Insight:</span>{" "}
          <span className="font-bold text-green-700">Chicharrón (+17.1%)</span> y{" "}
          <span className="font-bold text-green-700">Classic White (+14.9%)</span> son los motores de crecimiento.
          Todos los SKUs tienen <span className="font-bold text-green-700">cobertura &gt;95%</span> y{" "}
          <span className="font-bold text-green-700">&gt;48 días de inventario</span>. Negocio saludable.
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 4 — Top Tiendas + Alertas
   ================================================================ */

function Slide4() {
  return (
    <div className="w-[1280px] aspect-video bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col">
      <Header title="Top Tiendas + Alertas" subtitle="Mejores tiendas YTD 2026 y posiciones que requieren atención | 410 catalogadas" />

      <div className="flex-1 grid grid-cols-2 gap-6 px-8 py-4">
        {/* Top 10 tiendas */}
        <div className="bg-white rounded-xl shadow border border-orange-200 p-4 flex flex-col">
          <h3 className="text-sm font-bold text-orange-900 mb-2">Top 10 Tiendas — YTD 2026</h3>
          <div className="overflow-auto flex-1">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="py-1.5 px-2 text-center rounded-tl-lg">#</th>
                  <th className="py-1.5 px-2 text-left">Tienda</th>
                  <th className="py-1.5 px-2 text-left">Plaza</th>
                  <th className="py-1.5 px-2 text-right">Uds</th>
                  <th className="py-1.5 px-2 text-right rounded-tr-lg">Est PVP</th>
                </tr>
              </thead>
              <tbody>
                {TOP_TIENDAS.map((t, i) => (
                  <tr key={t.codigo} className={i % 2 === 0 ? "bg-orange-50/50" : ""}>
                    <td className="py-1.5 px-2 text-center">
                      {t.rank <= 3 ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-600 text-white text-[10px] font-bold">
                          {t.rank}
                        </span>
                      ) : (
                        <span className="text-gray-500">{t.rank}</span>
                      )}
                    </td>
                    <td className="py-1.5 px-2 font-medium text-orange-900">{t.nombre}</td>
                    <td className="py-1.5 px-2 text-gray-600">{t.plaza}</td>
                    <td className="py-1.5 px-2 text-right font-semibold text-orange-900">{fmtU(t.uds)}</td>
                    <td className="py-1.5 px-2 text-right text-gray-700">{fmtP(t.pvp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-orange-400 mt-2">León, Mazatlán, Culiacán y Monterrey concentran las top tiendas</p>
        </div>

        {/* Alertas */}
        <div className="flex flex-col gap-4">
          {/* Quiebre de stock */}
          <div className="bg-white rounded-xl shadow border border-red-200 p-4 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                <AlertTriangle className="w-3 h-3" /> Quiebre de Stock
              </span>
              <span className="text-xs text-gray-500">{KPI.sinStock} posiciones sin inventario</span>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-500 border-b border-gray-200">
                  <th className="py-1 px-2 text-left">Producto</th>
                  <th className="py-1 px-2 text-right">Sin stock</th>
                  <th className="py-1 px-2 text-right">Restock &lt;15d</th>
                </tr>
              </thead>
              <tbody>
                {ALERTAS_STOCK.map((a, i) => (
                  <tr key={a.producto} className={i % 2 === 0 ? "bg-red-50/30" : ""}>
                    <td className="py-1.5 px-2 font-medium text-gray-800">{a.producto}</td>
                    <td className="py-1.5 px-2 text-right">
                      {a.sinStock > 0 ? (
                        <span className="font-bold text-red-700">{a.sinStock}</span>
                      ) : (
                        <span className="text-green-600">0</span>
                      )}
                    </td>
                    <td className="py-1.5 px-2 text-right">
                      <span className="font-bold text-yellow-700">{a.restock}</span>
                    </td>
                  </tr>
                ))}
                <tr className="font-bold border-t border-gray-300">
                  <td className="py-1.5 px-2 text-gray-800">TOTAL</td>
                  <td className="py-1.5 px-2 text-right text-red-700">{KPI.sinStock}</td>
                  <td className="py-1.5 px-2 text-right text-yellow-700">{KPI.restockUrgente}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Restock por zona */}
          <div className="bg-white rounded-xl shadow border border-yellow-200 p-4 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">
                <Package className="w-3 h-3" /> Restock Urgente por Zona
              </span>
              <span className="text-xs text-gray-500">{KPI.restockUrgente} posiciones con &lt;15 días cobertura</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              {RESTOCK_ZONA.map((z) => (
                <div key={z.zona} className="flex items-center justify-between">
                  <span className="text-gray-700">{z.zona}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${(z.count / 31) * 100}%` }}
                      />
                    </div>
                    <span className="font-bold text-yellow-700 w-6 text-right">{z.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buena noticia */}
          <div className="bg-green-50 rounded-xl border border-green-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span className="text-xs font-bold text-green-700">0 posiciones bloqueadas</span>
              <span className="text-[10px] text-green-600 ml-2">Todas las posiciones activas están disponibles para compra</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="px-8 pb-4">
        <div className="bg-white/70 rounded-xl px-6 py-3 grid grid-cols-3 gap-4 text-xs">
          <div>
            <span className="font-bold text-red-700">URGENTE:</span>{" "}
            <span className="text-gray-700">
              Street Elote con 17 quiebres de stock. Solicitar resurtido prioritario en Península y Norte.
            </span>
          </div>
          <div>
            <span className="font-bold text-yellow-700">ESTA SEMANA:</span>{" "}
            <span className="text-gray-700">
              70 posiciones con &lt;15 días de cobertura. Norte (31) y Occidente (18) concentran el riesgo.
            </span>
          </div>
          <div>
            <span className="font-bold text-green-700">POSITIVO:</span>{" "}
            <span className="text-gray-700">
              Cobertura &gt;95% en los 4 SKUs. 0 bloqueos. Inventario global estable con 54 días de cobertura.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE 5 — Zona Norte: Desabasto por Tienda
   ================================================================ */

const NORTE_RESTOCK = [
  { tienda: "JZPT", nombre: "Plaza Las Torres", plaza: "Chihuahua", producto: "Classic White 25g", stock: 0, vtaDia: 0.1, dias: 0 },
  { tienda: "MTVL", nombre: "Valle Alto", plaza: "Monterrey Ote", producto: "Classic White 25g", stock: 0, vtaDia: 0.2, dias: 0 },
  { tienda: "MTHA", nombre: "Harley Carr", plaza: "Monterrey Ote", producto: "Classic White 25g", stock: 0, vtaDia: 0.1, dias: 0 },
  { tienda: "CIPO", nombre: "Politécnico", plaza: "Chihuahua", producto: "Chicharrón de Cerdo 75g", stock: 0, vtaDia: 0.2, dias: 0 },
  { tienda: "MTRH", nombre: "Río Rhin", plaza: "Monterrey Pte", producto: "Street Elote 125g", stock: 1, vtaDia: 0.2, dias: 4.3 },
  { tienda: "MTCS", nombre: "Calzada San Pedro", plaza: "Monterrey Ote", producto: "Street Elote 125g", stock: 1, vtaDia: 0.2, dias: 5.0 },
  { tienda: "MTHD", nombre: "Obispado", plaza: "Monterrey Ote", producto: "Rodajitas 30g", stock: 2, vtaDia: 0.4, dias: 5.5 },
  { tienda: "MTCW", nombre: "Corporativo", plaza: "Monterrey Ote", producto: "Street Elote 125g", stock: 2, vtaDia: 0.4, dias: 5.5 },
  { tienda: "MTRS", nombre: "Roberto Garza Sada", plaza: "Monterrey Ote", producto: "Rodajitas 30g", stock: 1, vtaDia: 0.2, dias: 6.0 },
  { tienda: "MTHA", nombre: "Harley Carr", plaza: "Monterrey Ote", producto: "Street Elote 125g", stock: 2, vtaDia: 0.3, dias: 7.5 },
  { tienda: "MTRS", nombre: "Roberto Garza Sada", plaza: "Monterrey Ote", producto: "Classic White 25g", stock: 3, vtaDia: 0.4, dias: 7.5 },
  { tienda: "MTEU", nombre: "Revolución", plaza: "Monterrey Ote", producto: "Rodajitas 30g", stock: 1, vtaDia: 0.1, dias: 7.5 },
  { tienda: "MTHD", nombre: "Obispado", plaza: "Monterrey Ote", producto: "Classic White 25g", stock: 2, vtaDia: 0.2, dias: 8.6 },
  { tienda: "LRCT", nombre: "Crucerito", plaza: "Nuevo Laredo", producto: "Rodajitas 30g", stock: 5, vtaDia: 0.5, dias: 9.4 },
  { tienda: "JZLR", nombre: "La Raza", plaza: "Chihuahua", producto: "Chicharrón de Cerdo 75g", stock: 1, vtaDia: 0.1, dias: 10.0 },
  { tienda: "CHRC", nombre: "Puente Real", plaza: "Saltillo", producto: "Rodajitas 30g", stock: 1, vtaDia: 0.1, dias: 10.0 },
  { tienda: "MTNE", nombre: "Nueva España", plaza: "Monterrey Ote", producto: "Rodajitas 30g", stock: 2, vtaDia: 0.2, dias: 10.0 },
  { tienda: "MTOA", nombre: "Arboleda", plaza: "Monterrey Ote", producto: "Chicharrón de Cerdo 75g", stock: 2, vtaDia: 0.2, dias: 10.0 },
  { tienda: "MTCM", nombre: "Cumbres", plaza: "Monterrey Pte", producto: "Street Elote 125g", stock: 3, vtaDia: 0.3, dias: 10.0 },
  { tienda: "MTBV", nombre: "Plus Suchiate", plaza: "Monterrey Ote", producto: "Classic White 25g", stock: 2, vtaDia: 0.2, dias: 10.0 },
  { tienda: "MTHD", nombre: "Obispado", plaza: "Monterrey Ote", producto: "Street Elote 125g", stock: 2, vtaDia: 0.2, dias: 10.0 },
  { tienda: "SAFT", nombre: "Fernando Torres", plaza: "San Luis Potosí", producto: "Street Elote 125g", stock: 1, vtaDia: 0.1, dias: 10.0 },
  { tienda: "TIJR", nombre: "Rosarito II", plaza: "Tijuana", producto: "Classic White 25g", stock: 1, vtaDia: 0.1, dias: 10.0 },
  { tienda: "LRDG", nombre: "Degollado", plaza: "Nuevo Laredo", producto: "Rodajitas 30g", stock: 6, vtaDia: 0.6, dias: 10.6 },
  { tienda: "MTCA", nombre: "Calzada", plaza: "Monterrey Ote", producto: "Street Elote 125g", stock: 4, vtaDia: 0.4, dias: 10.9 },
  { tienda: "DGFV", nombre: "Francisco Villa", plaza: "Durango", producto: "Street Elote 125g", stock: 3, vtaDia: 0.3, dias: 11.2 },
  { tienda: "MTSP", nombre: "San Pedro", plaza: "Monterrey Ote", producto: "Classic White 25g", stock: 2, vtaDia: 0.2, dias: 12.0 },
  { tienda: "RNVH", nombre: "Vista Hermosa", plaza: "Reynosa", producto: "Rodajitas 30g", stock: 2, vtaDia: 0.2, dias: 12.0 },
  { tienda: "CICM", nombre: "Campestre", plaza: "Chihuahua", producto: "Rodajitas 30g", stock: 2, vtaDia: 0.2, dias: 12.0 },
  { tienda: "MTVL", nombre: "Valle Alto", plaza: "Monterrey Ote", producto: "Rodajitas 30g", stock: 2, vtaDia: 0.2, dias: 12.0 },
  { tienda: "MTPF", nombre: "Plaza Fiesta", plaza: "Monterrey Ote", producto: "Rodajitas 30g", stock: 2, vtaDia: 0.2, dias: 12.0 },
  { tienda: "MTTO", nombre: "Las Torres", plaza: "Monterrey Ote", producto: "Rodajitas 30g", stock: 3, vtaDia: 0.2, dias: 12.9 },
  { tienda: "MTM1", nombre: "Miguel de la Madrid", plaza: "Monterrey Pte", producto: "Chicharrón de Cerdo 75g", stock: 3, vtaDia: 0.2, dias: 12.9 },
  { tienda: "SAPD", nombre: "Pedregal", plaza: "San Luis Potosí", producto: "Chicharrón de Cerdo 75g", stock: 4, vtaDia: 0.3, dias: 13.3 },
  { tienda: "TICO", nombre: "Cochimie", plaza: "Tijuana", producto: "Street Elote 125g", stock: 4, vtaDia: 0.3, dias: 13.3 },
];

function Slide5() {
  const criticos = NORTE_RESTOCK.filter((r) => r.dias < 7);
  const urgentes = NORTE_RESTOCK.filter((r) => r.dias >= 7 && r.dias <= 14);

  // Resumen por producto
  const byProd: Record<string, { count: number; zero: number }> = {};
  NORTE_RESTOCK.forEach((r) => {
    if (!byProd[r.producto]) byProd[r.producto] = { count: 0, zero: 0 };
    byProd[r.producto].count++;
    if (r.stock === 0) byProd[r.producto].zero++;
  });

  return (
    <div className="w-[1280px] aspect-video bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col">
      <Header
        title="Zona Norte — Desabasto por Tienda"
        subtitle="35 posiciones con <15 días de cobertura | Estas tiendas necesitan resurtido inmediato"
      />

      <div className="flex-1 grid grid-cols-3 gap-4 px-8 py-3">
        {/* Columna 1: Críticos (0-6 días) */}
        <div className="bg-white rounded-xl shadow border-2 border-red-300 p-3 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> CRÍTICO
            </span>
            <span className="text-[10px] text-gray-500">0-6 días cobertura</span>
          </div>
          <div className="overflow-auto flex-1">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="bg-red-600 text-white">
                  <th className="py-1 px-1.5 text-left rounded-tl-lg">Tienda</th>
                  <th className="py-1 px-1.5 text-left">Plaza</th>
                  <th className="py-1 px-1.5 text-left">Producto</th>
                  <th className="py-1 px-1.5 text-right">Stock</th>
                  <th className="py-1 px-1.5 text-right rounded-tr-lg">Días</th>
                </tr>
              </thead>
              <tbody>
                {criticos.map((r, i) => (
                  <tr key={`c-${i}`} className={i % 2 === 0 ? "bg-red-50/50" : ""}>
                    <td className="py-1 px-1.5 font-medium text-gray-800">{r.nombre}</td>
                    <td className="py-1 px-1.5 text-gray-600">{r.plaza}</td>
                    <td className="py-1 px-1.5 text-gray-700">{r.producto}</td>
                    <td className="py-1 px-1.5 text-right">
                      {r.stock === 0 ? (
                        <span className="font-bold text-red-700">0</span>
                      ) : (
                        <span className="text-gray-700">{r.stock}</span>
                      )}
                    </td>
                    <td className="py-1 px-1.5 text-right font-bold text-red-700">{r.dias.toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-red-500 mt-2 font-medium">
            {criticos.filter((r) => r.stock === 0).length} posiciones con stock CERO — sin producto en anaquel
          </p>
        </div>

        {/* Columna 2: Urgentes (7-14 días) */}
        <div className="bg-white rounded-xl shadow border-2 border-yellow-300 p-3 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold flex items-center gap-1">
              <Package className="w-3 h-3" /> URGENTE
            </span>
            <span className="text-[10px] text-gray-500">7-14 días cobertura</span>
          </div>
          <div className="overflow-auto flex-1">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="bg-yellow-500 text-white">
                  <th className="py-1 px-1.5 text-left rounded-tl-lg">Tienda</th>
                  <th className="py-1 px-1.5 text-left">Plaza</th>
                  <th className="py-1 px-1.5 text-left">Producto</th>
                  <th className="py-1 px-1.5 text-right">Stock</th>
                  <th className="py-1 px-1.5 text-right rounded-tr-lg">Días</th>
                </tr>
              </thead>
              <tbody>
                {urgentes.map((r, i) => (
                  <tr key={`u-${i}`} className={i % 2 === 0 ? "bg-yellow-50/50" : ""}>
                    <td className="py-1 px-1.5 font-medium text-gray-800">{r.nombre}</td>
                    <td className="py-1 px-1.5 text-gray-600">{r.plaza}</td>
                    <td className="py-1 px-1.5 text-gray-700">{r.producto}</td>
                    <td className="py-1 px-1.5 text-right text-gray-700">{r.stock}</td>
                    <td className="py-1 px-1.5 text-right font-bold text-yellow-700">{r.dias.toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Columna 3: Resumen */}
        <div className="flex flex-col gap-3">
          {/* Resumen por producto */}
          <div className="bg-white rounded-xl shadow border border-orange-200 p-3 flex-1">
            <h4 className="text-xs font-bold text-orange-900 mb-2">Resumen por Producto</h4>
            <div className="space-y-2">
              {Object.entries(byProd).map(([prod, data]) => (
                <div key={prod} className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 truncate mr-2">{prod}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    {data.zero > 0 && (
                      <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold">
                        {data.zero} sin stock
                      </span>
                    )}
                    <span className="px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-700 text-[10px] font-bold">
                      {data.count} alertas
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-2 border-t border-orange-100">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-orange-900">TOTAL NORTE</span>
                <span className="text-red-700">{NORTE_RESTOCK.length} posiciones</span>
              </div>
            </div>
          </div>

          {/* Plazas afectadas */}
          <div className="bg-white rounded-xl shadow border border-orange-200 p-3">
            <h4 className="text-xs font-bold text-orange-900 mb-2">Plazas más afectadas</h4>
            <div className="space-y-1.5 text-xs">
              {[
                { plaza: "Monterrey Ote", count: NORTE_RESTOCK.filter((r) => r.plaza === "Monterrey Ote").length },
                { plaza: "Chihuahua", count: NORTE_RESTOCK.filter((r) => r.plaza === "Chihuahua").length },
                { plaza: "Monterrey Pte", count: NORTE_RESTOCK.filter((r) => r.plaza === "Monterrey Pte").length },
                { plaza: "Nuevo Laredo", count: NORTE_RESTOCK.filter((r) => r.plaza === "Nuevo Laredo").length },
              ].map((p) => (
                <div key={p.plaza} className="flex items-center justify-between">
                  <span className="text-gray-700">{p.plaza}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-400 rounded-full"
                        style={{ width: `${(p.count / 20) * 100}%` }}
                      />
                    </div>
                    <span className="font-bold text-red-700 w-5 text-right">{p.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accionable */}
          <div className="bg-red-50 rounded-xl border border-red-200 px-3 py-2.5">
            <p className="text-xs font-bold text-red-800 mb-1">Acción requerida:</p>
            <p className="text-[11px] text-red-700">
              Solicitar resurtido prioritario de estos SKUs en las tiendas listadas.
              Monterrey concentra la mayoría de alertas — coordinar con CEDIS MTNA.
            </p>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="px-8 pb-4">
        <div className="bg-white/70 rounded-xl px-6 py-2.5 text-sm text-gray-700">
          <span className="font-semibold text-orange-900">Norte = 37.5% de la venta total.</span>{" "}
          Si no se resurte, se pierde venta en la zona más importante. Las 4 posiciones con stock cero ya están perdiendo venta diaria.
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN — Carousel
   ================================================================ */

const slides = [
  { component: Slide1, title: "Scorecard" },
  { component: Slide2, title: "Sell-Out" },
  { component: Slide3, title: "Productos" },
  { component: Slide4, title: "Alertas" },
  { component: Slide5, title: "Norte" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent((c) => Math.min(slides.length - 1, c + 1)), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const SlideComponent = slides[current].component;

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="relative shadow-2xl rounded-2xl overflow-hidden">
        <SlideComponent />
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={prev}
          disabled={current === 0}
          className="p-2 rounded-full bg-orange-600 text-white disabled:opacity-30 hover:bg-orange-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                i === current
                  ? "bg-orange-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="p-2 rounded-full bg-orange-600 text-white disabled:opacity-30 hover:bg-orange-700 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-gray-500 text-xs mt-3">Usa ← → para navegar</p>
    </main>
  );
}
