'use strict';

angular.module('mlrg.bibcreate')
	.factory('Bib',Bib);

	Bib.$inject = ['$http'];


	function Bib($http){
		
		var availableTypes = [
			{id: '1', name: 'Article'},
			{id: '2', name: 'InProceedings'},
			{id: '3', name: 'InBook'},
			{id: '4', name: 'MasterThesis'},
			{id: '5', name: 'Unpublished'},
			{id: '6', name: 'Manual'},
			{id: '7', name: 'Book'},
			{id: '8', name: 'Booklet'},
			{id: '9', name: 'Conference'},
			{id: '10', name: 'Proceedings'},
			{id: '11', name: 'InCollection'},
			{id: '12', name: 'PhdThesis'},
			{id: '13', name: 'TechReport'},
			{id: '14', name: 'Misc'},
		];

		var selectedType = {id: '1', name: 'Article'};
		var selectedTab = 'required';
		var articleFields = ['author','title','journal','year','doi','abstract','volume','pages','note','__markedentry','number','month','issn','crossref','keywords','file','url','comment','owner','timestamp'];
		var proceedingsFields = ['title','year','doi','abstract','editor','number','address','note','organization','volume','series','publisher','month','crossref','keywords','file','url','comment','owner','timestamp'];
		var inProceedingsFields = ['author','title','booktitle','year','doi','abstract','editor','number','pages','month','publisher','volume','series','address','organization','note','__markedentry','crossref','keywords','file','url','comment','owner','timestamp'];
		var inBookFields = ['Chapter','Pages','Title','Publisher','Year','Author','Editor','DOI','Abstract','Volume','Series','Address','Month','Number','Type','Edition','Note','Crossref','Keywords','File','URL','Comment','Owner','TimeStamp'];
		var inCollectionFields = ['author','title','booktitle','publisher','year','doi','abstract','editor','number','type','pages','edition','note','volume','series','chapter','address','month','crossref','keywords','file','url','comment','owner','timestamp'];
		var phdThesisFields = ['author','title','school','year','doi','abstract','type','month','address','note','crossref','keywords','file','url','comment','owner','timestamp'];
		var techReportFields = ['author','title','institution','year','doi','abstract','type','address','note','number','month','crossref','keywords','file','url','comment','owner','timestamp'];
		var miscFields = ['doi','abstract','author','howpublished','year','title','month','note','crossref','keywords','file','url','comment','owner','timestamp'];
		var masterThesisFields = [];
		var unpublishedFields = [];
		var manualFields = [];
		var conferenceFields = [];
		var bookletFields = [];
		var bookFields = [];


		var bibFields = {
			metadata: {
				type: 'article',
				operation: 'add'
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
				case 'masterthesis': {
					makeOtherFieldsEmpty(data, masterThesisFields);
					break;
				}
				case 'manual': {
					makeOtherFieldsEmpty(data, manualFields);
					break;
				}
				case 'book': {
					makeOtherFieldsEmpty(data, bookFields);
					break;
				}
				case 'booklet': {
					makeOtherFieldsEmpty(data, bookletFields);
					break;
				}
				case 'conference': {
					makeOtherFieldsEmpty(data, conferenceFields);
					break;
				}

				case 'incollection': {
					makeOtherFieldsEmpty(data, inCollectionFields);
					break;
				}
				case 'proceedings': {
					makeOtherFieldsEmpty(data, proceedingsFields);
					break;
				}
				case 'phdthesis': {
					makeOtherFieldsEmpty(data,phdThesisFields);
					break;
				}
				case 'techreport': {
					makeOtherFieldsEmpty(data,techReportFields);
					break;
				}
				case 'misc': {
					makeOtherFieldsEmpty(data,miscFields);
					break;
				}
				case 'unpublished': {
					makeOtherFieldsEmpty(data,unpublishedFields);
					break;
				}
			}
		};

		var addBib = function(data){
			cleanFields(data);
			return $http.post('/api/addbib/', data);
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
