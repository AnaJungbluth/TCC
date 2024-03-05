const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());


let books = [];

console.log(books)

app.get('/books', (req, res) => {
  res.json(books);
  console.log(books)
});

app.post('/books', (req, res) => {
  const book = req.body;
  book.id = Math.floor(Math.random() * 10000);
  books.push(book);
  res.status(201).json(book); // Retorna o livro adicionado como resposta
  console.log(books) 
});

app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const updatedBook = req.body;
    const index = books.findIndex(book => book.id === parseInt(id));
    if (index === -1) {
      res.status(404).send('Livro não encontrado');
    } else {
      books[index] = { ...books[index], ...updatedBook };
      res.send('Livro atualizado com sucesso');
    }
    console.log(books)
});
  
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const index = books.findIndex(book => book.id === parseInt(id));
  if (index === -1) {
    res.status(404).send('Livro não encontrado');
  } else { 
    books.splice(index, 1);
    res.send('Livro removido com sucesso');
  }
  console.log(books)
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
