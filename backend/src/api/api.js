'use strict';

import express from 'express';
const router = express.Router();

import notFound from './../middleware/404.js';

import modelFinder from '../middleware/models.js';
router.param('model', modelFinder);


let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

router.get('/', (req, res) => {
  res.write('HELLOOOOOO!!!!!!');
  res.end();
});

router.get('/api/v1/:model', (req, res, next) => {
  req.model.find({})
    .populate('park')
    .then(data => sendJSON(res, data))
    .catch(next);
});

router.get('/api/v1/:model/:id', (req, res, next) => {
  if(req.params.id) {
    req.model.findById(req.params.id)
      .populate('park')
      .then(data => sendJSON(res, data))
      .catch(next);
  }
  else {
    return notFound;
  }
});


router.post('/api/v1/:model', (req, res, next) => {

  let record = new req.model(req.body);
  record.save()
    .then(data => sendJSON(res, data))
    .catch(next);

});


router.put('/api/v1/:model/:id', (req, res, next) => {
  if(Object.keys(req.body).length) {
    req.model.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then(data => sendJSON(res, data))
      .catch(next);
  }
  else {
    return notFound;
  }
});

router.delete('/api/v1/:model/:id', (req, res, next) => {
  if (req.params.id) {
    req.model.findByIdAndDelete(req.params.id)
      .then(() => {
        res.statusCode = 204;
        res.end();
      })
      .catch(next);
  }
});


export default router;
