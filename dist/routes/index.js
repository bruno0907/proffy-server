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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const multerConfig = __importStar(require("../config/multer"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const ClassesController_1 = __importDefault(require("../controllers/ClassesController"));
const ClassController_1 = __importDefault(require("../controllers/ClassController"));
const ConnectionsController_1 = __importDefault(require("../controllers/ConnectionsController"));
const AvatarController_1 = __importDefault(require("../controllers/AvatarController"));
const PasswordRecoveryController_1 = __importDefault(require("../controllers/PasswordRecoveryController"));
const routes = express_1.default.Router();
const upload = multer_1.default(multerConfig);
const userController = new UserController_1.default();
const authController = new AuthController_1.default();
const classesController = new ClassesController_1.default();
const classController = new ClassController_1.default();
const connectionsController = new ConnectionsController_1.default();
const avatarController = new AvatarController_1.default();
const passwordRecoveryController = new PasswordRecoveryController_1.default();
routes.get('/proffy', userController.index);
routes.post('/proffy/sign-up', userController.create);
routes.post('/proffy/sign-in', authController.login);
routes.patch('/proffy/profile/:id/update-avatar', upload.single('file'), avatarController.update);
routes.put('/proffy/profile/:id/update', userController.update);
routes.post('/proffy/password-recovery', passwordRecoveryController.index);
routes.patch('/proffy/password-reset', passwordRecoveryController.update);
routes.post('/proffy/:id/classes/', classesController.create);
routes.get('/proffy/:id/classes/', classesController.index);
routes.get('/classes', classesController.indexAll);
routes.get('/proffy/:id/class/', classController.index);
routes.put('/proffy/:id/class/', classController.update);
routes.delete('/proffy/class/:id/remove-class', classController.delete);
routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);
exports.default = routes;
