"use client";

import { useState, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownRight, AlertTriangle,
  Store, Box, TrendingUp, MapPin, Lock, Target, Tag, CheckCircle2, Zap,
} from "lucide-react";

const KPI = {"udsYtd26": 21155, "udsYtd25": 18055, "varUds": 17.2, "estPvp26": 806021, "tiendasActivas": 409, "tiendasCatalogadas": 410, "bloqueadas": 17, "fechaMaxVenta": "2026-07-31", "fechaInv": "2026-08-02"};
const VENTAS_MES = [{"mes": "Ene", "u2025": 2879, "u2026": 2994, "var": 4.0}, {"mes": "Feb", "u2025": 2510, "u2026": 2775, "var": 10.6}, {"mes": "Mar", "u2025": 2656, "u2026": 2867, "var": 7.9}, {"mes": "Abr", "u2025": 2270, "u2026": 2714, "var": 19.6}, {"mes": "May", "u2025": 2489, "u2026": 3219, "var": 29.3}, {"mes": "Jun", "u2025": 2576, "u2026": 2894, "var": 12.3}, {"mes": "Jul", "u2025": 2675, "u2026": 3692, "var": 38.0}];
const PRODUCTOS = [{"nombre": "Rodajitas Spicy Limon 30g", "corto": "Rodajitas", "upc": "7500462860042", "uds26": 6230, "uds25": 5672, "var": 9.8, "pctTotal": 29.4, "tend3m": [873, 883, 1000], "precioPvp": 27.5}, {"nombre": "Chicharron de Cerdo 75g", "corto": "Chicharron", "upc": "7503028921317", "uds26": 5266, "uds25": 4274, "var": 23.2, "pctTotal": 24.9, "tend3m": [774, 757, 921], "precioPvp": 58.0}, {"nombre": "Palomitas Classic White 25g", "corto": "Classic White", "upc": "7500462417833", "uds26": 5090, "uds25": 4287, "var": 18.7, "pctTotal": 24.1, "tend3m": [781, 593, 900], "precioPvp": 22.5}, {"nombre": "Palomitas Street Elote 125g", "corto": "Street Elote 125g", "upc": "7500462860004", "uds26": 4569, "uds25": 3822, "var": 19.5, "pctTotal": 21.6, "tend3m": [791, 661, 871], "precioPvp": 47.0}];
const CEDIS_TBL = [{"cedis": "MTNA", "baseline": 985, "jul26": 1159, "var": 17.6}, {"cedis": "MRTL", "baseline": 712, "jul26": 1025, "var": 43.9}, {"cedis": "CLCD", "baseline": 600, "jul26": 721, "var": 20.0}, {"cedis": "MEAM", "baseline": 288, "jul26": 315, "var": 9.2}, {"cedis": "PEBO", "baseline": 157, "jul26": 213, "var": 35.4}, {"cedis": "TJBO", "baseline": 145, "jul26": 181, "var": 24.8}, {"cedis": "TXNT", "baseline": 53, "jul26": 78, "var": 46.2}];
const ZONAS_ACT = [{"zona": "NOROESTE", "uds": 3783}, {"zona": "NORTE", "uds": 3750}, {"zona": "OCCIDENTE", "uds": 2110}, {"zona": "PENINSULA", "uds": 1613}, {"zona": "METRO", "uds": 828}, {"zona": "SUR", "uds": 435}];
const PENETRACION = [{"producto": "Rodajitas Spicy Limon 30g", "corto": "Rodajitas", "tiendasConInv": 406, "tiendasConVenta30d": 282, "totalCatalogadas": 410, "fillRateInv": 99.0, "fillRateVenta": 68.8, "gap": 125}, {"producto": "Palomitas Classic White 25g", "corto": "Classic White", "tiendasConInv": 402, "tiendasConVenta30d": 289, "totalCatalogadas": 410, "fillRateInv": 98.0, "fillRateVenta": 70.5, "gap": 117}, {"producto": "Chicharron de Cerdo 75g", "corto": "Chicharron", "tiendasConInv": 404, "tiendasConVenta30d": 300, "totalCatalogadas": 410, "fillRateInv": 98.5, "fillRateVenta": 73.2, "gap": 107}, {"producto": "Palomitas Street Elote 125g", "corto": "Street Elote 125g", "tiendasConInv": 396, "tiendasConVenta30d": 287, "totalCatalogadas": 410, "fillRateInv": 96.6, "fillRateVenta": 70.0, "gap": 112}];
const COBERTURA = {"tiendasNoCatVendiendo": 311, "udsNoCat": 2873, "pctNoCat": 12.0, "top5NoCat": [{"tienda": "SAME LAS MERCEDES", "code": "SAME", "uds": 147}, {"tienda": "ACCA COSTA AZUL", "code": "ACCA", "uds": 119}, {"tienda": "JZEJ EJERCITO", "code": "JZEJ", "uds": 64}, {"tienda": "MXFN FUENTES", "code": "MXFN", "uds": 57}, {"tienda": "MTMJ MARIANO JIMENEZ", "code": "MTMJ", "uds": 54}], "expansionSkus": [{"producto": "Classic White", "tiendasSinSku": 5}, {"producto": "Chicharron", "tiendasSinSku": 3}, {"producto": "Street Elote 125g", "tiendasSinSku": 11}], "totalBloqueadas": 17, "bloqueadasPorZona": [{"zona": "METRO", "posiciones": 1}, {"zona": "NOROESTE", "posiciones": 8}, {"zona": "NORTE", "posiciones": 6}, {"zona": "OCCIDENTE", "posiciones": 2}], "tiendasHistoricas": 1009, "tiendasConInv": 407};
const TOP20 = [{"code": "LGCL", "tienda": "F A LEON, CLOUTHIER", "zona": "OCCIDENTE", "plaza": "LEON", "uds": 244, "estPvp": 7617}, {"code": "MAME", "tienda": "F A MAZATLAN, MEDITERRANEO", "zona": "PACIFICO", "plaza": "MAZATLAN", "uds": 225, "estPvp": 9332}, {"code": "MTCW", "tienda": "F A MONTERREY OTE, CORPORA", "zona": "NORTE", "plaza": "MONTERREY ORIENTE", "uds": 210, "estPvp": 7476}, {"code": "MTHD", "tienda": "F A MONTERREY OTE, OBISPAD", "zona": "NORTE", "plaza": "MONTERREY ORIENTE", "uds": 198, "estPvp": 6696}, {"code": "CLCL", "tienda": "F A CULIACAN, CELENES", "zona": "PACIFICO", "plaza": "CULIACAN", "uds": 181, "estPvp": 5297}, {"code": "LGPC", "tienda": "F A LEON, PROL CAMPESTRE", "zona": "OCCIDENTE", "plaza": "LEON", "uds": 171, "estPvp": 5123}, {"code": "CNCL", "tienda": "F A CANCUN, COLOSIO", "zona": "PENINSULA", "plaza": "CANCUN", "uds": 164, "estPvp": 6776}, {"code": "MTP4", "tienda": "F A MONTERREY OTE, PLAZA 4", "zona": "NORTE", "plaza": "MONTERREY ORIENTE", "uds": 160, "estPvp": 5189}, {"code": "MTGT", "tienda": "F A MONTERREY OTE, GLORIET", "zona": "NORTE", "plaza": "MONTERREY ORIENTE", "uds": 158, "estPvp": 5472}, {"code": "LGPA", "tienda": "F A LEON, PASEO DEL MORAL", "zona": "OCCIDENTE", "plaza": "LEON", "uds": 157, "estPvp": 4629}, {"code": "MTUA", "tienda": "F A MONTERREY OTE, UMA", "zona": "NORTE", "plaza": "MONTERREY ORIENTE", "uds": 150, "estPvp": 4772}, {"code": "MTVL", "tienda": "F A MONTERREY OTE, VALLE A", "zona": "NORTE", "plaza": "MONTERREY ORIENTE", "uds": 140, "estPvp": 4841}, {"code": "MXBN", "tienda": "F A MEXICO CENTRO, LUIS BA", "zona": "METRO", "plaza": "MEXICO CENTRO", "uds": 140, "estPvp": 5979}, {"code": "MTCA", "tienda": "F A MONTERREY OTE, CALZADA", "zona": "NORTE", "plaza": "NUEVA 2025", "uds": 137, "estPvp": 4776}, {"code": "MAOP", "tienda": "F A MAZATLAN, OSCAR PEREZ", "zona": "PACIFICO", "plaza": "MAZATLAN", "uds": 122, "estPvp": 4575}, {"code": "MEDZ", "tienda": "F A MERIDA, DZITYA REAL MO", "zona": "PENINSULA", "plaza": "MERIDA", "uds": 122, "estPvp": 4566}, {"code": "MTRS", "tienda": "F A MONTERREY OTE, ROBERTO", "zona": "NORTE", "plaza": "MONTERREY ORIENTE", "uds": 122, "estPvp": 3874}, {"code": "PEMZ", "tienda": "F A PUEBLA, MARZALA", "zona": "CENTRO - SUR", "plaza": "PUEBLA", "uds": 121, "estPvp": 4061}, {"code": "CHLV", "tienda": "F A SALTILLO, LOS VALDEZ", "zona": "NORTE", "plaza": "SALTILLO", "uds": 120, "estPvp": 4463}, {"code": "TLGR", "tienda": "F A TOLUCA FORANEAS, GENER", "zona": "METRO", "plaza": "TOLUCA FORANEAS", "uds": 116, "estPvp": 4121}];
const ALERTAS_RESTOCK = [{"tienda": "F A CANCUN, COLOSIO", "code": "CNCL", "producto": "Classic White", "existencia": 1, "vtaDia": 0.6, "diasCob": 1.7}, {"tienda": "F A CANCUN, CABO CATOCHE", "code": "CNCT", "producto": "Classic White", "existencia": 1, "vtaDia": 0.47, "diasCob": 2.1}, {"tienda": "F A LEON, CLOUTHIER", "code": "LGCL", "producto": "Rodajitas", "existencia": 4, "vtaDia": 1.67, "diasCob": 2.4}, {"tienda": "F A MONTERREY OTE, GLORIET", "code": "MTGT", "producto": "Rodajitas", "existencia": 1, "vtaDia": 0.4, "diasCob": 2.5}, {"tienda": "F A GUADALAJARA, BUGAMBILI", "code": "GDBU", "producto": "Chicharron", "existencia": 2, "vtaDia": 0.8, "diasCob": 2.5}, {"tienda": "F A MATAMOROS, FRANCISCO V", "code": "MMFV", "producto": "Street Elote 125g", "existencia": 1, "vtaDia": 0.33, "diasCob": 3.0}, {"tienda": "F A CULIACAN, CIUDADES HER", "code": "CLCH", "producto": "Classic White", "existencia": 2, "vtaDia": 0.67, "diasCob": 3.0}, {"tienda": "F A MONTERREY OTE, TECNOLO", "code": "MTTE", "producto": "Rodajitas", "existencia": 1, "vtaDia": 0.33, "diasCob": 3.0}, {"tienda": "F A CANCUN, 11 SUR", "code": "CN1S", "producto": "Classic White", "existencia": 1, "vtaDia": 0.33, "diasCob": 3.0}, {"tienda": "F A TIJUANA, ERMITA", "code": "TIER", "producto": "Classic White", "existencia": 2, "vtaDia": 0.6, "diasCob": 3.3}, {"tienda": "F A LEON, PASEO DEL MORAL", "code": "LGPA", "producto": "Rodajitas", "existencia": 7, "vtaDia": 2.07, "diasCob": 3.4}, {"tienda": "F A MONTERREY OTE, UMA", "code": "MTUA", "producto": "Rodajitas", "existencia": 2, "vtaDia": 0.53, "diasCob": 3.8}, {"tienda": "F A MONTERREY PTE, PLAZA L", "code": "MTCU", "producto": "Classic White", "existencia": 1, "vtaDia": 0.27, "diasCob": 3.8}, {"tienda": "F A VILLAHERMOSA, SAMARKAN", "code": "VLSK", "producto": "Classic White", "existencia": 1, "vtaDia": 0.27, "diasCob": 3.8}, {"tienda": "F A OAXACA, HUATULCO", "code": "TXHU", "producto": "Classic White", "existencia": 1, "vtaDia": 0.27, "diasCob": 3.8}];
const N_RESTOCK = 45;
const ALERTAS_ANAQUEL = [{"tienda": "F A MEXICO NORTE, INTERLOM", "code": "MXIN", "producto": "Classic White", "existencia": 16}, {"tienda": "F A MEXICO SUR, OLIVAR DE ", "code": "MXOP", "producto": "Classic White", "existencia": 6}, {"tienda": "F A TUXTLA, CAMPESTRE", "code": "TXCP", "producto": "Chicharron", "existencia": 6}, {"tienda": "F A URUAPAN-ZAMORA, MAGIST", "code": "UZMA", "producto": "Chicharron", "existencia": 6}, {"tienda": "F A MONTERREY PTE, LAS EST", "code": "MTES", "producto": "Rodajitas", "existencia": 6}, {"tienda": "F A HERMOSILLO, MALIBU", "code": "HRML", "producto": "Street Elote 125g", "existencia": 5}, {"tienda": "F A CANCUN, 11 SUR", "code": "CN1S", "producto": "Chicharron", "existencia": 5}, {"tienda": "F A GUADALAJARA, MADERO", "code": "GDMO", "producto": "Classic White", "existencia": 5}, {"tienda": "F A HERMOSILLO, KINO", "code": "HRKI", "producto": "Chicharron", "existencia": 5}, {"tienda": "F A NUEVO LAREDO, CRUCERIT", "code": "LRCT", "producto": "Rodajitas", "existencia": 5}, {"tienda": "F A MAZATLAN, JARIPILLO II", "code": "MAJR", "producto": "Rodajitas", "existencia": 5}, {"tienda": "F A MAZATLAN, MEDITERRANEO", "code": "MAME", "producto": "Classic White", "existencia": 5}, {"tienda": "F A URUAPAN-ZAMORA, IBARRA", "code": "MMIB", "producto": "Classic White", "existencia": 4}, {"tienda": "F A MAZATLAN, OSCAR PEREZ", "code": "MAOP", "producto": "Chicharron", "existencia": 4}, {"tienda": "F A BAJA CALIFORNIA SUR, 5", "code": "BSFR", "producto": "Rodajitas", "existencia": 4}];
const N_ANAQUEL = 779;
const ALERTAS_BLOQUEADAS = [{"tienda": "F A REYNOSA, SANTA FE", "code": "RNSF", "producto": "Rodajitas", "zona": "NORTE", "existencia": 0}, {"tienda": "F A REYNOSA, SANTA FE", "code": "RNSF", "producto": "Chicharron", "zona": "NORTE", "existencia": 0}, {"tienda": "F A REYNOSA, SANTA FE", "code": "RNSF", "producto": "Classic White", "zona": "NORTE", "existencia": 0}, {"tienda": "F A REYNOSA, SANTA FE", "code": "RNSF", "producto": "Street Elote 125g", "zona": "NORTE", "existencia": 0}];
const PROMO_SKU = [{"sku": "Classic White 25g", "mec": "2 x $30", "baseline": 672, "jul26": 900, "lift": 33.9, "incr": 228, "liftSS": 33.6, "incrSS": 216, "yoy": 27.5, "p2jun": 11.3, "p2jul": 27.8, "incrPvp": 5122}, {"sku": "Street Elote 125g", "mec": "20% desc", "baseline": 670, "jul26": 871, "lift": 30.0, "incr": 201, "liftSS": 29.9, "incrSS": 196, "yoy": 68.1, "p2jun": 9.1, "p2jul": 10.3, "incrPvp": 9447}, {"sku": "Chicharron 75g", "mec": "20% desc", "baseline": 749, "jul26": 921, "lift": 23.0, "incr": 172, "liftSS": 21.6, "incrSS": 156, "yoy": 36.8, "p2jun": 10.0, "p2jul": 13.1, "incrPvp": 9995}, {"sku": "Rodajitas 30g", "mec": "20% desc", "baseline": 851, "jul26": 1000, "lift": 17.5, "incr": 149, "liftSS": 16.8, "incrSS": 139, "yoy": 28.5, "p2jun": 14.8, "p2jul": 15.1, "incrPvp": 4088}];
const PROMO_TOT = {"baseline": 2942, "jul26": 3692, "lift": 25.5, "incr": 750, "baselineSS": 2848, "jul26SS": 3554, "liftSS": 24.8, "incrSS": 706, "nSameStore": 359, "jul25": 2675, "yoy": 38.0, "incrPvp": 28652, "tiendasBase": 391, "tiendasJul": 399, "liftTiendas": 2.0, "liftIntensidad": 23.0};
const PROMO_SEM = [{"sem": "S23", "ini": "06-01", "uds": 675, "cwUds": 127, "p2": 13.4}, {"sem": "S24", "ini": "06-08", "uds": 665, "cwUds": 129, "p2": 11.4}, {"sem": "S25", "ini": "06-15", "uds": 656, "cwUds": 145, "p2": 7.6}, {"sem": "S26", "ini": "06-22", "uds": 677, "cwUds": 147, "p2": 12.6}, {"sem": "S27", "ini": "06-29", "uds": 792, "cwUds": 165, "p2": 22.8}, {"sem": "S28", "ini": "07-06", "uds": 754, "cwUds": 200, "p2": 20.9}, {"sem": "S29", "ini": "07-13", "uds": 853, "cwUds": 206, "p2": 32.9}, {"sem": "S30", "ini": "07-20", "uds": 874, "cwUds": 196, "p2": 32.6}, {"sem": "S31", "ini": "07-27", "uds": 640, "cwUds": 178, "p2": 25.8}];
const PROMO_HIST = [{"mes": "25-07", "p2": 10.9, "uds": 706}, {"mes": "25-08", "p2": 12.7, "uds": 668}, {"mes": "25-09", "p2": 12.6, "uds": 739}, {"mes": "25-10", "p2": 10.3, "uds": 738}, {"mes": "25-11", "p2": 24.8, "uds": 902}, {"mes": "25-12", "p2": 13.6, "uds": 799}, {"mes": "26-01", "p2": 11.6, "uds": 812}, {"mes": "26-02", "p2": 10.8, "uds": 661}, {"mes": "26-03", "p2": 11.5, "uds": 700}, {"mes": "26-04", "p2": 11.7, "uds": 643}, {"mes": "26-05", "p2": 24.9, "uds": 781}, {"mes": "26-06", "p2": 11.3, "uds": 593}, {"mes": "26-07", "p2": 27.8, "uds": 900}];
const PROMO_MIX = [{"mes": "Junio (sin promo)", "p1": 84.9, "p2": 11.4, "p3": 3.7}, {"mes": "Julio (promo)", "p1": 79.2, "p2": 16.2, "p3": 4.6}];
const PLAN = {"urgente": [{"accion": "Solicitar resurtido", "detalle": "45 posiciones con menos de 7 dias de cobertura tras el pico de julio", "impacto": "Evita quiebre en tiendas de mayor rotacion"}, {"accion": "Desbloquear surtido", "detalle": "17 posiciones marcadas No Disponible a la Compra (NOROESTE 8, NORTE 6)", "impacto": "Libera reabasto en tiendas activas"}], "estaSemana": [{"accion": "Repetir la mecanica 2x$30", "detalle": "Julio dio el mejor mes del año: +25.5% vs baseline. Proponer ventana de septiembre", "impacto": "+750 uds incrementales replicables"}, {"accion": "Revisar exhibicion", "detalle": "779 posiciones con inventario y sin venta en 15 dias", "impacto": "Recupera venta ya surtida"}], "esteMes": [{"accion": "Ampliar 2x$30 a mas SKUs", "detalle": "La mecanica NxS movio 2.5x las compras de 2 piezas vs 20% de descuento", "impacto": "Mayor lift con misma inversion promocional"}, {"accion": "Catalogar tiendas activas", "detalle": "311 tiendas venden sin catalogo formal (12.0% de la venta)", "impacto": "Formaliza venta ya existente"}], "estrategico": [{"accion": "Incluir Street Elote 25g en reportes", "detalle": "Se vende en piso pero no aparece en el portal FDA. Pendiente con Mafer", "impacto": "Visibilidad real de la categoria"}, {"accion": "Reforzar CEDIS MRTL", "detalle": "+43.9% en julio, el CEDIS con mayor respuesta a la promocion", "impacto": "Concentrar inversion donde mejor convierte"}]};
const HALLAZGOS = [{"t": "La promocion de julio funciono", "d": "+25.5% vs baseline abr-jun (750 uds). Same-store con 359 tiendas: +24.8%", "tipo": "ok"}, {"t": "El 2xN mueve mas que el 20%", "d": "Classic White paso de 11.3% a 27.8% de compras de 2 piezas. Los SKUs con 20% apenas se movieron", "tipo": "ok"}, {"t": "YTD 2026 en positivo", "d": "21,155 uds, +17.2% vs 2025. Revierte la caida que traiamos", "tipo": "ok"}, {"t": "Chile Piquin no participo", "d": "Estaba en la promo 2x$30 pero registro 0 uds en julio: sin stock en tiendas", "tipo": "warn"}, {"t": "FDA reclasifico zonas en abril", "d": "PACIFICO y CENTRO-SUR desaparecieron y se repartieron. El corte por CEDIS es el confiable", "tipo": "warn"}, {"t": "Cobertura casi total", "d": "Fill rate de inventario 96.6%-99% en los 4 SKUs core. El gap de expansion se cerro", "tipo": "ok"}];
const PIE_PRODUCTOS = PRODUCTOS.map((p) => ({ name: p.corto, value: p.uds26 }));
const PIE_COLORS = ["#ea580c", "#f97316", "#fb923c", "#fdba74"];


