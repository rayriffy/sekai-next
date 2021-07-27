import { NextApiHandler } from 'next'
import chromium from 'chrome-aws-lambda'

const api: NextApiHandler = async (req, res) => {
  const { musicId } = req.query

  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    executablePath: await chromium.executablePath,
    headless: true,
    defaultViewport: {
      width: 1500,
      height: 788,
    },
  })

  const page = await browser.newPage()
  await page.goto(`https://sekai.rayriffy.com/og/music/${musicId}`)

  const screenshot = await page.screenshot({
    type: 'jpeg',
    quality: 100,
  })

  res.setHeader('Content-Type', 'image/jpeg')
  // res.setHeader('Cache-Control', 's-maxage=86400')
  return res.end(screenshot)
}

export default api
