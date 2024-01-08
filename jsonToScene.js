import {textToBox,removeLastText,textToChoices} from "./textBoxScript.js"
//,changeSpriteChar,revealOneCharacter
const nxtBtn = document.getElementById('nextText');
const startBtn = document.getElementById('start');
const choose1 = document.getElementById('escolha1');
const choose2 = document.getElementById('escolha2');
const choose3 = document.getElementById('escolha3');
const choose4 = document.getElementById('escolha4');
var jaJogou = false;
var add = "2b7";
var paraCena1 = "";
var paraCena2 = "";
var paraCena3 = "";
var paraCena4 = "";
var nBalao = 0
var atual = ""
var speeds = {
  slow: 120,
  normal: 80,
  fast: 40
}
var balao = 0
var letras = [];
//Le o arquivo Json e ja chama a função para colocar o texto na caixa de texto
async function readJson(path,balao){
    console.log(path)
    removeLastText();
    atual = path
    console.log(balao)
    fetch("cena/"+path)
    .then((response) => response.json())
    .then((json) => json.cena)
    //.then((teste)=> console.log(teste))
    .then(function (value){
        nBalao = value.dialogos.numeroBaloes;
        if(balao<nBalao){
            textToBox(value,balao);
            textToChoices(value);
        }
        if(balao == nBalao-1){
            nxtBtn.disabled = true;
        }
      //Seleciona para quais cenas que as escolhas podem levar
        paraCena1 = value.escolhas.escolha1.paraCena;
        paraCena2 = value.escolhas.escolha2.paraCena;
        paraCena3 = value.escolhas.escolha3.paraCena;
        paraCena4 = value.escolhas.escolha4.paraCena;
        balao<nBalao-1?console.log("Ainda tem balao"):console.log("acabaram os baloes")
        
        
    })
    //.then(console.log(letras))
    //.then(revealOneCharacter(letras))
}
function clicado(){
    console.log("cliquei");
}
//readJson('cena1.json')
//Botão inicialmente para começar o jogo. Atualmente é usado para testes de cenas específicas
startBtn.addEventListener('click',function(){
    if (add > 0){removeLastText()}
    console.log("cliquei aqui")
    readJson('cena'+add+'.json',0);
    add+=1;
    document.getElementById("start").disabled = true;
    nxtBtn.disabled = false;
});
//Passa para o próximo balão de fala
nxtBtn.addEventListener('click',function(){
    removeLastText();
    balao+=1
    console.log(add)
    readJson(atual,balao);
});
//Desativa os botões de escolha depois que um deles é escolhido.
function escolhido(num) {
      document.getElementById("escolha1").disabled = true;
      document.getElementById("escolha2").disabled = true;
      document.getElementById("escolha3").disabled = true;
      document.getElementById("escolha4").disabled = true;
  //Vai para a cena que a escolha determinou.
      if(num == 1){
        //No caso da escolha 1, determina também se a pessoa está no fim da cena e se é a primeira vez que alguém chega no final de uma cena.
        //No futuro será usado para saber se o dia acabou.
        if(paraCena1 == "interludio1"||paraCena1 == "interludio2"){
         if(jaJogou){
            readJson('cenafinal.json',0);
         }else{
            readJson('cena'+paraCena1+'.json',0);
            jaJogou = true
            console.log("Já Jogou? ",jaJogou)
         }
        }else{
            readJson('cena'+paraCena1+'.json',0);
            
        }
      }
      num == 2? readJson('cena'+paraCena2+'.json',0):console.log("nao foi para a 2");
      num == 3? readJson('cena'+paraCena3+'.json',0):console.log("nao foi para a 3");
      num == 4? readJson('cena'+paraCena4+'.json',0):console.log("nao foi para a 4");
    }
//Event Listeners das opções
choose1.addEventListener('click',function(){
    removeLastText();
    balao=0;
    escolhido(1);
});
choose2.addEventListener('click',function(){
    removeLastText();
    balao=0;
    escolhido(2);
});
choose3.addEventListener('click',function(){
    removeLastText();
    balao=0;
    escolhido(3);
});
choose4.addEventListener('click',function(){
    removeLastText();
    balao=0;
    escolhido(4);
});
//revealOneCharacter(letras);
//Começa o jogo assim que a tela termina de carregar.
window.onload = readJson('cena0.json',0);
