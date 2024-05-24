const express = require("express");
const route = express();
const mongoose = require("mongoose");
const Blog = require("./models/Blog.js");

route.set("views", "./views");
route.set("view engine", "ejs");
route.use(express.static("public"));

const mongoUrl =
  "mongodb+srv://yarzarminkhant2003:LPT1500%40love@cluster0.6253mxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    route.listen(8000, () => {
      console.log("Server is running on port 8000 and connected to MongoDB");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

route.get("/store", async (req, res) => {
  let blog = new Blog({
    title: "Title two",
    description: "Description two",
  });
  await blog.save();
  res.redirect("/");
});

route.get("/", async (req, res) => {
  let blogs = await Blog.find().sort({ createdAt: -1 });
  res.render("index", {
    blogs,
    title: "Home Page",
  });
});

route.get("/show", async (req, res) => {
  let blog = await Blog.findById("664e1e70ec60ba2a61645d65");
  res.json(blog);
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
