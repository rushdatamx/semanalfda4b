"use client";
import Image from "next/image";

const sucursales = [
  { n: 1, code: "LGCL", nombre: "CLOUTHIER", plaza: "León", zona: "OCCIDENTE", u25: 56, u26: 74, var: 32.1 },
  { n: 2, code: "LGPC", nombre: "PROL CAMPESTRE", plaza: "León", zona: "OCCIDENTE", u25: 24, u26: 69, var: 187.5 },
  { n: 3, code: "MTHD", nombre: "OBISPADO", plaza: "MTY Oriente", zona: "NORTE", u25: 88, u26: 58, var: -34.1 },
  { n: 4, code: "MEDZ", nombre: "DZITYA REAL MONTEJO", plaza: "Mérida", zona: "PENINSULA", u25: 5, u26: 57, var: 1040.0 },
  { n: 5, code: "MTGT", nombre: "GLORIETA CALZADA", plaza: "MTY Oriente", zona: "NORTE", u25: 50, u26: 55, var: 10.0 },
  { n: 6, code: "MXBN", nombre: "LUIS BARRAGÁN", plaza: "México Centro", zona: "METRO", u25: 49, u26: 54, var: 10.2 },
  { n: 7, code: "MAME", nombre: "MEDITERRÁNEO", plaza: "Mazatlán", zona: "PACIFICO", u25: 19, u26: 53, var: 178.9 },
  { n: 8, code: "MTCA", nombre: "CALZADA", plaza: "Nueva 2025", zona: "NORTE", u25: 2, u26: 46, var: 2200.0 },
  { n: 9, code: "CLCL", nombre: "CELENES", plaza: "Culiacán", zona: "PACIFICO", u25: 13, u26: 45, var: 246.2 },
  { n: 10, code: "MTUA", nombre: "UMA", plaza: "MTY Oriente", zona: "NORTE", u25: 43, u26: 45, var: 4.7 },
  { n: 11, code: "MTCW", nombre: "CORPORATIVO", plaza: "MTY Oriente", zona: "NORTE", u25: 33, u26: 43, var: 30.3 },
  { n: 12, code: "VLSK", nombre: "SAMARKANDA", plaza: "Tabasco", zona: "PENINSULA", u25: 4, u26: 43, var: 975.0 },
  { n: 13, code: "MTVP", nombre: "VASCONCELOS PTE", plaza: "MTY Oriente", zona: "NORTE", u25: 28, u26: 42, var: 50.0 },
  { n: 14, code: "MTAI", nombre: "RICARDO MARGÁIN", plaza: "Monterrey", zona: "NORTE", u25: 30, u26: 40, var: 33.3 },
  { n: 15, code: "VRCE", nombre: "COSTA EXPRESS", plaza: "Veracruz", zona: "PENINSULA", u25: 58, u26: 39, var: -32.8 },
  { n: 16, code: "CNPC", nombre: "PLAZA PTO CANCÚN", plaza: "Cancún", zona: "PENINSULA", u25: 41, u26: 39, var: -4.9 },
  { n: 17, code: "MTRS", nombre: "ROBERTO GARZA S.", plaza: "MTY Oriente", zona: "NORTE", u25: 40, u26: 37, var: -7.5 },
  { n: 18, code: "MTP4", nombre: "PLAZA 404", plaza: "MTY Oriente", zona: "NORTE", u25: 82, u26: 35, var: -57.3 },
  { n: 19, code: "GDPN", nombre: "PABLO NERUDA", plaza: "Guadalajara", zona: "OCCIDENTE", u25: 29, u26: 34, var: 17.2 },
  { n: 20, code: "BSMJ", nombre: "MUJICA", plaza: "BCS", zona: "OCCIDENTE", u25: 26, u26: 33, var: 26.9 },
];

const maxU26 = Math.max(...sucursales.map((s) => s.u26));

export default function Slide3Sucursales() {
  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-orange-50 to-white flex flex-col overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-orange-500 to-orange-300" />

      {/* Header */}
      <div className="flex items-center gap-3 px-8 pt-5 pb-3">
        <Image src="/4buddies-logo.jpeg" alt="4BUDDIES" width={48} height={24} className="rounded" />
        <h2 className="text-xl font-bold text-orange-900">Top 20 Sucursales Catalogadas — Ene-Feb YoY</h2>
        <span className="text-xs text-orange-400 ml-auto">Solo 410 tiendas catalogadas</span>
      </div>

      {/* Table */}
      <div className="px-8 flex-1 overflow-hidden pb-3">
        <div className="bg-white rounded-xl border border-orange-100 shadow-sm h-full flex flex-col overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-orange-600 text-white">
                <th className="p-2 text-center w-8 rounded-tl-xl">#</th>
                <th className="p-2 text-left w-16">Código</th>
                <th className="p-2 text-left">Sucursal</th>
                <th className="p-2 text-left">Plaza</th>
                <th className="p-2 text-left w-20">Zona</th>
                <th className="p-2 text-right w-14">EF 25</th>
                <th className="p-2 text-right w-14">EF 26</th>
                <th className="p-2 text-right w-16">Var %</th>
                <th className="p-2 w-24 rounded-tr-xl"></th>
              </tr>
            </thead>
            <tbody>
              {sucursales.map((s, i) => (
                <tr
                  key={i}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-orange-50 transition-colors`}
                >
                  <td className="p-1.5 text-center text-gray-400 font-bold">{s.n}</td>
                  <td className="p-1.5 font-mono text-gray-600 text-[11px]">{s.code}</td>
                  <td className="p-1.5 font-medium text-gray-800 truncate max-w-[160px]">{s.nombre}</td>
                  <td className="p-1.5 text-gray-600 truncate">{s.plaza}</td>
                  <td className="p-1.5 text-gray-500 truncate text-[10px]">{s.zona}</td>
                  <td className="p-1.5 text-right text-gray-500">{s.u25}</td>
                  <td className="p-1.5 text-right font-bold text-gray-800">{s.u26}</td>
                  <td className="p-1.5 text-right">
                    <span
                      className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        s.var > 0
                          ? "bg-green-100 text-green-700"
                          : s.var < 0
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {s.var > 0 ? "+" : ""}
                      {s.var > 999 ? ">999%" : `${s.var}%`}
                    </span>
                  </td>
                  <td className="p-1.5">
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${s.var >= 0 ? "bg-green-400" : "bg-orange-400"}`}
                        style={{ width: `${(s.u26 / maxU26) * 100}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insight */}
      <div className="px-8 pb-5">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex items-start gap-3">
          <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 mt-0.5">ACCIÓN</span>
          <p className="text-sm text-gray-700">
            <strong className="text-red-600">Plaza 404 (MTP4) cayó -57%</strong> y Obispado (MTHD) -34% — ambas en MTY Oriente, revisar exhibición.
            <strong className="text-green-600"> León lidera el crecimiento</strong> con 2 sucursales en el top.
          </p>
        </div>
      </div>
    </div>
  );
}
