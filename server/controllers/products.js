const express = require('express');
const { getAll, get, search, create, update, remove } = require('../models/products');
const router = express.Router();

router.get('/', (req, res, next) => {

    res.send(getAll());

})

.get('/search' , (req, res, next) => {

    const results = search(req.query.q);
    res.send(results);

})

.get('/:id', (req, res, next) => {

  const product = get(+req.params.id);
  if(product) {
    res.send( product );
  }else {
    res.status(404).send({error: 'Product not found'});
  }

})

.post('/', (req, res, next) => {
  // body exists bc we use the json parser
  const product = create(req.body);
  res.send(product);
})

.patch('/:id', (req, res, next) => {
  const product = update(req.body);
  res.send(product);
})

.delete('/:id', (req, res, next) => {
  remove(+req.params.id);
  res.send({message: 'Product removed'});
})

module.exports = router;