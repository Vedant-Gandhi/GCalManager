const express = require("express");
const server = express();
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const ignoredURL = ["/generateToken"];
server.use(express.json());
server.use(cors());

server.use((req, res, next) => {
  const path = req.path;
  var flag = false;
  ignoredURL.forEach((val) => {
    if (val.match(path)) {
      flag = true;
    }
  });
  if (flag) {
    next();
  } else {
    req.token = "";
    const token = req.headers.token;
    if (token && typeof token === "string") {
      jwt.verify(token, process.env.KEY, (err, sucess) => {
        if (err) {
          res.send(403);
        } else {
          req.token = sucess;
          next();
        }
      });
    }
  }
});

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const port = process.env.PORT || 3001;
/**
 * @type {google.calendar}
 */
var calendar = null;
var oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

server.post("/generateToken", (req, res) => {
  const code = req.body.code;
  oAuth2Client.getToken(code, (err, token) => {
    if (err) {
      res.sendStatus(400);
    } else {
      oAuth2Client.setCredentials(token);
      calendar = google.calendar({ version: "v3", auth: oAuth2Client });
      const key = jwt.sign(token, process.env.KEY);
      if (key === "") {
        res.send(400);
      } else {
        res.send({ token: key });
      }
    }
  });
});

server.get("/getEvents", (req, res) => {
  console.log("In get events");
  if (calendar) {
    calendar.events.list(
      {
        calendarId: "primary",
      },
      (err, result) => {
        if (err) {
          res.status(500).send();
        } else {
          var events = result.data.items;
          var datatoSend = [];
          console.log(events.length);
          events.forEach((value) => {
            var temp = {};
            temp["id"] = value["id"];
            temp["url"] = value["htmlLink"];
            temp["start"] = value["start"];
            temp["end"] = value["end"];
            temp["created"] = value["created"];
            temp["name"] = value["summary"] || "";
            const recurrence = value["recurrence"];
            if (recurrence) {
              temp["isRecurrent"] = { value: true, frequency: recurrence[0] };
            } else {
              temp["isRecurrent"] = { value: false };
            }
            datatoSend.push(temp);
          });
          res.send({ data: datatoSend });
        }
      }
    );
  } else {
    res.sendStatus(400);
  }
});
server.get("/", (req, res) => {
  res.status(403).send({ error: "Not supourted" });
});
server.post("/", (req, res) => {
  res.status(403).send({ error: "Not supourted" });
});
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
