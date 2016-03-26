/**
 * Generates all SVG and PNG logo variations from a single SVG template. 
 *
 * The generated files are stored at 'assets' (or whatever value of '*_dist' variables) folder. 
 * There are 4 types of output that can be used (copied to desired location):
 *
 * (1) SVG files located at 'assets/svg' and generated directly from 'src/template.svg'
 * (2) PNG files located at 'assets/png' and generated from all the SVG files from previous step
 * (3) ICO files located at 'assets/ico' and generated from 'assets/png/logo_512@2x.png'
 * (4) SVG SPRITE files located at 'assets/sprite' in two format, symbol and css, 
 *                 __                                    __  _             _     
 *  _      _____  / /_  ________  ____ ___  ____ _____  / /_(_)_________  (_)___ 
 * | | /| / / _ \/ __ \/ ___/ _ \/ __ `__ \/ __ `/ __ \/ __/ / ___/ ___/ / / __ \
 * | |/ |/ /  __/ /_/ (__  )  __/ / / / / / /_/ / / / / /_/ / /__(__  ) / / /_/ /
 * |__/|__/\___/_.___/____/\___/_/ /_/ /_/\__,_/_/ /_/\__/_/\___/____(_)_/\____/ 
 *                                                                               
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

var gulp           = require("gulp");
var template       = require("gulp-nunjucks-render");
var rename         = require("gulp-rename");
var minify         = require("gulp-svgmin");
var sprite 	  	   = require("gulp-svg-sprite");
var svg2png 	   = require("gulp-svg2png");
var favicons       = require("gulp-favicons");

var svg_template   = 'src/template.svg';
var png_dist 	   = 'assets/png/';
var svg_dist 	   = 'assets/svg/';
var ico_dist 	   = 'assets/ico/';
var sprite_dist    = 'assets/sprite/';

var white_fill     = '#ffffff';
var pickled_fill   = '#364e66';

/* 
	List of colors for logo .. spoiled for choice 
*/

var logo_colors    = {  y : ['#f39c1f','#f1c40f'], /* yellow */
						g : ['#4bbba3','#3ca191'], /* green */
						b : ['#409ee0','#2a82c1'], /* blue */
						r : ['#e67e2f','#d3540f']  /* red */
					 };

/* 
	List of all required PNG files and sizes for both, logo and logo+text 
	key : file name
	value : 'svg' and image configs
*/

var logo_variants  = {
		'logo' : {
			svg : {
				template_data : {
				   show_text: false,
				   text_fill: pickled_fill,
				   width: 512,
				   height: 512,
				   logo_transform: 'translate(0)',
				   text_transform: 'translate(0) scale(1)'
				}
			},
			img : {
				height : {
					icon : [512,128,32,16],
					text : [34, 68]
				}
			}
		},
		'logo-h' : {
			svg : {
				template_data : {
				   show_text: true,
				   text_fill: pickled_fill,
				   width: 2900,
				   height: 512,
				   logo_transform: 'translate(0)',
				   text_transform: 'translate(0) scale(1)'
				}
			},
			img : {
				height : {
					icon : [512,128,32,16],
					text : [34, 68]
				}
			}
		},
		'logo-v' : {
			svg : {
				template_data : {
					show_text: true,
					text_fill: pickled_fill,
					width: 1400,
					height: 800,
					logo_transform: 'translate(442,0)',
					text_transform: 'translate(-341,558) scale(0.6)'
				}
			},
			img : {
				height : {
					icon : [512,128,32,16],
					text : [34, 68]
				}
			}
		},
	};

/**
 * Generate SVG files from the logo template
 *
 * @param {filename} string, the output filename
 * @param {data} array, the template data
 * @return {stream}.
 */

function svg(filename, _data, fill_1, fill_2, text_fill) 
{
	/* First, copy the object */
	var data = JSON.parse(JSON.stringify(_data));

	data['fill_1']    = fill_1;
	data['fill_2']    = fill_2;
	data['text_fill'] = text_fill || '';

	return gulp.src(svg_template)
		.pipe(template({ext:'.svg', data: data}))
		.pipe(minify())
		.pipe(rename(filename + '.svg'))
		.pipe(gulp.dest(svg_dist));

}

// ---------------------------------------------------
// TASK : default - process sprites
// ---------------------------------------------------

gulp.task('default', ['process-favicons'], function() {

	return gulp;
			// .src(svg_dist+'*.svg')
			// .pipe(sprite(svg_sprite_config ))
			// .pipe(gulp.dest(sprite_dist));

});

// ---------------------------------------------------
// TASK : process-favicons
// ---------------------------------------------------

gulp.task('process-favicons', ['process-png'], function() {
   
    return gulp;
		    // .src(png_dist+'logo_512@2x.png')
		    // .pipe(favicons(fav_icon))
		    // .on('error', function(){})
		    // .pipe(gulp.dest(ico_dist));

});

// ---------------------------------------------------
// TASK : process-png
// ---------------------------------------------------

gulp.task('process-png', ['process-svg'], function() {

	var stream = gulp;

	/* Generate all SVG files */
	for (var filename in logo_variants) { 
		
		var img = logo_variants[filename].img;

		/* Generate all icons */
		for (var i in img.height.icon) { 
			stream = png(filename, img.height.icon[i]);	
		}

		/* Generate all logo + text icons */
		for (var j in img.height.text) { 
			stream = png(filename + '-text', img.height.text[j]);	
		}
	}

	return stream;
});

// ---------------------------------------------------
// TASK : process-svg
// ---------------------------------------------------

gulp.task('process-svg', function() {

var stream = gulp;

	for (var color in logo_colors) {

		var fills = logo_colors[color];

		/* Generate all SVG files */
		for (var filename in logo_variants) { 
			var params = logo_variants[filename].svg;

			/* (1) Normal format */
			stream = svg(filename + '-' + color, params.template_data, fills[0], fills[1], pickled_fill);	

			/* (2) White text, for logo that has text */
			if(params.template_data['show_text']){
				stream = svg(filename  + '-' + color + '-w', params.template_data, fills[0], fills[1], white_fill);	
			}

			/* (3) Solid color (one per type) */
			stream = svg(filename + '-solid', params.template_data, pickled_fill, pickled_fill, pickled_fill);	
			
			/* (4) Solid white (one per type) */
			stream = svg(filename + '-white', params.template_data, white_fill, white_fill, white_fill);	
		}
	}

	return stream;

});









