import { WebHostPage } from "./pages/WebHostPage";
const puppeteer = require("puppeteer-core");
const findChromiumPath = require("./utils/find-chromium-path");
require("dotenv").config();

// Get chromium executable path
const CHROMIUM_PATH =
  findChromiumPath("./node_modules/puppeteer", "chrome-linux") + "/chrome";
const BEFORE_CLOSE_DELAY_MILLISECS = 5000;
const INPUT_TEXT = "Hello World";

const puppeteerExample = async () => {
  // Launch puppeteer
  const browser = await puppeteer.launch({
    executablePath: CHROMIUM_PATH,
    headless: isHeadless(),
    args: getChromiumArgs(),
  });

  // Log Headless mode
  console.log("Headless Mode: " + isHeadless());

  // Initialize WebHost page
  let webHostPage = new WebHostPage(await browser.newPage());

  // Navigate to URL
  await webHostPage.open();

  // Type 'Hello World' to text box
  await webHostPage.typeToBox(INPUT_TEXT);

  // Wait before closing browser..
  await webHostPage.delay(BEFORE_CLOSE_DELAY_MILLISECS);

  // Close browser;
  await browser.close();
};

const getChromiumArgs = () => {
  return process.env.CHROMIUM_ARGS.split(" ");
};

const isHeadless = () => {
  return process.env.HEADLESS === "true";
};

puppeteerExample();
