// Gruntfile
module.exports = function(grunt){


    // Configuration
    // ------------------------------------

    folders = {
        public_root : './public_html/',
        assets : './assets/',
        views : './smarty/templates/',
        less: {
            source : './assets/less/',
            dest : './public_html/css/'
        },
        js: {
            source : './assets/js/',
            dest : './public_html/js/'
        }
    }


    // Grunt File Configs
    // ------------------------------------

    files = {
        js_main: {
            './public_html/js/main.built.min.js': // Destination
            [
                // List main JS application files here. Will be concatenated in order.
                './assets/js/main.js'
            ]
        },
        js_plugins: {
            './public_html/js/plugins.built.min.js': // Destination
            [ 
                // List JS plugins here. Will be concatenated in order.
                './bower_components/bootstrap/dist/js/bootstrap.js',
                './bower_components/video.js/video.js',
            ]
        },
        less: {
            './public_html/css/main.min.css': // Destination
            [
                // List less files here (use @import for additional files if possible)
                './assets/less/main.less'
            ]
        },
        cachebust: {
            // Destination                      // Source
            './public_html/css/main.min.css':   './public_html/css/main.min.css',
            './smarty/templates/header.tpl' :   './smarty/templates/header.tpl',
            './smarty/templates/footer.tpl' :   './smarty/templates/footer.tpl'
        },
        copy: {
            vendor_js: {
                source: 
                [
                    './bower_components/modernizr/modernizr.js',
                    './bower_components/jquery/jquery.min.js'
                ],
                dest: './public_html/js/'
            },
            bootstrap_fonts: {
                source: 
                [
                    './bower_components/bootstrap/fonts/*'
                ],
                dest: './public_html/fonts'
            }
        }
        
    }


    // Initialise the config object
    grunt.initConfig({

        // Grunt module configs
        // ------------------------------------
        
        // LESS PreProcessor
        /* Concates, compiles and minifies LESS */
        less: {
            default: {
                options: {
                    paths: folders.less,
                    compress: true,
                    cleancss: true
                },
                files: files.less
            },
            development: {
                options: {
                    paths: folders.less,
                    compress: false,
                    cleancss: false,
                    sourceMap: true,
                    sourceMapFilename: folders.less.dest + 'main.min.css.map',
                    sourceMapRootpath: '/',
                    sourceMapURL: './main.min.css.map'
                },
                files: files.less
            }
        },
        
        // Uglify JS Processor
        /* Concates and minifies JS */
        uglify: {
            default: {
                options: {
                    mangle: false
                },
                files: files.js_main
            },
            default_plugins: {
                options: {
                    mangle: false
                },
                files: files.js_plugins
            },
            development: {
                options: {
                    mangle: false,
                    sourceMap: true
                },
                files: files.js_main
            },
            development_plugins: {
                options: {
                    mangle: false,
                    sourceMap: true
                },
                files: files.js_plugins
            }
        },
        
        // Cache Buster
        /* Finds links to static assets and appends random parameter, forcing browsers to refresh cache  */
        asset_cachebuster: {
            options: {
                buster: Date.now(),
                htmlExtension: 'tpl'
            },
            build: {
                files: files.cachebust
            }
        },
        copy: {
            vendor_js: {
                src: files.copy.vendor_js.source,
                dest: files.copy.vendor_js.dest,
                expand: true,
                flatten: true,
                filter: 'isFile'
            },
            bootstrap_fonts: {
                src: files.copy.bootstrap_fonts.source,
                dest: files.copy.bootstrap_fonts.dest,
                expand: true,
                flatten: true,
                filter: 'isFile'
            }
        },
        
        // Watch
        /* Watches for changes in files and runs appropriate tasks. Makes use of Livereload browser plugin */
        watch: {
            less: {
                files: folders.less.source + '**/*.less',
                tasks: ['less:development', 'beep:2'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: folders.js.source + "**/*.js",
                tasks: ["uglify:development", 'beep:2'],
                options: {
                    livereload: true
                }
            },
            views: {
                files: [
                    folders.views + "./**/*.tpl",
                    folders.views + "./**/*.html",
                    folders.views + "./**/*.blade.php"
                ],
                options: {
                    livereload: true
                }
            }
        }
    });
    
    
    // Tasks Configs
    // ------------------------------------

    grunt.registerTask('default', [
      'less:development',
      'uglify:development',
      'uglify:development_plugins',
      'copy:vendor_js'
    ]);

    grunt.registerTask('css', [
      'less:development',
    ]);

    grunt.registerTask('js', [
      'uglify:development',
      'uglify:development_plugins',
    ]);
    
    grunt.registerTask('cachebust', [
        'asset_cachebuster'
    ]);
    
    grunt.registerTask('build', [
        'less:default',
        'uglify:default',
        'uglify:default_plugins',
        'asset_cachebuster',
        'copy:vendor_js'
    ]);
    
    
    // Module Imports
    // ------------------------------------

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-asset-cachebuster');
    grunt.loadNpmTasks('grunt-beep');

};