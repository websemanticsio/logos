/**
 * Generates all SVG and PNG logo variations from a single SVG template.
 *
 * The generated files are stored at 'assets' folder.
 * There are 4 types of output that can be used (copied to desired location):
 *
 * (1) SVG files located at 'assets/svg' and generated directly from 'src/logo.template'
 * (2) PNG files located at 'assets/png' and generated from all the SVG files from previous step
 * (3) ICO files located at 'assets/ico' and generated from 'assets/png/original-mascot-h256@2x.png'
 * (4) SVG SPRITE files located at 'assets/sprite' in two format, symbol and css,
 *                 __                                    __  _             _
 *  _      _____  / /_  ________  ____ ___  ____ _____  / /_(_)_________  (_)___
 * | | /| / / _ \/ __ \/ ___/ _ \/ __ `__ \/ __ `/ __ \/ __/ / ___/ ___/ / / __ \
 * | |/ |/ /  __/ /_/ (__  )  __/ / / / / / /_/ / / / / /_/ / /__(__  ) / / /_/ /
 * |__/|__/\___/_.___/____/\___/_/ /_/ /_/\__,_/_/ /_/\__/_/\___/____(_)_/\____/
 *
 * Empowering businesses, http://websemantics.io
 *
 * 2011-2016 Web Semantics, Inc.
 * All Rights Reserved.
 *
 * @link      http://ibuild.io
 * @link      http://websemantics.io
 * @author    Web Semantics, Inc. Dev Team <team@websemantics.io>
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 */

  var gulp      = require("gulp");
  var smart     = require("gulp-svg-smart");

  /* Load svg-smart resources */
  smart.load("smart.json", "package.json");

  // ---------------------------------------------------
  // TASK : default - require SVG SMARTs ..
  // ---------------------------------------------------
  gulp.task('default', ['svg-smart-tasks'],function() {

  });
