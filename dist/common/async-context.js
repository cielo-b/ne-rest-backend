"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTEXT_KEYS = exports.asyncContext = void 0;
const cls_hooked_1 = require("cls-hooked");
exports.asyncContext = (0, cls_hooked_1.createNamespace)('my-app-context');
exports.CONTEXT_KEYS = {
    USER_ID: 'userId',
};
