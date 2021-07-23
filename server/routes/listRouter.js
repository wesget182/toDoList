/** @format */
const express = require('express');
const router = express();
const models = require('../models/listModel');
const path = require('path');
const itemController = require('../controllers/itemController');

router.post(
  '/addItem',
  itemController.addItem,

  (req, res) => {
    console.log('res.locals', res.locals);
    return res.status(200).send(res.locals);
  }
);

router.get('/getItems', itemController.getItems, (req, res) =>
  res.status(200).send(res.locals)
);

router.delete('/deleteItem', itemController.deleteItem, (req, res) =>
  res.status(200).send(res.locals)
);

module.exports = router;
