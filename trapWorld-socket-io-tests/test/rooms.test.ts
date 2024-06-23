import { io, Socket } from "socket.io-client";
import { describe, beforeEach, afterEach, it, expect } from "vitest";

const { VITE_SOCKET_IO_SERVER_URL } = process.env;

if (VITE_SOCKET_IO_SERVER_URL === undefined) throw new Error();

interface IData {
  roomName: string;
  roomId: string;
}

interface ISocketTestContext {
  data: IData;
}

describe("Socket.IO Creating room", () => {
  let socket: Socket;

  beforeEach<ISocketTestContext>(async (context) => {
    socket = io(VITE_SOCKET_IO_SERVER_URL, {
      transports: ["websocket"],
      reconnection: false,
    });

    await new Promise<void>((resolve) => {
      socket.emit("room-create", { roomName: "test-room-0", userId: "0" });

      socket.on("room-created", (data) => {
        context.data = data;
        console.log(data.roomId);
        resolve();
      });
    });
  });

  afterEach(async () => {
    if (socket.connected) {
      socket.disconnect();
    }
  });

  it<ISocketTestContext>("should create new room", ({ data }) => {
    expect(socket.connected).toBe(true);
    expect(data.roomId).toBeDefined();
    expect(data.roomName).toBe("test-room-0");
  });
});

interface IJoinedData extends IData {
  joinedUserId: string;
}

interface IJoinedUser {
  data: IJoinedData;
}

describe("Socket.IO room join", () => {
  let socket: Socket;

  beforeEach<IJoinedUser>(async (context) => {
    socket = io(VITE_SOCKET_IO_SERVER_URL, {
      transports: ["websocket"],
      reconnection: false,
    });

    await new Promise<void>((resolve) => {
      socket.emit("room-create", { roomName: "test-room-22", userId: "0" });

      socket.on("room-created", (data) => {
        context.data = data;
        socket.emit("room-join", { roomId: data.roomId, userId: "1" });
      });

      socket.on("user-joined", (data) => {
        context.data = data;
        resolve();
      });
    });
  });

  afterEach<IJoinedUser>(async () => {
    if (socket.connected) {
      socket.disconnect();
    }
  });

  it<IJoinedUser>("should create new room", ({ data }) => {
    expect(socket.connected).toBe(true);
    expect(data.roomId).toBeDefined();
    expect(data.roomName).toBe("test-room-22");
    expect(data.joinedUserId).toBe("1");
  });
});
