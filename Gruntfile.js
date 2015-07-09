module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    var aws = grunt.file.readJSON('aws-keys.json');
    var options = grunt.file.readJSON('options.json');
    var template = "fail";

    grunt.initConfig({
        watch: {
            local: {
                files: ['src/css/**/*.scss', 'src/index.html', 'src/js/**/*.js', 'src/boot.js', 'src/assets/**/*'],
                tasks: ['sass', 'autoprefixer', 'cssmin', 'copy', 'htmlConvert', 'replace:html', 'requirejs', 'replace:local']
            },
            remote: {
                files: ['src/css/**/*.scss', 'src/index.html', 'src/js/**/*.js', 'src/boot.js'],
                tasks: ['sass', 'autoprefixer', 'cssmin', 'copy', 'htmlConvert', 'replace:html', 'requirejs', 'replace:remote', 'aws_s3']
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    src: 'src/css/*.scss',
                    dest: 'build/css/main.css'
                }]
            }
        },
        autoprefixer: {
            dist: {
                files: [{
                    src: 'build/css/main.css'
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    'build/css/main.css' : 'build/css/main.css'
                }]
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: './build/js/',
                    inlineText: true,
                    name: 'main',
                    out: 'build/js/main.js',
                    preserveLicenseComments: false,
                    useSourceUrl: true,
                    include: ['main'],
                    wrap: {
                        start: 'define(["require"],function(require){var req=(function(){',
                        end: 'return require; }()); return req; });'
                    }
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['assets/**', 'js/**', 'index.html', 'boot.js'],
                    dest: 'build/'
                }]
            }
        },
        replace: {
            local: {
                options: {
                    patterns: [{
                        match: /@@assetPath@@/g,
                        replacement: 'http://localhost:8000'
                    }]
                },
                files: [{
                    src: ['css/main.css', 'index.html', 'js/main.js','js/modules/*.js', 'boot.js'],
                    cwd: 'build',
                    dest: 'build',
                    expand: true
                }]
            },
            remote: {
                options: {
                    patterns: [{
                        match: /@@assetPath@@/g,
                        replacement: 'http://interactive.guim.co.uk/' + options.location
                    }]
                },
                files: [{
                    src: ['css/main.css', 'index.html', 'js/main.js', 'boot.js'],
                    cwd: 'build',
                    dest: 'build',
                    expand: true
                }]
            },
            html: {
                options: {
                    patterns: [{
                        match: /@@template@@/g,
                        replacement: function() {
                            return grunt.file.read('build/js/template.js');
                        }
                    }]
                },
                files: [{
                    src: ['js/main.js'],
                    cwd: 'build',
                    dest: 'build',
                    expand: true
                }]
            },
        },
        htmlConvert: {
            template: {
                src: ['src/index.html'],
                dest: 'build/js/template.js'
            }
        },
        connect: {
            server: {
                options: {
                    middleware: function (connect, options, middlewares) {
                        middlewares.unshift(function (req, res, next) {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Methods', '*');
                            return next();
                        });
                        return middlewares;
                    },
                    base: "build"
                }
            }
        },
        aws_s3: {
            options: {
                accessKeyId: aws.AWSAccessKeyID,
                secretAccessKey: aws.AWSSecretKey,
                region: 'us-east-1'
            },
            production: {
                options: {
                    bucket: 'gdn-cdn',
                },
                files: [{
                    expand: true,
                    cwd: 'build',
                    src: ['**'],
                    dest: options.location,
                    params: {
                        CacheControl: 'max-age=60'
                    }
                }]
            }
        }
    });

    grunt.registerTask('default', ['sass']);
    grunt.registerTask('local', ['connect', 'watch:local']);
    grunt.registerTask('remote', ['watch:remote']);
};