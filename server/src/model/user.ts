import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    type: String,
});

export const User = mongoose.model("User", userSchema);
