'use strict';
const fs = require('fs');
const path = require('path');
const nodesass = require('node-sass');
let name = process.argv[2];
let sassPath = process.argv[3];
let cssPath = process.argv[4];

if((typeof process.argv[2] != 'undefined') &&
	(typeof process.argv[3] != 'undefined') &&
	(typeof process.argv[4] != 'undefined')){
		return cac(name,sassPath,cssPath);
	}else{
		return console.log('please fill name and location for sass and css folder');
	}

function cac(name,sassPath,cssPath){

	let result = new Array();

	let sassPathName = sassPath + path.sep + name + path.sep + name + '.scss';

	if(!fs.existsSync(sassPathName)){
		let sassPathmsg = 'Notice :' + sassPathName + ' doesnt exists' + "\n";
		result.push(sassPathmsg);
	}

	if(!fs.existsSync(cssPath)){
		let cssPathmsg = 'Notice :' + cssPath + ' doesnt exists' + "\n";
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
						const csso = require('csso');
						let min = cssPath.replace(".css", ".min.css");
						let css = result.css;
						let minifiedCss = csso.minify(result.css).css;
						fs.writeFile(min, minifiedCss, function (err) {
							if (!err) {
								let minMode = parseInt('0644',8);
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
					let pathCssMode = parseInt('0644',8);
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