
import type { NextApiRequest, NextApiResponse } from "next";
import Deed from "@/model/deedModel";
import { connectDB } from "@/config/db";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";

async function generatePDF(htmlContent: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: "new" as any,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ],
  });
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle0", timeout: 30000 });
  const text = await page.evaluate(() => document.body.innerText);
  // console.log("Page content text:", text);

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
    preferCSSPageSize: true,
    timeout: 30000,
  });

  await page.close();
  await browser.close();

  return Buffer.from(pdfBuffer);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method !== "POST") {
    return res.setHeader("Allow", ["POST"]).status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { fullName, fatherName, propertySize, saleAmount, date } = req.body;
    const missing = ["fullName","fatherName","propertySize","saleAmount"].filter(f => !req.body[f]);
    if (missing.length) return res.status(400).json({ message: `Missing: ${missing.join(", ")}` });

    await Deed.create({ fullName, fatherName, propertySize, saleAmount, date: date || new Date().toLocaleDateString("en-IN") });

    const tplPath = path.join(process.cwd(), "public/templates/deedTemplate.html");
    if (!fs.existsSync(tplPath)) {
      // console.error("Template not found:", tplPath);
      return res.status(500).json({ message: "Template file not found" });
    }

    const tplSrc = fs.readFileSync(tplPath, "utf-8");
    const tpl = Handlebars.compile(tplSrc);
    const html = tpl({ fullName, fatherName, propertySize, saleAmount, date: date || new Date().toLocaleDateString("en-IN") });

    const pdfBuffer = await generatePDF(html);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=SaleDeed.pdf");
    res.setHeader("Content-Length", pdfBuffer.length.toString());
    return res.status(200).send(pdfBuffer);

  } catch (err: any) {
    console.error("Handler error:", err);
    return res.status(500).json({ message: "PDF generation failed", error: err.message });
  }
}
