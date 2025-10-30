// export const getCookieOptions = () => {
//   const isProduction = process.env.NODE_ENV === "production";

//   return {
//     httpOnly: true, // ✅ Prevents JavaScript from accessing cookies (XSS safe)
//     secure: isProduction, // ✅ Uses HTTPS only in production
//     sameSite: "strict" as const, // ✅ Prevents CSRF attacks
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//     path: "/", // ✅ Cookie valid for whole site
//     signed: true, // ✅ Verifies cookie integrity
//   };
// };

// utils/cookieOptions.ts
export const getCookieOptions = (
  type: "access" | "refresh" = "access",
  rememberMe: boolean = false
) => {
  const isProduction = process.env.NODE_ENV === "production";

  // Expiration durations
  const accessMaxAge = 15 * 60 * 1000; // 15 minutes
  const refreshMaxAge = rememberMe
    ? 30 * 24 * 60 * 60 * 1000 // 30 days if remember me
    : 7 * 24 * 60 * 60 * 1000; // 7 days default

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict" as const,
    path: "/",
    signed: true,
    maxAge: type === "access" ? accessMaxAge : refreshMaxAge,
  };
};
