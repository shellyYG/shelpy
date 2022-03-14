// Create a separate file from pages/components 
// to avoid multiple connection in React life-cycle
import { io } from 'socket.io-client';

const isDeveloping = 1; // TODO before push to ec2
const connectUrl = isDeveloping ? 'http://localhost:9000' : 'https://shelpy.co';

export const socket = io.connect(connectUrl);

