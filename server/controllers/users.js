const express = require('express');
const { getAll, get, search, create, update, remove } = require('../models/users');
const router = express.Router();

router.get('/', (req, res, next) => {

    res.send(getAll());

})

.get('/search' , (req, res, next) => {

    const results = search(req.query.q);
    res.send(results);

})

.get('/:id', (req, res, next) => {

  const user = get(+req.params.id);
  if(user) {
    res.send( user );
  }else {
    res.status(404).send({error: 'User not found'});
  }

})

.post('/', (req, res, next) => {
  // body exists bc we use the json parser
  const user = create(req.body);
  res.send(user);
})

.patch('/:id', (req, res, next) => {
  const user = update(req.body);
  res.send(user);
})

.delete('/:id', (req, res, next) => {
  remove(+req.params.id);
  res.send({message: 'User removed'});
})

module.exports = router;