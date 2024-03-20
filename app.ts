
import chromium from '@sparticuz/chromium'
import playwright from 'playwright-core'
import  express from 'express';
import dotenv from 'dotenv';
dotenv.config({path: "mike.env"})
const app = express()

app.get(`/`, (req,res) => {
    res.status(200).send(`Hello! CheckDL is Serverless. :))`)
})
app.get(`/api/checkdl`, (req,res) => {
async function Main(url: string, keuntungan: number): Promise<any> {
{
return new Promise(async(resolve,err) => {
    console.log(process.env.MODE)
    console.log(`[Node-Store] : Mengambil informasi harga..`)

    let browser = await playwright.chromium.launch({
        args: chromium.args,
        headless: true,
   executablePath: (process.env.MODE == "Dev" ? await chromium.executablePath() : playwright.chromium.executablePath())
})
    let page = await browser.newPage()
   await page.goto(url, {waitUntil: 'networkidle'})
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
    console.log(`done`)
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