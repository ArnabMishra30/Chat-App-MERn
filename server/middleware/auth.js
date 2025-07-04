import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

//middlewares to protect the routes..........
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.json({
                success: false,
                message: "User not Found.."
            })
        }

        //if userdata is avilable than pass it to controller function
        req.user = user;
        next();

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}