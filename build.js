const {compile} = require('handlebars')
const {promisify} = require('util')
var beautify = require('js-beautify').js
const recursive = promisify(require("recursive-readdir"));
const fs = require("fs");

const mod_name = 'More Ambitions - Find Purpose'

const data = require("./templates/data.json");
recursive("./templates")
  .then(files => {
    for(var file of files){
      if(file.endsWith('.txt') || file.endsWith('.csv')){
        console.log(`Processing ${file}`)
        const template = fs.readFileSync(file, 'utf8');
        const templateFunction = compile(template)
        const result = templateFunction(data)
        const destFile = file.replace(/^templates/, mod_name)
        fs.writeFileSync(destFile, result)
      }
    }
  })
  .catch(err =>{
    console.error(err)
  })
