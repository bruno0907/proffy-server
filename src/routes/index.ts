import express from 'express'

import multer from 'multer'

import * as multerConfig from '../config/multer'

import UserController from '../controllers/UserController'
import AuthController from '../controllers/AuthController'

import ClassesController from '../controllers/ClassesController'
import ClassController from '../controllers/ClassController'

import ConnectionsController from '../controllers/ConnectionsController'

import AvatarController from '../controllers/AvatarController'

import PasswordRecoveryController from '../controllers/PasswordRecoveryController'

const routes = express.Router()
const upload = multer(multerConfig)

const userController = new UserController()
const authController = new AuthController()
const classesController = new ClassesController()
const classController = new ClassController()
const connectionsController = new ConnectionsController()
const avatarController = new AvatarController()
const passwordRecoveryController = new PasswordRecoveryController()

routes.get('/proffy', userController.index)
routes.post('/proffy/sign-up', userController.create)
routes.post('/proffy/sign-in', authController.login)

routes.patch('/proffy/profile/update-avatar', upload.single('file'), avatarController.update)
routes.put('/proffy/profile/update', userController.update)

routes.post('/proffy/password-recovery', passwordRecoveryController.index)
routes.patch('/proffy/password-reset', passwordRecoveryController.update)

routes.post('/proffy/classes/', classesController.create)
routes.get('/proffy/classes/', classesController.index)

routes.get('/classes', classesController.indexAll)

routes.get('/proffy/class/', classController.index)
routes.put('/proffy/class/', classController.update)
routes.delete('/proffy/class/remove-class', classController.delete)

routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)

export default routes