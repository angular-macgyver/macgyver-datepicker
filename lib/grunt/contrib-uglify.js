module.exports = function(grunt) {
  grunt.config("uglify", {
    datepicker: {
      options: {
        mangle: {
          expect: ["angular"]
        },
        report: 'min',
        banner: "/*\n MacGyver Datepicker v<%= pkg.version %>\n https://github.com/angular-macgyver/macgyver-datepicker\n*/\n"
      },
      files: {
        "macgyver-datepicker.min.js": ["macgyver-datepicker.js"]
      }
    }
  });
};
