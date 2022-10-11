const { execSync } = require('child_process');
var path=require("path");
var args=process.argv;

var wd=path.normalize(args[2]);
if((args[5] || '')[0]=="{" ){
  var env=JSON.parse(args[5]);
  args.splice(5,1);
}
var command=args.splice(3).join(' ');
console.log(wd,command);
execSync(command,{cwd:wd,env:env,stdio:[process.stdin, process.stdout, process.stderr]});