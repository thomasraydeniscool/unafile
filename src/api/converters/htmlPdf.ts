import * as puppeteer from 'puppeteer';

export default async (data: Buffer): Promise<Buffer> => {
  const html = data.toString('utf8');
  const options = {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto(`data:text/html;charset=UTF-8,${html}`, {
    waitUntil: 'networkidle0'
  });
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();
  return pdf;
};
