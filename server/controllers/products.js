const express = require('express'); //cannot use async await with express
const { getAll, get, search, create, update, remove } = require('../models/products');
const router = express.Router();

router.get('/', (req, res, next) => {

    getAll()
    .then((products) => {
      res.send(products);
    })
    .catch(next) // one param: err
    // .catch(err=> next(err)) same as line above
})

.get('/search' , (req, res, next) => {

    search(req.query.q)
    .then((results) => {
      res.send(results);
    }).catch(next);
    
    /* old: const results = search(req.query.q);
    res.send(results);*/
})

.get('/:id', (req, res, next) => {

  get(+req.params.id)
  .then((product) => {
    if(product) {
      res.send(product);
    }
  })
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
  .then(() => {
    res.send({message: 'Product removed'});
  }).catch(next);
  // old: res.send({message: 'Product removed'});
})

module.exports = router;