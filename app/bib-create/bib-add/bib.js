'use strict';

angular.module('mlrg.bibcreate')
	.factory('Bib',Bib);

	Bib.$inject = ['$http']

	function Bib($http){
		
		var availableTypes = [
			{id: '1', name: 'Article'},
			{id: '2', name: 'InProceedings'},
			{id: '3', name: 'InBook'}
		];

		var selectedType = {id: '1', name: 'Article'};
		var selectedTab = 'required';

		var articleFields = ['author','title','journal','year','doi','abstract','volume','pages','note','number','month','crossref','keywords','file','url','comment','owner','timestamp'];
		var inProceedingsFields = ['author','title','book','year','abstract'];
		var inBookFields = [];


		var bibFields = {
			metadata: {
				type: 'article'
			},
			payload: {
				author: '',
				abstract: '',
				__markedentry: '',
				address: '',
				booktitle: '',
				chapter: '',
				comment: '',
				crossref: '',
				doi: '',
				edition: '',
				editor: '',
				file: '',
				howpublished: '',
				institution: '',
				journal: '',
				keywords:'',
				month: '',
				note: '',
				number: '',
				organization: '',
				owner: '',
				pages: '',
				publisher: '',
				school: '',
				series: '',
				timestamp: '',
				title: '',
				type: '',
				url: '',
				volume: '',
				year: ''
			}
		};


		var getAvailableTypes = function(){
			return availableTypes;
		};

		var getSelectedType = function(){
			return selectedType;
		};

		var getSelectedTab = function(){
			return selectedTab;
		};

		var getBibFields = function(){
			return bibFields
		};

		var makeOtherFieldsEmpty = function(data, fieldList){
			var keyPresent;
			angular.forEach(data.payload, function(value, key, obj){
				keyPresent = fieldList.some(function(field){
					return field === key;
				});

				if(!keyPresent){
					obj[key] = ''
				}
			});
		};

		var cleanFields = function(data){
			var keyPresent;
			switch(data.metadata.type) {
				case 'article': {
					makeOtherFieldsEmpty(data, articleFields);
					break;
				}

				case 'inproceedings': {
					makeOtherFieldsEmpty(data,inProceedingsFields);
					break;
				}
				case 'inbook': {
					makeOtherFieldsEmpty(data, inBookFields);
					break;
				}
			}
		};

		var addBib = function(data){
			cleanFields(data);
			return $http.post('/api/addbib', data);
		};



		var Bib = {
			getAvailableTypes: getAvailableTypes,
			getSelectedType: getSelectedType,
			getSelectedTab: getSelectedTab,
			addBib: addBib,
			getBibFields: getBibFields
		};

		

		return Bib; 
	}
