const express = require('express')
const routes = express.Router()
const getUsersController = require('../Controllers/Admin/getUsers.controller')

routes.get('/get-users',getUsersController)


module.exports = routes