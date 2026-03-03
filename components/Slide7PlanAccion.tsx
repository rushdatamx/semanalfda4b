"use client";
import Image from "next/image";
import { AlertTriangle, Clock, CalendarDays, Target } from "lucide-react";

export default function Slide7PlanAccion() {
  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col p-8 overflow-hidden">
      <div className="flex items-center gap-3 mb-5">
        <Image src="/4buddies-logo.jpeg" alt="4BUDDIES" width={48} height={24} className="rounded" />
        <h2 className="text-2xl font-bold text-orange-900">Plan de Acción Semanal</h2>
        <span className="text-sm text-orange-400 ml-auto">Semana del 3 Mar 2026</span>
      </div>

      <div className="grid grid-cols-2 gap-5 flex-1">
        {/* URGENTE */}
        <div className="bg-white rounded-xl border-2 border-red-300 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-red-600 text-white px-5 py-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-bold">URGENTE — Esta semana</span>
          </div>
          <div className="p-5 flex-1 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-red-800 mb-2">1. Solicitar resurtido urgente</h4>
              <div className="space-y-1 text-xs text-gray-700">
                <p>• <strong>120 combinaciones</strong> tienda-producto con &lt;15 días de cobertura</p>
                <p>• Priorizar: MTLV (2 días), CLRS (3 días), MTJE (3 días)</p>
                <p>• SKUs más afectados: Street Elote y Classic White</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-red-800 mb-2">2. Desbloquear posiciones con comprador</h4>
              <div className="space-y-1 text-xs text-gray-700">
                <p>• <strong>109 posiciones</strong> marcadas "No Disponible a Compra"</p>
                <p>• Zona Norte tiene 42 (la más afectada)</p>
                <p>• Agendar reunión con comprador FDA</p>
              </div>
            </div>
          </div>
        </div>

        {/* ESTA SEMANA */}
        <div className="bg-white rounded-xl border-2 border-amber-300 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-amber-500 text-white px-5 py-3 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="font-bold">ATENCIÓN — Revisar esta semana</span>
          </div>
          <div className="p-5 flex-1 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-amber-800 mb-2">3. Problemas de anaquel</h4>
              <div className="space-y-1 text-xs text-gray-700">
                <p>• <strong>1,219 posiciones</strong> con inventario pero $0 venta en 15 días</p>
                <p>• Coordinar revisión de exhibición con promotor</p>
                <p>• Solicitar reubicación en tiendas con mayor inventario dormido</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-800 mb-2">4. Sobre-existencia (SE45)</h4>
              <div className="space-y-1 text-xs text-gray-700">
                <p>• <strong>289 posiciones</strong> con 393 uds envejeciendo &gt;45 días</p>
                <p>• Rodajitas es el SKU más afectado (167 uds)</p>
                <p>• Riesgo de que FDA solicite devolución</p>
              </div>
            </div>
          </div>
        </div>

        {/* ESTE MES */}
        <div className="bg-white rounded-xl border-2 border-green-300 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-green-600 text-white px-5 py-3 flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            <span className="font-bold">OPORTUNIDAD — Este mes</span>
          </div>
          <div className="p-5 flex-1 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-green-800 mb-2">5. Catalogar 161 tiendas activas</h4>
              <div className="space-y-1 text-xs text-gray-700">
                <p>• <strong>161 tiendas</strong> vendiendo sin estar en catálogo formal</p>
                <p>• Representan 17% de la venta total</p>
                <p>• Top: SAME Las Mercedes (313 uds), VRLP Los Alpes (173 uds)</p>
                <p>• Proponer formalización al comprador FDA</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-green-800 mb-2">6. Expandir 3 SKUs en 220 tiendas</h4>
              <div className="space-y-1 text-xs text-gray-700">
                <p>• Rodajitas está en 695 tiendas, los otros 3 en ~500</p>
                <p>• Potencial: ~660 uds/mes incrementales</p>
                <p>• Solicitar alta de Classic White, Chicharrón y Street Elote</p>
              </div>
            </div>
          </div>
        </div>

        {/* ESTRATÉGICO */}
        <div className="bg-white rounded-xl border-2 border-blue-300 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white px-5 py-3 flex items-center gap-2">
            <Target className="w-5 h-5" />
            <span className="font-bold">ESTRATÉGICO — Mediano plazo</span>
          </div>
          <div className="p-5 flex-1 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-blue-800 mb-2">7. Revertir caída en zona Norte</h4>
              <div className="space-y-1 text-xs text-gray-700">
                <p>• Norte es 42% de la venta y cayó -24% YoY</p>
                <p>• Pacífico cayó -33% — segunda mayor caída</p>
                <p>• Revisar estrategia de distribución en CEDIS MTNA y PEBO</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-800 mb-2">8. Reforzar Occidente (única en crecimiento)</h4>
              <div className="space-y-1 text-xs text-gray-700">
                <p>• +1.3% YoY — único mercado que crece</p>
                <p>• Guadalajara tiene 42 tiendas catalogadas</p>
                <p>• Aprovechar momentum para ampliar exhibición y SKUs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
