import puppeteer, { PDFOptions } from "puppeteer";
import fs from "fs";
import path from "path";
import hbs from "handlebars";

const data = {
  title: "A new Brazilian School",
  date: "05/12/2018",
  name: "Rodolfo Luis Marcos",
  age: 28,
  birthdate: "12/07/1990",
  course: "Computer Science",
  obs:
    "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce.",
};

const main = async () => {
  const templateHtml = fs.readFileSync(
    path.join(process.cwd(), "src", "templates", "puppeteer.html"),
    "utf8"
  );
  const template = hbs.compile(templateHtml);
  const html = Buffer.from(template(data)).toString("base64");

  const pdfPath = path.join(process.cwd(), `test.pdf`);

  const pdfOptions: PDFOptions = {
    path: pdfPath,
    headerTemplate: "<p></p>",
    footerTemplate: "<p></p>",
    displayHeaderFooter: false,
    margin: {
      top: "10px",
      bottom: "30px",
    },
    format: "a4",
    printBackground: true,
  };
  const dataUrl = `data:text/html;charset=UTF-8;base64,${html}`;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(dataUrl, { waitUntil: "networkidle0" });
  const myPdf = await page.pdf(pdfOptions);
  await browser.close();

  console.log(myPdf);

  process.exit();
};

main();
