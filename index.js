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
			  			fs.mkdir(themefolder.toString(),(err)=>{
			  				if(err){
			  					console.log(err);
			  				}else{
			  					fs.writeFile(newfile, txt, (err) => {
			  						if(err){
			  							console.log(err);
			  						}else{
			  							var mdcsasstheme = fs.readdirSync('./node_modules/mdc-sass/dist/theme/default');
			  							for(var i = 0, len = mdcsasstheme.length; i < len; i++){
			  								var name = mdcsasstheme[i];
			  								var filepath = './node_modules/mdc-sass/dist/theme/default/' + name;
			  								var outputpath = themefolder + name;
			  								var newtxt = fs.readFileSync(filepath, 'utf8');
			  								fs.writeFile(outputpath, newtxt, (err) => {
			  									if (err){
			  										console.log(err);
			  									}else{
			  										var outputpathMode = parseInt('0644',8);
			  										fs.chmod(outputpath,outputpathMode,(err)=>{
			  											if(err){
			  												console.log(err);
			  											}else{
			  												console.log(outputpath);
			  											}
			  										});
			  									};
			  								});
			  							}
			  							var newfileMode = parseInt('0644',8);
			  							fs.chmod(newfile,newfileMode,(err)=>{
			  								if(err){
			  									console.log(err);
			  								}else{
			  									console.log(newfile);
			  								}
			  							});
			  						}
			  					});
			  					var themefolderMode = parseInt('0755',8);
			  					fs.chmod(themefolder,themefolderMode,(err)=>{
					  				if(err){
					  					console.log(err);
					  				}else{
					  					console.log(themefolder);
					  				}
					  			});
			  				}
			  			});
			  		}else{
			  			console.log(themefolder, 'has exist');
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
						fs.chmod(pathCss,pathCssMode,(err)=>{
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

};