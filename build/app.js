"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
server_1.default.get('/ping', (_req, res, next) => {
    console.log('someone pinged here');
    res.send('pong');
});
const PORT = 3001;
server_1.default.listen(PORT, () => {
    console.log("The express server is listening to port", PORT);
});
