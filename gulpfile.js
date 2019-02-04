


var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
const minify = require('gulp-minify');

//Task for processing js with browserify
gulp.task('js', function(){
  gulp.src('src/javascripts/*.js')
   .pipe(concat('bundle.js'))
   .pipe(browserify())
   .pipe(gulp.dest('public/javascripts'));
 });


 //1 
 gulp.task('criteoBidAdapter', function(){
  gulp.src('files/src/criteoBidAdapter.js')
   //.pipe(concat('bundle.js'))
   .pipe(browserify())
   .pipe(minify())
   .pipe(gulp.dest('files/1'));
 });


  //2
  gulp.task('rubiconBidAdapter', function(){
    gulp.src('files/src/rubiconBidAdapter.js')
     //.pipe(concat('bundle.js'))
     .pipe(browserify())
     .pipe(minify())
     .pipe(gulp.dest('files/2'));
   });


     //3
  gulp.task('appnexusBidAdapter', function(){
    gulp.src('files/src/appnexusBidAdapter.js')
     //.pipe(concat('bundle.js'))
     .pipe(browserify())
     .pipe(minify())
     .pipe(gulp.dest('files/3'));
   });


   ///// combine


    //4
 gulp.task('criteo_rubicon', function(){
  gulp.src('files/src/criteoBidAdapter.js','files/src/rubiconBidAdapter.js')
   .pipe(concat('criteo_rubicon.js'))
   .pipe(browserify())
   .pipe(minify())
   .pipe(gulp.dest('files/4'));
 });


  //5
  gulp.task('criteo_appnexus', function(){
    gulp.src('files/src/criteoBidAdapter.js','files/src/appnexusBidAdapter.js')
     .pipe(concat('criteo_appnexus.js'))
     .pipe(browserify())
     .pipe(minify())
     .pipe(gulp.dest('files/5'));
   });


     //6
  gulp.task('appnexus_rubicon', function(){
    gulp.src('files/src/appnexusBidAdapter.js','files/src/rubiconBidAdapter.js')
     .pipe(concat('appnexus_rubicon.js'))
     .pipe(browserify())
     .pipe(minify())
     .pipe(gulp.dest('files/6'));
   });


       //all
  gulp.task('all', function(){
    gulp.src('files/src/appnexusBidAdapter.js','files/src/rubiconBidAdapter.js','files/src/criteoBidAdapter.js')
     .pipe(concat('criteo_appnexus_rubicon.js'))
     .pipe(browserify())
     .pipe(minify())
     .pipe(gulp.dest('files/7'));
   });





gulp.task('js', gulp.parallel('criteoBidAdapter', 'rubiconBidAdapter','appnexusBidAdapter','criteo_rubicon','criteo_appnexus','appnexus_rubicon','all'));

gulp.task('default', gulp.series('js'));



 
 


 
