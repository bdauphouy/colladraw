const mix = require("laravel-mix")

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .sass("resources/scss/index.scss", "public/css")
  .sass("resources/scss/global.scss", "public/css")
  .sass("resources/scss/login.scss", "public/css")
  .sass("resources/scss/drawing.scss", "public/css")
