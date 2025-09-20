const express = require("express")
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
require("dotenv").config()

const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express')
const cookie = require('cookie-parser')
const logger = require("./log/Winston");

const mongooDb = require("./Config/Db")
const logIn = require('./Routes/loginUser')
const forgertPassword = require('./Routes/forgetPassword')
const signUp = require("./Routes/register")
const newAccestoken = require('./Routes/newAccesToken')
const logOut = require('./Routes/logout')
const updateRole = require("./Routes/Admin/updateRole")

const getUser = require("./Routes/Admin/getUsers")
const notifications = require("./Routes/Notifications/createNotifications")
const userNotifications = require("./Routes/Notifications/userNotifications")
const readNotifications = require("./Routes/Notifications/readNotidications")
const uploadFile = require("./Routes/File/upload")

const premiumPlan = require("./Routes/Subscription/premiumPlan")
const promo = require("./Routes/Subscription/promo")

const roleValidate = require("./Middleware/Validation/validateRole")

const validateJwt = require('./Middleware/Auth/jwtValidate')
const errorMiddleware = require("./Middleware/Error/errorMiddleware")
const upload = require("./Middleware/File/multer")

const transactions = require("./Routes/Transaction/userTransactions")

const webrtc = require("./Routes/VidioBroker/room")

const app = express()
app.use(express.json())

const server = http.createServer(app)

mongooDb()
app.use(cookie())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
    next();
    }
});

app.use('/docs', express.static(path.join(__dirname, 'docs')));

const io = new Server(server, {
cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true
    }
});

require("./Services/webRtc/signaling")(io);

const PORT = process.env.PORT
const swaggerDocument = YAML.load('./docs/apiDocs.yaml')

app.get('/Test', validateJwt, roleValidate("member"), (req, res) => {
    res.send("Hello World")
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth/signup', signUp)
app.use('/auth', logIn)
app.use('/auth', newAccestoken)
app.use('/auth', logOut)
app.use('/auth/forgot-password', forgertPassword)

app.use('/admin', updateRole)
app.use('/admin', getUser)
app.use('/admin', notifications)
app.use('/admin', premiumPlan)
app.use('/admin', promo)

app.use("/api", webrtc);

app.use('/', userNotifications)
app.use('/', readNotifications)

app.use('/', transactions)

app.use('/', upload.single("data"), uploadFile)

app.use((req, res, next) => {
    res.status(404).json({
    message: "Endpoint not found"
    })
})

app.use(errorMiddleware)

server.listen(PORT, () => {
    logger.info("Connect authServer in Port:" + PORT)
    logger.info("🎥 Video chat Socket.IO enabled")
    logger.info(`📁 Video chat UI: http://localhost:${PORT}/docs`)
})