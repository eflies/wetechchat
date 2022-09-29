import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import httpMod from "http";
import cors from "cors";
import { Server } from "socket.io";
import User from "./models/userModel.js";
import * as dotenv from "dotenv";
import SavedMessage from "./models/savedMessageModel.js";
import Message from "./models/messageModel.js";
import { config } from "platformsh-config";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as bcrypt from "bcrypt"
import { initDB } from "./init.js"

dotenv.config();
const pshConfig = config();

const { PORT = 4000 } = process.env;
const app = express();

const http = httpMod.createServer(app);

const options = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  origin: "*",
};
app.use(morgan("combined"));
app.use(cors(options));
app.use(bodyParser.json());
app.options("*", cors(options));
app.use(express.json());

const db = initDB(pshConfig)

const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
let users = [];

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    //add user to db

    users.push(data);
    //Sends the list of users to the client
    io.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);

    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.post("/saveMessage", async (req, res) => {
  if (db) {
    await db.collections.savedmessages.findOneAndUpdate(
        {
          saver: req.body.saver,
        },
        {
          $push: {
            messages: {
              text: req.body.text,
              messageAuthor: req.body.messageAuthor,
            },
          },
        },
        { upsert: true }
    );
  }

  res.send("success");
});

app.post("/register", async (req, res) => {
  console.log({ req });
  let payload = req.body
  payload.password = await bcrypt.hash(payload.password, 10)

  if (db) {
    const newUser = new User(payload);
    newUser.save((err) => {
      console.log({ err });
      if (err) {
        res.send("error");
        return;
      } else {
        res.send("success");
      }
    });
  } else {
    res.send("success");
  }
});

app.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.send("Fill in all imputs");
  }

  let user
  if (db) {
    user = await db.collections.users.findOne({
      username: req.body.username,
    });
  }

  if (!user) {
    return res.send("User doesn't exist");
  }
  const result = await bcrypt.compare(req.body.password, user.password);
  if (!result) {
    return res.send("Password doesn't match ");
  }
  return res.send("success");
});

app.get("/savedMessages/:username", async (req, res) => {
  const savedMessages = await SavedMessage.findOne({
    saver: req.params.username,
  });
  const msgAuthors = (savedMessages?.messages || []).map(
    (savedMsg) => savedMsg.messageAuthor
  );
  const authorsData = await User.find({ username: msgAuthors });

  res.send({ savedMessages, authorsData });
});

app.post("/message", async (req, res) => {
  const newMessage = new Message(req.body);
  newMessage.save((err) => {
    if (err) {
      res.send("error");
      return;
    } else {
      res.send("success");
    }
  });
});

app.get("/messages", async (req, res) => {
  const messages = await Message.find();
  res.send({ messages });
});
app.get("/users/:username", async (req, res) => {
  const allUsers = await User.find();
  const allUsersNumber = allUsers?.length ?? 0;
  const currentUserNumber = allUsers
    ? allUsers.findIndex((user) => user.username === req.params.username) + 1
    : 0;
  res.send({ allUsersNumber, currentUserNumber });
});
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, "../build")));

app.get("/*", function (req, res) {
  res.sendFile(join(__dirname, "../build", "index.html"));
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
