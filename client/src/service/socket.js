// Create a separate file from pages/components 
// to avoid multiple connection in React life-cycle

import { io } from "socket.io-client";
export const socket = io(); // Develop: export const socket = io.connect('https://shelpy.co:9000');
// Standard way:
// export const socket = io(SOCKET_URL);
