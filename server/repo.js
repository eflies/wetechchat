import mongoose from "mongoose";
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import {config} from "platformsh-config";
import User from "./models/userModel.js";
import Notes from "./models/notesModel.js";
import SavedMessage from "./models/savedMessageModel.js";
import Message from "./models/messageModel.js";

class Repo {
    constructor() {
        const pshConfig = config();

        if (process.env.MONGO_URL || pshConfig.hasRelationship("database")) {
            let url = process.env.MONGO_URL ?? pshConfig.formattedCredentials("database", "mongodb");
            this.db = mongoose.connection;
            this.db.on("error", console.error.bind(console, "MongoDB connection error:"));

            mongoose
                .connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
                .then(() => {
                    console.log("DB Connetion Successfull");
                    this.mode = 'REMOTE_DB'
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
            this.mode = 'LOCAL_DB'
            const __dirname = dirname(fileURLToPath(import.meta.url));

            const file = join(__dirname, 'db1.json')
            const adapter = new JSONFile(file)
            this.db = new Low(adapter)

            this.initLocal()
                .then(() => {
                    this.db.data = this.db.data || {
                        users: {},
                        messages: [],
                        savedmessages: {},
                        notes: {}
                    }
                })
                .catch(err => console.log(err))
        }
    }

    async initLocal() {
        await this.db.read()
    }

    async findUser(username) {
        if (this.mode === 'REMOTE_DB') {
            return await this.db.collections.users.findOne({
                username: username,
            });
        }

        if (this.mode === 'LOCAL_DB') {
            console.log(this.db.data.users)
            return this.db.data.users[username]
        }
    }

    async usersAll() {
        if (this.mode === 'REMOTE_DB') {
            return await this.db.collections.users.find();
        }

        if (this.mode === 'LOCAL_DB') {
            let users = []

            for (const [key, value] of Object.entries(this.db.data.users)) {
                users.push(value)
            }

            return users
        }
    }

    async newUser(payload) {
        if (this.mode === 'REMOTE_DB') {
            const newUser = new User(payload);
            newUser.save((err) => {
                if (err) {
                    throw new Error(err)
                }
            });
        }

        if (this.mode === 'LOCAL_DB') {
            this.db.data.users[payload.username] = payload
            await this.db.write()
        }
    }

    async updateUser(username, newPassword, payload) {
        if (this.mode === 'REMOTE_DB') {
            return await this.db.collections.users.updateOne(
                {username: username},
                {
                    $set: {
                        ...payload,
                        password: newPassword,
                    },
                }
            );
        }

        if (this.mode === 'LOCAL_DB') {
            this.db.data.users[payload.username] = payload
            await this.db.write()
        }
    }

    async insertSavedMessage(payload) {
        if (this.mode === 'REMOTE_DB') {
            await this.db.collections.savedmessages.findOneAndUpdate(
                {
                    saver: payload.saver,
                },
                {
                    $push: {
                        messages: {
                            text: payload.text,
                            messageAuthor: payload.messageAuthor,
                        },
                    },
                },
                {upsert: true}
            );
        }

        if (this.mode === 'LOCAL_DB') {
            if (!this.db.data.savedmessages.hasOwnProperty(payload.saver)) {
                this.db.data.savedmessages[payload.saver].messages = []
            }
            this.db.data.savedmessages[payload.saver].messages.push(payload)
            await this.db.write()
        }
    }

    async insertMessage(payload) {
        if (this.mode === 'REMOTE_DB') {
            const newMessage = new Message(req.body);
            newMessage.save((err) => {
                if (err) {
                    throw new Error(err)
                }
            })
        }

        if (this.mode === 'LOCAL_DB') {
            this.db.data.messages.push(payload)
            await this.db.write()
        }
    }

    async getMessages() {
        if (this.mode === 'REMOTE_DB') {
            return await Message.find();
        }

        if (this.mode === 'LOCAL_DB') {
            return this.db.data.messages
        }
    }
}

export default Repo