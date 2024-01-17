"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONTEND_BASE_URL = exports.corsOptions = void 0;
const FRONTEND_BASE_URL = "http://localhost/5173";
exports.FRONTEND_BASE_URL = FRONTEND_BASE_URL;
const corsOptions = {
    origin: `http://${FRONTEND_BASE_URL}`,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    optionSuccessStatus: 200,
};
exports.corsOptions = corsOptions;
