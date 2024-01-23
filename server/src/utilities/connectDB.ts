import mongoose from "mongoose";

const uri =
    "mongodb+srv://admin:adminpassword@cluster0.nmxrrle.mongodb.net/SCPC-job-task-house-hunter?retryWrites=true&w=majority";

export async function connectDB() {
    try {
        await mongoose.connect(uri).then((response) => {
            console.log("Connected to DB");
        });
    } catch {
        console.log("Error connecting to MongoDB");
        console.dir;
    }
}
