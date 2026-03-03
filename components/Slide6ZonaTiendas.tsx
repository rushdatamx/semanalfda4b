"use client";
import Image from "next/image";

const zonas = [
  { zona: "NORTE", u25: "3,566", u26: "2,720", var: "-23.7%", pct: "42%", status: "down" },
  { zona: "OCCIDENTE", u25: "1,195", u26: "1,211", var: "+1.3%", pct: "17%", status: "up" },
  { zona: "PENINSULA", u25: "975", u26: "924", var: "-5.2%", pct: "13%", status: "down" },
  { zona: "PACIFICO", u25: "1,175", u26: "791", var: "-32.7%", pct: "13%", status: "down" },
  { zona: "CENTRO - SUR", u25: "608", u26: "506", var: "-16.8%", pct: "8%", status: "down" },
  { zona: "METRO", u25: "633", u26: "552", var: "-12.8%", pct: "7%", status: "down" },
];

const topTiendas = [
  { n: 1, suc: "LGCL CLOUTHIER", zona: "OCCIDENTE", plaza: "CULIACAN", uds: 449, cat: true },
  { n: 2, suc: "MTP4 PLAZA 404", zona: "NORTE", plaza: "MONTERREY OTE", uds: 405, cat: true },
  { n: 3, suc: "MTHD OBISPADO", zona: "NORTE", plaza: "MONTERREY PTE", uds: 376, cat: true },
  { n: 4, suc: "CNCL COLOSIO", zona: "PENINSULA", plaza: "CANCUN", uds: 340, cat: true },
  { n: 5, suc: "SAME LAS MERCEDES", zona: "NORTE", plaza: "-", uds: 313, cat: false },
  { n: 6, suc: "CNPC PLAZA PTO CANCUN", zona: "PENINSULA", plaza: "CANCUN", uds: 313, cat: true },
  { n: 7, suc: "MTUA UMA", zona: "NORTE", plaza: "MONTERREY OTE", uds: 308, cat: true },
  { n: 8, suc: "VRCE COSTA EXPRESS", zona: "PENINSULA", plaza: "CANCUN", uds: 297, cat: true },
  { n: 9, suc: "LRCT CRUCERITO", zona: "NORTE", plaza: "NUEVO LAREDO", uds: 296, cat: true },
  { n: 10, suc: "MTGT GLORIETA CALZADA", zona: "NORTE", plaza: "MONTERREY OTE", uds: 292, cat: true },
  { n: 11, suc: "MTCW CORPORATIVO", zona: "NORTE", plaza: "MONTERREY OTE", uds: 282, cat: true },
  { n: 12, suc: "CLBR BORBOA", zona: "PACIFICO", plaza: "CULIACAN", uds: 275, cat: true },
  { n: 13, suc: "MTBV PLUS SUCHIATE", zona: "NORTE", plaza: "MONTERREY OTE", uds: 273, cat: true },
  { n: 14, suc: "CLAR ANTONIO ROSALES", zona: "PACIFICO", plaza: "CULIACAN", uds: 272, cat: true },
  { n: 15, suc: "MXBN LUIS BARRAGAN", zona: "METRO", plaza: "MEXICO SUR", uds: 272, cat: true },
];

export default function Slide6ZonaTiendas() {
  return (
    <div className="w-[1280px] h-[720px] bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col p-8 overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <Image src="/4buddies-logo.jpeg" alt="4BUDDIES" width={48} height={24} className="rounded" />
        <h2 className="text-2xl font-bold text-orange-900">Venta por Zona + Top Tiendas</h2>
      </div>

      <div className="flex gap-5 flex-1 overflow-hidden">
        {/* Zonas */}
        <div className="w-[440px] flex flex-col gap-3">
          <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-4 flex-1">
            <h3 className="text-sm font-bold text-orange-800 mb-3">Venta por Zona — Ene-Feb YoY</h3>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="p-2 text-left rounded-tl-lg">Zona</th>
                  <th className="p-2 text-right">Part.</th>
                  <th className="p-2 text-right">EF 25</th>
                  <th className="p-2 text-right">EF 26</th>
                  <th className="p-2 text-right rounded-tr-lg">Var %</th>
                </tr>
              </thead>
              <tbody>
                {zonas.map((z, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                    <td className="p-2 font-medium">{z.zona}</td>
                    <td className="p-2 text-right text-gray-500">{z.pct}</td>
                    <td className="p-2 text-right">{z.u25}</td>
                    <td className="p-2 text-right font-bold">{z.u26}</td>
                    <td className={`p-2 text-right font-bold ${z.status === "up" ? "text-green-600" : "text-red-600"}`}>
                      {z.var}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Accionables por zona */}
          <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-4">
            <h3 className="text-xs font-bold text-orange-800 mb-2">Accionables por zona</h3>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex gap-2"><span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">NORTE</span><span className="text-gray-700">-24% — Revisar surtido CEDIS MTNA/CLCD. Es el 42% del negocio.</span></div>
              <div className="flex gap-2"><span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">PACIFICO</span><span className="text-gray-700">-33% — Caída más fuerte. Verificar cobertura en CEDIS PEBO.</span></div>
              <div className="flex gap-2"><span className="bg-green-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">OCCIDENTE</span><span className="text-gray-700">+1.3% — Única en crecimiento. Oportunidad de refuerzo.</span></div>
            </div>
          </div>
        </div>

        {/* Top tiendas */}
        <div className="flex-1 bg-white rounded-xl border border-orange-200 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-orange-600 text-white px-4 py-2.5 text-sm font-bold">TOP 15 TIENDAS — Acumulado</div>
          <div className="overflow-auto flex-1 p-2">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-orange-800 border-b border-orange-200">
                  <th className="p-1.5 w-6">#</th>
                  <th className="p-1.5">Sucursal</th>
                  <th className="p-1.5">Zona</th>
                  <th className="p-1.5">Plaza</th>
                  <th className="p-1.5 text-right">Uds</th>
                  <th className="p-1.5 w-20"></th>
                  <th className="p-1.5 text-center">Cat.</th>
                </tr>
              </thead>
              <tbody>
                {topTiendas.map((t, i) => (
                  <tr key={i} className={`${!t.cat ? "bg-yellow-50" : i % 2 === 0 ? "bg-orange-50" : ""}`}>
                    <td className="p-1.5 text-gray-400 font-bold">{t.n}</td>
                    <td className="p-1.5 font-medium truncate max-w-[180px]">{t.suc}</td>
                    <td className="p-1.5 text-gray-600 truncate">{t.zona}</td>
                    <td className="p-1.5 text-gray-600 truncate">{t.plaza}</td>
                    <td className="p-1.5 text-right font-bold">{t.uds}</td>
                    <td className="p-1.5">
                      <div className="w-full bg-orange-100 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(t.uds / 449) * 100}%` }}></div>
                      </div>
                    </td>
                    <td className="p-1.5 text-center">
                      {t.cat ? <span className="text-green-600 font-bold">Si</span> : <span className="text-red-500 font-bold">No</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
