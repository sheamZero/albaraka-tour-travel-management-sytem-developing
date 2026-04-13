

const cookieOptions = {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

export default cookieOptions;