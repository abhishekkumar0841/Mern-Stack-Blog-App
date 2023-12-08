import User from "../models/user.model.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

// ******SIGNUP CONTROLLER*******
const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, userName, password, email, role } = req.body;

    if (!firstName) {
      return res.status(400).json({
        success: false,
        message: "First name is required",
      });
    }

    if (!lastName) {
      return res.status(400).json({
        success: false,
        message: "Last name is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (!userName) {
      return res.status(400).json({
        success: false,
        message: "User name is required",
      });
    }

    //check if user name or email is already exists
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: "This email is already registered",
      });
    }

    const checkUserName = await User.findOne({ userName });
    if (checkUserName) {
      return res.status(400).json({
        success: false,
        message: "This user name is already registered",
      });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      userName,
      password,
      role,
      avatar: {
        public_id: email,
        secure_url: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User registration failed!",
      });
    }

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "BLOG_APP",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        //after getting result modify the user.avatar.public_id to result.public_id
        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          //removing file from server after uploaded on cloudinary
          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: error,
        });
      }
    }

    await user.save();
    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: `Congrats ${firstName}, you are successfully registered with us`,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while sign up",
    });
  }
};

// ******LOGIN CONTROLLER*******
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "This email is not registered with us",
      });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong password",
      });
    }

    const token = await user.generateJwtToken();
    user.password = undefined;

    const cookieOptions = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None',
    };
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Logged in success",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    // console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile get success",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const logout = async (req, res, next)=>{
    res.cookie('token', null, {
        httpOnly: true,
        maxAge: 0,
        secure: true,
        sameSite: 'None',
    })

    return res.status(200).json({
        success: true,
        message: "User logged out success",
      });

}

export { signup, login, getProfile, logout };
