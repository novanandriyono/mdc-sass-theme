var fs = require('fs');
var themesdir = './themes/';
var outputdir = './dist/css/';
const nodesass = require('node-sass');
var files = fs.readdirSync(themesdir);
var i = 0;
	for(i, len = files.length; i < len; i++){
		var name = files[i];
		var filepath = themesdir + name + '/index.scss';
		var outputpath = outputdir + name + '.css';
		sass(filepath,outputpath);
	}

function sass(filepath,outputpath){
	nodesass.render(
			{
				file: filepath,
				outFile:outputpath
			},
			function (error, result) {
				if (!error) {
					fs.writeFile(outputpath, result.css, function (err) {
						if (!err) {
							ccss(outputpath);
						} else {
							console.log('sass compiled ok but writing to file failed');
						}
					})
				} else {
					console.log(error);
				}
			}
	);
}

function ccss(outputpath){
	var csso = require('csso');
	var min = outputpath.replace(".css", ".min.css");
	var css = fs.readFileSync(outputpath, 'utf8');
	var minifiedCss = csso.minify(css).css;
	fs.writeFile(min, minifiedCss, function (err) {
		if (!err) {
			console.log('done minify');
		} else {
			console.log('sass compiled ok but writing to file failed');
		}
	});
}
