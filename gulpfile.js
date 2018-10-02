const gulp      = require("gulp"); 
const concat    = require("gulp-concat"); 
const uglify    = require("gulp-uglify"); 
const cleanCSS  = require("gulp-clean-css"); 
const watch     = require("gulp-watch"); 
const imagemin  = require('gulp-imagemin');
/* Flytta HTML-filer */
gulp.task("copyhtml", function(){
    return gulp.src("src/*.html")  /* */
        .pipe(gulp.dest("pub/")) /* Skickar vidare till mappen pub */
});     

/*Sätta ihop och minifiera JS-filer */ 
gulp.task("concominjs", function(){
    return gulp.src("src/js/*.js") /* Hämtar från */
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("pub/js")); 
}); 

/* Kontrollera ändringar i filsystemet */ 
gulp.task("watch", function() {
    watch("src/js/*.js", function() {
        gulp.start("concominjs"); 
    }); 
   
});

/* Minifiera och sätta ihop css-filer */ 
gulp.task('minify-css', function() {
    return gulp.src('src/css/*.css')
      .pipe(concat("style.css"))
      .pipe(cleanCSS())
      .pipe(gulp.dest('pub/css'));
  });

 /* Minifiera bilder */ 
 gulp.task('mini-images', function() {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('pub/images'))
}); 

gulp.task("default", ["copyhtml", "concominjs", "watcher"]); 
   
