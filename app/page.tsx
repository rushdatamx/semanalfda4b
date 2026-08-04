"use client";

import { useState, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownRight,
  Store, Box, TrendingUp, Tag, CheckCircle2, Zap,
} from "lucide-react";

const KPI = {"udsYtd26": 21155, "udsYtd25": 18055, "varUds": 17.2, "estPvp26": 806021, "tiendasActivas": 409, "tiendasCatalogadas": 410, "bloqueadas": 17, "fechaMaxVenta": "2026-07-31", "fechaInv": "2026-08-02"};
const VENTAS_MES = [{"mes": "Ene", "u2025": 2879, "u2026": 2994, "var": 4.0}, {"mes": "Feb", "u2025": 2510, "u2026": 2775, "var": 10.6}, {"mes": "Mar", "u2025": 2656, "u2026": 2867, "var": 7.9}, {"mes": "Abr", "u2025": 2270, "u2026": 2714, "var": 19.6}, {"mes": "May", "u2025": 2489, "u2026": 3219, "var": 29.3}, {"mes": "Jun", "u2025": 2576, "u2026": 2894, "var": 12.3}, {"mes": "Jul", "u2025": 2675, "u2026": 3692, "var": 38.0}];
const PRODUCTOS = [{"nombre": "Rodajitas Spicy Limon 30g", "corto": "Rodajitas", "upc": "7500462860042", "uds26": 6230, "uds25": 5672, "var": 9.8, "pctTotal": 29.4, "tend3m": [873, 883, 1000], "precioPvp": 27.5}, {"nombre": "Chicharron de Cerdo 75g", "corto": "Chicharron", "upc": "7503028921317", "uds26": 5266, "uds25": 4274, "var": 23.2, "pctTotal": 24.9, "tend3m": [774, 757, 921], "precioPvp": 58.0}, {"nombre": "Palomitas Classic White 25g", "corto": "Classic White", "upc": "7500462417833", "uds26": 5090, "uds25": 4287, "var": 18.7, "pctTotal": 24.1, "tend3m": [781, 593, 900], "precioPvp": 22.5}, {"nombre": "Palomitas Street Elote 125g", "corto": "Street Elote 125g", "upc": "7500462860004", "uds26": 4569, "uds25": 3822, "var": 19.5, "pctTotal": 21.6, "tend3m": [791, 661, 871], "precioPvp": 47.0}];
const TOP20 = [{"code": "LGCL", "tienda": "F A LEON, CLOUTHIER", "zona": "OCCIDENTE", "plaza": "LEON", "uds": 244, "estPvp": 7617}, {"code": "MAME", "tienda": "F A MAZATLAN, MEDITERRANEO", "zona": "PACIFICO", "plaza": "MAZATLAN", "uds": 225, "estPvp": 9332}, {"code": "MTCW", "tienda": "F A MONTERREY OTE, CORPORA", "zona": "NORTE", "plaza": "MONTERREY ORIENTE", "uds": 210, "estPvp": 7476}, {"code": "MTHD", "tienda": "F A MONTERREY OTE, OBISPAD", "zona": "NORTE", "plaza": "MONTERREY ORIENTE", "uds": 198, "estPvp": 6696}, {"code": "CLCL", "tienda": "F A CULIACAN, CELENES", "zona": "PACIFICO", "plaza": "CULIACAN", "uds": 181, "estPvp": 5297}, {"code": "LGPC", "tienda": "F A LEON, PROL CAMPESTRE", "zona": "OCCIDENTE", "plaza": "LEON", "uds": 171, "estPvp": 5123}, {"code": "CNCL", "tienda": "F A CANCUN, COLOSIO", "zona": "PENINSULA", "plaza": "CANCUN", "uds": 164, "estPvp": 6776}, {"code": "MTP4", "tienda": "F A MONTERREY OTE, PLAZA 4", "zona": "NORTE", "plaza": "MONTERREY ORIENTE", "uds": 160, "estPvp": 5189}, {"code": "MTGT", "tienda": "F A MONTERREY OTE, GLORIET", "zona": "NORTE", "plaza": "MONTERREY ORIENTE", "uds": 158, "estPvp": 5472}, {"code": "LGPA", "tienda": "F A LEON, PASEO DEL MORAL", "zona": "OCCIDENTE", "plaza": "LEON", "uds": 157, "estPvp": 4629}, {"code": "MTUA", "tienda": "F A MONTERREY OTE, UMA", "zona": "NORTE", "plaza": "MONTERREY ORIENTE", "uds": 150, "estPvp": 4772}, {"code": "MTVL", "tienda": "F A MONTERREY OTE, VALLE A", "zona": "NORTE", "plaza": "MONTERREY ORIENTE", "uds": 140, "estPvp": 4841}, {"code": "MXBN", "tienda": "F A MEXICO CENTRO, LUIS BA", "zona": "METRO", "plaza": "MEXICO CENTRO", "uds": 140, "estPvp": 5979}, {"code": "MTCA", "tienda": "F A MONTERREY OTE, CALZADA", "zona": "NORTE", "plaza": "NUEVA 2025", "uds": 137, "estPvp": 4776}, {"code": "MAOP", "tienda": "F A MAZATLAN, OSCAR PEREZ", "zona": "PACIFICO", "plaza": "MAZATLAN", "uds": 122, "estPvp": 4575}, {"code": "MEDZ", "tienda": "F A MERIDA, DZITYA REAL MO", "zona": "PENINSULA", "plaza": "MERIDA", "uds": 122, "estPvp": 4566}, {"code": "MTRS", "tienda": "F A MONTERREY OTE, ROBERTO", "zona": "NORTE", "plaza": "MONTERREY ORIENTE", "uds": 122, "estPvp": 3874}, {"code": "PEMZ", "tienda": "F A PUEBLA, MARZALA", "zona": "CENTRO - SUR", "plaza": "PUEBLA", "uds": 121, "estPvp": 4061}, {"code": "CHLV", "tienda": "F A SALTILLO, LOS VALDEZ", "zona": "NORTE", "plaza": "SALTILLO", "uds": 120, "estPvp": 4463}, {"code": "TLGR", "tienda": "F A TOLUCA FORANEAS, GENER", "zona": "METRO", "plaza": "TOLUCA FORANEAS", "uds": 116, "estPvp": 4121}];
const PROMO_SKU = [{"sku": "Classic White 25g", "mec": "2 x $30", "baseline": 672, "jul26": 900, "lift": 33.9, "incr": 228, "liftSS": 33.6, "incrSS": 216, "yoy": 27.5, "p2jun": 11.3, "p2jul": 27.8, "incrPvp": 5122}, {"sku": "Street Elote 125g", "mec": "20% desc", "baseline": 670, "jul26": 871, "lift": 30.0, "incr": 201, "liftSS": 29.9, "incrSS": 196, "yoy": 68.1, "p2jun": 9.1, "p2jul": 10.3, "incrPvp": 9447}, {"sku": "Chicharron 75g", "mec": "20% desc", "baseline": 749, "jul26": 921, "lift": 23.0, "incr": 172, "liftSS": 21.6, "incrSS": 156, "yoy": 36.8, "p2jun": 10.0, "p2jul": 13.1, "incrPvp": 9995}, {"sku": "Rodajitas 30g", "mec": "20% desc", "baseline": 851, "jul26": 1000, "lift": 17.5, "incr": 149, "liftSS": 16.8, "incrSS": 139, "yoy": 28.5, "p2jun": 14.8, "p2jul": 15.1, "incrPvp": 4088}];
const PROMO_TOT = {"baseline": 2942, "jul26": 3692, "lift": 25.5, "incr": 750, "baselineSS": 2848, "jul26SS": 3554, "liftSS": 24.8, "incrSS": 706, "nSameStore": 359, "jul25": 2675, "yoy": 38.0, "incrPvp": 28652, "tiendasBase": 391, "tiendasJul": 399, "liftTiendas": 2.0, "liftIntensidad": 23.0};
const PROMO_SEM = [{"sem": "S23", "ini": "06-01", "uds": 675, "dias": 7, "udsDia": 96.4, "p2": 13.4, "parcial": false}, {"sem": "S24", "ini": "06-08", "uds": 665, "dias": 7, "udsDia": 95.0, "p2": 11.4, "parcial": false}, {"sem": "S25", "ini": "06-15", "uds": 656, "dias": 7, "udsDia": 93.7, "p2": 7.6, "parcial": false}, {"sem": "S26", "ini": "06-22", "uds": 677, "dias": 7, "udsDia": 96.7, "p2": 12.6, "parcial": false}, {"sem": "S27", "ini": "06-29", "uds": 792, "dias": 7, "udsDia": 113.1, "p2": 22.8, "parcial": false}, {"sem": "S28", "ini": "07-06", "uds": 754, "dias": 7, "udsDia": 107.7, "p2": 20.9, "parcial": false}, {"sem": "S29", "ini": "07-13", "uds": 853, "dias": 7, "udsDia": 121.9, "p2": 32.9, "parcial": false}, {"sem": "S30", "ini": "07-20", "uds": 874, "dias": 7, "udsDia": 124.9, "p2": 32.6, "parcial": false}, {"sem": "S31", "ini": "07-27", "uds": 640, "dias": 5, "udsDia": 128.0, "p2": 25.8, "parcial": true}];
const PROMO_MIX = [{"mes": "Junio (sin promo)", "p1": 84.9, "p2": 11.4, "p3": 3.7}, {"mes": "Julio (promo)", "p1": 79.2, "p2": 16.2, "p3": 4.6}];
const PIE_PRODUCTOS = PRODUCTOS.map((p) => ({ name: p.corto, value: p.uds26 }));
const PIE_COLORS = ["#ea580c", "#f97316", "#fb923c", "#fdba74"];


