export declare const getCookieOptions: (type?: "access" | "refresh", rememberMe?: boolean) => {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "none" | "lax";
    path: string;
    signed: boolean;
    domain: string | undefined;
    maxAge: number;
};
