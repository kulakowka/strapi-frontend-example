'use strict'

const express = require('express')
const apiRequest = require('../utils/api')

let router = express.Router()

// GET /users
router.get('/', (req, res, next) => {
  apiRequest({
    uri: `/user`,
    qs: {
      sort: 'createdAt DESC'
    }
  }, (err, response, body) => {
    if (err) return next(err)
    res.render('users/index', {users: body})
  })
})

// GET /users/:id
router.get('/:id', 
  (req, res, next) => {
    apiRequest({
      uri: `/user/${req.params.id}`
    }, (err, response, body) => {
      if (err) return next(err)
      res.locals.user = body
      next()
    })
  },
  (req, res, next) => {
    apiRequest({
      uri: `/article`,
      qs: {
        where: {
          createdBy: res.locals.user.id
        }
      }
    }, (err, response, body) => {
      if (err) return next(err)
      res.locals.articles = body
      next()
    })
  },
  (req, res, next) => {
    res.render('users/show')
  }
)

module.exports = router
