import { IModule } from "modules";
import { createClient } from "redis";
import { EntityId, Repository } from "redis-om";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { roomSchema } from "./../../entities";

const socketIoModule: IModule = {
  attachHttp: (http): void => {
    let io: Server;

    io = new Server(http, {
      connectionStateRecovery: {},
      cors: {
        origin: "*",
      },
    });

    if (io === undefined) throw new Error("Socket.IO not initialized");

    console.log("Socket.IO initialized");

    io.on("connection", (socket) => {
      console.log("Socket.IO connected");

      socket.on(
        "room-create",
        async (params: { roomName: string; userId: string }) => {
          const client = createClient({
            url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
          });

          await client.connect();

          const roomRepo = new Repository(roomSchema, client);

          const newRoom = await roomRepo.save({
            name: params.roomName,
            ownerId: params.userId,
            players: [params.userId],
            isRunning: false,
          });

          console.log(`Created room  with roomId: ${newRoom[EntityId]}`);

          await client.disconnect();

          socket.emit("room-created", {
            isRunning: newRoom.isRunning,
            roomName: params.roomName,
            roomId: newRoom[EntityId],
          });
        }
      );

      socket.on(
        "room-join",
        async (params: { roomId: string; userId: string }) => {
          if (params.roomId === undefined || params.roomId === "") {
            socket.emit("room-error", {
              message: "Не указан ID комнаты",
            });
            return;
          }

          const client = createClient({
            url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
          });

          console.log(
            `Join in room: ${params.roomId}, userId: ${params.userId}`
          );

          await client.connect();

          const roomRepo = new Repository(roomSchema, client);

          const currentRoom = await roomRepo.fetch(params.roomId);

          if (
            (currentRoom.players as Array<string>).indexOf(params.userId) !== -1
          ) {
            socket.emit("room-error", {
              message: "Вы уже присоединились к этой комнате",
            });
            return;
          }

          (currentRoom.players as Array<string>).push(params.userId);

          await roomRepo.save(currentRoom);
          await client.disconnect();

          socket.join(params.roomId);
          socket.emit("user-joined", {
            roomId: params.roomId,
            roomName: currentRoom.name,
            userId: params.userId,
            joinedUserId: params.userId,
          });
        }
      );

      socket.on("room-left", (params: { roomId: string; userId: string }) => {
        socket.leave(params.roomId);
        socket.emit("user-left", { leftUserId: params.userId });
      });

      socket.on("disconnect", () => {
        console.log("Socket.IO disconnected");
      });
    });
  },
};

export default socketIoModule;
