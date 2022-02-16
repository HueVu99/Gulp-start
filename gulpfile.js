const GulpClient = require("gulp");
const {src, dest, watch, series, parallel} = require("gulp");
const browserSync = require("browser-sync");
const del = require("del");
//var minify = require('gulp-minifier');
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")
const fileInclude = require("gulp-file-include");
//const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");



const html = () =>{
   return src("./src/html/*.html")
   .pipe(plumber({
       errorHandler: notify.onError()
   }))
    .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(size({title:"Display the size of your project"}))
    .pipe(dest("./public"))

}
const clear = () =>{
   return del("./public");

    
}
const server =()=>{
    browserSync.init({
        server:{
            baseDir:"./public"
        }
    });
}

const watcher = () => {
watch("./src/html/**/*.html",html);
}

exports.html = html;
exports.watch = watcher;
exports.clear = clear ;
exports.dev = series(
    clear,
    html,
    watcher
);