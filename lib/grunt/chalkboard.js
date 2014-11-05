module.exports = function(grunt) {
  grunt.config("chalkboard", {
    docs: {
      files: {
        "doc.md": ["macgyver-datepicker.js"]
      }
    }
  });
};
