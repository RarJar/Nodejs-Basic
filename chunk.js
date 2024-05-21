const fs = require("fs");

// Read by chunk
const readStream = fs.createReadStream("./docs/buffer.txt");
readStream.on("data", function (data) {
  console.log(data.toString());
  console.log("_____chunk_____");
});

// Write by chunk
const writeStream = fs.createWriteStream("./docs/new-buffer.txt");
readStream.on("data", function (data) {
  writeStream.write(data.toString());
  writeStream.write("_____chunk_____");
});

// OR

readStream.pipe(writeStream);
