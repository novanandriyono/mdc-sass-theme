'use strict';
const fs = require('fs');
const path = require('path');
const pycopy = require('pyfiles-copy');
const name = process.argv[2];
let componentName = process.argv[3];
let sassPath = process.argv[4];

if((typeof process.argv[2] != 'undefined') &&
	(typeof process.argv[3] != 'undefined') &&
	(typeof process.argv[4] != 'undefined')){
	return copyComponent(name,componentName,sassPath);
}else{
	return console.log('please fill name and location for sass and component @material folder');
}

function copyComponent(name,componentName,sassPath){
	sassPath = path.normalize(sassPath) + path.sep + name;
	componentName = './node_modules/mdc-sass/dist/@material' + path.sep + componentName;
	let options = {
		'toDir': sassPath,
		'fromDir': componentName,
		'formatFile': 'scss',
		'srcFiles': false
	};
	let result = pycopy(options);
	if(result.length === 0){
		return console.log(componentName, 'doesnt exists');
	}else{
		return console.log(componentName, 'has copy on', sassPath);
	}
}