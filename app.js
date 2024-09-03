const express = require("express");
const libraryData = require("./data.json");
const app = express();
const PORT = 5000;

app.use(express.json());
var bookData = libraryData.library.books;
app.get("/", (req, res) => {
  res.json("App is running...");
});

app.get("/books", (req, res) => {
  res.json(libraryData.library.books);
});

app.get("/books/:id", (req, res) => {
  let bookId = req.params.id;

  const book = bookData.find((b) => b.id === parseInt(bookId));
  if (book) {
    res.json(book);
  } else {
  }
  res.status(404).send("Book not found");
});

app.post("/insertBook", (req, res) => {
  let newBook = req.body;
  bookData.push(newBook);
  res.json(libraryData.library.books);
});

app.put("/updateBook/:id", (req, res) => {
  try {
    let bookId = req.params.id;
    let index = bookData.findIndex((b) => b.id === parseInt(bookId));

    if (index != -1) {
      bookData[index] = { ...bookData[index], ...req.body };
      res.json(bookData[index]);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (err) {
    console.log("Error in updating book", err);
  }
});

app.delete("/deleteBook/:id", (req, res) => {
  try {
    let bookId = req.params.id;
    let index = bookData.findIndex((b) => b.id === parseInt(bookId));
    if (index !== -1) {
      let deletedBook = bookData.splice(index, 1);
      res.json(bookData);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (err) {
    console.log("Error in deleting book", err);
  }
});

app.listen(PORT, () => {
  console.log("server is running in port:", PORT);
});
