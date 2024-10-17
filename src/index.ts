import http from 'node:http';
import dotenv from 'dotenv';
dotenv.config();
import { userRoutes } from './routes/user.route';

const server = http.createServer((req, res) => {
  userRoutes(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});