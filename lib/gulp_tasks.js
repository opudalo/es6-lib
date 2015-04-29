"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var del = _interopRequire(require("del"));

var git = _interopRequire(require("gulp-git"));

var bump = _interopRequire(require("gulp-bump"));

var babel = _interopRequire(require("gulp-babel"));

var mocha = _interopRequire(require("gulp-mocha"));

var filter = _interopRequire(require("gulp-filter"));

var webpack = _interopRequire(require("gulp-webpack"));

var tagVersion = _interopRequire(require("gulp-tag-version"));

var mochaPhantomJS = _interopRequire(require("gulp-mocha-phantomjs"));

var webpackConfig = _interopRequire(require("./webpack_config"));

module.exports = function (config) {
  var rootDir = config.rootDir;
  var gulp = config.gulp;
  var testEnv = config.testEnv;
  var webpackNoParse = config.webpackNoParse;
  var es5mode = config.es5mode;

  var src = "" + rootDir + "/src",
      test = "" + rootDir + "/test",
      dist = "" + rootDir + "/dist",
      lib = "" + rootDir + "/lib",
      mochaPhantomConfig = {
    phantomjs: {
      useColors: true,
      settings: {
        webSecurityEnabled: false
      }
    }
  };

  gulp.task("default", ["watch"]);

  gulp.task("watch", ["test"], function () {
    gulp.watch([src + "/**/*", test + "/**/*"], ["test"]);
  });

  gulp.task("prepublish", ["build"]);

  gulp.task("build", ["copy-nonjs", "build-js"]);

  gulp.task("test", ["test-" + testEnv]);

  gulp.task("test-browser", ["webpack"], function () {
    return gulp.src("" + test + "/runner.html").pipe(mochaPhantomJS(mochaPhantomConfig)).on("error", onerror);
  });

  gulp.task("test-node", ["build"], function () {
    gulp.src(["" + test + "/**/*.js"]).pipe(mocha()).on("error", onerror);
  });

  gulp.task("webpack", ["build"], function () {
    var config = webpackConfig({
      rootDir: rootDir,
      noParse: webpackNoParse,
      es5mode: es5mode
    }),
        entry = config.entry,
        output = config.output.path;

    return gulp.src(entry).pipe(webpack(config)).pipe(gulp.dest(output));
  });

  gulp.task("clean", function (cb) {
    return del(lib, cb);
  });

  gulp.task("copy-nonjs", ["clean"], function () {
    return gulp.src(["" + src + "/**/*", "!" + src + "/**/*.js"]).pipe(gulp.dest(lib));
  });

  gulp.task("build-js", ["clean"], function () {
    if (es5mode) return gulp.src("" + src + "/**/*.js").pipe(gulp.dest(lib));else return gulp.src("" + src + "/**/*.js").pipe(babel({ experimental: true })).pipe(gulp.dest(lib));
  });

  /*
   *  gulp patch     # makes v0.1.0 → v0.1.1
   *  gulp feature   # makes v0.1.1 → v0.2.0
   *  gulp release   # makes v0.2.1 → v1.0.0
   */
  gulp.task("patch", function () {
    return inc("patch");
  });
  gulp.task("feature", function () {
    return inc("minor");
  });
  gulp.task("release", function () {
    return inc("major");
  });

  function onerror(err) {
    console.error(err);
    this.emit("end");
  }

  function inc(importance) {
    return gulp.src(["./package.json", "./bower.json"]).pipe(bump({ type: importance })).pipe(gulp.dest("./")).pipe(git.commit("version bump")).pipe(filter("package.json")).pipe(tagVersion({ prefix: "" }));
  }
};