'use strict';

module.exports = angular.module('mlrg.search', []);
require('./search.ctrl');
require('./view-abstract/view-abstract-modal.ctrl');
require('./view-selected-bibs/view-selected-bibs-modal.ctrl');
require('./add-filters/search-filter-modal.ctrl');
require('../bib-create/bib-add/bib-add.ctrl');