'use strict';
const compilejs = require('./compile.js');
const createjs = require('./create.js');
let name = undefined;
let sassPath = undefined;
let cssPath = undefined;

function mdcsasstheme(options){
	if (!(this instanceof mdcsasstheme)) {
	    return new mdcsasstheme(options);
	}

	if(typeof options === 'object'){
		if(options.name !== undefined){
			name = options.name;
		}
		if(options.sassPath !== undefined){
			sassPath = options.sassPath;
		}
		if(options.cssPath !== undefined){
			cssPath = options.cssPath;
		}
		this.options = options;
	}
};
mdcsasstheme.prototype.compile = function (){
	return compilejs(this.options.name,this.options.sassPath,this.options.cssPath);
}
mdcsasstheme.prototype.create = function (){
	return createjs(this.options.name,this.options.sassPath);
}
module.exports = mdcsasstheme;