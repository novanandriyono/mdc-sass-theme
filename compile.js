'use strict';
var fs = require('fs');
var path = require('path');
var nodesass = require('node-sass');
var name = undefined;
var sassPath = undefined;
var cssPath = undefined;
module.exports = compileTheme;
if(process.argv.length === 5){
if((typeof process.argv[2] != 'undefined') &&
	(typeof process.argv[3] != 'undefined') &&
	(typeof process.argv[4] != 'undefined')){
		var name = process.argv[2];
		var sassPath = process.argv[3];
		var cssPath = process.argv[4];
		return cac(name,sassPath,cssPath);
	}else{
		return console.log('please fill name and location for sass and css folder');
	}
}else{
	// return compivarheme(name,sassPath,cssPath);
}

function compileTheme(name,sassPath,cssPath){
	return cac(name,sassPath,cssPath);
}

function cac(name,sassPath,cssPath){

	var result = new Array();

	var sassPathName = sassPath + path.sep + name + path.sep + name + '.scss';

	if(!fs.existsSync(sassPathName)){
		var sassPathmsg = 'Notice :' + sassPathName + ' doesnt exists' + "\n";
		result.push(sassPathmsg);
	}

	if(!fs.existsSync(cssPath)){
		var cssPathmsg = 'Notice :' + cssPath + ' doesnt exists' + "\n";
		result.push(cssPathmsg);
	}

	if(result.length === 0){
		return compile(name,sassPath,cssPath);
	}else{
		console.log(result.join());
		return;
	}
};


function compile(name,sassPath,cssPath){
	sassPath = sassPath + path.sep + name + path.sep + name + '.scss';
	cssPath = cssPath + path.sep + name + '.css';
	sassPath = path.normalize(sassPath);
	cssPath = path.normalize(cssPath);
	nodesass.render(
		{
			file: sassPath,
			outFile:cssPath,
		},
		function (error, result) {
			if (!error) {
				fs.writeFile(cssPath, result.css, function (err,file) {
					if (err) {
						console.log(err);
					} else {
						var csso = require('csso');
						var min = cssPath.replace(".css", ".min.css");
						var minifiedCss = csso.minify(result.css).css;
						fs.writeFile(min, minifiedCss, function (err) {
							if (!err) {
								var minMode = parseInt('0644',8);
								fs.chmod(min,minMode,(err)=>{
									if(err){
									console.log(err);
									}
								});
								console.log('done minify');
							} else {
								console.log(err);
							}
						});
					}
					var pathCssMode = parseInt('0644',8);
					fs.chmod(cssPath,pathCssMode,(err)=>{
						if(err){
							console.log(err);
						}
					});
				});
			} else {
				console.log(error);
			}
		}
	);
}