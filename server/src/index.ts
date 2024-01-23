import cors from "cors";
import express, { Request } from "express";
import morgan from "morgan";
import { User } from "./model/user";
import { connectDB } from "./utilities/connectDB";

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", process.env.MAIN_CLIENT as string],
    })
);
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/user", morgan("dev"), async (req, res) => {
    await User.find(req.query).then((response) => {
        res.send(response);
    });
});

app.post("/user", morgan("dev"), async (req: Request, res) => {
    const userData = new User(req.body);
    await userData
        .save()
        .then((response) => {
            console.log(response);
            res.send(response);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.patch("/user", morgan("dev"), async (req: Request, res) => {
    await User.updateOne(req.body)
        .then((response) => {
            console.log(response);
            res.send(response);
        })
        .catch((error) => console.log(error));
});

app.delete("/user", morgan("dev"), async (req: Request, res) => {
    await User.deleteOne(req.body)
        .then((response) => {
            console.log(response);
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
