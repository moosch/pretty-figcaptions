/* 
Class to create a canvas element that will be used to render the images JS can access
*/

var PFCanvas = function(){
	// Create the canvas element
	this.canvas = document.createElement('canvas');
	document.body.appendChild(this.canvas);

	return canvas;
}

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function isLight( color ){
	var hsp = Math.sqrt( // HSP equation from http://alienryderflex.com/hsp.html
		0.299 * (color.r * color.r) +
		0.587 * (color.g * color.g) +
		0.114 * (color.b * color.b)
	);
	return ( hsp > 90 );
	// return ( hsp > 127.5 );
}

var PrettyFigcaps = function(){
	var adjustColor = true;
	// Check for param
	if( arguments.length > 0 )
		adjustColor = (arguments[0] ? true : false);

	var init = function( image, caption ){
		// Apply padding now
		caption.style.padding = '14px 20px';
		// Get image
		var src = image.src;

		// Create canvas
		var canvas = PFCanvas();
		var ctx = canvas.getContext('2d');

		var img = new Image();
		// img.crossOrigin = 'anonymous';
		img.src = src;
		img.onload = function() {
			var color = getDominantColor(ctx, canvas, img, image);

			buildCaption( caption, color, isLight( color ) );
		};
	}

	var getDominantColor = function( ctx, canvas, img, image ){
		// Scale the original image to reduce number of colors. Converts to around 50 on average
		var ratio = image.clientWidth / image.clientHeight,
			width = 30,
			height = 30 / ratio;

		ctx.drawImage(img, 0,0, width, height);
		canvas.style.display = 'none';

		var data = ctx.getImageData(0, 0, width, height).data;

		return averageColorFromData(data);
	}

	var averageColorFromData = function( data ){
		// We are going to get an average of all Red, Green and Blue colors used in the image
		var rgb = {r:0,g:0,b:0}, // To become totals of rgb values within data
			num = 0; // Count of complete rgb sets to work with

		for( var i = 0; i < data.length; i++ ){
			// Add first set of 3 (r,g,b)
			if( i === 2 ){
				num++;
				rgb.r += data[i-2];
				rgb.g += data[i-1];
				rgb.b += data[i];
			}
			// Then add all subsequennt sets
			if( i % 4 === 0 ){
				num++;
				rgb.r += data[i];
				rgb.g += data[i+1];
				rgb.b += data[i+2];
			}
		}

		// Convert each color to averages
		rgb.r = Math.floor((rgb.r / num));
		rgb.g = Math.floor((rgb.g / num));
		rgb.b = Math.floor((rgb.b / num));

		// Now we have an average of R,G and B 
		return rgb;
	}

	var buildCaption = function( caption, color, isLight ){
		// Apply some styles to the caption
		var styles = {
			backgroundColor: 'rgb('+color.r+','+color.g+','+color.b+')',
			color: ( isLight && adjustColor ? 'rgb(255,255,255)' : 'inherit' )
		};
		for( key in styles )
			caption.style[key] = styles[key];
	}

	// Get all captions
	var figures = document.getElementsByTagName('figure');

	// If no captions then bail
	if( figures.length === 0 )
		return;

	// Create initial canvas
	// var ctx = PFCanvas();

	for( var i = 0; i < figures.length; i++ ){
		// Get caption
		var caption = figures[i].getElementsByTagName('figcaption'),
			image = figures[i].getElementsByTagName('img');
		if( caption.length === 0 || image.length === 0 )
			continue;

		init( image[0], caption[0] );
	}
}