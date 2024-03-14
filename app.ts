import * as playwright from 'playwright-aws-lambda'
import  express from 'express';
const app = express()

app.get(`/`, (req,res) => {
    res.status(200).send(`Hello! CheckDL is Serverless. :))`)
})
app.get(`/api/checkdl`, (req,res) => {
async function Main(url: string, keuntungan: number): Promise<any> {
{
return new Promise(async(resolve,err) => {
    console.log(`[Node-Store] : Mengambil informasi harga..`)
    let browser = await playwright.launchChromium({headless: true, args: [
        // Use with caution!
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gl-drawing-for-tests',
      ],})
    let page = await browser.newPage()
   await page.goto(url)
   await page.reload()
   if(!await page.getByText('Pengiriman Instan').isVisible()) await page.reload()
await page.getByText('Pengiriman Instan').click()
let pembelian = (await page.locator('div[id=sticky]').getByText(/Rp./).innerText()).toString()
let pembelianNum = pembelian.replace(/[^\d]/g, "")
resolve({pembelian: parseInt(pembelianNum),
    penjualan: parseInt(pembelianNum) - keuntungan
})
await browser.close()
})
}
}
Main('https://itemku.com/belanja-cepat/growtopia', 1000).then((data:any) => {
res.status(200).send({RateSell: data.penjualan.toLocaleString(), 
RateBuy: data.pembelian.toLocaleString(), 
fullMessage: `Rate DLS Sekarang : 
Menjual : Rp.${data.penjualan.toLocaleString()}
Membeli : Rp.${data.pembelian.toLocaleString()}`})
})
})

app.listen(3000).on('listening', () => {
    console.log(`API is running on 3000.`)
})

module.exports = app