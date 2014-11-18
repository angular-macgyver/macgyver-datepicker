module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('bower.json'),
    jqueryUI: grunt.file.readJSON('bower_components/jquery-ui/package.json')
  });

  grunt.loadTasks('lib/grunt');

  grunt.registerTask('test:ci', ['karma:travis']);
};
