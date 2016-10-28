'use strict';

var angular = require('angular');
require('angular-ui-router');

var states = require('./states');
require('./home');
require('./bib-create');
var app = angular.module('mlrg',['ui.router','mlrg.home','mlrg.bibcreate']);

app.config(states);







module.exports = app;