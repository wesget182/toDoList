/** @format */

const models = require('../models/listModel');
const path = require('path');

const itemController = {};

itemController.addItem = async (req, res, next) => {
  try {
    // console.log('req.body', req.body);
    const { item } = req.body;
    console.log(item);
    const addedItem = await models.Items.create({ item: item });

    res.locals.newItem = addedItem;
    return next();
  } catch (err) {
    return next(err);
  }
};

itemController.getItems = async (req, res, next) => {
  try {
    const items = await models.Items.find({});
    // console.log(items);
    res.locals.dbItems = items;
    return next();
  } catch (err) {
    return next(err);
  }
};

itemController.deleteItem = async (req, res, next) => {
  try {
    // console.log('req.body in delete', req.body);
    const { itemToDelete } = req.body;
    console.log(itemToDelete);
    const deleted = await models.Items.findOneAndDelete({ item: itemToDelete });
    res.locals.deleted = deleted;
    console.log('deleted', deleted);
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = itemController;
