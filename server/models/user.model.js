import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      maxLength: [50, "First name must be less than 50 characters"],
      minLength: [2, "First name must be greater than 2 characters"],
      lowercase: true,
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
      maxLength: [50, "Last name must be less than 50 characters"],
      minLength: [2, "Last name must be greater than 2 characters"],
      lowercase: true,
    },
    userName: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
      maxLength: [20, "User name must be less than 20 characters"],
      minLength: [2, "user name must be greater than 2 characters"],
      unique: [true, "This user name is already registered"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: [true, "This email is already registered"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      select: false,
    },
    avatar: {
      secure_url: {
        type: String,
      },
      public_url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    postedBlog: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    likedBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    commentedBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

//methods & functions for jwt token & password hashing
userSchema.methods = {
  generateJwtToken: async function () {
    return await jwt.sign(
      {
        id: this._id,
        email: this.email,
        userName: this.userName,
        role: this.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },

  comparePassword: async function (stringPassword) {
    return await bcrypt.compare(stringPassword, this.password);
  },
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);
export default User;
