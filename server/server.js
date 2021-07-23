/** @format */

const express = require('express');
const path = require('path');
const app = express();
const listRouter = require('./routes/listRouter');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/list', listRouter);

app.listen(PORT, () => {
  console.log(`Server is lisening on ${PORT}`);
});

app.get('/', (res, req) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.js'));
});
