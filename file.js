const fs = require("fs");

// Read File
fs.readFile("./docs/file1.txt", (data, err) => {
  if (data) {
    console.log(data);
  }

  if (err) {
    console.log(err.toString());
  }
});

// Write File
fs.writeFile("./docs/file2.txt", "New text", (err) => {
  if (err) {
    console.log(err);
  }
});

// Delete File
if (fs.existsSync("./docs/file2.txt")) {
  fs.unlink("./docs/file2.txt", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

// Write Folder
fs.mkdir("./docs/newFolder", (err) => {
  if (err) {
    console.log(err);
  }
});

// Delete Folder
if (fs.existsSync("./docs/newFolder")) {
  fs.rmdir("./docs/newFolder", (err) => {
    if (err) {
      console.log(err);
    }
  });
}
