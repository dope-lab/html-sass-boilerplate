# html-sass-boilerplate

This repo contains a simple boilerplate to kickstart your next HTML5 project.

The boilerplate contains an index file and a base `reset.scss` file.

The project uses `gulp-sass` to compile the sass.

<h3>Getting started</h3>

1. Clone the repo.
2. Run `npm i` to install the dependencies. (make sure you have node, npm and gulp isntalled globally. If not, please install those)


<h3>Running Gulp</h3>

1. The input scss, js and the output css, js directory can be set from the `gulpfile.js` file.
2. Once you have everything in place, run `gulp` to compile css and js.
3. Run `gulp buildProd` to compile and minify the files for production server
4. Run `gulp watch` to watch the scss & js files for change.
