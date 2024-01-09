import cartSchema from "@/app/shemas/cartSchema";
import mongoose from "mongoose";

const Cart = mongoose.models.Cart || new mongoose.model('Cart',cartSchema);

export default Cart;

