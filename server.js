const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/html");

  let filename;

  switch (req.url) {
    case "/":
      filename = "index.html";
      req.statusCode = 200;
      break;
    case "/about":
      filename = "about.html";
      req.statusCode = 200;
      break;
    case "/about-us":
      req.setHeader("Location", "/about");
      req.statusCode = 301;
      break;
    default:
      filename = "404.html";
      req.statusCode = 404;
      break;
  }

  fs.readFile("./views/" + filename, (err, data) => {
    if (err) {
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("server listen");
});
