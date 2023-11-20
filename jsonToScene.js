import { textToBox, removeLastText, textToChoices } from "./textBoxScript.js"
//,changeSpriteChar,revealOneCharacter
const nxtBtn = document.getElementById('nextText');
const startBtn = document.getElementById('start');
const choose1 = document.getElementById('escolha1');
const choose2 = document.getElementById('escolha2');
const choose3 = document.getElementById('escolha3');
const choose4 = document.getElementById('escolha4');

var add = "0";
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
async function readJson(path, balao) {
    console.log(path)
    removeLastText();
    atual = path
    console.log(balao)
    fetch(path)
        .then((response) => response.json())
        .then((json) => json.cena)
        //.then((teste)=> console.log(teste))
        .then(function (value) {
            nBalao = value.dialogos.numeroBaloes;
            if (balao < nBalao) {
                textToBox(value, balao);
                textToChoices(value);
            }
            paraCena1 = value.escolhas.escolha1.paraCena;
            paraCena2 = value.escolhas.escolha2.paraCena;
            paraCena3 = value.escolhas.escolha3.paraCena;
            paraCena4 = value.escolhas.escolha4.paraCena;
            balao < nBalao - 1 ? console.log("Ainda tem balao") : console.log("acabaram os baloes")


        })
    //.then(console.log(letras))
    //.then(revealOneCharacter(letras))
}
function clicado() {
    console.log("cliquei");
}
//readJson('cena1.json')
startBtn.addEventListener('click', function () {
    if (add > 0) { removeLastText() }
    console.log("cliquei aqui")
    readJson('cena' + add + '.json', 0);
    add += 1;
    document.getElementById("start").disabled = true;
    nxtBtn.disabled = false;
});
nxtBtn.addEventListener('click', function () {
    removeLastText();
    balao += 1
    console.log(add)
    readJson(atual, balao);
});
function escolhido(num) {
    document.getElementById("escolha1").disabled = true;
    document.getElementById("escolha2").disabled = true;
    document.getElementById("escolha3").disabled = true;
    document.getElementById("escolha4").disabled = true;
    num == 1 ? readJson('cena' + paraCena1 + '.json', 0) : console.log("nao foi para a 1");
    num == 2 ? readJson('cena' + paraCena2 + '.json', 0) : console.log("nao foi para a 2");
    num == 3 ? readJson('cena' + paraCena3 + '.json', 0) : console.log("nao foi para a 3");
    num == 4 ? readJson('cena' + paraCena4 + '.json', 0) : console.log("nao foi para a 4");
}
choose1.addEventListener('click', function () {
    removeLastText();
    balao = 0;
    escolhido(1);
});
choose2.addEventListener('click', function () {
    removeLastText();
    balao = 0;
    escolhido(2);
});
choose3.addEventListener('click', function () {
    removeLastText();
    balao = 0;
    escolhido(3);
});
choose4.addEventListener('click', function () {
    removeLastText();
    balao = 0;
    escolhido(4);
});
//revealOneCharacter(letras);

