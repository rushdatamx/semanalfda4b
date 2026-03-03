"use client";
import Image from "next/image";
import { TrendingDown, Store, AlertTriangle, ShieldOff } from "lucide-react";

export default function Slide1Portada() {
  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col p-10 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Image src="/4buddies-logo.jpeg" alt="4BUDDIES" width={120} height={60} className="rounded-lg" />
        <span className="text-orange-400 text-sm font-medium">3 Marzo 2026</span>
      </div>

      {/* Title */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-4">
        <h1 className="text-5xl font-extrabold text-orange-900 tracking-tight">Reporte Semanal</h1>
        <h2 className="text-3xl font-bold text-orange-600 mt-2">4BUDDIES × Farmacias del Ahorro</h2>
        <p className="text-orange-500 mt-3 text-lg">Datos de venta: Ene 2025 – Feb 2026 · Inventario al 1 Mar 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5 mt-2">
        <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-5 text-center">
          <TrendingDown className="w-7 h-7 text-orange-500 mx-auto mb-2" />
          <p className="text-3xl font-extrabold text-orange-900">3,231</p>
          <p className="text-sm text-orange-600 font-medium">Uds vendidas Feb 26</p>
          <p className="text-xs text-red-500 font-semibold mt-1">-6.9% vs Ene · +0.4% vs Feb 25</p>
        </div>
        <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-5 text-center">
          <Store className="w-7 h-7 text-orange-500 mx-auto mb-2" />
          <p className="text-3xl font-extrabold text-orange-900">554</p>
          <p className="text-sm text-orange-600 font-medium">Tiendas activas</p>
          <p className="text-xs text-orange-500 mt-1">393 catalogadas de 410</p>
        </div>
        <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-5 text-center">
          <AlertTriangle className="w-7 h-7 text-red-500 mx-auto mb-2" />
          <p className="text-3xl font-extrabold text-red-600">120</p>
          <p className="text-sm text-orange-600 font-medium">Restock urgente</p>
          <p className="text-xs text-red-500 mt-1">&lt;15 días de cobertura</p>
        </div>
        <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-5 text-center">
          <ShieldOff className="w-7 h-7 text-red-500 mx-auto mb-2" />
          <p className="text-3xl font-extrabold text-red-600">109</p>
          <p className="text-sm text-orange-600 font-medium">Bloqueadas</p>
          <p className="text-xs text-red-500 mt-1">No Disponible a Compra</p>
        </div>
      </div>
    </div>
  );
}
