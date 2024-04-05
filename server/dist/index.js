"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express = require('express');
const socket_io_1 = require("socket.io");
const UserManager_1 = require("./managers/UserManager");
const app = express();
const server = http_1.default.createServer(http_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "https://oemgle-clone.vercel.app"
    }
});

app.get("/", (req, res) => {
    res.send("Server is running");
});

const userManager = new UserManager_1.UserManager();
io.on('connection', (socket) => {
    console.log('a user connected');
    userManager.addUser("randomName", socket);
    socket.on("disconnect", () => {
        console.log("user disconnected");
        userManager.removeUser(socket.id);
    });
});
const PORT = process.env.PORT || 5000; // Use the provided port or default to 5000
server.listen(PORT, () => {
    console.log(`listening on port :  ${PORT}`);
});
