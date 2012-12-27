module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // ### clean
    // grunt-contrib-clean npm task
    // Deletes the <string> paths in the array
    // Deleting the deploy directory and the .html files in the docs directory (must leave css)
    clean: {
      clean: [ "dist", "docs/*.html" ]
    },

    // ### copy
    // grunt-contrib-copy npm task
    // Copy all source files to destination directory
    // We will do all further processing on the destination directory
    copy: {
      dist: {
        files: {
          "dist/": ["src/**/*", "src/.htaccess"]
        }
      }
    },

    // ### jshint
    // grunt-contrib-jshint npm task
    // Validates files with JSHint
    // Only using the beforeconcat target because not using grunt-contrib-concat
    // Lints listed files before optimization
    jshint: {
      options: {
        browser: true,
        curly: true,
        eqeqeq: true,
        eqnull: true
      },
      beforeconcat: [
        "Gruntfile.js",
        "src/app/**/*.js"
      ]
    },

    // ### requirejs
    // grunt-requirejs npm task
    // Many options are identical to the r.js options
    // r.js will remove combined files, so only run this on the destination directory
    // TODO: Programmatically determine modules
    requirejs: {
      compile: {
        options: {
          dir: "dist/",
          appDir: "dist/",
          baseUrl: 'app/',
          mainConfigFile: 'dist/app/main.js',
          keepBuildDir: true,
          optimize: 'uglify2',
          skipDirOptimize: true,
          optimizeCss: 'standard',
          inlineText: true,
          useStrict: true,
          removeCombined: true,
          modules: [
            {
              name: 'main',
              include: ['text', 'superview']
            },
            {
              name: 'homeMain',
              exclude: ['main']
            },
            {
              name: 'oneMain',
              exclude: ['main']
            },
            {
              name: 'twoMain',
              exclude: ['main']
            },
            {
              name: 'threeMain',
              exclude: ['main']
            },
            {
              name: 'mainmenuMain',
              exclude: ['main']
            },
            {
              name: 'widgetoneMain',
              exclude: ['main']
            },
            {
              name: 'widgettwoMain',
              exclude: ['main']
            },
            {
              name: 'widgetthreeMain',
              exclude: ['main']
            }
          ],
          wrap: true,
          onBuildWrite: function(moduleName, path, contents) {
            return contents.replace(/\/src/g, '/dist');
          }
        }
      }
    },

    // ### watch
    // built-in task
    // Start with `grunt watch`
    // Will execute the listed targets on file save
    watch: {
      lint: {
        files: '<%= jshint.beforeconcat %>',
        tasks: ['jshint'],
        options: {
          interrupt: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask( "default", [ "clean", "jshint", "copy", "requirejs" ] );

};