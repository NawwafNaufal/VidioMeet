const getUsersController = require('../Controllers/Admin/getUsers.controller')
const express = require('express')
const routes = express.Router()

routes.get('/get-users',getUsersController)


module.exports = routes