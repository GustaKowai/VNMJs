import {textToBox} from "./textBoxScript.js"
//,changeSpriteChar,revealOneCharacter

var add;
var speeds = {
  slow: 120,
  normal: 80,
  fast: 40
}
var letras = [];
async function readJson(path){
    fetch(path)
    .then((response) => response.json())
    .then((json) => json.cena.dialogos.texto)
    .then((value)=> textToBox(value))
    //.then(console.log(letras))
    //.then(revealOneCharacter(letras))
}

readJson('cena1.json')
//revealOneCharacter(letras);

