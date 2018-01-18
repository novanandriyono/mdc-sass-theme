'use strict';
let name = undefined;
let sassPath = undefined;
const fs = require('fs');
const path = require('path');
const pycopy = require('pyfiles-copy');
module.exports = createTheme;

if(process.argv.length === 4){
if((typeof process.argv[2] != 'undefined') &&
	(typeof process.argv[3] != 'undefined')){
		name = process.argv[2];
		sassPath = process.argv[3]
		return cac(name,sassPath);
	}else{
		return console.log('please fill name and location for sass');
	}
}else{
}

function createTheme(name,sassPath){
	return cac(name,sassPath);
}

function cac(name,sassPath){

	var result = new Array();

	var sassPathName = sassPath + path.sep + name + path.sep + name + '.scss';

	if(fs.existsSync(sassPathName)){
		var sassPathmsg = 'Notice :' + sassPathName + ' exists' + "\n";
		result.push(sassPathmsg);
	}

	if(result.length === 0){
		return create(name,sassPath);
	}else{
		console.log(result.join());
		return;
	}
};

function create(name,sassPath){
	sassPath = path.normalize(sassPath);
	if(fs.existsSync(sassPath)){
		const options = {
			'toDir': sassPath,
			'fromDir': './node_modules/mdc-sass/dist/theme',
			'formatFile': 'scss',
			'srcFiles': false
		};
		if(typeof pycopy(options) === 'object'){
			const oldFolder = sassPath + path.sep + 'theme';
			const newFolder = sassPath + path.sep + name ;
			fs.rename(oldFolder,newFolder,(err)=>{
				if(err){
					return console.log(err);
				}else{
					const oldName = newFolder + path.sep + 'index.scss';
					const newName = newFolder + path.sep + name + '.scss';
					fs.rename(oldName,newName,(err)=>{
						if(err){
							return console.log(err);
						}else{
							return console.log('done', newFolder);
						};
					});
				};
			});
		}
	}else{
		return console.log(sassPath, 'doesnt exists');
	}
}