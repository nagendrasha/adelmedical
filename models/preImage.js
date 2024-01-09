import imageSchema from "@/app/shemas/imageSchema";
import mongoose from "mongoose";

const ImgData = mongoose.models.ImgData || mongoose.model('ImgData',imageSchema);

export default ImgData;