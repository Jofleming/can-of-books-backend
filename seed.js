'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/bookModel.js');

const seed = async () => {
  mongoose.connect(process.env.DB_URL);
  const duneBook = new Book({
    title: 'Dune',
    description: 'Let the spice flow',
    status: 'Status',
    email: 'jordano.fleming@gmail.com',
  });
  await duneBook.save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('saved my book, Dune');
    }
  });

  const mathBook = new Book({
    title: 'Algebra 2',
    description: 'Fun with algebra',
    status: 'Status',
    email: 'jordano.fleming@gmail.com',
  });
  await mathBook.save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`saved my book, Algebra 2`);
    }
  });

  const jsBook = new Book({
    title: 'JavaScript',
    description: 'Fun? with JavaScript.',
    status: 'Status',
    email: 'jordano.fleming@gmail.com',
  });
  await jsBook.save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('saved my book, JavaScript');
    }
  });
};

seed();
