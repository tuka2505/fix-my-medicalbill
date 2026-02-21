import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  '/',
  '/medical-bill-dispute-letter',
  '/insurance-claim-denied-appeal',
  '/urgent-care-bill-dispute',
  '/out-of-network-billing-dispute',
  '/request-itemized-medical-bill',
  '/medical-debt-assistance-plan',
  '/medical-collections-debt-validation',
  '/prior-authorization-request-appeal',
  '/good-faith-estimate-dispute',
  '/medical-credit-report-removal',
  '/privacy-policy',
  '/terms-of-service',
  '/faq'
];

async function prerender() {
  const distPath = path.resolve(__dirname, 'dist');
  
  // Start a preview server
  const server = await createServer({
    configFile: false,
    root: distPath,
    server: { port: 3000 }
  });
  
  await server.listen();
  console.log('Preview server started on http://localhost:3000');
  
  // Launch puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  console.log('Starting pre-rendering...\n');
  
  for (const route of routes) {
    try {
      const page = await browser.newPage();
      const url = `http://localhost:3000${route}`;
      
      console.log(`Rendering: ${route}`);
      
      // Navigate to the page
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Wait for the app-rendered event
      await page.waitForFunction(
        () => document.readyState === 'complete',
        { timeout: 5000 }
      ).catch(() => {});
      
      // Additional wait for any async content
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the HTML
      const html = await page.content();
      
      // Determine output path
      let outputPath;
      if (route === '/') {
        outputPath = path.join(distPath, 'index.html');
      } else {
        const routePath = path.join(distPath, route);
        if (!fs.existsSync(routePath)) {
          fs.mkdirSync(routePath, { recursive: true });
        }
        outputPath = path.join(routePath, 'index.html');
      }
      
      // Clean up the HTML (remove localhost URLs)
      const cleanedHtml = html
        .replace(/http:\/\/localhost:\d+/g, '')
        .replace(/https:\/\/localhost:\d+/g, '');
      
      // Write the HTML file
      fs.writeFileSync(outputPath, cleanedHtml);
      console.log(`✓ Generated: ${outputPath}`);
      
      await page.close();
    } catch (error) {
      console.error(`✗ Error rendering ${route}:`, error.message);
    }
  }
  
  await browser.close();
  await server.close();
  
  console.log('\n✅ Pre-rendering complete!');
}

prerender().catch(error => {
  console.error('Pre-rendering failed:', error);
  process.exit(1);
});
