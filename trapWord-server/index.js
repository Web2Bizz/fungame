import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import roomRoutes from "./routes/roomRoutes.js";
import socketService from "./services/socketService.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

//Cors
console.log(process.env.CLIENT_URL);

app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/rooms", roomRoutes);

// Socket.IO
socketService.init(server);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
