'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('');
	$stateProvider.state('home', {
		url: '',
		templateUrl: '/app/home/home.tpl.html',
		controller: 'HomeController'
	})
	.state('home.createBib',{
		url: '/add-references',
		abstract: true,
		views: {
			'@home': {
				templateUrl: '/app/bib-create/bib-create.partial.html',
				controller: 'BibCreateController',
			}
		}
	})
	.state('home.createBib.addBib', {
		url: '/',
		views: {
			'@home.createBib': {
				templateUrl: '/app/bib-create/bib-add/bib-add.partial.html',
				controller: 'BibAddController'
			}
		},
		abstract: true
	})
	.state('home.createBib.addBib.types', {
		url: '',
		views: {
			/* Articles */
			'article@home.createBib.addBib': {
				templateUrl : '/app/bib-create/bib-add/article/article.partial.html'
			},
			'article-required@home.createBib.addBib.types' : {
				templateUrl: '/app/bib-create/bib-add/article/article-required.partial.html'
			},
			'article-general@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/article/article-general.partial.html'
			},
			'article-optional@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/article/article-optional.partial.html'
			},

			/* InProceedings */
			'inProceedings@home.createBib.addBib': {
				templateUrl: '/app/bib-create/bib-add/inProceedings/inproceedings.partial.html'
			},
			'inProceedings-required@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/inProceedings/inproceedings-required.partial.html'
			},
			'inProceedings-general@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/inProceedings/inproceedings-general.partial.html'
			},
			'inProceedings-optional@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/inProceedings/inproceedings-optional.partial.html'
			},

			/* InCollection */
			'inCollection@home.createBib.addBib': {
				templateUrl: '/app/bib-create/bib-add/inCollection/incollection.partial.html'
			},
			'inCollection-required@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/inCollection/incollection-required.partial.html'
			},
			'inCollection-general@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/inCollection/incollection-general.partial.html'
			},
			'inCollection-optional@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/inCollection/incollection-optional.partial.html'
			},

		}
	})


	.state('home.createBib.uploadBib', {
		url: '/u',
		views: {
			'@home.createBib': {
				templateUrl: 'app/bib-create/bib-upload/bib-upload.partial.html',
				controller: 'BibUploadController'
			}
		}
	});

}];