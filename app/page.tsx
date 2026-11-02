"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import data from "./sellout-total.json";

const fmt = (n: number) => n.toLocaleString("es-MX", { maximumFractionDigits: 0 });
const pct = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(1)}%`;
const coreProducts = data.products.filter((p) => p.precioPvp !== null);

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="flex items-center gap-4 border-b border-orange-200 pb-4">
      <img src="/4buddies-logo.jpeg" alt="4BUDDIES" className="h-12 w-12 rounded-xl object-cover" />
      <div>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700">Farmacias del Ahorro · Sell-out</p>
        <h2 className="text-3xl font-black tracking-tight text-orange-950">{title}</h2>
        <p className="mt-0.5 text-sm text-orange-800">{subtitle}</p>
      </div>
    </header>
  );
}

function Cover() {
  const k = data.kpi;
  return (
    <div className="flex h-full flex-col p-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Reporte ejecutivo · Enero–octubre 2026</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[1.04] tracking-tight text-orange-950">El sell-out crece; las mismas tiendas aún retroceden</h1>
          <p className="mt-3 text-lg text-orange-800">Todas las sucursales con venta · comparación contra enero–octubre 2025</p>
        </div>
        <img src="/4buddies-logo.jpeg" alt="4BUDDIES" className="h-20 w-20 rounded-2xl object-cover shadow" />
      </div>
      <div className="mt-auto grid grid-cols-4 divide-x divide-orange-200 border-y border-orange-200 py-7">
        <div className="px-5 first:pl-0"><p className="text-sm font-bold uppercase tracking-wide text-orange-700">Unidades YTD</p><p className="mt-2 text-4xl font-black text-orange-950">{fmt(k.udsYtd26)}</p></div>
        <div className="px-5"><p className="text-sm font-bold uppercase tracking-wide text-orange-700">Vs. año anterior</p><p className="mt-2 text-4xl font-black text-emerald-700">{pct(k.varUds)}</p></div>
        <div className="px-5"><p className="text-sm font-bold uppercase tracking-wide text-orange-700">Mismas tiendas</p><p className="mt-2 text-4xl font-black text-red-700">{pct(k.varMismasTiendas)}</p><p className="text-xs text-slate-600">{fmt(k.mismasTiendas)} sucursales comparables</p></div>
        <div className="px-5 pr-0"><p className="text-sm font-bold uppercase tracking-wide text-orange-700">Octubre vs. 2025</p><p className="mt-2 text-4xl font-black text-emerald-700">{pct(k.varMesReciente)}</p><p className="text-xs text-slate-600">{fmt(k.udsMesReciente26)} unidades</p></div>
      </div>
      <p className="mt-4 text-xs text-slate-500">Corte de ventas: {data.fechaMaxVenta} · Incluye todas las sucursales y productos registrados.</p>
    </div>
  );
}

function Monthly() {
  return (
    <div className="flex h-full flex-col p-8">
      <Header title="Tendencia mensual" subtitle="Unidades vendidas · todas las sucursales" />
      <div className="mt-5 min-h-0 flex-1 rounded-2xl bg-white/80 p-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.monthly} margin={{ top: 12, right: 18, left: 8, bottom: 4 }}>
            <CartesianGrid vertical={false} stroke="#fed7aa" />
            <XAxis dataKey="mes" tick={{ fontSize: 13, fill: "#7c2d12" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#7c2d12" }} axisLine={false} tickLine={false} width={55} />
            <Tooltip formatter={(v: number) => `${fmt(v)} uds`} />
            <Legend wrapperStyle={{ fontSize: 13, paddingTop: 12 }} />
            <Bar dataKey="u2025" name="2025" fill="#fdba74" radius={[5, 5, 0, 0]} maxBarSize={28} />
            <Bar dataKey="u2026" name="2026" fill="#ea580c" radius={[5, 5, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="font-semibold text-orange-950">Últimos cuatro meses arriba de 2025</span>
        <span className="font-black text-orange-700">Jul {pct(data.monthly[6].var)} · Ago {pct(data.monthly[7].var)} · Sep {pct(data.monthly[8].var)} · Oct {pct(data.monthly[9].var)}</span>
      </div>
    </div>
  );
}

function Products() {
  return (
    <div className="flex h-full flex-col p-8">
      <Header title="Desempeño por producto" subtitle="Los cuatro productos principales · unidades YTD" />
      <div className="mt-4 flex items-end justify-between">
        <p className="text-lg font-bold text-orange-950">Tres productos crecen; Rodajitas sigue siendo el mayor volumen.</p>
        <p className="text-sm text-slate-600">Rodajitas: 30.3% del sell-out total</p>
      </div>
      <div className="mt-3 min-h-0 flex-1 rounded-2xl bg-white/80 px-5 py-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={coreProducts} layout="vertical" margin={{ top: 10, right: 45, left: 18, bottom: 4 }} barGap={5}>
            <CartesianGrid horizontal={false} stroke="#fed7aa" />
            <XAxis type="number" tick={{ fontSize: 12, fill: "#7c2d12" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="corto" width={150} tick={{ fontSize: 14, fill: "#431407", fontWeight: 700 }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: number) => `${fmt(v)} uds`} />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            <Bar dataKey="uds25" name="2025" fill="#fdba74" radius={[0, 5, 5, 0]} maxBarSize={24} />
            <Bar dataKey="uds26" name="2026" fill="#ea580c" radius={[0, 5, 5, 0]} maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-4 text-sm">
        {coreProducts.map((p) => <div key={p.upc} className="flex justify-between border-t border-orange-200 pt-2"><span className="font-semibold text-orange-950">{p.corto}</span><b className={p.var !== null && p.var < 0 ? "text-red-700" : "text-emerald-700"}>{p.var === null ? "—" : pct(p.var)}</b></div>)}
      </div>
    </div>
  );
}

function Stores() {
  const declining = data.cedis.filter((c) => c.var !== null && c.var < 0).sort((a, b) => a.var! - b.var!);
  const growing = data.cedis.filter((c) => c.var !== null && c.var >= 0);
  return (
    <div className="flex h-full flex-col p-8">
      <Header title="Sucursales y distribución" subtitle="Universo completo de tiendas con venta" />
      <div className="mt-8 grid flex-1 grid-cols-2 gap-10">
        <section className="flex flex-col justify-center border-r border-orange-200 pr-10">
          <p className="text-sm font-bold uppercase tracking-wide text-orange-700">Sucursales activas en 2026</p>
          <p className="mt-2 text-7xl font-black tracking-tight text-orange-950">{fmt(data.kpi.tiendasActivas)}</p>
          <p className="mt-2 text-base text-slate-700">con al menos una venta en el periodo</p>
          <p className="mt-8 text-sm font-bold uppercase tracking-wide text-orange-700">Sucursales comparables</p>
          <p className="mt-2 text-4xl font-black text-red-700">{pct(data.kpi.varMismasTiendas)}</p>
          <p className="mt-1 text-base text-slate-700">en {fmt(data.kpi.mismasTiendas)} tiendas activas en ambos periodos</p>
        </section>
        <section className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-wide text-orange-700">Desempeño por CEDIS</p>
          <p className="mt-3 text-xl font-bold text-orange-950">{growing.length} CEDIS con crecimiento · {declining.length} con caída</p>
          {declining.map((c) => <div key={c.cedis} className="mt-5 flex items-center justify-between border-b border-orange-200 pb-3"><span className="text-lg font-semibold text-orange-950">{c.cedis}</span><span className="text-2xl font-black text-red-700">{pct(c.var!)}</span></div>)}
          <p className="mt-5 text-sm leading-relaxed text-slate-600">Priorizar revisión en MTNA y PEBO. Los CEDIS que aparecen solo en 2026 se mantienen fuera de la comparación interanual.</p>
        </section>
      </div>
    </div>
  );
}

function Actions() {
  const actions = [
    { n: "01", title: "Revertir la caída en mismas tiendas", detail: `Revisar las ${fmt(data.kpi.mismasTiendas)} sucursales comparables y localizar dónde se concentra la pérdida de unidades.` },
    { n: "02", title: "Sostener la aceleración reciente", detail: "Mantener el impulso observado de julio a octubre y medirlo por mes y producto." },
    { n: "03", title: "Recuperar Rodajitas", detail: "Es el producto de mayor volumen y cae 2.6% YTD; revisar su ejecución comercial." },
  ];
  return (
    <div className="flex h-full flex-col p-8">
      <Header title="Prioridades ejecutivas" subtitle="Tres decisiones para el siguiente ciclo comercial" />
      <div className="mt-7 flex flex-1 flex-col justify-center divide-y divide-orange-200">
        {actions.map((a) => <div key={a.n} className="grid grid-cols-[70px_1fr] gap-5 py-5"><span className="font-mono text-3xl font-black text-orange-500">{a.n}</span><div><h3 className="text-2xl font-black text-orange-950">{a.title}</h3><p className="mt-1 max-w-4xl text-lg leading-snug text-slate-700">{a.detail}</p></div></div>)}
      </div>
      <p className="border-t border-orange-200 pt-3 text-xs text-slate-500">Sell-out en unidades · todas las sucursales con venta · corte al {data.fechaMaxVenta}</p>
    </div>
  );
}

const slides = [Cover, Monthly, Products, Stores, Actions];
const titles = ["Resumen", "Tendencia", "Productos", "Sucursales", "Prioridades"];

export default function Page() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") setCurrent((c) => Math.min(c + 1, slides.length - 1));
      if (e.key === "ArrowLeft") setCurrent((c) => Math.max(c - 1, 0));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
  const Slide = slides[current];
  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-950 p-4">
      <div className="relative aspect-video w-full max-w-[1280px] overflow-hidden rounded-2xl border-2 border-orange-700 bg-gradient-to-br from-orange-50 to-orange-100 shadow-2xl">
        <Slide />
        <nav className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-orange-950/90 px-4 py-2 text-white shadow-lg">
          <button onClick={() => setCurrent((c) => Math.max(c - 1, 0))} disabled={!current} aria-label="Anterior" className="disabled:opacity-30"><ChevronLeft size={17} /></button>
          {slides.map((_, i) => <button key={i} onClick={() => setCurrent(i)} title={titles[i]} aria-label={titles[i]} className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-orange-300" : "w-2 bg-orange-700 hover:bg-orange-400"}`} />)}
          <button onClick={() => setCurrent((c) => Math.min(c + 1, slides.length - 1))} disabled={current === slides.length - 1} aria-label="Siguiente" className="disabled:opacity-30"><ChevronRight size={17} /></button>
          <span className="ml-1 w-24 text-[10px] text-orange-200">{current + 1}/5 · {titles[current]}</span>
        </nav>
      </div>
    </main>
  );
}
