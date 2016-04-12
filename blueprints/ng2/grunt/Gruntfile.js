module.exports = function(grunt){

  //load build config file
  const build_config = require('./build.config.json');
  const libraries = require('./src/libraries.json');

  //grunt config
  var config = {
    pkg: grunt.file.readJSON('package.json'),

    jade: {
      dev: {
        options: { pretty: true },
        files: [{
          src: '<%= app_files.jade %>',
          dest: '<%= build_dir %>',
          cwd: '<%= app_dir %>',
          expand: true,
          ext: '.html'
        }]
      },
      dist: {
        options: { pretty: false },
        files: [{
          src: '<%= app_files.jade %>',
          dest: '<%= build_dir %>',
          cwd: '<%= app_dir %>',
          expand: true,
          ext: '.html'
        }]
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= temp_dir %>',
          src: ['*.scss'],
          dest: '<%= temp_dir %>',
          ext: '.css'
        }]
      }
    },

    ts: {
      dist: {
        tsconfig: './src/tsconfig.json'
      }
    },

    concat: {
      sass: {
        src: ['<%= app_dir %>/*.scss', '<%= app_dir %>/**/*.scss'],
        dest: '<%= temp_dir %>/<%= app_files.css_file %>.scss',
      },
      js: {
        options: {
          separator: ';'
        },
        src: ['<%= temp_dir %>/*.js'],
        dest: '<%= temp_dir %>/<%= app_files.js_file %>.js'
      }
    },

    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    //   },
    //   app: {
    //     files: {
    //       '<%= build_dir %>/<%= app_files.js_file %>.min.js': '<%= temp_dir %>/<%= app_files.js_file %>.js'
    //     }
    //   }
    // },

    uglify: {
      all: {
        files: [{
          expand: true,
          cwd: '<%= build_dir %>',
          src: ['*.js', '!*.min.js', 'app/**/*.js', '!app/**/*.min.js'],
          dest: '<%= build_dir %>',
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
        files: {
          '<%= build_dir %>/<%= app_files.css_file %>.min.css': '<%= temp_dir %>/<%= app_files.css_file %>.css'
        }
      }
    },

    copy: {
      vendor: {
        expand: true,
        cwd: 'node_modules/',
        src: '<%= vendor %>',
        dest: '<%= build_dir %>/vendor/'
      },
      thirdparty: {
        expand: true,
        cwd: 'node_modules/',
        src: '<%= thirdparty %>',
        dest: '<%= build_dir %>/thirdparty/'
      },
      assets: {
        expand: true,
        cwd: '<%= app_dir %>/',
        src: ['assets/**'],
        dest: '<%= build_dir %>/'
      },
      dev: {
        expand: true,
        cwd: '<%= temp_dir %>/',
        src: ['*.js','**/*.js','*.js.map','**/*.js.map'],
        dest: '<%= build_dir %>/'
      }
    },


    watch: {

      options: {
        spawn: false
      },

      // jade watch
      jade:{
        files: ['<%= app_dir %>/*.jade','<%= app_dir %>/**/*.jade'],
        tasks: ['jade:dev']
      },

      // ts watch
      ts: {
        files: ['<%= app_dir %>/*.ts', '<%= app_dir %>/**/*.ts'],
        tasks: ['ts']
      }

      // sass watch

    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            '<%= build_dir %>/*.css',
            '<%= build_dir %>/*.html',
            '<%= build_dir %>/**/*.html',
            '<%= build_dir %>/*.js',
            '<%= build_dir %>/**/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: './<%= build_dir %>'
        }
      }
    }

  }; // end of grunt config


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-browser-sync');


  grunt.initConfig(grunt.util._.extend(config, build_config, libraries));

  grunt.registerTask('default', []);
  grunt.registerTask('dev', [
    'jade:dev',
    'ts',
    'concat:sass',
    'sass',
    'copy',
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
