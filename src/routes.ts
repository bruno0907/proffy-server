import express from 'express'

import UserController from './controllers/UserController'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'


const routes = express.Router()

const userController = new UserController()
const classesController = new ClassesController()
const connectionsController = new ConnectionsController()

routes.post('/proffy/register', userController.create)
routes.put('/proffy/profile/:id/update', userController.update)
routes.post('/proffy/classes', classesController.create)
routes.get('/classes', classesController.index)

routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)

export default routes