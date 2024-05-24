const Blog = require("../models/Blog.js");

const BlogController = {
  index: async (req, res) => {
    let blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("index", {
      blogs,
      title: "Home Page",
    });
  },

  create: (req, res) => {
    res.render("create", {
      title: "Create Page",
    });
  },

  store: async (req, res) => {
    let { title, description } = req.body;
    let blog = new Blog({
      title,
      description,
    });
    await blog.save();
    res.redirect("/");
  },

  show: async (req, res, next) => {
    try {
      let blog = await Blog.findById(req.params.id);
      res.render("show", {
        blog,
        title: "Show Page",
      });
    } catch (error) {
      next();
    }
  },

  edit: async (req, res, next) => {
    try {
      let blog = await Blog.findById(req.params.id);
      res.render("edit", {
        blog,
        title: "Edit Page",
      });
    } catch (error) {
      next();
    }
  },

  update: async (req, res) => {
    let { id, title, description } = req.body;
    await Blog.findByIdAndUpdate(id, { title, description }, { new: true });
    res.redirect("/");
  },

  destroy: async (req, res, next) => {
    try {
      let blog = await Blog.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } catch (error) {
      next();
    }
  },
};

module.exports = BlogController;
