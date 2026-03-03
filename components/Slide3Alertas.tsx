"use client";
import Image from "next/image";

const restock = [
  { tienda: "MTLV LAZARO VILLARREAL", prod: "Street Elote 125g", exist: 1, vtaDia: "0.47", dias: "2.1" },
  { tienda: "CLRS ROSARITO", prod: "Classic White 25g", exist: 1, vtaDia: "0.40", dias: "2.5" },
  { tienda: "MTJE JERONIMO SILLER", prod: "Classic White 25g", exist: 1, vtaDia: "0.33", dias: "3.0" },
  { tienda: "CLAR ANTONIO ROSALES", prod: "Chicharrón 75g", exist: 1, vtaDia: "0.33", dias: "3.0" },
  { tienda: "LGCL CLOUTHIER", prod: "Classic White 25g", exist: 1, vtaDia: "0.27", dias: "3.8" },
  { tienda: "MTGT GLORIETA CALZADA", prod: "Street Elote 125g", exist: 1, vtaDia: "0.27", dias: "3.8" },
  { tienda: "MTHD OBISPADO", prod: "Rodajitas 30g", exist: 1, vtaDia: "0.27", dias: "3.8" },
  { tienda: "CNCL COLOSIO", prod: "Street Elote 125g", exist: 1, vtaDia: "0.27", dias: "3.8" },
  { tienda: "MTCW CORPORATIVO", prod: "Classic White 25g", exist: 1, vtaDia: "0.20", dias: "5.0" },
  { tienda: "LRCT CRUCERITO", prod: "Rodajitas 30g", exist: 1, vtaDia: "0.20", dias: "5.0" },
  { tienda: "CNPC PLAZA PTO CANCUN", prod: "Classic White 25g", exist: 1, vtaDia: "0.20", dias: "5.0" },
  { tienda: "VRCE COSTA EXPRESS", prod: "Street Elote 125g", exist: 1, vtaDia: "0.20", dias: "5.0" },
  { tienda: "MTP4 PLAZA 404", prod: "Rodajitas 30g", exist: 2, vtaDia: "0.33", dias: "6.0" },
];

const anaquel = [
  { tienda: "MLXO XOCHIMILCO", prod: "Classic White 25g", exist: 3 },
  { tienda: "LRYC YUCATAN", prod: "Classic White 25g", exist: 3 },
  { tienda: "MTND LINDA", prod: "Street Elote 125g", exist: 3 },
  { tienda: "CNGV GRAN VIA", prod: "Chicharrón 75g", exist: 3 },
  { tienda: "HRMU MUNICIPAL", prod: "Classic White 25g", exist: 3 },
  { tienda: "SLTN TERRANOVA", prod: "Rodajitas 30g", exist: 3 },
  { tienda: "PRLP LA PURISIMA", prod: "Classic White 25g", exist: 3 },
  { tienda: "MTSI SIMON BOLIVAR", prod: "Street Elote 125g", exist: 2 },
  { tienda: "MTCN CARRETERA NAL", prod: "Chicharrón 75g", exist: 2 },
  { tienda: "GDES ESTADIO", prod: "Classic White 25g", exist: 2 },
  { tienda: "MXPP PUNTA HERRADURA", prod: "Street Elote 125g", exist: 2 },
  { tienda: "CLBR BORBOA", prod: "Rodajitas 30g", exist: 2 },
  { tienda: "MTDR DURAZNOS", prod: "Classic White 25g", exist: 2 },
];

export default function Slide3Alertas() {
  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col p-8 overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <Image src="/4buddies-logo.jpeg" alt="4BUDDIES" width={48} height={24} className="rounded" />
        <h2 className="text-2xl font-bold text-orange-900">Alertas por Tienda</h2>
      </div>

      <div className="flex gap-5 flex-1 overflow-hidden">
        {/* Restock Urgente */}
        <div className="flex-1 bg-white rounded-xl border border-red-200 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-red-500 text-white px-4 py-2 flex items-center gap-2">
            <span className="text-sm font-bold">RESTOCK URGENTE</span>
            <span className="bg-white text-red-600 text-xs font-bold px-2 py-0.5 rounded-full ml-auto">120 alertas</span>
          </div>
          <div className="overflow-auto flex-1 p-2">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-orange-800 border-b border-orange-200">
                  <th className="p-1.5">Tienda</th>
                  <th className="p-1.5">Producto</th>
                  <th className="p-1.5 text-center">Inv</th>
                  <th className="p-1.5 text-center">Vta/día</th>
                  <th className="p-1.5 text-center">Días</th>
                </tr>
              </thead>
              <tbody>
                {restock.map((r, i) => (
                  <tr key={i} className={`${parseFloat(r.dias) <= 3 ? "bg-red-50 text-red-800" : i % 2 === 0 ? "bg-orange-50" : ""}`}>
                    <td className="p-1.5 font-medium truncate max-w-[180px]">{r.tienda}</td>
                    <td className="p-1.5 truncate max-w-[120px]">{r.prod}</td>
                    <td className="p-1.5 text-center">{r.exist}</td>
                    <td className="p-1.5 text-center">{r.vtaDia}</td>
                    <td className={`p-1.5 text-center font-bold ${parseFloat(r.dias) <= 3 ? "text-red-600" : "text-orange-600"}`}>{r.dias}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-red-50 px-4 py-2 text-xs text-red-700 border-t border-red-200">
            <strong>Acción:</strong> Solicitar resurtido urgente al comprador. 120 combinaciones con &lt;15 días de cobertura.
          </div>
        </div>

        {/* Problema de Anaquel */}
        <div className="flex-1 bg-white rounded-xl border border-amber-200 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-amber-500 text-white px-4 py-2 flex items-center gap-2">
            <span className="text-sm font-bold">PROBLEMA DE ANAQUEL</span>
            <span className="bg-white text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full ml-auto">1,219 casos</span>
          </div>
          <div className="overflow-auto flex-1 p-2">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-orange-800 border-b border-orange-200">
                  <th className="p-1.5">Tienda</th>
                  <th className="p-1.5">Producto</th>
                  <th className="p-1.5 text-center">Inv</th>
                </tr>
              </thead>
              <tbody>
                {anaquel.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-amber-50" : ""}>
                    <td className="p-1.5 font-medium truncate max-w-[200px]">{r.tienda}</td>
                    <td className="p-1.5 truncate max-w-[140px]">{r.prod}</td>
                    <td className="p-1.5 text-center font-bold text-amber-700">{r.exist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 px-4 py-2 text-xs text-amber-700 border-t border-amber-200">
            <strong>Acción:</strong> Tiendas con inventario pero $0 venta en 15 días. Verificar exhibición con promotor o solicitar reubicación en anaquel.
          </div>
        </div>
      </div>
    </div>
  );
}
