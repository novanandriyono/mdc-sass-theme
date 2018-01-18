# mdc-sass-theme

Learn theming MDC. source @material (warning: experimental!!)

## Getting Started

### Installing

```
npm install mdc-sass-theme
```


### Creating new theme

```
npm run create themename sasspath
```


###  Compile sass to css from node CLI

```
npm run compile themename sasspath csspath
```


###  Compile sass to css with require

```
var mdcsasstheme = require('mdc-sass-theme');
var options = {
	'name': 'mdc',
	'sassPath': yoursassfolder,
	'cssPath': yourcssfolder
};
console.log(mdcsasstheme(options).compile());
```


###  Copy Components @material from CLI

```
npm run components themename componensName sasspath
```


## Built With

* [node-sass](https://www.npmjs.com/package/node-sass)
* [csso](https://www.npmjs.com/package/csso)
* [material-components-web](https://www.npmjs.com/package/material-components-web)

## not goal T_T