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
            './public_html/build/js/main.built.min.js': // Destination
            [
                // List main JS application files here. Will be concatenated in order.
                './src/js/assets.js',
                './src/js/prototypes/sectionManager.js',
                './src/js/prototypes/background.js',
                './src/js/prototypes/player.js',
                './src/js/prototypes/platforms.js',
                './src/js/prototypes/bombs.js',
                './src/js/prototypes/shrooms.js',
                './src/js/prototypes/boss.js',
                './src/js/prototypes/timer.js',
                
                './src/js/prototypes/controls.js',
                
                './src/js/states/boot.js',
                './src/js/states/loading.js',
                './src/js/states/start.js',
                './src/js/states/game.js',
                './src/js/states/won.js',
                './src/js/states/lost.js',
                './src/js/states/scores.js',
                
                './src/js/main.js'
            ]
        },
        cachebust: {
            // Destination                      // Source
            './public_html/build/index.html' :   './public_html/build/index.html',
        },
        copy: {
            vendor_js: {
                source: 
                [
                    './bower_components/phaser-official/build/phaser.min.js'
                ],
                dest: './public_html/build/js/vendor'
            },
            audio: {
                source: './src/assets/audio',
                dest: './public_html/build/assets/audio'
	            
            },
        }
        
    }


    // Initialise the config object
    grunt.initConfig({

        // Grunt module configs
        // ------------------------------------
        
        // Uglify JS Processor
        /* Concates and minifies JS */
        uglify: {
            default: {
                options: {
                    mangle: false
                },
                files: files.js_main
            }
        },
        
		imagemin: {                          // Task
			default: {                          // Target
				options: {                       // Target options
					optimizationLevel: 3
				},
				files: [{
					expand: true,                  // Enable dynamic expansion
					cwd: './src/assets/',                   // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
					dest: './public_html/build/assets'                  // Destination path prefix
				}]
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
            audio: {
                dest: files.copy.audio.dest,
                expand: true,
                cwd: files.copy.audio.source, 
                src: ['**']
                //flatten: false,
                //cwd: '/',
                //filter: 'isFile'
            }
        },
        
    });
    
    
    // Tasks Configs
    // ------------------------------------

    grunt.registerTask('default', [
      'uglify:default',
      'copy:vendor_js',
      'imagemin:default',
      'copy:audio',
      'asset_cachebuster'
    ]);
    
    // Module Imports
    // ------------------------------------

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-asset-cachebuster');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

};