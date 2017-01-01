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

			/*inBook */
			'inBook@home.createBib.addBib': {
				templateUrl: '/app/bib-create/bib-add/inBook/inbook.partial.html'
			},
			'inBook-required@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/inBook/inbook-required.partial.html'
			},
			'inBook-general@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/inBook/inbook-general.partial.html'
			},
			'inBook-optional@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/inBook/inbook-optional.partial.html'
			},

			/*masterThesis */
			'masterThesis@home.createBib.addBib': {
				templateUrl: '/app/bib-create/bib-add/masterThesis/masterThesis.partial.html'
			},
			'masterThesis-required@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/masterThesis/masterThesis-required.partial.html'
			},
			'masterThesis-general@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/masterThesis/masterThesis-general.partial.html'
			},
			'masterThesis-optional@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/masterThesis/masterThesis-optional.partial.html'
			},

			/* unpublished*/
			'unpublished@home.createBib.addBib': {
				templateUrl: '/app/bib-create/bib-add/unpublished/unpublished.partial.html'
			},
			'unpublished-required@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/unpublished/unpublished-required.partial.html'
			},
			'unpublished-general@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/unpublished/unpublished-general.partial.html'
			},
			'unpublished-optional@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/unpublished/unpublished-optional.partial.html'
			},

			/* manual*/
			'manual@home.createBib.addBib': {
				templateUrl: '/app/bib-create/bib-add/manual/manual.partial.html'
			},
			'manual-required@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/manual/manual-required.partial.html'
			},
			'manual-general@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/manual/manual-general.partial.html'
			},
			'manual-optional@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/manual/manual-optional.partial.html'
			},

			/* book*/
			'book@home.createBib.addBib': {
				templateUrl: '/app/bib-create/bib-add/book/book.partial.html'
			},
			'book-required@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/book/book-required.partial.html'
			},
			'book-general@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/book/book-general.partial.html'
			},
			'book-optional@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/book/book-optional.partial.html'
			},

			/* booklet*/
			'booklet@home.createBib.addBib': {
				templateUrl: '/app/bib-create/bib-add/booklet/booklet.partial.html'
			},
			'booklet-required@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/booklet/booklet-required.partial.html'
			},
			'booklet-general@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/booklet/booklet-general.partial.html'
			},
			'booklet-optional@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/booklet/booklet-optional.partial.html'

			},

			/* conference*/
			'conference@home.createBib.addBib': {
				templateUrl: '/app/bib-create/bib-add/conference/conference.partial.html'
			},
			'conference-required@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/conference/conference-required.partial.html'
			},
			'conference-general@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/conference/conference-general.partial.html'
			},
			'conference-optional@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/conference/conference-optional.partial.html'
			},

			/* Proceedings */
			'proceedings@home.createBib.addBib': {
				templateUrl: '/app/bib-create/bib-add/proceedings/proceedings.partial.html'
			},
			'proceedings-required@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/proceedings/proceedings-required.partial.html'
			},
			'proceedings-general@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/proceedings/proceedings-general.partial.html'
			},
			'proceedings-optional@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/proceedings/proceedings-optional.partial.html'
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


			/* PhdThesis */
			'phdThesis@home.createBib.addBib': {
				templateUrl: '/app/bib-create/bib-add/phdThesis/phdthesis.partial.html'
			},
			'phdThesis-required@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/phdThesis/phdthesis-required.partial.html'
			},
			'phdThesis-general@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/phdThesis/phdthesis-general.partial.html'
			},
			'phdThesis-optional@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/phdThesis/phdthesis-optional.partial.html'
			},

			/* TechReport */
			'techReport@home.createBib.addBib': {
				templateUrl: '/app/bib-create/bib-add/techReport/techreport.partial.html'
			},
			'techReport-required@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/techReport/techreport-required.partial.html'
			},
			'techReport-general@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/techReport/techreport-general.partial.html'
			},
			'techReport-optional@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/techReport/techreport-optional.partial.html'
			},

			/* Misc */
			'misc@home.createBib.addBib': {
				templateUrl: '/app/bib-create/bib-add/misc/misc.partial.html'
			},
			'misc-required@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/misc/misc-required.partial.html'
			},
			'misc-general@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/misc/misc-general.partial.html'
			},
			'misc-optional@home.createBib.addBib.types': {
				templateUrl: '/app/bib-create/bib-add/misc/misc-optional.partial.html'
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
	})
	.state('home.search',   {
		url: '/search',
		templateUrl: '/app/search/search.partial.html',
		controller: 'SearchController'
	});

}];