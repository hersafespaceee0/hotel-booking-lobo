const express = require("express");
const path = require("path");
const mysql = require("mysql");

const dbcConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hotel-lobo",
});

const app = express();

// middleware
app.use(express.static(path.join(__dirname, "public"))); // path -- nested routs /booking/user/id
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded - form data

// routes

app.get("/", (req, res) => {
  dbcConnection.query("SELECT * FROM rooms", (roomsSelectError, rooms) => {
    if (roomsSelectError) {
      res.status(500).send("server error:500");
    } else {
      dbcConnection.query("SELECT * FROM spots", (spotsSelectError, spots) => {
        if (spotsSelectError) {
          res.status(500).send("server error:500");
        } else {
          res.render("index.ejs", { rooms, spots });
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
