/* global module:true */
/* global require:true */
module.exports = function (grunt) {

    grunt.initConfig({
        webfont: {
            icons: {
                src: 'src/*.svg',
                dest: 'font',
                destCss: 'style',
                options: {
                    templateOptions: {
                        baseClass: 'icon',
                        classPrefix: 'icon-',
                        mixinPrefix: 'icon-'
                    },
                    relativeFontPath: '../font/',
                    htmlDemo: true,
                    stylesheet: 'css',
                    engine: 'fontforge'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-webfont');

    grunt.registerTask('fonts', [
        'webfont'
    ]);
};
