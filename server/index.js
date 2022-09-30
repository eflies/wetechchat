import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import httpMod from "http";
import cors from "cors";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
import { config } from "platformsh-config";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as bcrypt from "bcrypt";
import fs from "fs"
import Message from "./models/messageModel.js";
import Notes from "./models/notesModel.js";
import SavedMessage from "./models/savedMessageModel.js";
import User from "./models/userModel.js";

dotenv.config();
const pshConfig = config();

const { PORT = 4000, MONGO_URL } = process.env;
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

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const MONGO_URI =
  MONGO_URL ?? pshConfig.formattedCredentials("database", "mongodb");
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

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
  res.send("success");
});
app.post("/register", async (req, res) => {
  let payload = req.body;
  payload.password = await bcrypt.hash(payload.password, 10);

  const user = await db.collections.users.findOne({
    username: req.body.username,
  });
  if (!!user) {
    res.send("error");
    return;
  }
  const newUser = new User(payload);

  newUser.save((err) => {
    if (err) {
      res.send("error");
      return;
    } else {
      res.send("success");
    }
  });
});

app.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.send("Fill in all imputs");
  }
  const user = await db.collections.users.findOne({
    username: req.body.username,
  });
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

app.get("/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    res.send({ user });
  } catch (error) {
    res.send("error");
  }
});

app.post("/updateUser/:username", async (req, res) => {
  try {
    const user = await db.collections.users.findOne({
      username: req.params.username,
    });
    const newPassword = (await bcrypt.compare(req.body.password, user.password))
      ? user.password
      : await bcrypt.hash(req.body.password, 10);
    const updatedUser = await db.collections.users.updateOne(
      { username: req.params.username },
      {
        $set: {
          ...req.body,
          password: newPassword,
        },
      }
    );
    console.log({ updatedUser });
    res.send("success");
  } catch (error) {
    res.send("error");
  }
});

app.post("/notes/:username", async (req, res) => {
  const userNotes = await db.collections.notes.findOne({
    username: req.params.username,
  });
  if (userNotes) {
    await db.collections.notes.updateOne(
      { username: req.params.username },
      {
        $set: {
          ...req.body,
          username: req.params.username,
        },
      }
    );
    res.send("success");
  } else {
    const newNotes = new Notes({ ...req.body, username: req.params.username });
    newNotes.save((err) => {
      if (err) {
        res.send("error");
        return;
      } else {
        res.send("success");
      }
    });
  }
});

app.get("/notes/:username", async (req, res) => {
  try {
    const notes = await Notes.findOne({ username: req.params.username });

    res.send({ notes });
  } catch (error) {
    res.send("error");
  }
});
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, "../build")));

if (fs.existsSync(join(__dirname, "../build"))) {
  app.get("/*", function (req, res) {
    res.sendFile(join(__dirname, "../build", "index.html"));
  });
}

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
