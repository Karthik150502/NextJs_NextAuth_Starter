"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// * Middlewares
exports.app.use((0, cors_1.default)({
    origin: "*",
}));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use("/api/v1/auth", auth_1.default);
exports.app.get("/", (req, res) => {
    res.send("It's working 🙌");
});
exports.app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
