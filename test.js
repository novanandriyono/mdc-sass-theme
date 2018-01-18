'use strict';
var path = require('path');
var mdcsasstheme = require('./index.js');
var options = {
	'name': 'mdc',
	'sassPath': './test/sass',
	'cssPath': './test/css'
};
// console.log(mdcsasstheme(options).create());
console.log(mdcsasstheme(options).compile());