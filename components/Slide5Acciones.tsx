"use client";
import Image from "next/image";
import { AlertTriangle, TrendingUp, Eye } from "lucide-react";

export default function Slide5Acciones() {
  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-orange-50 to-white flex flex-col overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-orange-500 to-orange-300" />

      {/* Header */}
      <div className="flex items-center gap-3 px-8 pt-5 pb-4">
        <Image src="/4buddies-logo.jpeg" alt="4BUDDIES" width={48} height={24} className="rounded" />
        <h2 className="text-xl font-bold text-orange-900">Acciones para el Comprador</h2>
        <span className="text-xs text-orange-400 ml-auto">Semana del 4 Mar 2026</span>
      </div>

      {/* 3 Action Blocks */}
      <div className="grid grid-cols-3 gap-5 px-8 flex-1 overflow-hidden pb-5">
        {/* URGENTE */}
        <div className="bg-white rounded-2xl border-2 border-red-200 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-red-600 text-white px-5 py-3.5 flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-bold text-sm">URGENTE</span>
          </div>
          <div className="p-5 flex-1 space-y-5">
            {/* Acción 1 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">1</span>
                <h4 className="text-sm font-bold text-gray-900">Resurtido urgente</h4>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600 pl-6">
                <p><strong className="text-red-700">120 combinaciones</strong> tienda-producto con &lt;15 días de cobertura</p>
                <p>SKUs más afectados: Street Elote y Classic White</p>
                <p>Priorizar: MTLV (2 días), CLRS (3 días), MTJE (3 días)</p>
              </div>
            </div>

            {/* Acción 2 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
                <h4 className="text-sm font-bold text-gray-900">Desbloquear posiciones</h4>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600 pl-6">
                <p>Necesitamos <strong className="text-red-700">desbloquear 128 posiciones</strong> marcadas &quot;No Disponible a Compra&quot;</p>
                <p>Zona Norte tiene 42 bloqueadas (la más afectada)</p>
                <p>Impacto: recuperar ~200 uds/mes de venta perdida</p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 px-5 py-3 border-t border-red-200">
            <p className="text-[11px] text-red-800 font-medium">
              Solicitar revisión esta semana con comprador FDA
            </p>
          </div>
        </div>

        {/* OPORTUNIDAD */}
        <div className="bg-white rounded-2xl border-2 border-green-200 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-green-600 text-white px-5 py-3.5 flex items-center gap-2.5">
            <TrendingUp className="w-5 h-5" />
            <span className="font-bold text-sm">OPORTUNIDAD</span>
          </div>
          <div className="p-5 flex-1 space-y-5">
            {/* Acción 3 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
                <h4 className="text-sm font-bold text-gray-900">Catalogar tiendas activas</h4>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600 pl-6">
                <p>Proponemos <strong className="text-green-700">catalogar 161 tiendas</strong> que ya están vendiendo sin catálogo formal</p>
                <p>Representan <strong>17% de la venta total</strong></p>
                <p>Top: SAME Las Mercedes (313 uds), VRLP Los Alpes (173 uds)</p>
              </div>
            </div>

            {/* Acción 4 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">4</span>
                <h4 className="text-sm font-bold text-gray-900">Expandir 3 SKUs</h4>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600 pl-6">
                <p>Solicitar <strong className="text-green-700">alta de 3 SKUs en ~200 tiendas</strong> para igualar cobertura de Rodajitas (94%)</p>
                <p>Classic White, Chicharrón y Street Elote están en ~500 vs 695</p>
                <p>Potencial: <strong>+660 uds/mes</strong> incrementales</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 px-5 py-3 border-t border-green-200">
            <p className="text-[11px] text-green-800 font-medium">
              Proponer en la siguiente revisión con comprador
            </p>
          </div>
        </div>

        {/* VIGILAR */}
        <div className="bg-white rounded-2xl border-2 border-amber-200 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-amber-500 text-white px-5 py-3.5 flex items-center gap-2.5">
            <Eye className="w-5 h-5" />
            <span className="font-bold text-sm">VIGILAR</span>
          </div>
          <div className="p-5 flex-1 space-y-5">
            {/* Acción 5 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">5</span>
                <h4 className="text-sm font-bold text-gray-900">Sobre-existencia (SE45)</h4>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600 pl-6">
                <p><strong className="text-amber-700">289 posiciones</strong> con 393 uds envejeciendo &gt;45 días</p>
                <p>Rodajitas es el más afectado (167 uds)</p>
                <p>Riesgo de que FDA solicite devolución</p>
              </div>
            </div>

            {/* Acción 6 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">6</span>
                <h4 className="text-sm font-bold text-gray-900">Problemas de anaquel</h4>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600 pl-6">
                <p><strong className="text-amber-700">1,219 posiciones</strong> con inventario pero $0 venta en 15 días</p>
                <p>Coordinar revisión de exhibición con promotor</p>
                <p>Solicitar reubicación en tiendas prioritarias</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 px-5 py-3 border-t border-amber-200">
            <p className="text-[11px] text-amber-800 font-medium">
              Monitorear semanalmente — escalar si empeora
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 pb-5">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
          <span className="bg-gray-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0">NOTA</span>
          <p className="text-xs text-gray-600">
            Detalle granular por tienda disponible en los Excels adjuntos: <strong>semanal_FDA_4BUDDIES.xlsx</strong> y <strong>alertas_FDA_4BUDDIES.xlsx</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
