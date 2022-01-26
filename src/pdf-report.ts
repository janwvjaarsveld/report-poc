// external dependencies
import PDFReport from "pdf-report";
import path from "path";
import fs from "fs";

// constants/variables
const html = fs.readFileSync(path.join(__dirname, "template.html")).toString();
const fileName = path.join(__dirname, "example.pdf");

// logic
PDFReport.toFile(fileName)
  .then(function (filePath) {
    console.log("open", filePath);
  })
  .catch(function (error) {
    console.log("error", error);
  });
