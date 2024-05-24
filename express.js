const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const route = express();
const mongoose = require("mongoose");
const Blog = require("./models/Blog.js");

route.set("views", "./views");
route.set("view engine", "ejs");
route.use(expressLayouts);
route.set("layout", "layouts/master");
route.use(express.static("public"));
route.use(express.urlencoded({ extended: true })); //for post request data middleware

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

route.get("/", async (req, res) => {
  let blogs = await Blog.find().sort({ createdAt: -1 });
  res.render("index", {
    blogs,
    title: "Home Page",
  });
});

route.get("/blog/create", (req, res) => {
  res.render("create", {
    title: "Create Page",
  });
});

route.post("/blog/store", async (req, res) => {
  let { title, description } = req.body;
  let blog = new Blog({
    title,
    description,
  });
  await blog.save();
  res.redirect("/");
});

route.get("/blog/:id", async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);
    res.render("show", {
      blog,
      title: "Show Page",
    });
  } catch (error) {
    next();
  }
});

route.get("/blog/:id/edit", async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);
    res.render("edit", {
      blog,
      title: "Edit Page",
    });
  } catch (error) {
    next();
  }
});

route.post("/blog/update", async (req, res) => {
  let { id, title, description } = req.body;
  await Blog.findByIdAndUpdate(id, { title, description }, { new: true });
  res.redirect("/");
});

route.post("/blog/:id/destroy", async (req, res, next) => {
  try {
    let blog = await Blog.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    next();
  }
});

route.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Page",
  });
});

// route.get("/", (req, res) => {
//   res.sendFile("./views/index.html", { root: __dirname });
// });
