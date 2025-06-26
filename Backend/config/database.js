import mongoose from "mongoose";

const configDatabase=()=>{
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => console.error("MongoDB Error:", err));

}

export default configDatabase;