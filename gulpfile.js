var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');
var htmlreplace = require('gulp-html-replace');
var webserver = require('gulp-webserver');
var less = require('gulp-less-sourcemap');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var image = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var uglifyify = require("uglifyify");

var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function(error) {
      // Output an error message
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
  );
};

/*
    zkopiruje index.html a linkuje styly a scripty
*/ 
gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(htmlreplace({
        'js': 'js/react_bundle.js',
        'css': 'css/main.css'
    }))
    .pipe(gulp.dest('dist/'));
});
 
/*
    zpracovava ES6 a jsx a zbundluje do react_bundle.js
*/ 
gulp.task('bundle', function() {
    return browserify({
        extensions: ['.js', '.jsx'],
        entries: './src/js/index.js',
        debug: true
    })
    .transform(babelify.configure({
        ignore: /(bower_components)|(node_modules)/,
        presets: ["es2015", "react"]
    }))
    .bundle()
    .pipe(plumber(function(error) {
          // Output an error message
          gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
          // emit the end event, to properly end the task
          this.emit('end');
        })
      )
    .pipe(source('react_bundle.js'))
    .pipe(gulp.dest('dist/js'));
});

/*
    kompiluje less a vytvari sourceMaps
*/ 
gulp.task('less', function () {
    return gulp.src('src/less/*.less')
        .pipe(less({
            sourceMap: {
                sourceMapRootpath: 'less' // Optional absolute or relative path to your LESS files
            }
        }))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('images', function() {
    gulp.src('src/gifs/*')
    .pipe(image())
    .pipe(gulp.dest('dist/images'))
});

/*
    spusti dev server
*/ 
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
        livereload: true,
        directoryListing: false,
        open: true,
        fallback: 'index.html'
    }));
});

/*
    sleduje zmeny
*/ 
gulp.task('watch', function(){
    gulp.watch(['src/**/*.js'], ['bundle']);
    gulp.watch(['*.html'], ['html']);
    gulp.watch(['src/less/*.less'], ['less']);
});

gulp.task('build', ['html', 'bundle', 'images', 'less']);

gulp.task('dev', ['watch', 'webserver']);


//production

gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(htmlreplace({
        'js': 'js/react_bundle.js',
        'css': 'css/main.css'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('production_bundle', function() {
    return browserify({
        extensions: ['.js', '.jsx'],
        entries: './src/js/index.js',
    })
    .transform(babelify.configure({
        ignore: /(bower_components)|(node_modules)/,
        presets: ["es2015", "react"]
    }))
    .transform(uglifyify, { global: true  })
    .bundle()
    .pipe(source('react_bundle.js'))
    .pipe(streamify(uglify('react_bundle.js')))
    .pipe(gulp.dest('dist/js'));
    // https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
});

gulp.task('less', function () {
    return gulp.src('src/less/*.less')
        .pipe(less({
            sourceMap: {
                sourceMapRootpath: 'less' // Optional absolute or relative path to your LESS files
            }
        }))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('minify-css', function() {
    return gulp.src('dist/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css/'));
});


gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('prod', ['set-prod-node-env', 'html', 'less', 'minify-css','production_bundle']);

