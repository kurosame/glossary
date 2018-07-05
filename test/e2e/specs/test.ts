import path from 'path'
import puppeteer, { Browser, Page } from 'puppeteer'

jest.setTimeout(30000)

let browser: Browser
let page: Page

beforeAll(async () => {
  browser =
    process.env.CI === 'true'
      ? await puppeteer.launch({
          headless: true,
          timeout: 0,
          args: ['--no-sandbox']
        })
      : await puppeteer.launch({ headless: false, timeout: 0 })
  page = await browser.newPage()
})
afterAll(() => {
  browser.close()
})

// beforeEach(async () => {
//   await page.goto('http://localhost:9000')
// })

test('Initial display', async () => {
  await page.goto('http://localhost:9000')
  await page.waitFor(1000)

  await page.screenshot({
    path: path.join(__dirname, '__screenshots__', 'init.png'),
    fullPage: true
  })
})
