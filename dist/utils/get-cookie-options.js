"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookieOptions = void 0;
const getCookieOptions = (type = "access", rememberMe = false) => {
    const isProduction = process.env.NODE_ENV === "production";
    const accessMaxAge = 15 * 24 * 60 * 60 * 1000; // 15 days
    const defaultRefreshMaxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    const extendedRefreshMaxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
    const refreshMaxAge = rememberMe
        ? extendedRefreshMaxAge
        : defaultRefreshMaxAge;
    return {
        httpOnly: true,
        secure: isProduction, // Only HTTPS in production
        sameSite: isProduction ? "none" : "lax", // Cross-site cookies
        path: "/",
        signed: false,
        maxAge: type === "access" ? accessMaxAge : refreshMaxAge,
    };
};
exports.getCookieOptions = getCookieOptions;
//# sourceMappingURL=get-cookie-options.js.map