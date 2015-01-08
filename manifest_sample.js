// This is a sample manifest file for yatg tool
// Usually the 'property' are the directories and it's value 
//   being the url to the template file that's hosted on 
//   some site (most preferabley github)
//
// json format:-
// {
// 'directory/path/', ['url/to/template/file']
// }
module.exports = {
	'views/':'http://templateguru.com/index.js',
	'controllers/':'http://templateguru.com/index.js'
	'models/':'http://templateguru.com/models.js'
};
