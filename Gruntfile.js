module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    var aws = grunt.file.readJSON('aws-keys.json');
    var options = grunt.file.readJSON('options.json');

    grunt.initConfig({
        watch: {
            local: {
                files: ['src/css/**/*.scss', 'src/index.html', 'src/js/**/*.js'],
                tasks: ['sass', 'autoprefixer', 'cssmin', 'hash', 'copy', 'replace:local']
            },
            remote: {
                files: ['src/css/**/*.scss', 'src/index.html', 'src/js/**/*.js'],
                tasks: ['sass', 'autoprefixer', 'cssmin', 'hash', 'copy', 'replace:remote', 'copy', 'aws_s3']
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
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['assets/*', 'js/*', 'index.html', 'boot.js'],
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
                    src: ['css/main.css', 'index.html', 'js/main.js', 'boot.js'],
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
                    src: ['build'],
                    dest: options.location,
                    params: {
                        CacheControl: 'max-age=60'
                    }
                },{
                    src: ['build/assets/*'],
                    dest: options.location,
                    params: {
                        CacheControl: 'max-age=2678400'
                    }
                }]
            }
        },
        hash: {
            options: {
                mapping: 'src/hashmap.json',
                flatten: true
            },
            source: {
                src: 'src/assets/*',
                dest: options.location + '/hashed/'
            }
        }
    });

    grunt.registerTask('default', ['sass']);
    grunt.registerTask('local', ['connect', 'watch:local']);
    grunt.registerTask('remote', ['watch:remote']);
};