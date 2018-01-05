'use strict';
var letter = /^[0-9a-zA-Z]+$/;
module.exports = function(options){
	if(typeof options !== 'object'){
		console.log('not valid option');
		return;
	}

	if(!options.name.match(letter)){
		console.log('Theme name must alpha');
		return;
	}else{
		if((typeof options.sassPath != 'undefined') && (typeof options.cssPath != 'undefined')){
			if(options.for == 'sass'){
				return create(options.name,options.sassPath);
			}

			if(options.for == 'css'){
				return compile(options.name,options.sassPath,options.cssPath);
			}
		}
	}

function create(themename,pathsass){
	var fs = require('fs');
	fs.readFile(__dirname + '/dist/sass/new/index.scss', 'utf8', (err,txt) => {
	  if(err){
	  	console.log(err);
	  }else{
	  	fs.readdir(pathsass, (err,themeDir)=>{
			if(err){
		  		console.log("folder target no exist");
		  	}else{
		  		var themefolder =  pathsass + '/' + themename + '/';
		  		var newfile = themefolder + '/index.scss';
		  		if (!fs.existsSync(themefolder.toString())){
		  			fs.mkdirSync(themefolder.toString());
		  			fs.writeFile(newfile, txt, (err,file) => {
	  					if(err){
	  						console.log(err);
	  					}else{
	  						var mdcsasstheme = fs.readdirSync('./node_modules/mdc-sass/dist/theme/default');
  							for(var i = 0, len = mdcsasstheme.length; i < len; i++){
								var name = mdcsasstheme[i];
								var filepath = './node_modules/mdc-sass/dist/theme/default/' + name;
								var outputpath = themefolder + name;
								var newtxt = fs.readFileSync(filepath, 'utf8');
									fs.writeFile(outputpath, newtxt, (err,fileresult) => {
									  if (err){
									  	console.log(err);
									  }else{
									  	console.log(fileresult);
									  };
									});
							}
	  					}
		  			});
		  		}
		  	}
		});
	  }
	});
}

function compile(indexsasspath,pathsass,pathcss){
	var nodesass = require('node-sass');
	var fs = require('fs');
	var pathCss = pathcss + '/' + indexsasspath + '.css';
	var pathSass = pathsass + '/' + indexsasspath + '/index.scss';
	nodesass.render(
		{
			file: pathSass,
			outFile:pathCss,
		},
		function (error, result) {
			if (!error) {
				fs.writeFile(pathCss, result.css, function (err,file) {
					if (err) {
						console.log(err);
					} else {
						var csso = require('csso');
						var min = pathCss.replace(".css", ".min.css");
						var css = fs.readFileSync(pathCss, 'utf8');
						var minifiedCss = csso.minify(css).css;
						fs.writeFile(min, minifiedCss, function (err) {
							if (!err) {
								console.log('done minify');
							} else {
								console.log('sass compiled ok but writing to file failed');
							}
						});

					}

				});
			} else {
				console.log(error);
			}
		}
	);
}

};