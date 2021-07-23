"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
function isAuthenticated(req, resp, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        return resp.status(401).json({ error: "JWT Token is missing" });
    }
    // type = Bearer, mas não vai ser utilizado
    var _a = authHeader.split(' '), type = _a[0], token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        console.log(decoded);
        return next();
    }
    catch (error) {
        return resp.status(401).json({ error: 'Invalid JWT Token' });
    }
}
exports.default = isAuthenticated;
