import {textToBox,removeLastText} from "./textBoxScript.js"
//,changeSpriteChar,revealOneCharacter
const nxtBtn = document.getElementById('nextText');

var add = 0;
var speeds = {
  slow: 120,
  normal: 80,
  fast: 40
}
var letras = [];
async function readJson(path){
    fetch(path)
    .then((response) => response.json())
    .then((json) => json.cena)
    //.then((teste)=> console.log(teste))
    .then((value)=> textToBox(value))
    //.then(console.log(letras))
    //.then(revealOneCharacter(letras))
}
function clicado(){
    console.log("cliquei")
};
//readJson('cena1.json')
nxtBtn.addEventListener('click',function(){
    if (add > 0){removeLastText()}
    readJson('cena'+add+'.json');
    add+=1 
    
});

//revealOneCharacter(letras);

