"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const crypto = __importStar(require("crypto"));
const bcrypt = __importStar(require("bcryptjs"));
const mailer_1 = __importDefault(require("../modules/mailer"));
class PasswordRecoveryService {
    async execute(userEmail) {
        const newPassword = crypto.randomBytes(4).toString('hex');
        const password = await bcrypt.hash(newPassword, 8);
        const data = await connection_1.default('users')
            .where({ email: userEmail })
            .update({ password }, [
            'name',
            'email'
        ]);
        if (!data) {
            throw new Error('User not found!');
        }
        const { name, email } = data[0];
        mailer_1.default(name, email, newPassword);
        return {
            name,
            email,
            newPassword
        };
    }
}
exports.default = PasswordRecoveryService;
