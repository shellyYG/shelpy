// Create a separate file from pages/components 
// to avoid multiple connection in React life-cycle

import io from "socket.io-client";
export const socket = io.connect('http://localhost:9000'); // connect to API
// Standard way:
// export const socket = io(SOCKET_URL);
