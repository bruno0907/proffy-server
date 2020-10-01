"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
const PORT = process.env.PORT || 3333;
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/img', express_1.default.static(path_1.default.resolve(__dirname, '..', 'uploads')));
app.use(routes_1.default);
app.listen(PORT, () => {
    console.log(`Server listening ${PORT} port`);
});
