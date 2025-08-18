const express = require("express")
require("dotenv").config()

const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express')
const cookie = require('cookie-parser')
const logger = require("./log/Winston")

const mongooDb = require("./Config/Db")
const logIn = require('./Routes/Login.route')
const forgertPassword = require('./Routes/forgetPassword.route')
const signUp = require("./Routes/Register.route")
const newAccestoken = require('./Routes/newAccesToken.route')
const logOut = require("./Routes/logout.route")

const roleValidate = require("./Middleware/Validation/validateRole")

const validateJwt = require('./Middleware/Auth/jwtValidate')
const errorMiddleware = require("./Middleware/Error/errorMiddleware")

const app = express()
app.use(express.json())
mongooDb()


const PORT = process.env.PORT
const swaggerDocument = YAML.load('./docs/apiDocs.yaml')

app.use(cookie())

app.get('/Test',validateJwt,roleValidate("member"),(req,res) => {
    res.send("Hello World")
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth/signup',signUp)
app.use('/auth',logIn)
app.use('/auth',newAccestoken)
app.use('/auth',logOut)
app.use('/auth/forgot-password',forgertPassword)

app.use(errorMiddleware)

app.listen(PORT,() => {
    logger.info("Connect authServer in Port:" + PORT)
})