const fmtU = (n: number) => n.toLocaleString("es-MX", { maximumFractionDigits: 0 });
const fmtPct = (n: number) => (n >= 0 ? "+" : "") + n.toFixed(1) + "%";
const fmtPVP = (n: number) => "$" + n.toLocaleString("es-MX", { maximumFractionDigits: 0 });

const VarBadge = ({ v }: { v: number }) => (
  <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${v >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
    {v >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
    {fmtPct(v)}
  </span>
);

const Head = ({ t, s, icon }: { t: string; s?: string; icon?: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-3">
    <img src="4buddies-logo.jpeg" alt="4B" className="h-10 rounded-lg shadow" />
    <div className="flex-1">
      <h2 className="text-xl font-bold text-orange-900 flex items-center gap-2">{icon}{t}</h2>
      {s && <p className="text-[11px] text-orange-600">{s}</p>}
    </div>
  </div>
);

const Foot = ({ children, color = "orange" }: { children: React.ReactNode; color?: string }) => {
  const c: Record<string, string> = {
    orange: "bg-orange-600", red: "bg-red-600", green: "bg-green-600", blue: "bg-blue-600",
  };
  return (
    <div className={`${c[color]} text-white rounded-lg px-4 py-2 text-[12px] font-semibold mt-2 flex items-center gap-2`}>
      <Zap size={14} className="shrink-0" />
      <span>{children}</span>
    </div>
  );
};

const Card = ({ children, cls = "" }: { children: React.ReactNode; cls?: string }) => (
  <div className={`bg-white rounded-xl shadow border border-orange-200 p-3 ${cls}`}>{children}</div>
);

/* ---------------- Slide 1: Portada ---------------- */
const S1 = () => (
  <div className="flex flex-col items-center justify-center h-full p-8">
    <img src="4buddies-logo.jpeg" alt="4BUDDIES" className="h-24 mb-5 rounded-xl shadow-lg" />
    <h1 className="text-3xl font-bold text-orange-900 text-center">Reporte de Ventas — 4BUDDIES</h1>
    <h2 className="text-xl text-orange-700 mb-1">Farmacias del Ahorro</h2>
    <p className="text-sm text-orange-600 mb-6">
      Cierre julio 2026 · Venta al {KPI.fechaMaxVenta} · Inventario al {KPI.fechaInv}
    </p>

    <div className="flex gap-3 mb-5">
      <div className="bg-white rounded-xl shadow-lg border-2 border-orange-300 px-5 py-3 text-center min-w-[150px]">
        <p className="text-[10px] text-orange-500 font-semibold uppercase">Unidades YTD 2026</p>
        <p className="text-3xl font-bold text-orange-900">{fmtU(KPI.udsYtd26)}</p>
        <VarBadge v={KPI.varUds} /> <span className="text-[10px] text-gray-500">vs 2025</span>
      </div>
      <div className="bg-white rounded-xl shadow-lg border-2 border-green-300 px-5 py-3 text-center min-w-[150px]">
        <p className="text-[10px] text-green-600 font-semibold uppercase">Julio 2026</p>
        <p className="text-3xl font-bold text-green-700">{fmtU(PROMO_TOT.jul26)}</p>
        <VarBadge v={PROMO_TOT.yoy} /> <span className="text-[10px] text-gray-500">vs jul-25</span>
      </div>
      <div className="bg-white rounded-xl shadow-lg border-2 border-orange-300 px-5 py-3 text-center min-w-[150px]">
        <p className="text-[10px] text-orange-500 font-semibold uppercase">Tiendas activas</p>
        <p className="text-3xl font-bold text-orange-900">{KPI.tiendasActivas}</p>
        <p className="text-[10px] text-gray-500">de {KPI.tiendasCatalogadas} catalogadas</p>
      </div>
    </div>

    <div className="bg-green-600 text-white rounded-lg px-5 py-2.5 text-sm font-bold flex items-center gap-2">
      <CheckCircle2 size={16} />
      La promocion de julio genero +{PROMO_TOT.incr} uds incrementales ({fmtPct(PROMO_TOT.lift)} vs baseline)
    </div>

    <p className="text-[10px] text-gray-400 mt-4">
      Estimado PVP YTD: {fmtPVP(KPI.estPvp26)} — precio de anaquel estimado, no facturacion real.
      Solo las {KPI.tiendasCatalogadas} tiendas catalogadas. 4 SKUs core.
    </p>
  </div>
);

/* ---------------- Slide 2: Venta mensual ---------------- */
const S2 = () => (
  <div className="flex flex-col h-full p-6">
    <Head t="Sell-Out Mensual — 2025 vs 2026" s="Unidades. FDA no reporta monto en pesos." icon={<TrendingUp size={18} />} />
    <div className="flex gap-3 flex-1 min-h-0">
      <Card cls="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={VENTAS_MES} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip formatter={(v: number) => fmtU(v) + " uds"} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="u2025" name="2025" fill="#fdba74" radius={[3, 3, 0, 0]} />
            <Bar dataKey="u2026" name="2026" fill="#ea580c" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card cls="w-[300px]">
        <table className="w-full text-[11px]">
          <thead><tr className="bg-orange-600 text-white">
            <th className="p-1.5 text-left rounded-tl">Mes</th><th className="p-1.5 text-right">2025</th>
            <th className="p-1.5 text-right">2026</th><th className="p-1.5 text-right rounded-tr">Var</th>
          </tr></thead>
          <tbody>
            {VENTAS_MES.map((m, i) => (
              <tr key={m.mes} className={`${i % 2 ? "bg-orange-50" : ""} ${m.mes === "Jul" ? "font-bold bg-green-50" : ""}`}>
                <td className="p-1.5">{m.mes}{m.mes === "Jul" ? " *" : ""}</td>
                <td className="p-1.5 text-right">{fmtU(m.u2025)}</td>
                <td className="p-1.5 text-right">{fmtU(m.u2026)}</td>
                <td className="p-1.5 text-right"><span className={m.var >= 0 ? "text-green-700 font-semibold" : "text-red-600"}>{fmtPct(m.var)}</span></td>
              </tr>
            ))}
            <tr className="bg-orange-200 font-bold border-t-2 border-orange-400">
              <td className="p-1.5">YTD</td>
              <td className="p-1.5 text-right">{fmtU(KPI.udsYtd25)}</td>
              <td className="p-1.5 text-right">{fmtU(KPI.udsYtd26)}</td>
              <td className="p-1.5 text-right text-green-800">{fmtPct(KPI.varUds)}</td>
            </tr>
          </tbody>
        </table>
        <p className="text-[9px] text-gray-500 mt-2">* Julio con plan promocional activo.</p>
      </Card>
    </div>
    <Foot color="green">
      Julio es el mejor mes del año: {fmtU(PROMO_TOT.jul26)} uds, {fmtPct(PROMO_TOT.yoy)} vs jul-2025 → repetir la mecanica en septiembre.
    </Foot>
  </div>
);

/* ---------------- Slide 3: Impacto promocion ---------------- */
const S3 = () => (
  <div className="flex flex-col h-full p-6">
    <Head t="Impacto del Plan Promocional — Julio 2026" s={`Baseline: promedio abr-jun 2026. Control same-store con ${PROMO_TOT.nSameStore} tiendas activas los 4 meses.`} icon={<Tag size={18} />} />

    <div className="flex gap-2 mb-2">
      {[
        { l: "Venta julio", v: fmtU(PROMO_TOT.jul26) + " uds", s: `baseline ${fmtU(PROMO_TOT.baseline)}`, c: "orange" },
        { l: "Lift vs baseline", v: fmtPct(PROMO_TOT.lift), s: `+${PROMO_TOT.incr} uds incrementales`, c: "green" },
        { l: "Lift same-store", v: fmtPct(PROMO_TOT.liftSS), s: `${PROMO_TOT.nSameStore} mismas tiendas`, c: "green" },
        { l: "vs julio 2025", v: fmtPct(PROMO_TOT.yoy), s: `jul-25: ${fmtU(PROMO_TOT.jul25)} uds`, c: "green" },
        { l: "Incremental Est. PVP", v: fmtPVP(PROMO_TOT.incrPvp), s: "precio lista, no promo", c: "orange" },
      ].map((k) => (
        <div key={k.l} className={`flex-1 bg-white rounded-lg shadow border-2 ${k.c === "green" ? "border-green-300" : "border-orange-300"} px-2 py-2 text-center`}>
          <p className="text-[9px] text-gray-500 font-semibold uppercase leading-tight">{k.l}</p>
          <p className={`text-xl font-bold ${k.c === "green" ? "text-green-700" : "text-orange-900"}`}>{k.v}</p>
          <p className="text-[9px] text-gray-400">{k.s}</p>
        </div>
      ))}
    </div>

    <div className="flex gap-3 flex-1 min-h-0">
      <Card cls="flex-1 flex flex-col">
        <p className="text-[11px] font-bold text-orange-900 mb-1">Desempeño por SKU y mecanica</p>
        <table className="w-full text-[10px]">
          <thead><tr className="bg-orange-600 text-white">
            <th className="p-1 text-left">SKU</th><th className="p-1 text-left">Mecanica</th>
            <th className="p-1 text-right">Base</th><th className="p-1 text-right">Julio</th>
            <th className="p-1 text-right">Lift</th><th className="p-1 text-right">Same-store</th>
            <th className="p-1 text-right">vs jul-25</th>
          </tr></thead>
          <tbody>
            {PROMO_SKU.map((p, i) => (
              <tr key={p.sku} className={`${i % 2 ? "bg-orange-50" : ""} ${p.mec === "2 x $30" ? "bg-amber-100 font-semibold" : ""}`}>
                <td className="p-1">{p.sku}</td>
                <td className="p-1">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${p.mec === "2 x $30" ? "bg-amber-500 text-white" : "bg-orange-200 text-orange-800"}`}>{p.mec}</span>
                </td>
                <td className="p-1 text-right">{fmtU(p.baseline)}</td>
                <td className="p-1 text-right font-semibold">{fmtU(p.jul26)}</td>
                <td className="p-1 text-right text-green-700 font-bold">{fmtPct(p.lift)}</td>
                <td className="p-1 text-right text-green-700">{fmtPct(p.liftSS)}</td>
                <td className="p-1 text-right text-green-700">{fmtPct(p.yoy)}</td>
              </tr>
            ))}
            <tr className="bg-orange-200 font-bold border-t-2 border-orange-400">
              <td className="p-1" colSpan={2}>TOTAL 4 SKUs core</td>
              <td className="p-1 text-right">{fmtU(PROMO_TOT.baseline)}</td>
              <td className="p-1 text-right">{fmtU(PROMO_TOT.jul26)}</td>
              <td className="p-1 text-right text-green-800">{fmtPct(PROMO_TOT.lift)}</td>
              <td className="p-1 text-right text-green-800">{fmtPct(PROMO_TOT.liftSS)}</td>
              <td className="p-1 text-right text-green-800">{fmtPct(PROMO_TOT.yoy)}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-2 bg-blue-50 border border-blue-200 rounded p-2">
          <p className="text-[10px] font-bold text-blue-900 mb-1">¿El lift es real o solo hay mas tiendas surtidas?</p>
          <div className="flex gap-2 text-[10px]">
            <div className="flex-1 bg-white rounded p-1.5 text-center border border-blue-200">
              <p className="text-gray-500 text-[9px]">Mas tiendas</p>
              <p className="font-bold text-blue-700">{fmtPct(PROMO_TOT.liftTiendas)}</p>
              <p className="text-[8px] text-gray-400">{PROMO_TOT.tiendasBase} → {PROMO_TOT.tiendasJul}</p>
            </div>
            <div className="flex-1 bg-white rounded p-1.5 text-center border-2 border-green-400">
              <p className="text-gray-500 text-[9px]">Mas venta por tienda</p>
              <p className="font-bold text-green-700">{fmtPct(PROMO_TOT.liftIntensidad)}</p>
              <p className="text-[8px] text-gray-400">esto es la promo</p>
            </div>
          </div>
          <p className="text-[9px] text-blue-800 mt-1">
            El crecimiento NO viene de mas puntos de venta: viene de que cada tienda vende mas.
          </p>
        </div>

        <div className="mt-2 flex-1 bg-amber-50 border border-amber-300 rounded p-2 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-amber-900 mb-1.5">
            Rendimiento por mecanica — promedio de lift
          </p>
          <div className="flex gap-2 items-stretch">
            <div className="flex-1 bg-white rounded p-2 border-2 border-amber-500">
              <p className="text-[9px] text-gray-500 font-semibold">2 x $30 (NxS)</p>
              <p className="text-2xl font-bold text-amber-700">
                {fmtPct(PROMO_SKU.filter((p) => p.mec === "2 x $30").reduce((a, p) => a + p.lift, 0) /
                  PROMO_SKU.filter((p) => p.mec === "2 x $30").length)}
              </p>
              <p className="text-[8px] text-gray-500">1 SKU · Classic White</p>
              <p className="text-[9px] font-bold text-amber-800 mt-1">
                +16.5 pts en compras de 2 pzas
              </p>
            </div>
            <div className="flex-1 bg-white rounded p-2 border border-gray-300">
              <p className="text-[9px] text-gray-500 font-semibold">20% descuento</p>
              <p className="text-2xl font-bold text-gray-600">
                {fmtPct(PROMO_SKU.filter((p) => p.mec === "20% desc").reduce((a, p) => a + p.lift, 0) /
                  PROMO_SKU.filter((p) => p.mec === "20% desc").length)}
              </p>
              <p className="text-[8px] text-gray-500">3 SKUs · promedio</p>
              <p className="text-[9px] font-bold text-gray-600 mt-1">
                +0.3 a +3.1 pts en compras de 2 pzas
              </p>
            </div>
          </div>
          <p className="text-[9px] text-amber-900 mt-1.5">
            Ambas mecanicas vendieron mas, pero solo el 2xN cambio <b>cuantas piezas</b> se lleva el cliente.
            Con el mismo costo promocional, la mecanica NxS es la palanca mas eficiente.
          </p>
        </div>
      </Card>

      <Card cls="w-[380px]">
        <p className="text-[11px] font-bold text-orange-900 mb-1">
          Arranque semanal — unidades por dia
        </p>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PROMO_SEM} margin={{ top: 5, right: 8, bottom: 0, left: -18 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
              <XAxis dataKey="ini" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} domain={[85, 135]} />
              <Tooltip
                formatter={(v: number) => v.toFixed(1) + " uds/dia"}
                labelFormatter={(l: string) => {
                  const w = PROMO_SEM.find((x) => x.ini === l);
                  return `Semana ${l} (${w?.dias} dias)`;
                }}
              />
              <Line type="monotone" dataKey="udsDia" stroke="#ea580c" strokeWidth={2.5}
                dot={{ r: 3 }} name="Uds/dia" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[9px] text-gray-500">
          Junio se mueve plano en ~95 uds/dia. Desde la semana del 29-jun sube a 108-128 uds/dia y
          <b> no baja</b>: la ultima semana es la mas alta del periodo.
          Se grafica por dia porque la semana del 27-jul solo tiene 5 dias.
        </p>
        <div className="mt-2 bg-amber-50 border border-amber-300 rounded p-2">
          <p className="text-[10px] font-bold text-amber-900">Cambio en el mix de piezas</p>
          <table className="w-full text-[9px] mt-1">
            <thead><tr className="text-gray-500"><th className="text-left">Mes</th><th className="text-right">1 pza</th><th className="text-right">2 pzas</th><th className="text-right">3+</th></tr></thead>
            <tbody>
              {PROMO_MIX.map((m) => (
                <tr key={m.mes} className="border-t border-amber-200">
                  <td className="py-0.5">{m.mes}</td>
                  <td className="text-right">{m.p1}%</td>
                  <td className="text-right font-bold text-amber-800">{m.p2}%</td>
                  <td className="text-right">{m.p3}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-2 bg-green-50 border-2 border-green-400 rounded p-2">
          <p className="text-[10px] font-bold text-green-900 flex items-center gap-1">
            <CheckCircle2 size={12} /> El 2xN mueve mas que el % de descuento
          </p>
          <p className="text-[9px] text-green-900 leading-snug mt-0.5">
            Classic White — el unico SKU con 2x$30 real — multiplico <b>x2.5</b> sus compras de 2 piezas
            ({PROMO_SKU.find((p) => p.sku === "Classic White 25g")!.p2jun}% →{" "}
            <b>{PROMO_SKU.find((p) => p.sku === "Classic White 25g")!.p2jul}%</b>). Los SKUs con 20% de descuento
            se movieron entre +0.3 y +3.1 pts. El comportamiento de compra cambio solo donde la mecanica pedia llevar 2.
          </p>
        </div>
      </Card>
    </div>
    <Foot color="green">
      Los 4 SKUs crecieron. Street Elote 125g es el mejor retorno: {fmtPct(PROMO_SKU.find((p) => p.sku === "Street Elote 125g")!.yoy)} vs jul-25 con solo 20% de descuento.
    </Foot>
  </div>
);

/* ---------------- Slide 5: Producto ---------------- */
const S5 = () => (
  <div className="flex flex-col h-full p-6">
    <Head t="Venta por Producto — 4 SKUs Core" s="YTD ene-jul 2026 vs 2025. Solo tiendas catalogadas." icon={<Box size={18} />} />
    <div className="flex gap-3 flex-1 min-h-0">
      <Card cls="w-[300px] flex flex-col">
        <p className="text-[11px] font-bold text-orange-900 mb-1">Participacion YTD 2026</p>
        <div className="h-[215px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={PIE_PRODUCTOS} dataKey="value" nameKey="name" cx="50%" cy="50%"
                outerRadius={85} innerRadius={42} paddingAngle={2}
                label={({ percent }: { percent?: number }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={false} fontSize={11} fontWeight={700} fill="#7c2d12">
                {PIE_PRODUCTOS.map((e, i) => <Cell key={e.name} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => fmtU(v) + " uds"} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-1 mt-1">
          {PRODUCTOS.map((p, i) => (
            <div key={p.upc} className="flex items-center gap-1.5 text-[10px]">
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: PIE_COLORS[i] }} />
              <span className="flex-1 text-gray-700">{p.corto}</span>
              <span className="font-bold text-orange-900">{fmtU(p.uds26)}</span>
              <span className="text-gray-400 w-9 text-right">{p.pctTotal}%</span>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-2 bg-orange-50 border border-orange-200 rounded p-2">
          <p className="text-[10px] text-orange-900 font-semibold">
            Portafolio balanceado: ningun SKU pasa del 30%. Reduce el riesgo de depender de un solo producto.
          </p>
        </div>
      </Card>
      <Card cls="flex-1 flex flex-col">
        <table className="w-full text-[11px]">
          <thead><tr className="bg-orange-600 text-white">
            <th className="p-1.5 text-left">Producto</th><th className="p-1.5 text-right">YTD 26</th>
            <th className="p-1.5 text-right">YTD 25</th><th className="p-1.5 text-right">Var</th>
            <th className="p-1.5 text-right">% Part</th><th className="p-1.5 text-center">May-Jun-Jul</th>
          </tr></thead>
          <tbody>
            {PRODUCTOS.map((p, i) => {
              const mx = Math.max(...p.tend3m);
              return (
                <tr key={p.upc} className={i % 2 ? "bg-orange-50" : ""}>
                  <td className="p-1.5 font-semibold">{p.corto}</td>
                  <td className="p-1.5 text-right font-bold">{fmtU(p.uds26)}</td>
                  <td className="p-1.5 text-right text-gray-500">{fmtU(p.uds25)}</td>
                  <td className="p-1.5 text-right"><VarBadge v={p.var} /></td>
                  <td className="p-1.5 text-right">{p.pctTotal}%</td>
                  <td className="p-1.5">
                    <div className="flex items-end gap-0.5 h-7 justify-center">
                      {p.tend3m.map((t, k) => (
                        <div key={k} className="w-4 bg-orange-400 rounded-t relative" style={{ height: `${(t / mx) * 100}%` }}
                          title={`${fmtU(t)} uds`}>
                          {k === 2 && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[7px] font-bold text-orange-800">{t}</span>}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-green-50 border border-green-300 rounded p-2">
            <p className="text-[10px] font-bold text-green-800">Mejor crecimiento YTD</p>
            <p className="text-[10px] text-green-900">Chicharron 75g {fmtPct(PRODUCTOS.find((p) => p.corto === "Chicharron")!.var)} — asegurar surtido continuo.</p>
          </div>
          <div className="bg-amber-50 border border-amber-300 rounded p-2">
            <p className="text-[10px] font-bold text-amber-800">A vigilar</p>
            <p className="text-[10px] text-amber-900">Rodajitas {fmtPct(PRODUCTOS.find((p) => p.corto === "Rodajitas")!.var)}: es el SKU lider pero el de menor crecimiento.</p>
          </div>
        </div>

        <div className="mt-2 flex-1 bg-white border-2 border-orange-200 rounded-lg p-2.5 flex flex-col justify-center">
          <p className="text-[11px] font-bold text-orange-900 mb-2">
            El salto de julio por producto — junio vs julio 2026
          </p>
          <div className="grid grid-cols-4 gap-2">
            {PRODUCTOS.map((p) => {
              const jun = p.tend3m[1];
              const jul = p.tend3m[2];
              const d = ((jul - jun) / jun) * 100;
              return (
                <div key={p.upc} className="bg-orange-50 border border-orange-200 rounded p-2 text-center">
                  <p className="text-[9px] text-gray-600 font-semibold leading-tight h-6">{p.corto}</p>
                  <p className="text-lg font-bold text-orange-800 leading-none">{fmtU(jul)}</p>
                  <p className="text-[8px] text-gray-400 mb-1">jun: {fmtU(jun)}</p>
                  <span className="inline-block px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-green-100 text-green-700">
                    {fmtPct(d)}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-orange-900 mt-2">
            Los 4 SKUs subieron en julio. Classic White fue el mayor salto mensual
            (+51.8%) — es el que llevaba la mecanica 2x$30.
          </p>
        </div>
      </Card>
    </div>
    <Foot>Los 4 SKUs core crecen en 2026. Todos subieron en julio con la promocion.</Foot>
  </div>
);

/* ---------------- Slide 10: Top 20 ---------------- */
const S10 = () => {
  const mx = TOP20[0].uds;
  return (
    <div className="flex flex-col h-full p-6">
      <Head t="Top 20 Tiendas Catalogadas — YTD 2026" s="Unidades ene-jul 2026, 4 SKUs core." icon={<Store size={18} />} />
      <Card cls="flex-1">
        <table className="w-full text-[10px]">
          <thead><tr className="bg-orange-600 text-white">
            <th className="p-1 text-left">#</th><th className="p-1 text-left">Sucursal</th>
            <th className="p-1 text-left">Zona</th><th className="p-1 text-left">Plaza</th>
            <th className="p-1 text-right">Uds</th><th className="p-1 text-right">Est. PVP*</th>
            <th className="p-1 text-left w-[130px]"></th>
          </tr></thead>
          <tbody>
            {TOP20.map((t, i) => (
              <tr key={t.code} className={i % 2 ? "bg-orange-50" : ""}>
                <td className="p-1 text-gray-400">{i + 1}</td>
                <td className="p-1 font-semibold">{t.tienda}</td>
                <td className="p-1 text-gray-600">{t.zona}</td>
                <td className="p-1 text-gray-600">{t.plaza}</td>
                <td className="p-1 text-right font-bold">{fmtU(t.uds)}</td>
                <td className="p-1 text-right text-gray-500">{fmtPVP(t.estPvp)}</td>
                <td className="p-1">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(t.uds / mx) * 100}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[9px] text-gray-400 mt-2">
          * Estimado PVP: unidades x precio de anaquel estimado. No es dato de facturacion real.
        </p>
      </Card>
      <Foot>Las 20 tiendas top concentran {fmtU(TOP20.reduce((a, t) => a + t.uds, 0))} uds — priorizar su abasto en cada ventana promocional.</Foot>
    </div>
  );
};

const SLIDES = [S1, S2, S3, S5, S10];
const TITLES = ["Portada", "Mensual", "Impacto Promo", "Productos", "Top 20"];

export default function Page() {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") setCur((c) => Math.min(c + 1, SLIDES.length - 1));
      if (e.key === "ArrowLeft") setCur((c) => Math.max(c - 1, 0));
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  const Cur = SLIDES[cur];
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-950 p-4">
      <div className="relative w-[1280px] aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-orange-700 bg-gradient-to-br from-orange-50 to-orange-100">
        <Cur />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-orange-900/90 backdrop-blur rounded-full px-4 py-1.5 shadow-lg flex items-center gap-2">
          <button onClick={() => setCur((c) => Math.max(c - 1, 0))} disabled={cur === 0}
            className="text-white disabled:opacity-30 hover:bg-orange-800 rounded p-0.5"><ChevronLeft size={16} /></button>
          <div className="flex gap-1">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setCur(i)} title={TITLES[i]}
                className={`w-2 h-2 rounded-full transition-all ${i === cur ? "bg-orange-300 w-5" : "bg-orange-600 hover:bg-orange-400"}`} />
            ))}
          </div>
          <button onClick={() => setCur((c) => Math.min(c + 1, SLIDES.length - 1))} disabled={cur === SLIDES.length - 1}
            className="text-white disabled:opacity-30 hover:bg-orange-800 rounded p-0.5"><ChevronRight size={16} /></button>
          <span className="text-orange-200 text-[10px] font-semibold ml-1 w-20">{cur + 1}/{SLIDES.length} · {TITLES[cur]}</span>
        </div>
      </div>
    </div>
  );
}
