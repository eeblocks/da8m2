import express from "express";
import cors from 'cors';
import { SERVER_PORT } from "./config.js";

import indexRoutes from './routes/index.routes.js';
import pasteRoutes from './routes/paste.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

app.use(indexRoutes);
app.use(pasteRoutes);

app.listen(SERVER_PORT, () => {
    console.log(`Server running on PORT ${SERVER_PORT}`);
});