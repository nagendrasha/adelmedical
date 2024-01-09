import billingSchema from "@/app/shemas/billingSchema";
import mongoose from "mongoose";

const Billing =mongoose.models.Billing || new mongoose.model('Billing',billingSchema);


export default Billing;