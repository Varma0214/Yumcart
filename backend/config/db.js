import mongoose from "mongoose";

export const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://varmagollapalli:yumcart@cluster0.1pjtb.mongodb.net/Yumcart')
     .then(()=>console.log("DB Connected"));


}