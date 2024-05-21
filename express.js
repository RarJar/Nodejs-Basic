const express = require("express");
const route = express();

route.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

route.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

route.get("/about-us", (req, res) => {
  res.redirect("/about");
});

route.use((req, res) => {
  res.status(404);
  res.sendFile("./views/404.html", { root: __dirname });
});

route.listen(3000);