const fmtU = (n: number) => n.toLocaleString("es-MX", { maximumFractionDigits: 0 });
const fmtPct = (n: number) => (n >= 0 ? "+" : "") + n.toFixed(1) + "%";
const fmtPVP = (n: number) => "$" + n.toLocaleString("es-MX", { maximumFractionDigits: 0 });

const VarBadge = ({ v }: { v: number }) => (
  <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${v >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
    {v >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
    {fmtPct(v)}
  </span>
);

const Head = ({ t, s, icon }: { t: string; s?: string; icon?: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-3">
    <img src="4buddies-logo.jpeg" alt="4B" className="h-10 rounded-lg shadow" />
    <div className="flex-1">
      <h2 className="text-xl font-bold text-orange-900 flex items-center gap-2">{icon}{t}</h2>
      {s && <p className="text-[11px] text-orange-600">{s}</p>}
    </div>
  </div>
);

const Foot = ({ children, color = "orange" }: { children: React.ReactNode; color?: string }) => {
  const c: Record<string, string> = {
    orange: "bg-orange-600", red: "bg-red-600", green: "bg-green-600", blue: "bg-blue-600",
  };
  return (
    <div className={`${c[color]} text-white rounded-lg px-4 py-2 text-[12px] font-semibold mt-2 flex items-center gap-2`}>
      <Zap size={14} className="shrink-0" />
      <span>{children}</span>
    </div>
  );
};

const Card = ({ children, cls = "" }: { children: React.ReactNode; cls?: string }) => (
  <div className={`bg-white rounded-xl shadow border border-orange-200 p-3 ${cls}`}>{children}</div>
);

/* ---------------- Slide 1: Portada ---------------- */
const S1 = () => (
  <div className="flex flex-col items-center justify-center h-full p-8">
    <img src="4buddies-logo.jpeg" alt="4BUDDIES" className="h-24 mb-5 rounded-xl shadow-lg" />
    <h1 className="text-3xl font-bold text-orange-900 text-center">Reporte de Ventas — 4BUDDIES</h1>
    <h2 className="text-xl text-orange-700 mb-1">Farmacias del Ahorro</h2>
    <p className="text-sm text-orange-600 mb-6">
      Cierre julio 2026 · Venta al {KPI.fechaMaxVenta} · Inventario al {KPI.fechaInv}
    </p>

    <div className="flex gap-3 mb-5">
      <div className="bg-white rounded-xl shadow-lg border-2 border-orange-300 px-5 py-3 text-center min-w-[150px]">
        <p className="text-[10px] text-orange-500 font-semibold uppercase">Unidades YTD 2026</p>
        <p className="text-3xl font-bold text-orange-900">{fmtU(KPI.udsYtd26)}</p>
        <VarBadge v={KPI.varUds} /> <span className="text-[10px] text-gray-500">vs 2025</span>
      </div>
      <div className="bg-white rounded-xl shadow-lg border-2 border-green-300 px-5 py-3 text-center min-w-[150px]">
        <p className="text-[10px] text-green-600 font-semibold uppercase">Julio 2026</p>
        <p className="text-3xl font-bold text-green-700">{fmtU(PROMO_TOT.jul26)}</p>
        <VarBadge v={PROMO_TOT.yoy} /> <span className="text-[10px] text-gray-500">vs jul-25</span>
      </div>
      <div className="bg-white rounded-xl shadow-lg border-2 border-orange-300 px-5 py-3 text-center min-w-[150px]">
        <p className="text-[10px] text-orange-500 font-semibold uppercase">Tiendas activas</p>
        <p className="text-3xl font-bold text-orange-900">{KPI.tiendasActivas}</p>
        <p className="text-[10px] text-gray-500">de {KPI.tiendasCatalogadas} catalogadas</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg border-2 border-red-300 px-5 py-3 text-center min-w-[150px]">
        <p className="text-[10px] text-red-500 font-semibold uppercase">Alertas restock</p>
        <p className="text-3xl font-bold text-red-600">{N_RESTOCK}</p>
        <p className="text-[10px] text-gray-500">{KPI.bloqueadas} posiciones bloqueadas</p>
      </div>
    </div>

    <div className="bg-green-600 text-white rounded-lg px-5 py-2.5 text-sm font-bold flex items-center gap-2">
      <CheckCircle2 size={16} />
      La promocion de julio genero +{PROMO_TOT.incr} uds incrementales ({fmtPct(PROMO_TOT.lift)} vs baseline)
    </div>

    <p className="text-[10px] text-gray-400 mt-4">
      Estimado PVP YTD: {fmtPVP(KPI.estPvp26)} — precio de anaquel estimado, no facturacion real.
      Solo las {KPI.tiendasCatalogadas} tiendas catalogadas. 4 SKUs core.
    </p>
  </div>
);

/* ---------------- Slide 2: Venta mensual ---------------- */
const S2 = () => (
  <div className="flex flex-col h-full p-6">
    <Head t="Sell-Out Mensual — 2025 vs 2026" s="Unidades. FDA no reporta monto en pesos." icon={<TrendingUp size={18} />} />
    <div className="flex gap-3 flex-1 min-h-0">
      <Card cls="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={VENTAS_MES} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip formatter={(v: number) => fmtU(v) + " uds"} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="u2025" name="2025" fill="#fdba74" radius={[3, 3, 0, 0]} />
            <Bar dataKey="u2026" name="2026" fill="#ea580c" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card cls="w-[300px]">
        <table className="w-full text-[11px]">
          <thead><tr className="bg-orange-600 text-white">
            <th className="p-1.5 text-left rounded-tl">Mes</th><th className="p-1.5 text-right">2025</th>
            <th className="p-1.5 text-right">2026</th><th className="p-1.5 text-right rounded-tr">Var</th>
          </tr></thead>
          <tbody>
            {VENTAS_MES.map((m, i) => (
              <tr key={m.mes} className={`${i % 2 ? "bg-orange-50" : ""} ${m.mes === "Jul" ? "font-bold bg-green-50" : ""}`}>
                <td className="p-1.5">{m.mes}{m.mes === "Jul" ? " *" : ""}</td>
                <td className="p-1.5 text-right">{fmtU(m.u2025)}</td>
                <td className="p-1.5 text-right">{fmtU(m.u2026)}</td>
                <td className="p-1.5 text-right"><span className={m.var >= 0 ? "text-green-700 font-semibold" : "text-red-600"}>{fmtPct(m.var)}</span></td>
              </tr>
            ))}
            <tr className="bg-orange-200 font-bold border-t-2 border-orange-400">
              <td className="p-1.5">YTD</td>
              <td className="p-1.5 text-right">{fmtU(KPI.udsYtd25)}</td>
              <td className="p-1.5 text-right">{fmtU(KPI.udsYtd26)}</td>
              <td className="p-1.5 text-right text-green-800">{fmtPct(KPI.varUds)}</td>
            </tr>
          </tbody>
        </table>
        <p className="text-[9px] text-gray-500 mt-2">* Julio con plan promocional activo.</p>
      </Card>
    </div>
    <Foot color="green">
      Julio es el mejor mes del año: {fmtU(PROMO_TOT.jul26)} uds, {fmtPct(PROMO_TOT.yoy)} vs jul-2025 → repetir la mecanica en septiembre.
    </Foot>
  </div>
);

/* ---------------- Slide 3: Impacto promocion ---------------- */
const S3 = () => (
  <div className="flex flex-col h-full p-6">
    <Head t="Impacto del Plan Promocional — Julio 2026" s={`Baseline: promedio abr-jun 2026. Control same-store con ${PROMO_TOT.nSameStore} tiendas activas los 4 meses.`} icon={<Tag size={18} />} />

    <div className="flex gap-2 mb-2">
      {[
        { l: "Venta julio", v: fmtU(PROMO_TOT.jul26) + " uds", s: `baseline ${fmtU(PROMO_TOT.baseline)}`, c: "orange" },
        { l: "Lift vs baseline", v: fmtPct(PROMO_TOT.lift), s: `+${PROMO_TOT.incr} uds incrementales`, c: "green" },
        { l: "Lift same-store", v: fmtPct(PROMO_TOT.liftSS), s: `${PROMO_TOT.nSameStore} mismas tiendas`, c: "green" },
        { l: "vs julio 2025", v: fmtPct(PROMO_TOT.yoy), s: `jul-25: ${fmtU(PROMO_TOT.jul25)} uds`, c: "green" },
        { l: "Incremental Est. PVP", v: fmtPVP(PROMO_TOT.incrPvp), s: "precio lista, no promo", c: "orange" },
      ].map((k) => (
        <div key={k.l} className={`flex-1 bg-white rounded-lg shadow border-2 ${k.c === "green" ? "border-green-300" : "border-orange-300"} px-2 py-2 text-center`}>
          <p className="text-[9px] text-gray-500 font-semibold uppercase leading-tight">{k.l}</p>
          <p className={`text-xl font-bold ${k.c === "green" ? "text-green-700" : "text-orange-900"}`}>{k.v}</p>
          <p className="text-[9px] text-gray-400">{k.s}</p>
        </div>
      ))}
    </div>

    <div className="flex gap-3 flex-1 min-h-0">
      <Card cls="flex-1">
        <p className="text-[11px] font-bold text-orange-900 mb-1">Desempeño por SKU y mecanica</p>
        <table className="w-full text-[10px]">
          <thead><tr className="bg-orange-600 text-white">
            <th className="p-1 text-left">SKU</th><th className="p-1 text-left">Mecanica</th>
            <th className="p-1 text-right">Base</th><th className="p-1 text-right">Julio</th>
            <th className="p-1 text-right">Lift</th><th className="p-1 text-right">Same-store</th>
            <th className="p-1 text-right">vs jul-25</th>
          </tr></thead>
          <tbody>
            {PROMO_SKU.map((p, i) => (
              <tr key={p.sku} className={`${i % 2 ? "bg-orange-50" : ""} ${p.mec === "2 x $30" ? "bg-amber-100 font-semibold" : ""}`}>
                <td className="p-1">{p.sku}</td>
                <td className="p-1">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${p.mec === "2 x $30" ? "bg-amber-500 text-white" : "bg-orange-200 text-orange-800"}`}>{p.mec}</span>
                </td>
                <td className="p-1 text-right">{fmtU(p.baseline)}</td>
                <td className="p-1 text-right font-semibold">{fmtU(p.jul26)}</td>
                <td className="p-1 text-right text-green-700 font-bold">{fmtPct(p.lift)}</td>
                <td className="p-1 text-right text-green-700">{fmtPct(p.liftSS)}</td>
                <td className="p-1 text-right text-green-700">{fmtPct(p.yoy)}</td>
              </tr>
            ))}
            <tr className="bg-orange-200 font-bold border-t-2 border-orange-400">
              <td className="p-1" colSpan={2}>TOTAL 4 SKUs core</td>
              <td className="p-1 text-right">{fmtU(PROMO_TOT.baseline)}</td>
              <td className="p-1 text-right">{fmtU(PROMO_TOT.jul26)}</td>
              <td className="p-1 text-right text-green-800">{fmtPct(PROMO_TOT.lift)}</td>
              <td className="p-1 text-right text-green-800">{fmtPct(PROMO_TOT.liftSS)}</td>
              <td className="p-1 text-right text-green-800">{fmtPct(PROMO_TOT.yoy)}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-2 bg-blue-50 border border-blue-200 rounded p-2">
          <p className="text-[10px] font-bold text-blue-900 mb-1">¿El lift es real o solo hay mas tiendas surtidas?</p>
          <div className="flex gap-2 text-[10px]">
            <div className="flex-1 bg-white rounded p-1.5 text-center border border-blue-200">
              <p className="text-gray-500 text-[9px]">Mas tiendas</p>
              <p className="font-bold text-blue-700">{fmtPct(PROMO_TOT.liftTiendas)}</p>
              <p className="text-[8px] text-gray-400">{PROMO_TOT.tiendasBase} → {PROMO_TOT.tiendasJul}</p>
            </div>
            <div className="flex-1 bg-white rounded p-1.5 text-center border-2 border-green-400">
              <p className="text-gray-500 text-[9px]">Mas venta por tienda</p>
              <p className="font-bold text-green-700">{fmtPct(PROMO_TOT.liftIntensidad)}</p>
              <p className="text-[8px] text-gray-400">esto es la promo</p>
            </div>
          </div>
          <p className="text-[9px] text-blue-800 mt-1">
            El crecimiento NO viene de mas puntos de venta: viene de que cada tienda vende mas.
          </p>
        </div>
      </Card>

      <Card cls="w-[380px]">
        <p className="text-[11px] font-bold text-orange-900 mb-1">Arranque semanal (uds 4 SKUs)</p>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PROMO_SEM} margin={{ top: 5, right: 8, bottom: 0, left: -22 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
              <XAxis dataKey="ini" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} domain={[550, 950]} />
              <Tooltip formatter={(v: number) => fmtU(v) + " uds"} />
              <Line type="monotone" dataKey="uds" stroke="#ea580c" strokeWidth={2.5} dot={{ r: 3 }} name="Uds" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[9px] text-gray-500">
          Junio se mueve plano en ~665 uds/sem. Desde la semana del 29-jun sube a 790-875 uds/sem.
        </p>
        <div className="mt-2 bg-amber-50 border border-amber-300 rounded p-2">
          <p className="text-[10px] font-bold text-amber-900">Cambio en el mix de piezas</p>
          <table className="w-full text-[9px] mt-1">
            <thead><tr className="text-gray-500"><th className="text-left">Mes</th><th className="text-right">1 pza</th><th className="text-right">2 pzas</th><th className="text-right">3+</th></tr></thead>
            <tbody>
              {PROMO_MIX.map((m) => (
                <tr key={m.mes} className="border-t border-amber-200">
                  <td className="py-0.5">{m.mes}</td>
                  <td className="text-right">{m.p1}%</td>
                  <td className="text-right font-bold text-amber-800">{m.p2}%</td>
                  <td className="text-right">{m.p3}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
    <Foot color="green">
      Los 4 SKUs crecieron. Street Elote 125g es el mejor retorno: {fmtPct(PROMO_SKU.find((p) => p.sku === "Street Elote 125g")!.yoy)} vs jul-25 con solo 20% de descuento.
    </Foot>
  </div>
);

/* ---------------- Slide 4: Validacion 2xN ---------------- */
const S4 = () => {
  const cw = PROMO_SKU.find((p) => p.sku === "Classic White 25g")!;
  return (
    <div className="flex flex-col h-full p-6">
      <Head t="¿Funciono la mecanica 2 x $30?" s="Validacion con unidades por tienda-dia. FDA no comparte ticket, este es el proxy disponible." icon={<Target size={18} />} />

      <div className="bg-blue-50 border border-blue-300 rounded-lg px-3 py-1.5 mb-2">
        <p className="text-[10px] text-blue-900">
          <b>Como se mide:</b> si el 2x$30 funciono, las compras deben pasar de 1 pieza a 2. Medimos el % de tienda-dias
          que cierran con exactamente 2 unidades. Un 2xN efectivo sube ese porcentaje; un % de descuento no deberia moverlo.
        </p>
      </div>

      <div className="flex gap-3 flex-1 min-h-0">
        <Card cls="flex-1">
          <p className="text-[11px] font-bold text-orange-900 mb-1">Classic White 25g — % de compras de 2 piezas (13 meses)</p>
          <div className="h-[175px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PROMO_HIST} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                <XAxis dataKey="mes" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} unit="%" />
                <Tooltip formatter={(v: number) => v + "% de 2 pzas"} />
                <Bar dataKey="p2" radius={[3, 3, 0, 0]}>
                  {PROMO_HIST.map((h) => (
                    <Cell key={h.mes} fill={h.p2 > 20 ? "#dc2626" : "#fdba74"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[9px] text-gray-600 mt-1">
            La linea base vive en <b>10-14%</b>. Solo se rompe 3 veces: nov-25 (24.8%), may-26 (24.9%) y
            <b className="text-red-700"> jul-26 (27.8%, maximo historico)</b>. Los tres coinciden con promocion — no es ruido.
          </p>
        </Card>

        <Card cls="w-[420px]">
          <p className="text-[11px] font-bold text-orange-900 mb-1">La prueba: 2xN vs % descuento</p>
          <table className="w-full text-[10px]">
            <thead><tr className="bg-orange-600 text-white">
              <th className="p-1 text-left">SKU</th><th className="p-1 text-center">Mecanica</th>
              <th className="p-1 text-right">Jun</th><th className="p-1 text-right">Jul</th><th className="p-1 text-right">Cambio</th>
            </tr></thead>
            <tbody>
              {PROMO_SKU.map((p, i) => (
                <tr key={p.sku} className={`${p.mec === "2 x $30" ? "bg-amber-100 font-bold" : i % 2 ? "bg-orange-50" : ""}`}>
                  <td className="p-1">{p.sku}</td>
                  <td className="p-1 text-center">
                    <span className={`px-1 py-0.5 rounded text-[8px] font-bold ${p.mec === "2 x $30" ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700"}`}>{p.mec}</span>
                  </td>
                  <td className="p-1 text-right">{p.p2jun}%</td>
                  <td className="p-1 text-right">{p.p2jul}%</td>
                  <td className={`p-1 text-right font-bold ${p.p2jul - p.p2jun > 5 ? "text-red-700" : "text-gray-500"}`}>
                    {(p.p2jul - p.p2jun >= 0 ? "+" : "") + (p.p2jul - p.p2jun).toFixed(1)} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-2 bg-green-50 border-2 border-green-400 rounded p-2">
            <p className="text-[11px] font-bold text-green-900 mb-1 flex items-center gap-1"><CheckCircle2 size={13} /> Si hace sentido</p>
            <p className="text-[10px] text-green-900 leading-snug">
              Classic White — el unico SKU con 2x$30 real — <b>multiplico x2.5 sus compras de 2 piezas</b> ({cw.p2jun}% → {cw.p2jul}%).
              Los tres SKUs con 20% de descuento se movieron entre +0.3 y +3.1 pts.
              El comportamiento de compra cambio solo donde la mecanica pedia llevar 2. Esa es la firma de un 2xN.
            </p>
          </div>

          <div className="mt-2 bg-red-50 border border-red-300 rounded p-2">
            <p className="text-[10px] font-bold text-red-900 flex items-center gap-1"><AlertTriangle size={12} /> Chile Piquin no participo</p>
            <p className="text-[9px] text-red-800">
              Estaba en la promo 2x$30 pero registro <b>0 unidades en julio</b>: sin stock en tiendas.
              El 2x$30 corrio en la practica solo con Classic White.
            </p>
          </div>
        </Card>
      </div>
      <Foot color="green">
        El 2xN mueve el comportamiento de compra 2.5x mas que el % de descuento → priorizar mecanica NxS en la proxima negociacion.
      </Foot>
    </div>
  );
};

/* ---------------- Slide 5: Producto ---------------- */
const S5 = () => (
  <div className="flex flex-col h-full p-6">
    <Head t="Venta por Producto — 4 SKUs Core" s="YTD ene-jul 2026 vs 2025. Solo tiendas catalogadas." icon={<Box size={18} />} />
    <div className="flex gap-3 flex-1 min-h-0">
      <Card cls="w-[290px] flex flex-col">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={PIE_PRODUCTOS} dataKey="value" nameKey="name" cx="50%" cy="48%" outerRadius={78}
              label={(p: { name?: string; percent?: number }) => `${p.name} ${((p.percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false} style={{ fontSize: 9 }}>
              {PIE_PRODUCTOS.map((e, i) => <Cell key={e.name} fill={PIE_COLORS[i]} />)}
            </Pie>
            <Tooltip formatter={(v: number) => fmtU(v) + " uds"} />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-orange-800 text-center font-semibold">
          Portafolio balanceado: ningun SKU pasa del 30%.
        </p>
      </Card>
      <Card cls="flex-1">
        <table className="w-full text-[11px]">
          <thead><tr className="bg-orange-600 text-white">
            <th className="p-1.5 text-left">Producto</th><th className="p-1.5 text-right">YTD 26</th>
            <th className="p-1.5 text-right">YTD 25</th><th className="p-1.5 text-right">Var</th>
            <th className="p-1.5 text-right">% Part</th><th className="p-1.5 text-center">May-Jun-Jul</th>
          </tr></thead>
          <tbody>
            {PRODUCTOS.map((p, i) => {
              const mx = Math.max(...p.tend3m);
              return (
                <tr key={p.upc} className={i % 2 ? "bg-orange-50" : ""}>
                  <td className="p-1.5 font-semibold">{p.corto}</td>
                  <td className="p-1.5 text-right font-bold">{fmtU(p.uds26)}</td>
                  <td className="p-1.5 text-right text-gray-500">{fmtU(p.uds25)}</td>
                  <td className="p-1.5 text-right"><VarBadge v={p.var} /></td>
                  <td className="p-1.5 text-right">{p.pctTotal}%</td>
                  <td className="p-1.5">
                    <div className="flex items-end gap-0.5 h-7 justify-center">
                      {p.tend3m.map((t, k) => (
                        <div key={k} className="w-4 bg-orange-400 rounded-t relative" style={{ height: `${(t / mx) * 100}%` }}
                          title={`${fmtU(t)} uds`}>
                          {k === 2 && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[7px] font-bold text-orange-800">{t}</span>}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-green-50 border border-green-300 rounded p-2">
            <p className="text-[10px] font-bold text-green-800">Mejor crecimiento YTD</p>
            <p className="text-[10px] text-green-900">Chicharron 75g {fmtPct(PRODUCTOS.find((p) => p.corto === "Chicharron")!.var)} — asegurar surtido continuo.</p>
          </div>
          <div className="bg-amber-50 border border-amber-300 rounded p-2">
            <p className="text-[10px] font-bold text-amber-800">A vigilar</p>
            <p className="text-[10px] text-amber-900">Rodajitas {fmtPct(PRODUCTOS.find((p) => p.corto === "Rodajitas")!.var)}: es el SKU lider pero el de menor crecimiento.</p>
          </div>
        </div>
      </Card>
    </div>
    <Foot>Los 4 SKUs core crecen en 2026. Todos subieron en julio con la promocion.</Foot>
  </div>
);

/* ---------------- Slide 6: Penetracion ---------------- */
const S6 = () => (
  <div className="flex flex-col h-full p-6">
    <Head t="Penetracion por SKU — Fill Rate sobre 410 Tiendas" s={`Inventario al ${KPI.fechaInv}. Venta: ultimos 30 dias.`} icon={<Store size={18} />} />
    <Card cls="flex-1">
      <table className="w-full text-[11px]">
        <thead><tr className="bg-orange-600 text-white">
          <th className="p-1.5 text-left">SKU</th><th className="p-1.5 text-right">Tiendas c/Inv</th>
          <th className="p-1.5 text-left w-[170px]">Fill Rate Inventario</th>
          <th className="p-1.5 text-right">Tiendas c/Venta 30d</th>
          <th className="p-1.5 text-left w-[170px]">Fill Rate Venta</th>
          <th className="p-1.5 text-right">Gap</th>
        </tr></thead>
        <tbody>
          {PENETRACION.map((p, i) => (
            <tr key={p.corto} className={i % 2 ? "bg-orange-50" : ""}>
              <td className="p-2 font-semibold">{p.corto}</td>
              <td className="p-2 text-right font-bold">{p.tiendasConInv}</td>
              <td className="p-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 bg-gray-200 rounded-full h-3.5">
                    <div className="h-3.5 rounded-full bg-green-500" style={{ width: `${p.fillRateInv}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-green-700 w-9">{p.fillRateInv}%</span>
                </div>
              </td>
              <td className="p-2 text-right font-bold">{p.tiendasConVenta30d}</td>
              <td className="p-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 bg-gray-200 rounded-full h-3.5">
                    <div className={`h-3.5 rounded-full ${p.fillRateVenta > 80 ? "bg-green-500" : p.fillRateVenta > 50 ? "bg-amber-400" : "bg-red-500"}`}
                      style={{ width: `${p.fillRateVenta}%` }} />
                  </div>
                  <span className={`text-[10px] font-bold w-9 ${p.fillRateVenta > 80 ? "text-green-700" : "text-amber-600"}`}>{p.fillRateVenta}%</span>
                </div>
              </td>
              <td className="p-2 text-right font-bold text-amber-700">{p.gap}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-2.5">
          <p className="text-[11px] font-bold text-green-800 mb-1">Distribucion resuelta</p>
          <p className="text-[10px] text-green-900">
            Los 4 SKUs core estan entre <b>96.6% y 99%</b> de fill rate de inventario. La cobertura fisica ya no es
            el cuello de botella: el producto esta en casi todas las tiendas catalogadas.
          </p>
        </div>
        <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-2.5">
          <p className="text-[11px] font-bold text-amber-800 mb-1">El gap ahora es rotacion, no surtido</p>
          <p className="text-[10px] text-amber-900">
            Entre <b>107 y 125 tiendas por SKU</b> tienen inventario pero no vendieron en 30 dias.
            El foco se mueve de "meter producto" a <b>exhibicion y rotacion en piso</b>.
          </p>
        </div>
      </div>
    </Card>
    <Foot color="blue">
      Con 97%+ de cobertura, el crecimiento ya no viene de distribuir mas: viene de promocion y exhibicion — justo lo que confirmo julio.
    </Foot>
  </div>
);

/* ---------------- Slide 7: CEDIS ---------------- */
const S7 = () => (
  <div className="flex flex-col h-full p-6">
    <Head t="Respuesta Geografica a la Promocion" s="Por CEDIS: julio vs baseline abr-jun 2026." icon={<MapPin size={18} />} />
    <div className="bg-amber-50 border border-amber-300 rounded px-3 py-1.5 mb-2">
      <p className="text-[10px] text-amber-900">
        <b>Nota de datos:</b> FDA reclasifico sus zonas en abril 2026 — PACIFICO y CENTRO-SUR desaparecieron y sus tiendas
        se repartieron (76 tiendas de PACIFICO pasaron a NOROESTE). Ninguna tienda se perdio. Por eso el corte confiable
        para comparar periodos es el <b>CEDIS</b>, que si es estable.
      </p>
    </div>
    <div className="flex gap-3 flex-1 min-h-0">
      <Card cls="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={CEDIS_TBL} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
            <XAxis dataKey="cedis" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip formatter={(v: number) => fmtU(v) + " uds"} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="baseline" name="Baseline abr-jun" fill="#fdba74" radius={[3, 3, 0, 0]} />
            <Bar dataKey="jul26" name="Julio 2026" fill="#ea580c" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card cls="w-[330px]">
        <table className="w-full text-[11px]">
          <thead><tr className="bg-orange-600 text-white">
            <th className="p-1.5 text-left">CEDIS</th><th className="p-1.5 text-right">Base</th>
            <th className="p-1.5 text-right">Julio</th><th className="p-1.5 text-right">Var</th>
          </tr></thead>
          <tbody>
            {CEDIS_TBL.map((c, i) => (
              <tr key={c.cedis} className={i % 2 ? "bg-orange-50" : ""}>
                <td className="p-1.5 font-semibold">{c.cedis}</td>
                <td className="p-1.5 text-right text-gray-500">{fmtU(c.baseline)}</td>
                <td className="p-1.5 text-right font-bold">{fmtU(c.jul26)}</td>
                <td className="p-1.5 text-right text-green-700 font-bold">{fmtPct(c.var)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2 bg-green-50 border border-green-300 rounded p-2">
          <p className="text-[10px] font-bold text-green-800">Los 7 CEDIS crecieron</p>
          <p className="text-[10px] text-green-900">
            La promocion funciono en todo el pais, no en una region aislada.
            <b> MRTL lidera con {fmtPct(CEDIS_TBL[1].var)}</b> (+{CEDIS_TBL[1].jul26 - CEDIS_TBL[1].baseline} uds).
          </p>
        </div>
        <p className="text-[9px] text-gray-500 mt-2">
          Zonas vigentes (abr-jul 26): {ZONAS_ACT.map((z) => `${z.zona} ${fmtU(z.uds)}`).join(" · ")}
        </p>
      </Card>
    </div>
    <Foot color="green">
      Crecimiento nacional: 7 de 7 CEDIS arriba. Concentrar la proxima inversion promocional en MRTL y MTNA (mayor volumen y respuesta).
    </Foot>
  </div>
);

/* ---------------- Slide 8: Alertas ---------------- */
const S8 = () => (
  <div className="flex flex-col h-full p-6">
    <Head t="Alertas por Tienda" s={`Inventario al ${KPI.fechaInv} vs venta diaria de los ultimos 15 dias.`} icon={<AlertTriangle size={18} />} />
    <div className="flex gap-3 flex-1 min-h-0">
      <div className="flex-1 bg-white rounded-xl shadow border-2 border-red-200 p-3 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[12px] font-bold text-red-700">Restock urgente</p>
          <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">{N_RESTOCK} posiciones</span>
        </div>
        <p className="text-[9px] text-gray-500 mb-1">Menos de 7 dias de cobertura. Top 15 por criticidad.</p>
        <div className="overflow-hidden flex-1">
          <table className="w-full text-[9px]">
            <thead><tr className="bg-red-600 text-white">
              <th className="p-1 text-left">Sucursal</th><th className="p-1 text-left">Producto</th>
              <th className="p-1 text-right">Exist</th><th className="p-1 text-right">Vta/dia</th><th className="p-1 text-right">Dias</th>
            </tr></thead>
            <tbody>
              {ALERTAS_RESTOCK.map((a, i) => (
                <tr key={i} className={a.diasCob <= 3 ? "bg-red-50 font-semibold" : i % 2 ? "bg-gray-50" : ""}>
                  <td className="p-1">{a.tienda}</td>
                  <td className="p-1">{a.producto}</td>
                  <td className="p-1 text-right">{a.existencia}</td>
                  <td className="p-1 text-right">{a.vtaDia.toFixed(2)}</td>
                  <td className={`p-1 text-right font-bold ${a.diasCob <= 3 ? "text-red-700" : "text-amber-600"}`}>{a.diasCob}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] font-semibold text-red-700 mt-1">→ Solicitar resurtido inmediato a estas tiendas.</p>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow border-2 border-amber-200 p-3 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[12px] font-bold text-amber-700">Problema de anaquel</p>
          <span className="bg-amber-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">{fmtU(N_ANAQUEL)} posiciones</span>
        </div>
        <p className="text-[9px] text-gray-500 mb-1">Con inventario y sin venta en 15 dias. Top 15 por volumen parado.</p>
        <div className="overflow-hidden flex-1">
          <table className="w-full text-[9px]">
            <thead><tr className="bg-amber-500 text-white">
              <th className="p-1 text-left">Sucursal</th><th className="p-1 text-left">Producto</th><th className="p-1 text-right">Existencia</th>
            </tr></thead>
            <tbody>
              {ALERTAS_ANAQUEL.map((a, i) => (
                <tr key={i} className={i % 2 ? "bg-gray-50" : ""}>
                  <td className="p-1">{a.tienda}</td>
                  <td className="p-1">{a.producto}</td>
                  <td className="p-1 text-right font-semibold">{a.existencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] font-semibold text-amber-700 mt-1">→ Coordinar revision de exhibicion con promotor.</p>
      </div>
    </div>
    <Foot color="red">
      Julio dejo {N_RESTOCK} posiciones al limite: el pico de venta consumio inventario. Resurtir antes de la proxima promocion.
    </Foot>
  </div>
);

/* ---------------- Slide 9: Oportunidades ---------------- */
const S9 = () => (
  <div className="flex flex-col h-full p-6">
    <Head t="Oportunidades de Crecimiento" s="Palancas disponibles fuera de la promocion." icon={<TrendingUp size={18} />} />
    <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
      <div className="bg-white rounded-xl shadow border-2 border-green-300 p-3 flex flex-col">
        <span className="bg-green-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold w-fit mb-2">OPORTUNIDAD</span>
        <p className="text-[12px] font-bold text-green-800">Tiendas sin catalogar</p>
        <p className="text-3xl font-bold text-green-700 my-1">{COBERTURA.tiendasNoCatVendiendo}</p>
        <p className="text-[10px] text-gray-600 mb-2">
          tiendas vendieron en 2026 sin catalogo formal: {fmtU(COBERTURA.udsNoCat)} uds ({COBERTURA.pctNoCat}% de la venta total).
        </p>
        <table className="w-full text-[9px]">
          <thead><tr className="bg-green-600 text-white"><th className="p-1 text-left">Top 5 sucursal</th><th className="p-1 text-right">Uds</th></tr></thead>
          <tbody>
            {COBERTURA.top5NoCat.map((t, i) => (
              <tr key={t.code} className={i % 2 ? "bg-green-50" : ""}>
                <td className="p-1">{t.tienda}</td><td className="p-1 text-right font-semibold">{t.uds}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[10px] font-semibold text-green-700 mt-auto pt-2">
          → Proponer catalogar estas tiendas: ya venden, solo falta formalizar.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow border-2 border-blue-300 p-3 flex flex-col">
        <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold w-fit mb-2">CASI LISTO</span>
        <p className="text-[12px] font-bold text-blue-800">Expansion de SKU</p>
        <p className="text-3xl font-bold text-blue-700 my-1">
          {COBERTURA.expansionSkus.reduce((a, e) => a + e.tiendasSinSku, 0)}
        </p>
        <p className="text-[10px] text-gray-600 mb-2">
          posiciones por completar en tiendas que ya tienen Rodajitas.
        </p>
        <table className="w-full text-[10px]">
          <thead><tr className="bg-blue-600 text-white"><th className="p-1 text-left">SKU faltante</th><th className="p-1 text-right">Tiendas</th></tr></thead>
          <tbody>
            {COBERTURA.expansionSkus.map((e, i) => (
              <tr key={e.producto} className={i % 2 ? "bg-blue-50" : ""}>
                <td className="p-1">{e.producto}</td><td className="p-1 text-right font-semibold">{e.tiendasSinSku}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-blue-50 border border-blue-200 rounded p-1.5 mt-2">
          <p className="text-[9px] text-blue-900">
            El gap de expansion practicamente se cerro: era el pendiente grande de meses anteriores y hoy quedan
            solo {COBERTURA.expansionSkus.reduce((a, e) => a + e.tiendasSinSku, 0)} posiciones.
          </p>
        </div>
        <p className="text-[10px] font-semibold text-blue-700 mt-auto pt-2">→ Cerrar las ultimas posiciones con un alta puntual.</p>
      </div>

      <div className="bg-white rounded-xl shadow border-2 border-red-300 p-3 flex flex-col">
        <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold w-fit mb-2">BLOQUEO</span>
        <p className="text-[12px] font-bold text-red-800">Posiciones bloqueadas</p>
        <p className="text-3xl font-bold text-red-700 my-1">{COBERTURA.totalBloqueadas}</p>
        <p className="text-[10px] text-gray-600 mb-2">marcadas "NO DISPONIBLE A LA COMPRA": no se pueden resurtir.</p>
        <table className="w-full text-[10px]">
          <thead><tr className="bg-red-600 text-white"><th className="p-1 text-left">Zona</th><th className="p-1 text-right">Posiciones</th></tr></thead>
          <tbody>
            {COBERTURA.bloqueadasPorZona.map((b, i) => (
              <tr key={b.zona} className={i % 2 ? "bg-red-50" : ""}>
                <td className="p-1">{b.zona}</td><td className="p-1 text-right font-semibold">{b.posiciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2">
          <p className="text-[9px] font-bold text-gray-600 mb-0.5">SKUs core afectados:</p>
          {ALERTAS_BLOQUEADAS.slice(0, 4).map((b, i) => (
            <p key={i} className="text-[9px] text-gray-700 flex items-center gap-1">
              <Lock size={8} className="text-red-500 shrink-0" />{b.tienda} — {b.producto}
            </p>
          ))}
        </div>
        <p className="text-[10px] font-semibold text-red-700 mt-auto pt-2">→ Agendar desbloqueo con el comprador.</p>
      </div>
    </div>
    <Foot color="green">
      {COBERTURA.tiendasNoCatVendiendo} tiendas ya venden sin catalogo ({COBERTURA.pctNoCat}% de la venta) — es la palanca mas grande sin costo promocional.
    </Foot>
  </div>
);

/* ---------------- Slide 10: Top 20 ---------------- */
const S10 = () => {
  const mx = TOP20[0].uds;
  return (
    <div className="flex flex-col h-full p-6">
      <Head t="Top 20 Tiendas Catalogadas — YTD 2026" s="Unidades ene-jul 2026, 4 SKUs core." icon={<Store size={18} />} />
      <Card cls="flex-1">
        <table className="w-full text-[10px]">
          <thead><tr className="bg-orange-600 text-white">
            <th className="p-1 text-left">#</th><th className="p-1 text-left">Sucursal</th>
            <th className="p-1 text-left">Zona</th><th className="p-1 text-left">Plaza</th>
            <th className="p-1 text-right">Uds</th><th className="p-1 text-right">Est. PVP*</th>
            <th className="p-1 text-left w-[130px]"></th>
          </tr></thead>
          <tbody>
            {TOP20.map((t, i) => (
              <tr key={t.code} className={i % 2 ? "bg-orange-50" : ""}>
                <td className="p-1 text-gray-400">{i + 1}</td>
                <td className="p-1 font-semibold">{t.tienda}</td>
                <td className="p-1 text-gray-600">{t.zona}</td>
                <td className="p-1 text-gray-600">{t.plaza}</td>
                <td className="p-1 text-right font-bold">{fmtU(t.uds)}</td>
                <td className="p-1 text-right text-gray-500">{fmtPVP(t.estPvp)}</td>
                <td className="p-1">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(t.uds / mx) * 100}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[9px] text-gray-400 mt-2">
          * Estimado PVP: unidades x precio de anaquel estimado. No es dato de facturacion real.
        </p>
      </Card>
      <Foot>Las 20 tiendas top concentran {fmtU(TOP20.reduce((a, t) => a + t.uds, 0))} uds — priorizar su abasto en cada ventana promocional.</Foot>
    </div>
  );
};

/* ---------------- Slide 11: Hallazgos ---------------- */
const S11 = () => (
  <div className="flex flex-col h-full p-6">
    <Head t="Hallazgos" s="Lo que dicen los datos de julio 2026." icon={<Target size={18} />} />
    <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
      {HALLAZGOS.map((h, i) => (
        <div key={i} className={`bg-white rounded-xl shadow border-2 p-3 flex flex-col ${h.tipo === "ok" ? "border-green-300" : "border-amber-300"}`}>
          <div className="flex items-start gap-2">
            {h.tipo === "ok"
              ? <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
              : <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />}
            <div>
              <p className={`text-[13px] font-bold ${h.tipo === "ok" ? "text-green-800" : "text-amber-800"}`}>{h.t}</p>
              <p className="text-[11px] text-gray-700 mt-0.5 leading-snug">{h.d}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <Foot color="green">
      Conclusion: la promocion funciono y el 2xN es la mecanica mas eficiente. Con 97% de cobertura, promocion y exhibicion son las palancas de crecimiento.
    </Foot>
  </div>
);

/* ---------------- Slide 12: Plan de accion ---------------- */
const S12 = () => {
  const blocks = [
    { k: "urgente", t: "URGENTE", cls: "border-red-300 bg-red-50", tc: "text-red-800", items: PLAN.urgente },
    { k: "estaSemana", t: "ESTA SEMANA", cls: "border-yellow-300 bg-yellow-50", tc: "text-yellow-800", items: PLAN.estaSemana },
    { k: "esteMes", t: "ESTE MES", cls: "border-green-300 bg-green-50", tc: "text-green-800", items: PLAN.esteMes },
    { k: "estrategico", t: "ESTRATEGICO", cls: "border-blue-300 bg-blue-50", tc: "text-blue-800", items: PLAN.estrategico },
  ];
  return (
    <div className="flex flex-col h-full p-6">
      <Head t="Plan de Accion" s="Priorizado por urgencia e impacto." icon={<Zap size={18} />} />
      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
        {blocks.map((b) => (
          <div key={b.k} className={`rounded-xl border-2 p-3 ${b.cls} flex flex-col`}>
            <p className={`text-[12px] font-bold mb-2 ${b.tc}`}>{b.t}</p>
            <div className="space-y-2">
              {b.items.map((it, i) => (
                <div key={i} className="bg-white rounded-lg p-2 shadow-sm">
                  <p className="text-[11px] font-bold text-gray-800">{it.accion}</p>
                  <p className="text-[10px] text-gray-600 leading-snug">{it.detalle}</p>
                  <p className="text-[9px] text-orange-600 font-semibold mt-0.5">→ {it.impacto}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Foot color="green">
        La prioridad #1 es repetir la mecanica 2xN: es la palanca con evidencia medida de +{PROMO_TOT.incr} uds en un mes.
      </Foot>
    </div>
  );
};

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12];
const TITLES = ["Portada", "Mensual", "Impacto Promo", "Validacion 2xN", "Productos", "Penetracion",
  "Geografia", "Alertas", "Oportunidades", "Top 20", "Hallazgos", "Plan"];

export default function Page() {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") setCur((c) => Math.min(c + 1, SLIDES.length - 1));
      if (e.key === "ArrowLeft") setCur((c) => Math.max(c - 1, 0));
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  const Cur = SLIDES[cur];
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-950 p-4">
      <div className="relative w-[1280px] aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-orange-700 bg-gradient-to-br from-orange-50 to-orange-100">
        <Cur />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-orange-900/90 backdrop-blur rounded-full px-4 py-1.5 shadow-lg flex items-center gap-2">
          <button onClick={() => setCur((c) => Math.max(c - 1, 0))} disabled={cur === 0}
            className="text-white disabled:opacity-30 hover:bg-orange-800 rounded p-0.5"><ChevronLeft size={16} /></button>
          <div className="flex gap-1">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setCur(i)} title={TITLES[i]}
                className={`w-2 h-2 rounded-full transition-all ${i === cur ? "bg-orange-300 w-5" : "bg-orange-600 hover:bg-orange-400"}`} />
            ))}
          </div>
          <button onClick={() => setCur((c) => Math.min(c + 1, SLIDES.length - 1))} disabled={cur === SLIDES.length - 1}
            className="text-white disabled:opacity-30 hover:bg-orange-800 rounded p-0.5"><ChevronRight size={16} /></button>
          <span className="text-orange-200 text-[10px] font-semibold ml-1 w-20">{cur + 1}/{SLIDES.length} · {TITLES[cur]}</span>
        </div>
      </div>
    </div>
  );
}
