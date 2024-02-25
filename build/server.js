"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
//middleware
server.use(express_1.default.json());
server.use((0, cors_1.default)());
exports.default = server;
