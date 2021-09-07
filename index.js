const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

;(async () => {
    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    await page.goto('https://www.amazon.com/OnefunTech-Decompression-Computer-Pillows-Desktop/dp/B08LDP5QTN')

    await page.screenshot({path: 'amazon.png'})

    const pageData = await page.evaluate(() => {
        return {
            html: document.documentElement.innerHTML,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    })

    const $ = cheerio.load(pageData.html)

    const price = $('#priceblock_ourprice')
    const prime = $('#priceBadging_feature_div')
    const FreeReturns = $(`#creturns-return-policy-message`)
    console.log(`Price: ${price.text()}`)
    await browser.close()
})()
