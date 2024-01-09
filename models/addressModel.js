import addressSchema from "@/app/shemas/adressSchema";
import mongoose from "mongoose";


const Address =mongoose.models.Address || new mongoose.model('Address',addressSchema);

export default Address;