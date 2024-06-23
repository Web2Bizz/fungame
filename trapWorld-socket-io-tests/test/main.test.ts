import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { io, Socket } from "socket.io-client";

const { VITE_SOCKET_IO_SERVER_URL } = process.env;

if (VITE_SOCKET_IO_SERVER_URL === undefined) throw new Error();

describe("Socket.IO Server", () => {
  let socket: Socket;

  beforeEach(async () => {
    socket = io(VITE_SOCKET_IO_SERVER_URL, {
      transports: ["websocket"],
      reconnection: false,
    });

    await new Promise<void>((resolve) => {
      socket.on("connect", () => {
        resolve();
      });
    });
  });

  afterEach(async () => {
    if (socket.connected) {
      socket.disconnect();
    }
  });

  it("should connect to the server", () => {
    expect(socket.connected).toBe(true);
  });
});