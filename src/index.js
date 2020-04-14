import { WebHostPage } from "./pages/WebHostPage";
const puppeteer = require("puppeteer-core");
const findChromiumPath = require("./utils/find-chromium-path");
require('dotenv').config();

const puppeteerExample = async () =>  {

    // Get chromium executable path
    const CHROMIUM_PATH =
        (await findChromiumPath("./node_modules/puppeteer", "chrome-linux")) +
        "/chrome";

    // Launch puppeteer
    const browser = await puppeteer.launch({
        executablePath: CHROMIUM_PATH,
        headless: process.env.HEADLESS==='true',
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--window-size=1920,1080",
        ],
    });

    // Log Headless mode
    console.log('Headless Mode: ' + process.env.HEADLESS);

    // Initialize WebHost page
    let webHostPage = new WebHostPage(await browser.newPage());

    // Navigate to URL
    await webHostPage.open();

    // Type 'Hello World' to text box
    await webHostPage.typeToBox("Hello World");

    // Wait before closing browser..
    await webHostPage.delay(5000);

    // Close browser;
    await browser.close();
};

puppeteerExample();
