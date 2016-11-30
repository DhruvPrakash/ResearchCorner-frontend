'use strict';

var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');

var states = require('./states');
require('./home');
require('./bib-create');
require('./search')
var app = angular.module('mlrg',['ui.bootstrap','ui.router','mlrg.home','mlrg.bibcreate','mlrg.search']);

app.config(states);







module.exports = app;