import userSchema from "@/app/shemas/userSchema";
import mongoose from "mongoose";

const User = mongoose.models.User || new mongoose.model('User',userSchema);


export default User;
