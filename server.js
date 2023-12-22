const express = require("express");
const path = require("path");
const { PORT } = require("./config/envConfig");
const { db } = require("./models");
const { router } = require("./routes");

const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.resolve(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use("/", router);

app.listen(PORT, async () => {
    try {
        console.log(`Listening on port ${PORT}`);

        await db.authenticate();
        console.log("Database authenticated successfully");

        await db.sync();
        console.log("Database synchronized successfully");
    } catch (err) {
        console.error("Error initializing the database", err);
    }
});