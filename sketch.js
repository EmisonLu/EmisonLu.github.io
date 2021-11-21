// this program is written in P5.js by Wu Shengzhi(www.wushengzhi.xyz)
// I load every pixel of an image and map image data into 3 dimensional vector, inclusing X position, Y position and pixel brightness
// the brightness is demonstrated by the ellipse size, the darker, the bigger
// then every pixel is added into a particle system and then applies 2D Spring to its orginal position,
// when mouse is pressed, an attraction is applied 
// since in the first test, I found preload() does not work when uploaded into server,
// so I use a call back function in setup(), and a stupid method to ansure the image pixel is all loaded before draw() function is using
// the method is check whether s[49] the last number in this array is null or not  ^_^ that's the only simple way I can think of, hahah

var cnv;
var img;
var imgHeight= w = 50;
var imgWidth = h = 50;
var pic = [];
var aa = 0;

var s = [];
var mass = 30.0;
var gravity = 0.0;

// function preload() {
// 	// img = loadImage("assets/2.jpg");  // Load the image
// }

function setup() {
 cnv=createCanvas(400, 400);
 cnv.position(document.body.clientWidth/2 - 200,100)
	loadImage("image/icon/1.jpg", function(img) {
		img.loadPixels();
		for (var x = 0; x < imgWidth; x++) {
			for (var y = 0; y < imgHeight; y++) {
				var loc = y * imgWidth + x; // calculate X, Y pixel number into Pixel Array
				var bright = img.pixels[loc * 4]; // brightness 
				if (y % 2 == 0) { // make arrangement of pixel differently
					pic[loc] = createVector(x + 0.5, y, bright); // store image pixel data into 3 dimensional Vectors
				} else {
					pic[loc] = createVector(x, y, bright);
				}
			}
		}

		for (var i = 0; i < w; i++) {
			s[i] = [];
			for (var j = 0; j < h; j++) {
				var n = j * imgWidth + i;
				var b = map(pic[n].z, 0, 225, 6.0, 0); // map the brightness into ellipse size
				var x2 = map(pic[n].x, 0, imgWidth, 0, width);
				var y2 = map(pic[n].y, 0, imgHeight, 0, height);
				s[i][j] = new Spring2D(x2, y2, mass, gravity, b); // apply into Spring 2D
			}
		}
	}); // end with the call back
}

function draw() {
	background(255);
	if (s[49] != null) { // make sure the image is already loaded
		for (var i = 1; i < w; i++) {
			for (var j = 1; j < h; j++) {
				s[i][j].update();
				s[i][j].show();
			}
		}

		if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
			for (var i = 1; i < w; i++) {
				for (var j = 1; j < h; j++) {
					s[i][j].attraction(); // when mouse is in the window, apply attraction

				}
			}
		}
	}
}