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
router.get('/:id', (req, res, next) => {
  apiRequest({
    uri: `/user/${req.params.id}`,
    qs: {
      populate: 'articles'
    }
  }, (err, response, body) => {
    if (err) return next(err)
    res.render('users/show', {user: body})
  })
})

module.exports = router
