import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js";
import path from "path";

import productRoutes from './routes/productroute.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();

app.use(express.json());

app.use('/api/products', productRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}
app.get("/api", (req, res) => {
    res.send("API is running");
});

app.listen(PORT, () => {
    connectDB();
    console.log("Server started on http://localhost:" + PORT);
});
