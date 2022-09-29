import mongoose from "mongoose";

export function initDB(pshConfig) {
    if (process.env.MONGO_URL || pshConfig.hasRelationship("database")) {
        console.log("db defined")
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "MongoDB connection error:"));

        mongoose
            .connect(MONGO_URL ?? pshConfig.formattedCredentials("database", "mongodb"), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log("DB Connetion Successfull");
            })
            .catch((err) => {
                console.log(err.message);
            });
    } else {
        console.log("db undefined")
        return null
    }
}