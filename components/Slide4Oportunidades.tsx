"use client";
import Image from "next/image";
import { Store, Package, ShieldOff } from "lucide-react";

const topNoCat = [
  { codigo: "SAME", nombre: "LAS MERCEDES", zona: "NORTE", uds: 313 },
  { codigo: "VRLP", nombre: "LOS ALPES", zona: "CENTRO - SUR", uds: 173 },
  { codigo: "JZEJ", nombre: "EJERCITO", zona: "NORTE", uds: 167 },
  { codigo: "MTCN", nombre: "CARRETERA NACIONAL", zona: "NORTE", uds: 156 },
  { codigo: "SLTN", nombre: "TERRANOVA", zona: "NORTE", uds: 113 },
];

const topBloq = [
  { zona: "NORTE", count: 42 },
  { zona: "OCCIDENTE", count: 24 },
  { zona: "PACIFICO", count: 16 },
  { zona: "PENINSULA", count: 14 },
  { zona: "CENTRO - SUR", count: 8 },
  { zona: "METRO", count: 5 },
];

export default function Slide4Oportunidades() {
  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col p-8 overflow-hidden">
      <div className="flex items-center gap-3 mb-5">
        <Image src="/4buddies-logo.jpeg" alt="4BUDDIES" width={48} height={24} className="rounded" />
        <h2 className="text-2xl font-bold text-orange-900">Oportunidades de Crecimiento</h2>
      </div>

      <div className="grid grid-cols-3 gap-5 flex-1">
        {/* Tiendas sin catalogar */}
        <div className="bg-white rounded-xl border border-green-200 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-green-600 text-white px-4 py-3 flex items-center gap-2">
            <Store className="w-5 h-5" />
            <span className="text-sm font-bold">TIENDAS SIN CATALOGAR</span>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <div className="text-center mb-4">
              <p className="text-4xl font-extrabold text-green-700">161</p>
              <p className="text-sm text-green-600">tiendas activas fuera de catálogo</p>
              <p className="text-xs text-gray-500 mt-1">17% de la venta total</p>
            </div>
            <p className="text-xs font-semibold text-gray-700 mb-2">Top por venta acumulada:</p>
            <div className="space-y-1.5 flex-1">
              {topNoCat.map((t, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-green-50 rounded px-2 py-1.5">
                  <div>
                    <span className="font-bold text-green-800">{t.codigo}</span>
                    <span className="text-gray-600 ml-1">{t.nombre}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-green-700">{t.uds} uds</span>
                    <span className="text-gray-400 ml-1 text-[10px]">{t.zona}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-green-50 px-4 py-2.5 text-xs text-green-800 border-t border-green-200">
            <strong>Acción:</strong> Proponer al comprador catalogar estas 161 tiendas — representan venta incremental confirmada.
          </div>
        </div>

        {/* Expansión de SKU */}
        <div className="bg-white rounded-xl border border-green-200 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-green-600 text-white px-4 py-3 flex items-center gap-2">
            <Package className="w-5 h-5" />
            <span className="text-sm font-bold">EXPANSIÓN DE SKU</span>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <p className="text-xs text-gray-600 mb-4">Rodajitas está en 695 tiendas (94%). Los otros 3 SKUs solo en ~500 (~68%). Hay un gap de ~220 tiendas donde expandir:</p>

            <div className="space-y-4 flex-1">
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-orange-900">Classic White 25g</span>
                  <span className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full font-bold">222 tiendas</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">498 de 695 tiendas (68%)</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-orange-900">Chicharrón 75g</span>
                  <span className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full font-bold">220 tiendas</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: "67%" }}></div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">495 de 695 tiendas (67%)</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-orange-900">Street Elote 125g</span>
                  <span className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full font-bold">220 tiendas</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">502 de 695 tiendas (68%)</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 px-4 py-2.5 text-xs text-green-800 border-t border-green-200">
            <strong>Acción:</strong> Solicitar alta de 3 SKUs en ~220 tiendas — potencial de +660 uds/mes.
          </div>
        </div>

        {/* Bloqueadas */}
        <div className="bg-white rounded-xl border border-red-200 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-red-600 text-white px-4 py-3 flex items-center gap-2">
            <ShieldOff className="w-5 h-5" />
            <span className="text-sm font-bold">POSICIONES BLOQUEADAS</span>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <div className="text-center mb-4">
              <p className="text-4xl font-extrabold text-red-700">109</p>
              <p className="text-sm text-red-600">posiciones "No Disponible a Compra"</p>
              <p className="text-xs text-gray-500 mt-1">FDA bloqueó resurtido en estas tiendas</p>
            </div>
            <p className="text-xs font-semibold text-gray-700 mb-2">Distribución por zona:</p>
            <div className="space-y-1.5 flex-1">
              {topBloq.map((z, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-gray-700">{z.zona}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-red-100 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(z.count / 42) * 100}%` }}></div>
                    </div>
                    <span className="font-bold text-red-700 w-8 text-right">{z.count}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-red-50 rounded p-2">
              <p className="text-[10px] text-red-700"><strong>289 posiciones</strong> con sobre-existencia &gt;45 días (393 uds envejeciendo). Riesgo de devolución.</p>
            </div>
          </div>
          <div className="bg-red-50 px-4 py-2.5 text-xs text-red-800 border-t border-red-200">
            <strong>Acción:</strong> Agendar revisión con comprador para desbloquear 109 posiciones y revisar 289 con SE45.
          </div>
        </div>
      </div>
    </div>
  );
}
