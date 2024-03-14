"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const playwright = __importStar(require("playwright-aws-lambda"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get(`/`, (req, res) => {
    res.status(200).send(`Hello! CheckDL is Serverless. :))`);
});
app.get(`/api/checkdl`, (req, res) => {
    function Main(url, keuntungan) {
        return __awaiter(this, void 0, void 0, function* () {
            {
                return new Promise((resolve, err) => __awaiter(this, void 0, void 0, function* () {
                    console.log(`[Node-Store] : Mengambil informasi harga..`);
                    let browser = yield playwright.launchChromium({ headless: true, args: [
                            // Use with caution!
                            '--no-sandbox',
                            '--disable-setuid-sandbox',
                            '--disable-gl-drawing-for-tests',
                        ], });
                    let page = yield (yield browser.newContext()).newPage();
                    yield page.goto(url);
                    yield page.reload();
                    if (!(yield page.getByText('Pengiriman Instan').isVisible()))
                        yield page.reload();
                    yield page.getByText('Pengiriman Instan').click();
                    let pembelian = (yield page.locator('div[id=sticky]').getByText(/Rp./).innerText()).toString();
                    let pembelianNum = pembelian.replace(/[^\d]/g, "");
                    resolve({ pembelian: parseInt(pembelianNum),
                        penjualan: parseInt(pembelianNum) - keuntungan
                    });
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
app.listen(3000).on('listening', () => {
    console.log(`API is running on 3000.`);
});
module.exports = app;
