const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
require("dotenv").config();

const webrtc = require("./Routes/VidioBroker/room")

const app = express();
const server = http.createServer(app);

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
app.use(express.json());

const io = new Server(server, {
cors: { 
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true
    }
});

require("./Services/webRtc/signaling")(io);

app.use("/api", webrtc);

app.get("/", (req, res) => {
    res.redirect("/docs");
});

const errorMiddleware = require("./Middleware/Error/errorMiddleware")
app.use(errorMiddleware);

const PORT =   3002;
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Static files served at http://localhost:${PORT}/docs`);
});