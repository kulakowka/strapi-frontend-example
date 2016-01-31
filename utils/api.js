'use strict'

const request = require('request')

var apiRequest = request.defaults({
  baseUrl: 'http://localhost:1337/',
  json: true,
  headers: {'x-token': 'my-token'}
})

module.exports = apiRequest
