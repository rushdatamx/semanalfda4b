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
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Solo tiendas catalogadas (410)</span>
          <span className="text-xs text-orange-400">Semana del 4 Mar 2026</span>
        </div>
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
                <p><strong className="text-red-700">101 combinaciones</strong> tienda-producto en 88 tiendas con &lt;15 días de cobertura</p>
                <p>Más urgentes: MTAI (3 días), MTHD (3 días), LRCT (3 días)</p>
                <p>SKUs más afectados: Rodajitas y Classic White</p>
              </div>
            </div>

            {/* Acción 2 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
                <h4 className="text-sm font-bold text-gray-900">4 tiendas catalogadas sin venta</h4>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600 pl-6">
                <p><strong className="text-red-700">4 tiendas</strong> del catálogo no registraron ninguna venta en Ene-Feb 2026</p>
                <p>Verificar si tienen inventario o problema de surtido</p>
                <p>Revisar con promotor o CEDIS correspondiente</p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 px-5 py-3 border-t border-red-200">
            <p className="text-[11px] text-red-800 font-medium">
              Solicitar resurtido prioritario esta semana
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
                <h4 className="text-sm font-bold text-gray-900">Impulsar Chicharrón</h4>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600 pl-6">
                <p>Chicharrón es <strong className="text-green-700">#1 en valor estimado (38%)</strong> con solo 25% de unidades</p>
                <p>Precio PVP $58 vs $22-47 de los demás — el de mayor rendimiento por pieza</p>
                <p>Impulsar exhibición y rotación para maximizar venta en pesos</p>
              </div>
            </div>

            {/* Acción 4 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">4</span>
                <h4 className="text-sm font-bold text-gray-900">Replicar plazas exitosas</h4>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600 pl-6">
                <p><strong className="text-green-700">7 plazas creciendo YoY</strong> — León +55%, México Centro +48%, Mérida +23%</p>
                <p>Identificar qué están haciendo bien y replicar en las 10 plazas que caen</p>
                <p>Foco en MTY Oriente (-16%) que sigue siendo la #1 en volumen</p>
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
                <h4 className="text-sm font-bold text-gray-900">Problema de anaquel</h4>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600 pl-6">
                <p><strong className="text-amber-700">578 posiciones</strong> con inventario pero $0 venta en Feb 2026</p>
                <p>Producto en tienda pero sin rotación — posible mala exhibición</p>
                <p>Coordinar revisión con promotor en tiendas prioritarias</p>
              </div>
            </div>

            {/* Acción 6 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">6</span>
                <h4 className="text-sm font-bold text-gray-900">Sobre-existencia (SE45)</h4>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600 pl-6">
                <p><strong className="text-amber-700">83 posiciones</strong> con 99 uds envejeciendo &gt;45 días en 73 tiendas</p>
                <p>Rodajitas: 24 pos (31 uds), Classic White: 23 pos (27 uds)</p>
                <p>Riesgo bajo pero monitorear para evitar devolución</p>
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
            Datos exclusivamente de las 410 tiendas catalogadas. Detalle por tienda en Excels adjuntos. <em>* Valores MXN son estimados basados en precio PVP.</em>
          </p>
        </div>
      </div>
    </div>
  );
}
