import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js";
import bodyParser from "body-parser";
import {app,server} from "./lib/socket.js"
dotenv.config();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", function(req, res) {
    res.send("Hello World")
});

server.listen(PORT, () => {
    console.log(`Server running on port number ${PORT}`);
    connectDB();
});