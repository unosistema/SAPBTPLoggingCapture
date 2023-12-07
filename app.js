import puppeteer from 'puppeteer';

// Change here!!
const btp_application_logging_snapshot_url = "xxxxxxxxxxxxxxxxxxxxxxx"; // ex. https://logs.cf.eu10-004.hana.ondemand.com/goto/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const sap_username = "xxxxxx@xxxxxxxxxxx.com"; // Your SAP UniversalID(e-mail)
const sap_password = "xxxxxxxxxxxx"; // Your SAP UniversalID Password


(async function main() {
	var browser = await puppeteer.launch({ headless: true, timeout: 40000, ignoreHTTPSErrors: true });
	let page = await browser.newPage();
	await page.goto(btp_application_logging_snapshot_url);

	// Select SAP ID provider
	await page.click('input[value="Sign in with default identity provider"]');
	// Loading...15sec... Login Page
	await page.waitForTimeout(15000);

	// Login by SAP Universal ID
	await page.type('#j_username', sap_username); //#j_username - its the ID for username html element field
	await page.type('#j_password', sap_password); // #j_password  -its the ID for password html element field
	await page.click('button[id="logOnFormSubmit"]');

	// Loading....30sec... Application Logging Servece
	await page.waitForTimeout(30000);

	// Get Today String (YYYY-MM-DD)
	var currentDate = new Date().toISOString().slice(0,10);

	// screenshot-YYYY-MM-DD.png
	await page.screenshot({ path: 'screenshot-'+currentDate+'.png'});

	browser.close();

})();
