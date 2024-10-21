"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_route_1 = require("./routes/user.route");
const server = node_http_1.default.createServer((req, res) => {
    (0, user_route_1.userRoutes)(req, res);
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
