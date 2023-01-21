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
const pg_1 = __importDefault(require("pg"));
const { Client } = pg_1.default;
class Db {
    constructor() {
        this.client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });
        this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.connect();
        });
    }
    endConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.end();
        });
    }
    query(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.client.query(query);
                return res.rows;
            }
            catch (e) {
                this.handleError(e);
                return false;
            }
        });
    }
    handleError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('An error occured: ', error.stack);
        });
    }
}
exports.default = Db;
//# sourceMappingURL=db.js.map