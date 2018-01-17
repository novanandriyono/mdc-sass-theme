'use strict';
const letter = /^[0-9a-zA-Z]+$/;
const name = process.argv[2];
const sassPath = process.argv[3];

if(process.argv[2] === undefined){
	console.log('Theme name must alpha');
	return;
}

if(!name.match(letter)){
	console.log('Theme name must alpha');
	return;
}else{
	if(typeof process.argv[3] != 'undefined'){
			return create(name,sassPath);
		}else{
			return console.log('please fill name and location for sass');
		}

	function create(name,sassPath){
		const fs = require('fs');
		const path = require('path');
		const pycopy = require('pyfiles-copy');
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

}