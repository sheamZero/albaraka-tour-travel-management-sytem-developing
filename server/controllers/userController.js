import User from "../models/userModel.js";


const createUser = async (req, res) => {
    try {
        const { name, email, photoURL, role, createdAt } = req.body;

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const newUser = new User({
            name,
            email,
            photoURL,
            role,
            createdAt
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            data: savedUser,
            success: true
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default createUser;