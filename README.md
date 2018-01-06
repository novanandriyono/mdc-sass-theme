# mdc-sass-theme

Learn theming MDC. Form mdc-sass source @material (warning: experimental!!)

## Getting Started

### Installing

```
npm install mdc-sass-theme
```

### Creating new sass theme

```
var mdcsasstheme = require('mdc-sass-theme');
var pathsass = __dirname + '/<your sass folder>';
var pathcss = __dirname + '/<your css folder>';
var options = {
	'name': themename,
	'sassPath': pathsass,
	'cssPath': pathcss,
	'for': 'sass' <==== creating XD
}
console.log(mdcsasstheme(options));

```


###  Compile sass to css from node

```
var mdcsasstheme = require('mdc-sass-theme');
var pathsass = __dirname + '/<your sass folder>';
var pathcss = __dirname + '/<your css folder>';
var options = {
	'name': themename,
	'sassPath': pathsass,
	'cssPath': pathcss,
	'for': 'css' <==== compile XD
}
console.log(mdcsasstheme(options));

```


## Built With

* [node-sass](https://www.npmjs.com/package/node-sass)
* [csso](https://www.npmjs.com/package/csso)
* [mdc-sass](https://www.npmjs.com/package/mdc-sass)

## not goal T_T