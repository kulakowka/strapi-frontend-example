'use strict'

const express = require('express')
const apiRequest = require('../utils/api')

let router = express.Router()

router.use((req, res, next) => {
  res.locals.currentUser = req.session.user
  res.locals.jwt = req.session.jwt
  next()
})

router.use('/users', require('./users'))
router.use('/articles', require('./articles'))
router.use('/auth', require('./auth'))

// GET /
router.get('/', (req, res, next) => {
  apiRequest({
    uri: `/article`,
    qs: {
      sort: 'createdAt DESC'
    }
  }, (err, response, body) => {
    if (err) return next(err)
    res.render('articles/index', {articles: body})
  })
})

module.exports = router
