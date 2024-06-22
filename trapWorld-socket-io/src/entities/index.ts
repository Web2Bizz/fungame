import { Entity, Repository, Schema } from "redis-om";

type Room = Entity;

export const roomSchema = new Schema(
  "Room",
  {
    name: { type: "string" },
    ownerId: { type: "string" },
    players: { type: "string[]" },
    isRunning: { type: "boolean" },
  },
  {
    dataStructure: "HASH",
  }
);
