import mongoose from "mongoose";
const { Schema } = mongoose;

const houseSchema = new Schema({
    owner: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    room_size: { type: Number, required: true },
    picture: { type: String, required: true },
    availibility_date: { type: String, required: true },
    rent: { type: Number, required: true },
    phone_number: { type: String, required: true },
    desc: { type: String, required: true },
});

export const House = mongoose.model("House", houseSchema);
