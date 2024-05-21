const http = require("http");

const server = http.createServer((req,res) => {
    res.setHeader('Content-type','text/html');
    res.write("<h1>Hello World</h1>");
    res.end();
});

server.listen(3000,'localhost',()=>{
    console.log('server listen');
});