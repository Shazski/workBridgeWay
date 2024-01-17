"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.PORT = void 0;
const env_1 = require("./envConfig/env");
Object.defineProperty(exports, "PORT", { enumerable: true, get: function () { return env_1.PORT; } });
const env_2 = require("./envConfig/env");
Object.defineProperty(exports, "JWT_SECRET", { enumerable: true, get: function () { return env_2.JWT_SECRET; } });
