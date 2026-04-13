import jwt from "jsonwebtoken"
import cookieOptions from "../utils/cookieOptions.js";


export const generateToken = async (req, res) => {
    try {
        const { email } = req.body;

        const token = jwt.sign(
            { email },
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: "7d" }
        )

        console.log("token", token)

        res
            .cookie("token", token, cookieOptions)
            .send({
                success: true,
                message: "Token created successfully",
                token: token
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// controllers/authController.js

export const logoutUser = async (req, res) => {
    try {

        res
        .clearCookie("token", cookieOptions)
        

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};