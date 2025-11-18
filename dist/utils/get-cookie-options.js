"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookieOptions = void 0;
// src/utils/get-cookie-options.ts
const getCookieOptions = (type = "access", rememberMe = false) => {
    const accessMaxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
    const refreshMaxAge = rememberMe
        ? 30 * 24 * 60 * 60 * 1000 // 30 days
        : 7 * 24 * 60 * 60 * 1000; // 7 days
    const isProd = process.env.NODE_ENV === "production";
    return {
        httpOnly: true,
        secure: isProd, // Required when sameSite = "none"
        sameSite: isProd ? "none" : "lax",
        path: "/",
        signed: false,
        domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
        maxAge: type === "access" ? accessMaxAge : refreshMaxAge,
    };
};
exports.getCookieOptions = getCookieOptions;
//# sourceMappingURL=get-cookie-options.js.map