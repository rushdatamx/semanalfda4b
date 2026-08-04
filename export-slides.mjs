/**
 * Exporta los slides a PNG de alta resolucion + un PDF vectorial-ish.
 *
 * Uso:
 *   node export-slides.mjs                 # 3x  -> 3840x2160 (recomendado para Canva)
 *   node export-slides.mjs --scale 4       # 4x  -> 5120x2880
 *   node export-slides.mjs --port 3001
 *
 * El script arranca su propio servidor sobre la build estatica de ./out,
 * asi no depende de que `npm run dev` este corriendo.
 */
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import http from "http";

const args = process.argv.slice(2);
const getArg = (k, d) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};

const SCALE = Number(getArg("scale", 3));
const PORT = Number(getArg("port", 4321));
const W = 1280;
const H = 720;
const FECHA = new Date().toISOString().slice(0, 10);
const OUTDIR = path.resolve(`../outputs/slides_FDA_${FECHA}`);
const PDF_OUT = path.resolve(`../outputs/presentacion_FDA_4BUDDIES_${FECHA}.pdf`);

const TITLES = ["1_portada", "2_mensual", "3_impacto_promo", "4_productos", "5_top20"];

/* ---- servidor estatico minimo sobre ./out ---- */
const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml", ".json": "application/json", ".woff2": "font/woff2",
  ".txt": "text/plain", ".ico": "image/x-icon",
};

function serve(root) {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split("?")[0]);
      let f = path.join(root, p);
      try {
        if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
        if (!fs.existsSync(f)) f = path.join(root, "index.html");
        res.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream" });
        fs.createReadStream(f).pipe(res);
      } catch {
        res.writeHead(500).end("err");
      }
    });
    srv.listen(PORT, () => resolve(srv));
  });
}

async function run() {
  const outRoot = path.resolve("out");
  if (!fs.existsSync(outRoot)) {
    console.error("No existe ./out — corre primero:  npm run build");
    process.exit(1);
  }

  fs.mkdirSync(OUTDIR, { recursive: true });
  const srv = await serve(outRoot);
  console.log(`Servidor estatico en http://localhost:${PORT}`);
  console.log(`Escala ${SCALE}x  ->  ${W * SCALE}x${H * SCALE} px por slide\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--force-device-scale-factor=" + SCALE, "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H + 120, deviceScaleFactor: SCALE });
  await page.goto(`http://localhost:${PORT}`, { waitUntil: "networkidle0", timeout: 30000 });

  // dejar que Recharts termine de montar y animar
  await new Promise((r) => setTimeout(r, 4000));
  // nudge de resize para que ResponsiveContainer recalcule con el nuevo DPR
  await page.setViewport({ width: W + 1, height: H + 120, deviceScaleFactor: SCALE });
  await new Promise((r) => setTimeout(r, 800));
  await page.setViewport({ width: W, height: H + 120, deviceScaleFactor: SCALE });
  await new Promise((r) => setTimeout(r, 1500));

  // contar slides ANTES de ocultar la barra de navegacion
  const total = await page.evaluate(() => {
    const dots = document.querySelectorAll(".absolute.bottom-3 button[title]");
    return dots.length;
  });
  const n = total || TITLES.length;
  console.log(`Slides detectados: ${n}`);

  // ocultar la barra de navegacion para que no salga en la imagen
  await page.addStyleTag({
    content: `.absolute.bottom-3 { display: none !important; }
              *, *::before, *::after { animation: none !important; transition: none !important; }`,
  });
  await new Promise((r) => setTimeout(r, 400));

  const shots = [];
  for (let i = 0; i < n; i++) {
    const el = await page.$(".relative.shadow-2xl");
    if (!el) throw new Error("No se encontro el contenedor del slide");
    const name = TITLES[i] || `slide_${i + 1}`;
    const out = path.join(OUTDIR, `${name}.png`);
    await el.screenshot({ path: out, captureBeyondViewport: true });
    const kb = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`  ✓ ${name}.png  (${kb} KB)`);
    shots.push(out);

    if (i < n - 1) {
      await page.keyboard.press("ArrowRight");
      await new Promise((r) => setTimeout(r, 1600)); // re-render de charts
    }
  }

  /* ---- PDF a partir de los PNG de alta resolucion ---- */
  const parts = shots
    .map((s, i) => {
      const b64 = fs.readFileSync(s).toString("base64");
      const brk = i < shots.length - 1 ? "page-break-after:always;" : "";
      return `<div style="margin:0;padding:0;${brk}"><img src="data:image/png;base64,${b64}" style="width:1280px;height:720px;display:block;"/></div>`;
    })
    .join("\n");

  const pdfPage = await browser.newPage();
  await pdfPage.setContent(
    `<!DOCTYPE html><html><head><style>@page{size:1280px 720px;margin:0}body{margin:0;padding:0}</style></head><body>${parts}</body></html>`,
    { waitUntil: "load" }
  );
  await pdfPage.pdf({
    path: PDF_OUT,
    width: "1280px",
    height: "720px",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  srv.close();

  const mb = (fs.statSync(PDF_OUT).size / 1024 / 1024).toFixed(1);
  console.log(`\nPNG (${W * SCALE}x${H * SCALE}):  ${OUTDIR}`);
  console.log(`PDF (${mb} MB):  ${PDF_OUT}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
