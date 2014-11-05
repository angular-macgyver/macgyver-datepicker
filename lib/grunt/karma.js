module.exports = function(grunt) {
  grunt.config("karma", {
    options: {
      configFile: "karma.conf.js"
    },
    unit: {
      background: true
    },
    travis: {
      reporters: ["dots"],
      singleRun: true
    },
    build: {
      singleRun: true
    }
  });
};
