const express = require("express")
require("dotenv").config()

const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express')
const cookie = require('cookie-parser')
const logger = require("./log/Winston")

const mongooDb = require("./Config/Db")
const logIn = require('./Routes/loginUser')
const forgertPassword = require('./Routes/forgetPassword')
const signUp = require("./Routes/register")
const newAccestoken = require('./Routes/newAccesToken')
const logOut = require("./Routes/logout")
const updateRole = require("./Routes/Admin/updateRole")

const getUser = require("./Routes/Admin/getUsers")
const notifications = require("./Routes/Notifications/createNotifications")
const userNotifications = require("./Routes/Notifications/userNotifications")
const readNotifications = require("./Routes/Notifications/readNotidications")
const uploadFile = require("./Routes/File/upload")

const roleValidate = require("./Middleware/Validation/validateRole")

const validateJwt = require('./Middleware/Auth/jwtValidate')
const errorMiddleware = require("./Middleware/Error/errorMiddleware")
const upload = require("./Middleware/File/multer")

const app = express()
app.use(express.json())
mongooDb()
app.use(cookie())


const PORT = process.env.PORT
const swaggerDocument = YAML.load('./docs/apiDocs.yaml')


app.get('/Test',validateJwt,roleValidate("member"),(req,res) => {
    res.send("Hello World")
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth/signup',signUp)
app.use('/auth',logIn)
app.use('/auth',newAccestoken)
app.use('/auth',logOut)
app.use('/auth/forgot-password',forgertPassword)

app.use('/admin',updateRole)
app.use('/admin',getUser)
app.use('/admin',notifications)
app.use('/',userNotifications)
app.use('/',readNotifications)

app.use('/',upload.single("data"),uploadFile)

app.use((req,res,next) => {
    res.status(404).json({
        message : "Endpoint not found"
    })
})

app.use(errorMiddleware)

app.listen(PORT,() => {
    logger.info("Connect authServer in Port:" + PORT)
})