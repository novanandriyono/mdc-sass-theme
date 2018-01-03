var fs = require('fs');
var arg = process.argv[2];
var letter = /^[a-zA-Z]+$/;
var themeDir = fs.readdirSync('./themes');
var mdcsasstheme = fs.readdirSync('./node_modules/mdc-sass/dist/theme/default');

if(themeDir.indexOf(arg) == 1){
	console.log('themes name has exist');
	return;
}
if(arg.length > 20){
	console.log('Theme name must less than 20 char');
	return;
}
if(!arg.match(letter)){
	console.log('Theme name must alpha');
	return;
}

newthemes();
console.log('done');

function newthemes(){
	var i = 0;
	var newfolder = './themes/' + arg;

	if (!fs.existsSync(newfolder.toString())){
		fs.mkdirSync(newfolder.toString());
		writeindex(newfolder);
	}

	for(i, len = mdcsasstheme.length; i < len; i++){
		var sass =  fs.readFileSync('./node_modules/mdc-sass/dist/theme/default/' + mdcsasstheme[i], 'utf8');
		var name = mdcsasstheme[i];
		writeFile(sass,name.toString());
	}
}

function writeFile(sass,name){
	var newName = './themes/'+ arg + '/' + name;
	fs.writeFile(newName, sass, function (err) {
		if (!err) {
			// console.log('themes folder has been created on /themes');
		} else {
			console.log(err);
		}
	});

}

function writeindex(newfolder){
	var newIndex = newfolder + '/index.scss';
	fs.copyFile('./dist/sass/new/index.scss', newIndex, (err) => {
	  if(err){
	  	console.log(err);
	  	return;
	  };
	  // console.log('source was copied to destination');
	});
}