const mongoose = require('mongoose');

const connectDB = async (req,res)=>{
 try {
  await mongoose.connect("mongodb+srv://arindamsharma0123:softcar30@cluster0.mi81t.mongodb.net/").then(()=>{
    console.log("DB connected successfully")
  })
 } catch (error) {
  res.status(400).json({
    message:"Not Connected"
  })
 }
}
connectDB()