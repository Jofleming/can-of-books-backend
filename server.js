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

const PORT = process.env.PORT || 3001;

const handleBookRequest = async (require, response) => {
  let queryObj = {};
  if (require.query.title) {
    queryObj = {title: require.query.title};
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


app.get('/books', handleBookRequest);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
