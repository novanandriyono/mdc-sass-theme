# mdc-sass-theme

Learn theming MDC and test it. Form mdc-sass source @material (warning: experimental!!)

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


========================================================================================================

### Creating New Theme (builtin test serve with CLI)

## test on localhost

```
npm run serve
```

please take a look -> public folder to edit

```
npm run new <themename>
```


## Compile all theme (built in test serve with CLI)

```
npm run public
```

all theme compile on ./dist/css and ./public/css

## Built With

* [material-components-web](https://material.io/components/web/)
* [node-sass](https://www.npmjs.com/package/node-sass)
* [csso](https://www.npmjs.com/package/csso)
* [connect](https://www.npmjs.com/package/connect)
* [serve-static](https://www.npmjs.com/package/serve-static)
* [mdc-sass](https://www.npmjs.com/package/mdc-sass)

## not goal T_T