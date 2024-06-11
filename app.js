const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app = express();
port = process.env.POST || 8080;

app.use(bodyParser.json());

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).send({ message: message, data: data });
});

mongoose
  // .connect(env.process.MONGO_ID)
  .connect(
    "mongodb+srv://prakhargaba:Prakhar1@cluster0.oiz6t6r.mongodb.net/note?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((res) => {
    app.listen(port);
    console.log(`App listening on port ${port}!`);
  })
  .catch((err) => {
    console.log(err);
  });
