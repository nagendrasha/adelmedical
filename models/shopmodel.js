import shopSchema from "@/app/shemas/shopschema";
import mongoose from "mongoose";

const Shop = mongoose.models.Shop || new mongoose.model('Shop',shopSchema);

export default Shop;