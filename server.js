require("dotenv").config()
const express = require("express");
const path = require("path")
const app = express();
const mysql = require("mysql");
const db = require("./models")

const PORT = process.env.PORT || 8080;


// const cors = require("cors")
// app.use(cors());

// Serve static assets
app.use(express.static("client/build"));


if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: process.env.HOST_KEY,
        user: process.env.USER_KEY,
        password: process.env.MYSQL_KEY,
        database: process.env.DATA_BASE_KEY
    })
}

// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  app.post()
const routes = require("./routes");
app.use(routes);

// Catch all Last to Load
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/client/build/index.html")))

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});