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

const handleBookRequest = async (request, response) => {
  let queryObj = {};
  if (request.query.title) {
    queryObj = {title: request.query.title};
  }

  try {
    const booksFromDB = await Book.find(queryObj);
    if (booksFromDB.length > 0) {
      response.status(200).send(booksFromDB);
    } else {
      response.status(404).send('no books');
    }
  } catch (e) {
    console.log(e);
    response.status(500).send('bigger issue');
  }

};

const handleBookPost = async (req, res) => {
  try {
    console.log(req.body);
    let newBook = await Book.create(req.body);
    res.status(201).send(newBook);
  } catch (e) {
    res.status(500).send('Sorry, your book was not added.');
  }
};

app.get('/books', handleBookRequest);
app.post('/books', handleBookPost);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
