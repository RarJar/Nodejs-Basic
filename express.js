const express = require("express");
const route = express();

route.set("views", "./views");
route.set("view engine", "ejs");

route.use(express.static("public"));

// route.get("/", (req, res) => {
//   res.sendFile("./views/index.html", { root: __dirname });
// });

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

route.listen(3000);
