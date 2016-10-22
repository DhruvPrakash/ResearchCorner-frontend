var gulp = require('gulp'),
	jshint = require('gulp-jshint')
	less = require('gulp-less')
	browserSync = require('browser-sync'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat');

gulp.task('default', ['watch','browserify','browser-sync']);

// gulp.task('jshint', function(){
// 	return gulp.src('source/javascript/**/*.js')
// 		.pipe(jshint())
// 		.pipe(jshint.reporter('jshint-stylish'));
// });

// gulp.task('build-css', function(){
// 	return gulp.src('source/less/**/*.less')
// 		.pipe(less())
// 		.pipe(gulp.dest('public/assets/stylesheets'));
// });

gulp.task('watch', function(){
	gulp.watch('app/**/*.js', ['browserify']);
	gulp.watch('source/less/**/*.less', ['build-css']);
});

gulp.task('browser-sync', function(){
	var files = ['app/**/*.html',
		'app/**/*.js'
	];

	browserSync.init(files, {
		server: {
			baseDir: './'
		}
	});
});

// gulp.task('build-js', function(){
// 	return gulp.src('./app/**/*.js')
// 		.pipe(concat('scripts.js'))
// 		.pipe(gulp.dest('./dist/'))
// });

gulp.task('browserify', function(){
	gulp.src(['app/app.js'])
		.pipe(browserify({
			insertGlobals: true,
			debug: true
		}))
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('./dist'));
});