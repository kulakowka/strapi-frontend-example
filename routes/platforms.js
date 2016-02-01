'use strict'

// Npm packages
const express = require('express')

// Utils
const apiRequest = require('../utils/api')

// Policies
const isAuthorized = require('./policies/isAuthorized')

// Create router instance
let router = express.Router()

// GET /platforms
router.get('/', (req, res, next) => {
  apiRequest({
    uri: `/platform`
  }, (err, response, body) => {
    if (err) return next(err)
    res.render('platforms/index', {platforms: body})
  })
})

// GET /platforms/:slug
router.get('/:slug',
  (req, res, next) => {
    apiRequest({
      uri: `/platform/${req.params.slug}`
    }, (err, response, body) => {
      if (err) return next(err)
      res.locals.platform = body
      next()
    })
  },
  (req, res, next) => {
    apiRequest({
      uri: `/article`,
      qs: {
        where: {
          platforms: res.locals.platform.id
        }
      }
    }, (err, response, body) => {
      if (err) return next(err)
      res.locals.articles = body
      next()
    })
  },
  (req, res, next) => {
    res.render('platforms/show')
  }
)

module.exports = router
