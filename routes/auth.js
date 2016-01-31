'use strict'

const express = require('express')
const apiRequest = require('../utils/api')

let router = express.Router()

// GET /auth/login
router.get('/login', (req, res, next) => {
  res.render('auth/login', {title: 'Sign in'})
})

// POST /auth/local
router.post('/login', (req, res, next) => {
  apiRequest
  .post('/auth/local', {form: req.body}, (err, response, body) => {
    if (err) return next(err)
    req.session.user = body.user
    req.session.jwt = body.jwt
    res.redirect('/')
  })
})

// GET /auth/register
router.get('/register', (req, res, next) => {
  res.render('auth/register', {title: 'Sign in'})
})

// POST /auth/register
router.post('/register', (req, res, next) => {
  apiRequest
  .post('/auth/local/register', {form: req.body}, (err, response, body) => {
    if (err) return next(err)
    res.json(body)
  })
})

// POST /auth/logout
router.post('/logout', (req, res, next) => {
  delete req.session.user
  delete req.session.jwt
  res.redirect('/')
})

module.exports = router
