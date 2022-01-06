var testFolder = './data'; // data == ./data ./는 현재 데이터라는 것을 의미
var fs = require('fs');
 
fs.readdir(testFolder, function(error, filelist){
  console.log(filelist);
})