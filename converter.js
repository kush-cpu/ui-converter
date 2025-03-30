const fs = require("fs");
const path = require("path");
const mappings = require("./mappings");

function ensureSampleFile(directory) {
  const sampleFile = path.join(directory, "Button.tsx");

  if (!fs.existsSync(sampleFile)) {
    const defaultContent = `
import { Button } from "shadcn-ui";

export default function MyButton() {
  return <Button variant="outline">Click Me</Button>;
}
    `;
    fs.writeFileSync(sampleFile, defaultContent, "utf8");
  }
}

function convertFile(filePath, targetLibrary) {
  let content = fs.readFileSync(filePath, "utf8");

  // Convert Components
  Object.keys(mappings.components).forEach((comp) => {
    const newComp = mappings.components[comp][targetLibrary] || comp;
    content = content.replace(new RegExp(`<${comp}`, "g"), `<${newComp}`);
    content = content.replace(new RegExp(`</${comp}>`, "g"), `</${newComp}>`);
  });

  // Convert Props
  Object.keys(mappings.props).forEach((prop) => {
    Object.keys(mappings.props[prop].shadcn).forEach((oldValue) => {
      const newValue = mappings.props[prop][targetLibrary][oldValue] || oldValue;
      content = content.replace(new RegExp(`${prop}="${oldValue}"`, "g"), `${prop}="${newValue}"`);
    });
  });

  // Convert Imports
  const newImportPath = mappings.imports[targetLibrary];
  content = content.replace(/import {([^}]+)} from ["'].*?["']/g, `import {$1} from "${newImportPath}"`);

  fs.writeFileSync(filePath, content, "utf8");
}

function convertProject(directory, targetLibrary) {
  if (fs.readdirSync(directory).length === 0) {
    console.log("📂 Empty folder detected! Creating sample file...");
    ensureSampleFile(directory);
  }

  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      convertProject(filePath, targetLibrary);
    } else if (file.endsWith(".tsx") || file.endsWith(".jsx")) {
      convertFile(filePath, targetLibrary);
    }
  });

  console.log(`✅ UI Library Conversion to ${targetLibrary} Completed!`);
}

module.exports = { convertProject };
