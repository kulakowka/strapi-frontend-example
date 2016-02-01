'use strict'

// Npm packages
const express = require('express')

// Utils
const apiRequest = require('../utils/api')

// Policies
const isAuthorized = require('./policies/isAuthorized')

// Create router instance
let router = express.Router()

// GET /languages
router.get('/', (req, res, next) => {
  apiRequest({
    uri: `/language`
  }, (err, response, body) => {
    if (err) return next(err)
    res.render('languages/index', {languages: body})
  })
})

// GET /languages/:slug
router.get('/:slug', (req, res, next) => {
  apiRequest({
    uri: `/language/${req.params.slug}`
  }, (err, response, body) => {
    if (err) return next(err)
    res.render('languages/show', {language: body})
  })
})

module.exports = router
