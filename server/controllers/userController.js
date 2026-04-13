import User from "../models/userModel.js";


export const createUser = async (req, res) => {
    try {
        const { name, email, photoURL, role, createdAt } = req.body;

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
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
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const googleLogin = async (req, res) => {
  try {
    const { name, email, photoURL } = req.body;

    let user = await User.findOne({ email });

    // If user exists → login
    if (user) {
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: user,
      });
    }

    // If user does not exist → create user
    user = await User.create({
      name,
      email,
      photoURL,
    });

    res.status(201).json({
      success: true,
      message: "User created and logged in",
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};