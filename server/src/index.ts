import cors from "cors";
import express, { Request } from "express";
import { User } from "./model/user";
import { connectDB } from "./utilities/connectDB";

const app = express();

app.use(
    cors({
        origin: [
            process.env.LOCAL_CLIENT as string,
            process.env.MAIN_CLIENT as string,
        ],
    })
);
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/user", async (req, res) => {
    const cursor = await User.find().then(() => {
        res.send(cursor);
    });
});

app.post("/user", async (req: Request, res) => {
    const userData = new User(req.body);
    await userData
        .save()
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.put("/user", async (req: Request, res) => {
    await User.updateOne(req.body)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => console.log(error));
});

app.delete("/user", async (req: Request, res) => {
    await User.deleteOne(req.body)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => console.log(error));
});

const port = 5000;

function runServer() {
    // Connect to DB
    connectDB();

    // Start the server on port
    app.listen(port, () => {
        console.log("Running on port ", port);
    });
}

runServer();
