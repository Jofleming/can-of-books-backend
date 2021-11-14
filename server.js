'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
const Book = require('./models/bookModel.js');
const verifyUser = require('./auth.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongoose is connected'));


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const handleBookRequest = (req, res) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      res.status(498).send('Token not valid.');
      console.log('error here');
    } else {
      try {
        const booksFromDB = await Book.find({email: user.email});

        if (booksFromDB.length > 0) {
          res.status(200).send(booksFromDB);
        } else {
          res.status(404).send('no books');
        }
      } catch (e) {
        console.log(e);
        res.status(500).send('Server error');
      }
    }
  });
};


const handleBookPost = (req, res) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      res.status(498).send('Token not valid');
    } else {
      try {
        let newBook = await Book.create(req.body);
        res.status(201).send(newBook);
      } catch (e) {
        res.status(500).send('Sorry, your book was not added.');
      }
    }
  });
};

const handleBookDelete = (req, res) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      res.status(498).send('Token not valid');
    } else {
      try {
        const id = req.params.id;
        const bookCheck = await Book.findById(id);
        if (bookCheck.email === user.email) {
          const deletedBook = await Book.findByIdAndDelete(id);
          if (deletedBook) {
            res.status(204).send('Book successfully deleted.');
          } else {
            res.status(404).send('Can\'t find book to delete');
          }
        }
      } catch (error) {
        res.status(500).send('Server Error');
      }
    }
  });
};

const handleBookPut = (req, res) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      res.status(498).send('Token not valid');
    } else {
      try {
        const id = req.params.id;
        const requestedUpdate = req.body;
        const updatedBook = await Book.findByIdAndUpdate(id, requestedUpdate, {new: true, overwrite: true});
        if (updatedBook) {
          res.status(202).send(updatedBook);
        } else {
          res.status(404);
        }
      } catch (error) {
        console.log(error);
        res.status(500);
      }
    }
  });
};

const getUser = (req, res) => {
  verifyUser(req, (err, user) => {
    if (err) {
      res.status(498).send('Token not valid');
    } else {
      res.status(200).send(user);
    }
  });
};

app.get('/books', handleBookRequest);
app.post('/books', handleBookPost);
app.delete('/books/:id', handleBookDelete);
app.put('/books/:id', handleBookPut);
app.get('/user', getUser);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
