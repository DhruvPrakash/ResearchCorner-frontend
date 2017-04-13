'use strict';

angular.module('mlrg.bibcreate')
    .factory('Bib', Bib);

Bib.$inject = ['$http', 'FileUpload'];


function Bib($http, FileUpload) {

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
    var articleFields = ['author', 'title', 'journal', 'year', 'doi', 'abstract', 'volume', 'pages', 'note', '__markedentry', 'number', 'month', 'issn', 'crossref', 'keywords', 'file', 'url', 'comment', 'owner', 'timestamp'];
    var proceedingsFields = ['title', 'year', 'doi', 'abstract', 'editor', 'number', 'address', 'note', 'organization', 'volume', 'series', 'publisher', 'month', 'crossref', 'keywords', 'file', 'url', 'comment', 'owner', 'timestamp','__markedentry'];
    var inProceedingsFields = ['author', 'title', 'booktitle', 'year', 'doi', 'abstract', 'editor', 'number', 'pages', 'month', 'publisher', 'volume', 'series', 'address', 'organization', 'note', '__markedentry', 'crossref', 'keywords', 'file', 'url', 'comment', 'owner', 'timestamp'];
    var inBookFields = ['chapter', 'pages', 'title', 'publisher', 'year', 'author', 'editor', 'doi', 'abstract', 'volume', 'series', 'address', 'month', 'number', 'type', 'edition', 'note', 'crossref', 'keywords', 'file', 'url', 'comment', 'owner', 'timestamp','__markedentry'];
    var inCollectionFields = ['author', 'title', 'booktitle', 'publisher', 'year', 'doi', 'abstract', 'editor', 'number', 'type', 'pages', 'edition', 'note', 'volume', 'series', 'chapter', 'address', 'month', 'crossref', 'keywords', 'file', 'url', 'comment', 'owner', 'timestamp','__markedentry'];
    var phdThesisFields = ['author', 'title', 'school', 'year', 'doi', 'abstract', 'type', 'month', 'address', 'note', 'crossref', 'keywords', 'file', 'url', 'comment', 'owner', 'timestamp','__markedentry'];
    var techReportFields = ['author', 'title', 'institution', 'year', 'doi', 'abstract', 'type', 'address', 'note', 'number', 'month', 'crossref', 'keywords', 'file', 'url', 'comment', 'owner', 'timestamp','__markedentry'];
    var miscFields = ['doi', 'abstract', 'author', 'howpublished', 'year', 'title', 'month', 'note', 'crossref', 'keywords', 'file', 'url', 'comment', 'owner', 'timestamp','__markedentry'];
    var masterThesisFields = ['author', 'title', 'school', 'year', 'doi', 'abstract', 'type', 'month', 'address', 'note', 'crossref', 'keywords', 'url', 'comment', 'owner', 'timestamp','__markedentry'];
    var unpublishedFields = ['author', 'title', 'note', 'doi', 'abstract', 'year', 'month', 'crossref', 'keywords', 'url', 'comment', 'owner', 'timestamp','__markedentry'];
    var manualFields = ['title', 'doi', 'abstract', 'author', 'organization', 'month', 'address', 'editor', 'year', 'note', 'crossref', 'keywords', 'url', 'comment', 'owner', 'timestamp','__markedentry'];
    var conferenceFields = ['author', 'title', 'booktitle', 'year', 'doi', 'abstract', 'editor', 'pages', 'number', 'month', 'publisher', 'volume', 'series', 'address', 'organization', 'note', 'crossref', 'keywords', 'url', 'comment', 'owner', 'timestamp','__markedentry'];
    var bookFields = ['author', 'title', 'editor', 'year', 'doi', 'publisher', 'abstract', 'volume', 'number', 'series', 'month', 'edition', 'note', 'address', 'crossref', 'keywords', 'url', 'comment', 'owner', 'timestamp','__markedentry'];
    var bookletFields = ['title', 'doi', 'abstract', 'author', 'month', 'year', 'address', 'howpublished', 'note', 'crossref', 'keywords', 'url', 'comment', 'owner', 'timestamp','__markedentry'];

    var requiredFields = {
        'Article': ['author', 'journal', 'title', 'year', 'doi', 'abstract'],
        'InProceedings': ['author', 'booktitle', 'title', 'year', 'doi', 'abstract'],
        'InBook': ['chapter', 'pages', 'title', 'publisher', 'year', 'author', 'editor', 'doi', 'abstract'],
        'MasterThesis': ['author', 'school', 'title', 'year', 'doi', 'abstract'],
        'Unpublished': ['author', 'title', 'note', 'doi', 'abstract'],
        'Manual': ['title', 'doi', 'abstract'],
        'Book': ['author', 'publisher', 'title', 'year', 'doi', 'abstract', 'editor'],
        'Booklet': ['title', 'doi', 'abstract'],
        'Conference': ['author', 'booktitle', 'title', 'year', 'doi', 'abstract'],
        'Proceedings': ['title', 'year', 'doi', 'abstract'],
        'InCollection': ['author', 'booktitle', 'publisher', 'title', 'year', 'doi', 'abstract'],
        'PhdThesis': ['author', 'school', 'title', 'year', 'doi', 'abstract'],
        'TechReport': ['author', 'institution', 'title', 'year', 'doi', 'abstract'],
        'Misc': ['doi', 'abstract']
    };

    var bibFields = {
        metadata: {
            type: 'article',
            operation: 'add',
            id: ''
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
            keywords: '',
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
    var editInformationToBePreserved = {
        $$hashKey: null,
        id: null,
        isSelected: null,
        type: null
    };

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
        return bibFields;
    };

    var makeOtherFieldsEmpty = function(data, fieldList) {
        var keyPresent;
        angular.forEach(data.payload, function(value, key, obj) {
            keyPresent = fieldList.some(function(field) {
                return field === key;
            });

            if (!keyPresent) {
                obj[key] = '';
            }
        });
    };

    var cleanFields = function(data) {
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

    var addBib = function(data, mode) {
        if (mode === 'edit') {
            retainEditInformation(data);
        }
        cleanFields(data);
        var dataToBePosted = angular.copy(data);
        if (mode === 'edit') {
            setRetainedEditInformation(data);
        }
        //remove research paper path and then send
        //if(data.)

        var formData = new FormData();
        formData.append('metadata', JSON.stringify(dataToBePosted.metadata));
        formData.append('payload', JSON.stringify(dataToBePosted.payload));
        return $http.post('/api/addbib/', formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    };


    var retainEditInformation = function(data) {
        editInformationToBePreserved.$$hashKey = data.payload.$$hashKey;
        editInformationToBePreserved.id = data.payload.id;
        editInformationToBePreserved.isSelected = data.payload.isSelected;
        editInformationToBePreserved.type = data.metadata.type;
        editInformationToBePreserved = data.payload.researchpaperpath;
    };

    var setRetainedEditInformation = function(data) {
        data.payload.$$hashKey = editInformationToBePreserved.$$hashKey;
        data.payload.id = editInformationToBePreserved.id;
        data.payload.isSelected = editInformationToBePreserved.isSelected;
        data.payload.type = editInformationToBePreserved.type;
        data.payload.researchpaperpath = editInformationToBePreserved.researchpaperpath;
    };


    var renameFields  = function(bib) {
        bib.timestamp = bib.timeStamp;
        bib.booktitle = bib.bookTitle;
        bib.howpublished = bib.howPublished;
        bib.crossref = bib.crossRef;
        bib.__markedentry = bib.markedEntry;
        delete bib.timeStamp;
        delete bib.bookTitle;
        delete bib.howPublished;
        delete bib.crossRef;
        delete bib.markedEntry;
    };

    var setBibToBeEdited = function(bib) {
        /*quirky renaming because api returns erratic stuff*/
        renameFields(bib);
        bibEditMode.payload = bib;
        selectedTypeEditMode = availableTypes.filter(function(type) {
            return type.name.toLowerCase() === bib.type;
        })[0];
    };

    var getBibFieldsEditMode = function() {
        return bibEditMode;
    };

    var getSelectedTypeEditMode = function() {
        return selectedTypeEditMode;
    };

    var uploadPDFFile = function(fileData, data) {
        cleanFields(data);
        FileUpload.uploadPDFFile(fileData, data);
    };


    var checkIfRequiredPresent = function(name, payload) {
        var flag = true;
        angular.forEach(requiredFields[name], function(value) {
            if (payload[value] === '') {
                flag = false;
            }
        });
        return flag;
    };


    var Bib = {
        getAvailableTypes: getAvailableTypes,
        getSelectedType: getSelectedType,
        getSelectedTab: getSelectedTab,
        addBib: addBib,
        getBibFields: getBibFields,
        checkIfRequiredPresent: checkIfRequiredPresent,
        uploadPDFFile: uploadPDFFile,
        setBibToBeEdited: setBibToBeEdited,
        getBibFieldsEditMode: getBibFieldsEditMode,
        getSelectedTypeEditMode: getSelectedTypeEditMode

    };



    return Bib;
}
