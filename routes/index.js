'use strict'

const express = require('express')
const apiRequest = require('../utils/api')

let router = express.Router()

router.use((req, res, next) => {
  req.user = req.session.user
  req.jwt = req.session.jwt
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

router.get('/test', (req, res, next) => {
  apiRequest({
    uri: `/graphql`,
    qs: {
      query: `{
        articles {
          id
          title
          createdBy {
            id
          }
          comments {
            content
          }
        }
      }`
    }
  }, (err, response, body) => {
    if (err) return next(err)
    res.json(body)
  })
})

module.exports = router
