import categorySchema from "@/app/shemas/categorySchema";
import mongoose from "mongoose";


const Categorie= mongoose.models.Categorie || new mongoose.model('Categorie',categorySchema);

export default Categorie;