const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

;(async () => {
    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    await page.goto('https://www.amazon.com/Without-Display-Compatible-Replica-Non-Working/dp/B094HSGV8V/ref=sr_1_3')

    await page.screenshot({path: 'amazon.png'})

    const pageData = await page.evaluate(() => {
        return {
            html: document.documentElement.innerHTML,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    })

    const $ = cheerio.load(pageData.html)

    const element = $('#priceblock_ourprice_row')
    console.log(element.text())
    await browser.close()
})()
