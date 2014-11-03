module.exports = function(grunt) {
  return grunt.config("bump", {
    options: {
      files: ["bower.json", "package.json"],
      updateConfigs: ["bower", "pkg"],
      commit: false,
      commitMessage: "chore(build): Build v%VERSION%",
      tagMessage: "Build v%VERSION%",
      push: false,
      createTag: false
    }
  });
};
