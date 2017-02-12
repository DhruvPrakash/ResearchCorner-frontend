'use strict';

angular.module('mlrg.bibcreate')
    .factory('Bib', Bib);

Bib.$inject = ['$http'];


function Bib($http) {

    var availableTypes = [
        { id: '1', name: 'Article' },
        { id: '2', name: 'InProceedings' },
        { id: '3', name: 'InBook' },
        { id: '4', name: 'MasterThesis' },
        { id: '5', name: 'Unpublished' },
        { id: '6', name: 'Manual' },
        { id: '7', name: 'Book' },
        { id: '8', name: 'Booklet' },
        { id: '9', name: 'Conference' },
        { id: '10', name: 'Proceedings' },
        { id: '11', name: 'InCollection' },
        { id: '12', name: 'PhdThesis' },
        { id: '13', name: 'TechReport' },
        { id: '14', name: 'Misc' },
    ];

    var selectedType = { id: '1', name: 'Article' };
    var selectedTab = 'required';
    var articleFields = ['author', 'title', 'journal', 'year', 'doi', 'abstract', 'volume', 'pages', 'note', '__markedentry', 'number', 'month', 'issn', 'crossref', 'keyword', 'file', 'url', 'comment', 'owner', 'timestamp'];
    var proceedingsFields = ['title', 'year', 'doi', 'abstract', 'editor', 'number', 'address', 'note', 'organization', 'volume', 'series', 'publisher', 'month', 'crossref', 'keyword', 'file', 'url', 'comment', 'owner', 'timestamp'];
    var inProceedingsFields = ['author', 'title', 'booktitle', 'year', 'doi', 'abstract', 'editor', 'number', 'pages', 'month', 'publisher', 'volume', 'series', 'address', 'organization', 'note', '__markedentry', 'crossref', 'keyword', 'file', 'url', 'comment', 'owner', 'timestamp'];
    var inBookFields = ['chapter', 'pages', 'title', 'publisher', 'year', 'author', 'editor', 'doi', 'abstract', 'volume', 'series', 'address', 'month', 'number', 'type', 'edition', 'note', 'crossref', 'keyword', 'file', 'url', 'comment', 'owner', 'timestamp'];
    var inCollectionFields = ['author', 'title', 'booktitle', 'publisher', 'year', 'doi', 'abstract', 'editor', 'number', 'type', 'pages', 'edition', 'note', 'volume', 'series', 'chapter', 'address', 'month', 'crossref', 'keyword', 'file', 'url', 'comment', 'owner', 'timestamp'];
    var phdThesisFields = ['author', 'title', 'school', 'year', 'doi', 'abstract', 'type', 'month', 'address', 'note', 'crossref', 'keyword', 'file', 'url', 'comment', 'owner', 'timestamp'];
    var techReportFields = ['author', 'title', 'institution', 'year', 'doi', 'abstract', 'type', 'address', 'note', 'number', 'month', 'crossref', 'keyword', 'file', 'url', 'comment', 'owner', 'timestamp'];
    var miscFields = ['doi', 'abstract', 'author', 'howpublished', 'year', 'title', 'month', 'note', 'crossref', 'keyword', 'file', 'url', 'comment', 'owner', 'timestamp'];
    var masterThesisFields = ['author', 'title', 'school', 'year', 'doi','abstract','type', 'month', 'address', 'note','crossref', 'keyword', 'url', 'comment', 'owner', 'timestamp'];
    var unpublishedFields = ['author', 'title', 'note', 'doi','abstract','year', 'month','crossref', 'keyword', 'url', 'comment', 'owner', 'timestamp'];
    var manualFields = ['title','doi','abstract','author','organization','month','address','editor','year','note','crossref', 'keyword', 'url', 'comment', 'owner', 'timestamp'];
    var conferenceFields = ['author','title','booktitle','year','doi','abstract','editor','pages','number','month','publisher','volume','series','address','organization','note','crossref', 'keyword', 'url', 'comment', 'owner', 'timestamp'];
    var bookFields = ['author','title','editor','year','doi','publisher','abstract','volume','number','series','month','edition','note','address','crossref', 'keyword', 'url', 'comment', 'owner', 'timestamp'];
    var bookletFields = ['title','doi','abstract','author','month','year','address','howpublished','note','crossref', 'keyword', 'url', 'comment', 'owner', 'timestamp'];


    var bibFields = {
        metadata: {
            type: 'article',
            operation: 'add',
            id: ""
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
            keyword: '',
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

    var bibEditMode = angular.copy(bibFields);
    var selectedTypeEditMode = angular.copy(selectedType);


    var getAvailableTypes = function() {
        return availableTypes;
    };

    var getSelectedType = function() {
        return selectedType;
    };

    var getSelectedTab = function() {
        return selectedTab;
    };

    var getBibFields = function() {
        return bibFields
    };

    var makeOtherFieldsEmpty = function(data, fieldList) {
        var keyPresent;
        angular.forEach(data.payload, function(value, key, obj) {
            keyPresent = fieldList.some(function(field) {
                return field === key;
            });

            if (!keyPresent) {
                obj[key] = ''
            }
        });
    };

    var cleanFields = function(data) {
        var keyPresent;
        switch (data.metadata.type) {
            case 'article':
                {
                    makeOtherFieldsEmpty(data, articleFields);
                    break;
                }
            case 'inproceedings':
                {
                    makeOtherFieldsEmpty(data, inProceedingsFields);
                    break;
                }
            case 'inbook':
                {
                    makeOtherFieldsEmpty(data, inBookFields);
                    break;
                }
            case 'masterthesis':
                {
                    makeOtherFieldsEmpty(data, masterThesisFields);
                    break;
                }
            case 'manual':
                {
                    makeOtherFieldsEmpty(data, manualFields);
                    break;
                }
            case 'book':
                {
                    makeOtherFieldsEmpty(data, bookFields);
                    break;
                }
            case 'booklet':
                {
                    makeOtherFieldsEmpty(data, bookletFields);
                    break;
                }
            case 'conference':
                {
                    makeOtherFieldsEmpty(data, conferenceFields);
                    break;
                }

            case 'incollection':
                {
                    makeOtherFieldsEmpty(data, inCollectionFields);
                    break;
                }
            case 'proceedings':
                {
                    makeOtherFieldsEmpty(data, proceedingsFields);
                    break;
                }
            case 'phdthesis':
                {
                    makeOtherFieldsEmpty(data, phdThesisFields);
                    break;
                }
            case 'techreport':
                {
                    makeOtherFieldsEmpty(data, techReportFields);
                    break;
                }
            case 'misc':
                {
                    makeOtherFieldsEmpty(data, miscFields);
                    break;
                }
            case 'unpublished':
                {
                    makeOtherFieldsEmpty(data, unpublishedFields);
                    break;
                }
        }
    };

    var addBib = function(data) {
        cleanFields(data);
        return $http.post('/api/addbib/', data);
    };

    var setBibToBeEdited = function(bib){
        bibEditMode.payload = bib;
        selectedTypeEditMode = availableTypes.filter(function(type){
            return type.name.toLowerCase() === bib.bibtype;
        })[0];
    };

    var getBibFieldsEditMode = function(){
        return bibEditMode;
    };

    var getSelectedTypeEditMode = function(){
        return selectedTypeEditMode;
    };



    var Bib = {
        getAvailableTypes: getAvailableTypes,
        getSelectedType: getSelectedType,
        getSelectedTab: getSelectedTab,
        addBib: addBib,
        getBibFields: getBibFields,
        setBibToBeEdited: setBibToBeEdited,
        getBibFieldsEditMode: getBibFieldsEditMode,
        getSelectedTypeEditMode: getSelectedTypeEditMode
    };



    return Bib;
}
