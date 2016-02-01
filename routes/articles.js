'use strict'

// Npm packages
const marked = require('marked')
const express = require('express')

// Utils
const apiRequest = require('../utils/api')

// Policies
const isAuthorized = require('./policies/isAuthorized')

// Create router instance
let router = express.Router()

// GET /articles
router.get('/', (req, res, next) => {
  res.redirect('/')
})

// GET /articles/new
router.get('/new', isAuthorized, (req, res, next) => {
  res.render('articles/new', {
    article: {}
  })
})

// POST /articles
router.post('/', isAuthorized, (req, res, next) => {
  console.log(req.body)
  apiRequest({
    method: 'POST',
    uri: '/article',
    form: req.body,
    headers: {
      'Authorization': `Bearer ${req.session.jwt}`
    }
  }, (err, response, body) => {
    if (err) return next(err)
    if (response.statusCode !== 201) {
      return res.render('articles/new', {
        article: req.body,
        error: body
      })
    }
    res.redirect(`/articles/${body.id}`)
  })
})

// GET /articles/:id
router.get('/:id', (req, res, next) => {
  apiRequest({
    uri: `/article/${req.params.id}`,
    qs: {
      populate: 'createdBy,contributors,platforms,languages'
    }
  }, (err, response, body) => {
    if (err) return next(err)
    if (body.content) body.html = marked(body.content)
    res.render('articles/show', {article: body})
  })
})

module.exports = router
