const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const mongoose = require("mongoose");
const BlogController = require("./controllers/BlogController.js");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/master");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //for post request data middleware

const mongoUrl =
  "mongodb+srv://yarzarminkhant2003:LPT1500%40love@cluster0.6253mxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(8000, () => {
      console.log("Server is running on port 8000 and connected to MongoDB");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", BlogController.index);
app.get("/blog/create", BlogController.create);
app.post("/blog/store", BlogController.store);
app.get("/blog/:id", BlogController.show);
app.get("/blog/:id/edit", BlogController.edit);
app.post("/blog/update", BlogController.update);
app.post("/blog/:id/destroy", BlogController.destroy);

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Page",
  });
});

// app.get("/", (req, res) => {
//   res.sendFile("./views/index.html", { root: __dirname });
// });
