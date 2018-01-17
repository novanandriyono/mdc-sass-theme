'use strict';
const compilejs = require('./compile.js');
let options = {};
let mdcsasstheme = function (options){
	if (!(this instanceof mdcsasstheme)) {
	    return new mdcsasstheme(options);
	}
	const compile = compilejs(options.name,options.sassPath,options.cssPath);

};
module.exports = mdcsasstheme;