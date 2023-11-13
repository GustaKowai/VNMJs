import {textToBox,removeLastText,textToChoices} from "./textBoxScript.js"
//,changeSpriteChar,revealOneCharacter
const nxtBtn = document.getElementById('nextText');
const choose1 = document.getElementById('escolha1');
const choose2 = document.getElementById('escolha2');
const choose3 = document.getElementById('escolha3');
const choose4 = document.getElementById('escolha4');

var add = 0;
var paraCena1 = "";
var paraCena2 = "";
var paraCena3 = "";
var paraCena4 = "";
var speeds = {
  slow: 120,
  normal: 80,
  fast: 40
}
var letras = [];
async function readJson(path){
    console.log(path)
    fetch(path)
    .then((response) => response.json())
    .then((json) => json.cena)
    //.then((teste)=> console.log(teste))
    .then(function (value){
        textToChoices(value);
        paraCena1 = value.escolhas.escolha1.paraCena;
        paraCena2 = value.escolhas.escolha2.paraCena;
        paraCena3 = value.escolhas.escolha3.paraCena;
        paraCena4 = value.escolhas.escolha4.paraCena;
        textToBox(value);
        
    })
    //.then(console.log(letras))
    //.then(revealOneCharacter(letras))
}
function clicado(){
    console.log("cliquei");
}
//readJson('cena1.json')
nxtBtn.addEventListener('click',function(){
    if (add > 0){removeLastText()}
    readJson('cena'+add+'.json');
    add+=1;
});
function escolhido(num) {
      document.getElementById("escolha1").disabled = true;
      document.getElementById("escolha2").disabled = true;
      document.getElementById("escolha3").disabled = true;
      document.getElementById("escolha4").disabled = true;
      num == 1? readJson('cena'+paraCena1+'.json'):console.log("nao foi para a 1");
      num == 2? readJson('cena'+paraCena2+'.json'):console.log("nao foi para a 2");
      num == 3? readJson('cena'+paraCena3+'.json'):console.log("nao foi para a 3");
      num == 4? readJson('cena'+paraCena4+'.json'):console.log("nao foi para a 4");
    }
choose1.addEventListener('click',function(){
    removeLastText();
    escolhido(1);
});
choose2.addEventListener('click',function(){
    removeLastText();
    escolhido(2);
});
//revealOneCharacter(letras);

