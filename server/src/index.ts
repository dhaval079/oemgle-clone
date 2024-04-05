import { Socket } from "socket.io";
import http from "http";

const express = require('express');
import { Server } from 'socket.io';
import { UserManager } from "./managers/UserManager";

const app = express();
const server = http.createServer(http);

const io = new Server(server, {
  cors: {
    origin: "https://oemgle-clone.vercel.app"
  }
});

const userManager = new UserManager();

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  userManager.addUser("randomName", socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    userManager.removeUser(socket.id);
  })
});

const PORT = process.env.PORT || 5000; // Use the provided port or default to 5000

server.listen(PORT, () => {
    console.log(`listening on port :  ${PORT}`);
});
