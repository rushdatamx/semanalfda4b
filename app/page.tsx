"use client";
import { useState, useEffect, useCallback } from "react";
import Slide1Portada from "@/components/Slide1Portada";
import Slide2SellOut from "@/components/Slide2SellOut";
import Slide3Alertas from "@/components/Slide3Alertas";
import Slide4Oportunidades from "@/components/Slide4Oportunidades";
import Slide5Productos from "@/components/Slide5Productos";
import Slide6ZonaTiendas from "@/components/Slide6ZonaTiendas";
import Slide7PlanAccion from "@/components/Slide7PlanAccion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { component: Slide1Portada, title: "Portada" },
  { component: Slide2SellOut, title: "Sell-Out" },
  { component: Slide3Alertas, title: "Alertas" },
  { component: Slide4Oportunidades, title: "Oportunidades" },
  { component: Slide5Productos, title: "Productos" },
  { component: Slide6ZonaTiendas, title: "Zonas + Tiendas" },
  { component: Slide7PlanAccion, title: "Plan de Acción" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent((c) => Math.min(slides.length - 1, c + 1)), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const SlideComponent = slides[current].component;

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Slide */}
      <div className="relative shadow-2xl rounded-2xl overflow-hidden">
        <SlideComponent />
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={prev}
          disabled={current === 0}
          className="p-2 rounded-full bg-orange-600 text-white disabled:opacity-30 hover:bg-orange-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                i === current
                  ? "bg-orange-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="p-2 rounded-full bg-orange-600 text-white disabled:opacity-30 hover:bg-orange-700 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-gray-500 text-xs mt-3">Usa ← → para navegar</p>
    </main>
  );
}
