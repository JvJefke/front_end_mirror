var gulp = require('gulp');

var fs = require('fs');
var es = require('event-stream');
var merge = require('merge-stream');
var path = require('path');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ignore = require('gulp-ignore')
var clean = require('gulp-clean');

var app_path = './app/apps';

function getFolders(dir) {
    return fs.readdirSync(dir).filter(function (file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

gulp.task('clean', function () {
    return gulp.src("app/apps/**/*.gen.js", { read: false })
        .pipe(clean());
});

gulp.task('lint', ['clean'], function () {
    return gulp.src([
        'app/**/*.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task("main_a_script", ['clean'], function () {
    return gulp.src([
        'app/app.js',
        'app/services/*.js',
        'app/services/libs/*.js',
        'app/directives/*/*.js'
        ])
        .pipe(concat('main_scripts.gen.js'))
        .pipe(gulp.dest('js/'))
        .pipe(rename('main_scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/'));
});

gulp.task("app_scripts", ['clean'], function () {
    var folders = getFolders(app_path);

    var tasks = folders.map(function (folder) {
        return gulp.src([path.join(app_path, folder, '/**/*.js'), '!' + app_path + '/**/theme*/**/*.js', '!' + app_path + '/**/min/*.js'])
            .pipe(concat(folder + '.gen.js'))
            .pipe(gulp.dest(path.join(app_path, folder, "min")))
            .pipe(rename(folder + '.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(path.join(app_path, folder, "min")));
    });

    return merge(tasks);
});

gulp.task("app_theme_scripts", ['clean'], function () {
    var folders = getFolders(app_path);
    

    var tasks = folders.map(function (folder) {
        var subfolders = getFolders(path.join(app_path, folder));
        subfolders = subfolders.filter(function (item) {
            return item.indexOf("theme") == 0;
        });

        var subtasks = subfolders.map(function(subfolder){
            return gulp.src([path.join(app_path, folder, subfolder, '*.js')])
            .pipe(concat(folder + '_' + subfolder + '.gen.js'))
            .pipe(gulp.dest(path.join(app_path, folder, subfolder, "min")))
            .pipe(uglify())
            .pipe(rename(folder + '_' + subfolder + '.min.js'))
            .pipe(gulp.dest(path.join(app_path, folder, subfolder, "min")));
        });
        
        return es.concat.apply(null, subtasks);
    });
    
    return tasks;
})

// Concatenate & Minify JS
gulp.task('script', ['clean'], function () {
    return gulp.src([
        'js/dev/jquery-1.11.2.min.js',
        'js/dev/microphone.min.js',
        'js/dev/underscore-min.js',
        'js/dev/angular.min.js',
        'js/dev/*.js',
        'js/main_scripts.min.js'
    ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('js'));
});

// Watch Files For Changes
//gulp.task('watch', function () {
//    gulp.watch(['js/dev/*.js', '/app/**/*.js', '!/app/**/*.min.js', '!/app/**/*.gen.js'], ['lint', 'main_a_script', 'script']);
//});

// Default Task
gulp.task('default', ['clean', 'main_a_script', 'script', 'app_theme_scripts', 'app_scripts']);