import  puppeteer from 'puppeteer-extra'
import  StealthPlugin from "puppeteer-extra-plugin-stealth"
import { leadFilter } from './puppeteerClass.js';
puppeteer.use(StealthPlugin())



let id = 0; // session id
let browserObj = {}; // will store browser's session against session id

async function sessionStart() {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 10,
    // devtools: false,
    // ignoreHTTPSErrors: true,
    executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",
    userDataDir:"C:/Users/OK Computers/AppData/Local/Google/Chrome/User Data/Profile 6"
  });
 
 
  const page = await browser.newPage();
  await page.setViewport({
    width: 1250,
    height: 650,
    // deviceScaleFactor: 2,
  });
  // await salesNavigatorLogin("faaiz.13527@iqra.edu.pk", "karachipakistan", page); //login function uncomment for the firstime
 
  // await setCookies(page);
  await leadFilter("Owner", "videographer", "germany", page); 

  await browser.close();
 
}
sessionStart()

