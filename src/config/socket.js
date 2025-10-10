import { io } from "socket.io-client";
// export const socket = io("http://localhost:8201");
export const socket = io("wss://api.basementex.com/");
// export const socket = io("wss://instructor.teachera.co", {
// transports: ["websocket"],
// secure: true,
// });
