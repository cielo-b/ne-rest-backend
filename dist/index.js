"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./config/data-source");
const async_context_1 = require("./common/async-context");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    async_context_1.asyncContext.run(() => {
        const user = req.user;
        if (user) {
            async_context_1.asyncContext.set(async_context_1.CONTEXT_KEYS.USER_ID, user.id);
        }
        next();
    });
});
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected.");
    app.listen(3000, () => console.log("Server running on http://127.0.0.1:3000"));
})
    .catch((e) => console.log(e));
