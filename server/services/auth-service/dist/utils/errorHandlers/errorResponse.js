"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
    static badRequest(msg) {
        return new ErrorResponse(400, msg || "Bad Request");
    }
    static unauthorized(msg) {
        return new ErrorResponse(401, msg || "Unauthorized");
    }
    static forbidden(msg) {
        return new ErrorResponse(403, msg || "Forbidden");
    }
    static notFound(msg) {
        return new ErrorResponse(404, msg || "Not Found");
    }
    static internalError(msg) {
        return new ErrorResponse(500, msg || "internal Server Error");
    }
}
exports.default = ErrorResponse;
