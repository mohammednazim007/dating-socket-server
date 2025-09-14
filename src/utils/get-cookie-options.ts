// ** Set secure cookie options
export const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true, // Prevent XSS attacks
    secure: isProduction, // HTTPS only in production
    sameSite: "strict" as const, // CSRF protection
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    path: "/", // Available site-wide
    signed: true, // Use signed cookies for additional security
  };
};
