import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
        // required: true,
      default: 0,
    },
    question:{
      type: String,
      required: true,
    }
    // address: {
    //   type: String,
    //   required: true,
    // },
  },
  { timeStamp: true }
);
export default mongoose.model("User", userSchema);
