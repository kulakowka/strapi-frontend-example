'use strict'

const marked = require('marked')
const express = require('express')
const apiRequest = require('../utils/api')

let router = express.Router()

// GET /articles
router.get('/', (req, res, next) => {
  res.redirect('/')
})

// GET /articles/:id
router.get('/:id', (req, res, next) => {
  apiRequest({
    uri: `/article/${req.params.id}`,
    qs: {
      populate: 'createdBy,contributors'
    }
  }, (err, response, body) => {
    if (err) return next(err)
    body.html = marked(body.content)
    res.render('articles/show', {article: body})
  })
})

module.exports = router
