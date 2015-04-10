var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var watchify = require('watchify');

function scripts(watch) {
	var bundler, rebundle;
	bundler = browserify('./index.jsx', {
		basedir: __dirname, 
		debug: true, 
		cache: {}, // required for watchify
		packageCache: {}, // required for watchify
		fullPaths: watch // required to be true only for watchify
	});
	if(watch) {
		bundler = watchify(bundler) 
	}

	bundler.transform(reactify);

	rebundle = function() {
	var stream = bundler.bundle();
	stream.on('error', function(){
		//ERROR
		console.log("ERROR");
	});
	stream = stream.pipe(source('bundle.js'));
		return stream.pipe(gulp.dest('.'));
	};

	bundler.on('update', rebundle);
	return rebundle();
}

gulp.task('scripts', function() {
  return scripts(false);
});
 
gulp.task('watchScripts', function() {
  return scripts(true);
});