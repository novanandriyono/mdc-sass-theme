var fs = require('fs');
var cssPublic = './public/css/';
var cssDist = './dist/css/';
var allCssDist = fs.readdirSync(cssDist);
var i = 0;

	for(i, len = allCssDist.length; i < len; i++){
		var newName = cssPublic + allCssDist[i];
		var csspathdist = cssDist + allCssDist[i];
		var css = fs.readFileSync(csspathdist, 'utf8');
		fs.writeFile(newName, css, function (err) {
			if (!err) {
				console.log('done Move to Public');
			} else {
				console.log('sass compiled ok but writing to file failed');
			}
		});
	}