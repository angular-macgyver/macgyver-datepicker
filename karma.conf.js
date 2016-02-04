module.exports = function(config) {
  return config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "bower_components/jquery/dist/jquery.js",
      "bower_components/jquery-ui/ui/core.js",
      "bower_components/jquery-ui/ui/jquery.ui.core.js",
      "bower_components/jquery-ui/ui/datepicker.js",
      "bower_components/jquery-ui/ui/jquery.ui.datepicker.js",
      "bower_components/angular/angular.js",
      "./macgyver-datepicker.js",
      "bower_components/angular-mocks/angular-mocks.js",
      "test/unit/*.spec.js"],
    reporters: ["progress"],
    logLevel: config.LOG_INFO,
    browsers: ["PhantomJS"],
    plugins: ["karma-*"]
  });
};
