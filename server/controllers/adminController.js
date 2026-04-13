import User from "../models/userModel.js";

export const getAdminStatus = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }

        const isAdmin = user.role === "admin";

        return res.status(200).json({
            success: true,
            isAdmin
        })

        console.log("email - > ", isAdmin);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,

        });
    }
}