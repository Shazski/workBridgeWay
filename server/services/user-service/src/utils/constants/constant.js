"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.FRONTEND_BASE_URL = void 0;
exports.FRONTEND_BASE_URL = "http://localhost:5173";
exports.corsOptions = {
    origin: exports.FRONTEND_BASE_URL,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
};
