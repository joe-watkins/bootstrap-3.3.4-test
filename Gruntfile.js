'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var config = {
    sassDir : "styles", // directory of working sass
    cssDir : "styles", // directory to store compiled css
    jsDir : "scripts", // folder where js lives
    jsMain : "main.js", // main js file name
    jsMin : "main.min.js", // desired minified js file name
    jsVendorFiles : [ // extra scripts to include in concat+minification
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js'
    ],
    targetSass : "styles/main.scss", // eg. /sass/main.scss
    compiledCss : "styles/main.min.css", // eg. /css/main-min.scss,
    sassStyle : 'expanded', // expanded, compressed
    sassLineNumbers : true,
    baseDir : ".", // working dir
    tmpDir : ".tmp"
  }

  grunt.initConfig({

    config: config,

    watch: {
      sass : {
        files: [config.sassDir+'/**/*.scss'],
        tasks: ['sass','autoprefixer']
      },
      gruntfile: {
          files: ['Gruntfile.js']
      },
      js : {
        files: [config.jsDir+'/'+config.jsMain],
        tasks : ['uglify']
      }
  	}, // watch

    sass: {
      dist: {
        options: {
          style: config.sassStyle,
          lineNumbers : config.sassLineNumbers
        },
        files: {
          '<%= config.tmpDir %>/<%= config.compiledCss %>' : '<%= config.targetSass %>' // dest : source
        }
      }
    }, // sass

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      dist: {
        files: [{
            src: '<%= config.tmpDir %>/<%= config.compiledCss %>',
            dest: '<%= config.compiledCss %>'
        }]
      }
    },

    uglify: {
      my_target: {
        files: {
          '<%= config.jsDir %>/<%= config.jsMin %>': [config.jsVendorFiles,config.jsDir+'/'+config.jsMain]
        }
      }
    }, // uglify

    browserSync: {
      dev: {
        bsFiles: {
          src : [
              '<%= config.cssDir %>/*.css',
              '<%= config.jsDir %>/**/*.js',
              '**/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: config.baseDir
          }
        }
      }
    } // browserSync

  }); // initConfig

  // watch
  grunt.registerTask('default',['watch']);

  // server
  grunt.registerTask('serve',['browserSync','watch']);

};
