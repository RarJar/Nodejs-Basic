const express = require("express");
const route = express();
const mongoose = require("mongoose");

route.set("views", "./views");
route.set("view engine", "ejs");
route.use(express.static("public"));

let mongoUrl =
  "mongodb+srv://yarzarminkhant2003:LPT1500%40love@cluster0.6253mxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl)
  .then(() => {
    route.listen(8000, () => {
      console.log("connected");
    });
  })
  .catch((e) => {
    console.log(e);
  });

route.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
  });
});

route.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
  });
});

route.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Page",
  });
});

// route.get("/", (req, res) => {
//   res.sendFile("./views/index.html", { root: __dirname });
// });
