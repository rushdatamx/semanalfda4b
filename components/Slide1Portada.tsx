"use client";
import Image from "next/image";
import { TrendingDown, Store, AlertTriangle, ShieldOff } from "lucide-react";

export default function Slide1Portada() {
  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-orange-50 to-white flex flex-col relative overflow-hidden">
      {/* Decorative accent bar */}
      <div className="h-2 bg-gradient-to-r from-orange-500 to-orange-300" />

      {/* Header */}
      <div className="flex items-center justify-between px-10 pt-6 pb-4">
        <Image src="/4buddies-logo.jpeg" alt="4BUDDIES" width={110} height={55} className="rounded-lg" />
        <span className="text-orange-400 text-sm font-medium">4 Marzo 2026</span>
      </div>

      {/* Title - compact */}
      <div className="text-center px-10 mb-8">
        <h1 className="text-4xl font-extrabold text-orange-900 tracking-tight">Reporte Semanal</h1>
        <h2 className="text-2xl font-bold text-orange-500 mt-1">4BUDDIES × Farmacias del Ahorro</h2>
        <p className="text-orange-400 mt-2 text-sm">Venta Ene 2025 – Feb 2026 · Inventario al 1 Mar 2026</p>
      </div>

      {/* KPI Cards - clean design */}
      <div className="grid grid-cols-4 gap-5 px-10 flex-1">
        {/* Ventas */}
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
          <TrendingDown className="w-8 h-8 text-orange-500 mb-3" />
          <p className="text-4xl font-extrabold text-gray-900">6,704</p>
          <p className="text-sm text-gray-500 font-medium mt-1">Uds vendidas EF 2026</p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">-17.8% vs EF 25</span>
          </div>
        </div>

        {/* Tiendas */}
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
          <Store className="w-8 h-8 text-orange-500 mb-3" />
          <p className="text-4xl font-extrabold text-gray-900">554</p>
          <p className="text-sm text-gray-500 font-medium mt-1">Tiendas activas</p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">393 de 410 catalogadas</span>
          </div>
        </div>

        {/* Restock */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
          <AlertTriangle className="w-8 h-8 text-red-500 mb-3" />
          <p className="text-4xl font-extrabold text-red-600">120</p>
          <p className="text-sm text-gray-500 font-medium mt-1">Restock urgente</p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">&lt;15 días cobertura</span>
          </div>
        </div>

        {/* Bloqueadas */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
          <ShieldOff className="w-8 h-8 text-red-500 mb-3" />
          <p className="text-4xl font-extrabold text-red-600">128</p>
          <p className="text-sm text-gray-500 font-medium mt-1">Posiciones bloqueadas</p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">No Disponible a Compra</span>
          </div>
        </div>
      </div>

      {/* Footer insight */}
      <div className="px-10 pb-6 pt-4">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex items-center gap-3">
          <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0">YoY</span>
          <p className="text-sm text-gray-700">
            EF 2026 vs EF 2025: <strong className="text-red-600">-17.8%</strong> en unidades (8,152 → 6,704). 26 plazas crecen, 25 caen. <strong className="text-green-600">Oportunidad:</strong> León +55%, México Centro +48%, Mérida +17%.
          </p>
        </div>
      </div>
    </div>
  );
}
