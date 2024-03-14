"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get(`/`, (req, res) => {
    res.status(200).send(`Hello! CheckDL is ready.`);
});
app.get(`/api/checkdl`, (req, res) => {
    function Main(url, keuntungan) {
        return __awaiter(this, void 0, void 0, function* () {
            {
                return new Promise((resolve, err) => __awaiter(this, void 0, void 0, function* () {
                    console.log(`[Node-Store] : Mengambil informasi harga..`);
                    let browser = yield playwright_1.chromium.launch({ headless: true });
                    let page = yield (yield browser.newContext()).newPage();
                    yield page.goto(url, { waitUntil: 'networkidle' });
                    yield page.reload({ waitUntil: 'networkidle' });
                    if (!(yield page.getByText('Pengiriman Instan').isVisible()))
                        yield page.reload({ waitUntil: 'networkidle' });
                    yield page.getByText('Pengiriman Instan').click();
                    let pembelian = (yield page.locator('div[id=sticky]').getByText(/Rp./).innerText()).toString();
                    let pembelianNum = pembelian.replace(/[^\d]/g, "");
                    resolve({ pembelian: parseInt(pembelianNum),
                        penjualan: parseInt(pembelianNum) - keuntungan
                    });
                    yield browser.close();
                }));
            }
        });
    }
    Main('https://itemku.com/belanja-cepat/growtopia', 1000).then((data) => {
        res.status(200).send({ RateSell: data.penjualan.toLocaleString(),
            RateBuy: data.pembelian.toLocaleString(),
            fullMessage: `Rate DLS Sekarang : 
Menjual : Rp.${data.penjualan.toLocaleString()}
Membeli : Rp.${data.pembelian.toLocaleString()}` });
    });
});
app.listen(80).on('listening', () => {
    console.log(`API is running on 80.`);
});
