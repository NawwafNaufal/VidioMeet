const express = require("express")
require("dotenv").config()
const mongooDb = require("./Config/Db")
const signUp = require("./Routes/Register.route")
const logIn = require('./Routes/Login.route')
const getUsers = require('./Routes/getUsers.route')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const forgertPassword = require('./Routes/forgetPassword.route')
const cookie = require('cookie-parser')
const logger = require("./log/Winston")
const newAccestoken = require('./Routes/newAccesToken.route')
const validateJwt = require('./Middleware/Auth/jwtValidate')
const errorMiddleware = require("./Middleware/Error/errorMiddleware")

const app = express()
app.use(express.json())
mongooDb()


const PORT = process.env.PORT
const swaggerDocument = YAML.load('./docs/apiDocs.yaml')

app.use(cookie())

app.get('/Test',validateJwt,(req,res) => {
    res.send("Hello World")
})


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth/signup',signUp)
app.use('/auth',logIn)
app.use('/auth',newAccestoken)
app.use('/auth/forgot-password',forgertPassword)
app.use('/admin',getUsers)

app.use(errorMiddleware)

app.listen(PORT,() => {
    logger.info("Connect authServer in Port:" + PORT)
})