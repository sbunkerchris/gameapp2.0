const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('games').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
      console.log('lists:' + lists + 'end lists');
      console.log('results: ' + result + ' end results');
    });
  };
  
  
  const getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('games')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };
  
  const createGame = async (req, res) => {
    const game = {
      title: req.body.title,
      publishYear: req.body.publishYear,
      rating: req.body.rating,
      designer: req.body.designer,
      publisher: req.body.publisher,
      catagory: req.body.catagory
    };
    const response = await mongodb.getDb().db().collection('games').insertOne(game);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the game.');
    }
  };

  const updateGame = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const game = {
      title: req.body.title,
      publishYear: req.body.publishYear,
      rating: req.body.rating,
      designer: req.body.designer,
      publisher: req.body.publisher,
      catagory: req.body.catagory
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('games')
      .replaceOne({ _id: userId }, game);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  };
  
  const deleteGame = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('games').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  }; 

module.exports = {
    getAll,
    getSingle,
    createGame,
    updateGame,
    deleteGame
};