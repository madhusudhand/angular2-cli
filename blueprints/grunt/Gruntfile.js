module.exports = function(grunt){

  //build config
  const config = require('./build.config.json');

  //grunt config
  var grunt_config = {
    pkg: grunt.file.readJSON('package.json'),

    jade: {
      dev: {
        options: { pretty: true },
        files: [{
          src: config.app_files.jade,
          dest: config.build_dir,
          cwd: config.app_dir,
          expand: true,
          ext: '.html'
        }]
      },
      dist: {
        options: { pretty: false },
        files: [{
          src: config.app_files.jade,
          dest: config.build_dir,
          cwd: config.app_dir,
          expand: true,
          ext: '.html'
        }]
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: config.temp_dir,
          src: ['*.scss'],
          dest: config.build_dir,
          ext: '.min.css'
        }]
      }
    },

    ts: {
      dist: {
        tsconfig: config.app_dir + '/tsconfig.json'
      }
    },

    concat: {
      sass: {
        src: [config.app_dir + '/*.scss', config.app_dir + '/**/*.scss'],
        dest: config.temp_dir + '/' + config.app_files.css_file + '.scss',
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      js: {
        files: [{
          expand: true,
          cwd: config.build_dir,
          src: ['*.js', '!*.min.js', 'app/**/*.js', '!app/**/*.min.js'],
          dest: config.build_dir,
          ext: '.js'
        }]
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      app: {
        files: [{
          expand: true,
          cwd: config.temp_dir,
          src: [config.app_files.css_file + '.min.css'],
          dest: config.build_dir,
          ext: '.min.css'
        }]
      }
    },

    watch: {
      options: {
        spawn: false
      },

      // jade watch
      jade:{
        files: [config.app_dir + '/*.jade', config.app_dir + '/**/*.jade'],
        tasks: ['newer:jade:dev']
      },

      // ts watch
      ts: {
        files: [config.app_dir + '/*.ts', config.app_dir + '/**/*.ts'],
        tasks: ['ts']
      },

      // sass watch
      sass: {
        files: [config.app_dir + '/*.scss', config.app_dir + '/**/*.scss'],
        tasks: ['concat:sass', 'sass']
      }

    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            config.build_dir + '/*.css',
            config.build_dir + '/*.html',
            config.build_dir + '/**/*.html',
            config.build_dir + '/*.js',
            config.build_dir + '/**/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: './' + config.build_dir
        }
      }
    }
  };

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-newer');

  grunt.initConfig(grunt_config);

  grunt.registerTask('dev', [
    'jade:dev',
    'ts',
    'concat:sass',
    'sass'
  ]);
  grunt.registerTask('dist', [
    'init',
    'jade:dist',
    'concat',
    'sass',
    'cssmin',
    'uglify',
  ]);

  grunt.registerTask('serve', [
    'browserSync',
    'watch'
  ]);
}
