import puppeteer from 'puppeteer';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const TOTAL_SLIDES = 7;
const WIDTH = 1280;
const HEIGHT = 720;
const OUTPUT = path.resolve('../outputs/presentacion_FDA_4BUDDIES_2026-07-06.pdf');

// Ensure output dir exists
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });

async function run() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT + 80, deviceScaleFactor: 2 });

  console.log('Opening presentation...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle0', timeout: 15000 });
  // Wait for Recharts to fully render (SVG animations + ResponsiveContainer)
  await new Promise(r => setTimeout(r, 4000));
  // Trigger a resize so ResponsiveContainer recalculates
  await page.setViewport({ width: WIDTH + 1, height: HEIGHT + 80, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 1000));
  await page.setViewport({ width: WIDTH, height: HEIGHT + 80, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 2000));

  const screenshots = [];

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    console.log(`Capturing slide ${i + 1}/${TOTAL_SLIDES}...`);

    // Wait for any chart animations to complete
    await new Promise(r => setTimeout(r, 2000));

    // Find the slide container and screenshot just that
    const slideEl = await page.$('.relative.shadow-2xl');
    if (slideEl) {
      const ssPath = `/tmp/slide_${i}.png`;
      await slideEl.screenshot({ path: ssPath });
      screenshots.push(ssPath);
    }

    // Navigate to next slide
    if (i < TOTAL_SLIDES - 1) {
      await page.keyboard.press('ArrowRight');
      await new Promise(r => setTimeout(r, 1500));
    }
  }

  // Create PDF from screenshots using a temporary HTML page
  const htmlParts = screenshots.map((ss, i) => {
    const data = fs.readFileSync(ss);
    const b64 = data.toString('base64');
    const pageBreak = i < screenshots.length - 1 ? 'page-break-after: always;' : '';
    return `<div style="margin:0;padding:0;${pageBreak}"><img src="data:image/png;base64,${b64}" style="width:100%;height:auto;display:block;"/></div>`;
  }).join('\n');

  const html = `<!DOCTYPE html><html><head><style>@page{size:1280px 720px;margin:0;}body{margin:0;padding:0;}</style></head><body>${htmlParts}</body></html>`;

  const pdfPage = await browser.newPage();
  await pdfPage.setContent(html, { waitUntil: 'load' });
  await pdfPage.pdf({
    path: OUTPUT,
    width: '1280px',
    height: '720px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  // Cleanup
  screenshots.forEach(s => fs.unlinkSync(s));
  
  await browser.close();
  console.log(`\nPDF saved: ${OUTPUT}`);
}

run().catch(e => { console.error(e); process.exit(1); });
