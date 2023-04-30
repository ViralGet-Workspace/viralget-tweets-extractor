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
const axios_1 = __importDefault(require("axios"));
class API {
    constructor(authorization) {
        this.authorization = authorization;
        this.instance = axios_1.default.create({
            baseURL: "/",
        });
        this.initiateConfig();
    }
    request() {
        return this.instance;
    }
    getConfig(extraConfig = {}) {
        let config = Object.assign({}, extraConfig);
        if (this.authorization) {
            config.headers = {
                'Authorization': this.authorization
            };
        }
        return config;
    }
    initiateConfig() {
        // request interceptor
        this.instance.interceptors.request.use((config) => {
            // Run necessary config
            return config;
        }, (error) => {
            console.log({ error });
            return false;
        });
    }
    get(url, requireAuth) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ url });
            try {
                let response = requireAuth
                    ? yield this.instance.get(url, this.getConfig())
                    : yield this.instance.get(url);
                return this.handleResponse(response);
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
    ;
    post(url, payload, requireAuth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = requireAuth
                    ? yield this.instance.post(url, payload, this.getConfig())
                    : yield this.instance.post(url, payload);
                return this.handleResponse(response);
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
    ;
    patch(url, payload, requireAuth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = requireAuth
                    ? yield this.instance.patch(url, payload, this.getConfig())
                    : yield this.instance.patch(url, payload);
                return this.handleResponse(response);
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
    ;
    put(url, payload, requireAuth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = requireAuth
                    ? yield this.instance.put(url, payload, this.getConfig())
                    : yield this.instance.put(url, payload);
                return this.handleResponse(response);
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
    ;
    delete(url, requireAuth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = requireAuth
                    ? yield this.instance.delete(url, this.getConfig())
                    : yield this.instance.delete(url);
                return this.handleResponse(response);
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
    ;
    handleResponse(response) {
        return response.data;
    }
    handleError(error) {
        var _a, _b, _c, _d, _e, _f, _g;
        return {
            error: (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : 'An error occurred',
            message: (_e = (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) !== null && _e !== void 0 ? _e : 'An error occurred',
            errors: (_g = (_f = error.response) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.errors,
            status: false,
        };
    }
}
// const del = async (url, payload = {}, requireAuth = true) => {
//   try {
//     const meta = document.querySelector('meta[name="csrf-token"]');
//     let config = {
//       headers: {
//         'Authorization': `Bearer ${meta.getAttribute('content')}`
//       },
//       data: payload,
//     };
//     let response = requireAuth
//       ? await instance.delete(url, config)
//       : await instance.delete(url, { data: payload });
//     return response;
//   } catch (error) {
//     return handleError(error);
//   }
// };
// const apiInstance = new API;
// const { request, get, post, put, patch } = apiInstance;
// export default { request, get, post, put, patch };
exports.default = API;
//# sourceMappingURL=api.js.map