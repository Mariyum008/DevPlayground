import mongoose from "mongoose";
export const dbConnect =  async()=>{
    try{await mongoose.connect(process.env.MONGO_URL!,{
        dbName:"stack-editor",
    });
    console.log("Connection establisment");
    }catch(error){
        console.log("error connecting to database");
    }
}