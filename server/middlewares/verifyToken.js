
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {


    // Support both cookie-based and Authorization header-based tokens
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    
    // console.log("token in the verifytoken ", token)
    if (!token) {
        return res.status(401).send("Unauthorized access!");
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send("Unauthorized access!");
            }
            req.user = decoded;

            // console.log("decoded ", decoded)
            next();
        });
    }
};