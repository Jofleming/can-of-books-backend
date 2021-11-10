'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
const Book = require('./models/bookModel.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongoose is connected'));


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const handleBookRequest = async (req, res) => {
  let queryObj = {};
  if (req.query.title) {
    queryObj = {title: req.query.title};
  }

  try {
    const booksFromDB = await Book.find(queryObj);
    if (booksFromDB.length > 0) {
      res.status(200).send(booksFromDB);
    } else {
      res.status(404).send('no books');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('bigger issue');
  }

};

const handleBookPost = async (req, res) => {
  try {
    console.log(req.body);
    let newBook = await Book.create(req.body);
    console.log(newBook);
    res.status(201).send(newBook);
  } catch (e) {
    res.status(500).send('Sorry, your book was not added.');
  }
};

const handleBookDelete = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (deletedBook) {
      res.status(204).send('book deleted');
    } else {
      res.status(404).send('Can\'t find book to delete');
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

app.get('/books', handleBookRequest);
app.post('/books', handleBookPost);
app.delete('/books', handleBookDelete);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
