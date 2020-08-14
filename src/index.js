import { WebHostPage } from "./pages/WebHostPage";
const puppeteer = require("puppeteer-core");
const envConfig = require("./config/config");
const findChromiumPath = require("./utils/find-chromium-path");
require("dotenv").config();
let path = require('path');

// Get chromium executable path
var opsys = process.platform;
console.log(opsys);
let chromePath = null;
if (opsys == "linux") {
  chromePath  =
    findChromiumPath("node_modules/puppeteer", "chrome-linux") + "/chrome";
} else if (opsys == "win32" || opsys == "win64") {
  chromePath =
    findChromiumPath(path.normalize("node_modules/puppeteer"), "chrome-win") + "\\chrome.exe";
}
console.log(chromePath);
const BEFORE_CLOSE_DELAY_MILLISECS = 5000;
const INPUT_TEXT = "Hello World Puppeteer";

const puppeteerExample = async () => {
  // Launch puppeteer
  const browser = await puppeteer.launch({
    executablePath: chromePath ,
    headless: envConfig.isHeadless(),
    args: envConfig.getChromiumArgs(),
  });

  // Log Headless mode
  console.log("Headless Mode: " + envConfig.isHeadless());

  // Initialize WebHost page
  let webHostPage = new WebHostPage(await getCurrentPage(browser));

  // Navigate to URL
  await webHostPage.open();

  // Type 'Hello World' to text box
  await webHostPage.typeToBox(INPUT_TEXT);

  // Wait before closing browser..
  await webHostPage.delay(BEFORE_CLOSE_DELAY_MILLISECS);

  // Close browser;
  await browser.close();
};

const getCurrentPage = async (browser) => {
  return (await browser.pages())[0];
};

puppeteerExample();
