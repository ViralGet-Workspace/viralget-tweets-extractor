"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../Utils/db"));
class BaseRepository {
    constructor() {
        this.db = new db_1.default;
    }
}
exports.default = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map