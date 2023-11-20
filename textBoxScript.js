var container = document.querySelector(".text")
var escolha1 = document.getElementById("escolha1")
var escolha2 = document.getElementById("escolha2")
var escolha3 = document.getElementById("escolha3")
var escolha4 = document.getElementById("escolha4")
var speeds = {
  slow: 120,
  normal: 80,
  fast: 40
}
var acabouBalao = false
//remove o texto do balão antes de colocar novo texto
function removeLastText() {
  var lastText = document.querySelectorAll('.revealed');
  lastText.forEach(revealed => { revealed.remove(); });
  console.log("Texto")
}
//Coloca os textos dentro das escolhas
function textToChoices(value) {
  console.log("Escreveu as opções")
  let nChoices = value.dialogos.numeroEscolhas
  var paraCena1 = value.escolhas.escolha1.paraCena;
  var textChoice1 = value.escolhas.escolha1.texto;
  textChoice1.forEach((line, index) => {
    if (index < textChoice1.length - 1) {
      line.string += "  ";
    }
    line.string.split("").forEach(letra => {
      var span = document.createElement("span");
      span.textContent = letra;
      span.classList.add("revealed");
      escolha1.appendChild(span);
      letras.push({
        span: span,
        classes: line.classes || [],
      })
    })
  })
  //console.log(paraCena1);
  if (nChoices > 1) {
    var paraCena2 = value.escolhas.escolha2.paraCena;
    var textChoice2 = value.escolhas.escolha2.texto;
    textChoice2.forEach((line, index) => {
      if (index < textChoice2.length - 1) {
        line.string += "  ";
      }
      line.string.split("").forEach(letra => {
        var span = document.createElement("span");
        span.textContent = letra;
        span.classList.add("revealed");
        escolha2.appendChild(span);
        letras.push({
          span: span,
          classes: line.classes || [],
        })
      })
    })
    // console.log(paraCena2);
  }
  if (nChoices > 2) {
    var paraCena3 = value.escolhas.escolha3.paraCena;
    var textChoice3 = value.escolhas.escolha3.texto;
    textChoice3.forEach((line, index) => {
      if (index < textChoice3.length - 1) {
        line.string += "  ";
      }
      line.string.split("").forEach(letra => {
        var span = document.createElement("span");
        span.textContent = letra;
        span.classList.add("revealed");
        escolha3.appendChild(span);
        letras.push({
          span: span,
          classes: line.classes || [],
        })
      })
    })
    //console.log(paraCena3);
  }
  if (nChoices > 3) {
    var paraCena4 = value.escolhas.escolha4.paraCena;
    var textChoice4 = value.escolhas.escolha4.texto;
    textChoice4.forEach((line, index) => {
      if (index < textChoice4.length - 1) {
        line.string += "  ";
      }
      line.string.split("").forEach(letra => {
        var span = document.createElement("span");
        span.textContent = letra;
        span.classList.add("revealed");
        escolha4.appendChild(span);
        letras.push({
          span: span,
          classes: line.classes || [],
        })
      })
    })
    // console.log(paraCena4);
  }
  //console.log(value);
}
//Linhas de texto de falas
var letras = [];
function textToBox(cena, balao) {
  //pega todas as variáveis necessárias
  var activeChar = cena.dialogos.personagem
  var textLines = cena.dialogos.texto;
  var backgroundImg = cena.background;
  var nEscolhas = cena.dialogos.numeroEscolhas
  var nBalao = cena.dialogos.numeroBaloes;
  var numeroEscolhas = parseInt(nEscolhas, 10);
  document.getElementById('nextText').disabled = true
  nBalao -= 1
  balao < nBalao ? acabouBalao = false : acabouBalao = true
  console.log("Acabou o balao " + acabouBalao, balao, nBalao)
  //Muda o cenário
  var backgroundUrl = "url('img/background/" + backgroundImg + ".jpg')"
  document.body.style.backgroundImage = backgroundUrl;
  //Passa o texto para a caixa de texto, separando as letras
  textLines[balao].forEach((line, index) => {
    if (index < textLines[balao].length - 1) {
      line.string += "  ";
    }
    line.string.split("").forEach(letra => {
      var span = document.createElement("span");
      span.textContent = letra;
      container.appendChild(span);
      letras.push({
        span: span,
        isSpace: letra === " ",
        delayAfter: line.speed,
        classes: line.classes || [],
      })
    })
  })

  //textToBox(textLines);
  //textToBox(textLines2);


  //muda o humor do personagem
  function changeSpriteChar(mood) {
    var activeMood = "0";
    activeMood = "img/personagens/" + activeChar + "/" + mood + ".gif"
    document.getElementById("activeChar").src = activeMood;
  }
  function changePlayer(player) {
    if (player == "orange" || player == "blue") {
      container.classList.add("player-" + player);
      escolha1.classList.add("player-" + player);
      escolha2.classList.add("player-" + player);
      escolha3.classList.add("player-" + player);
      escolha4.classList.add("player-" + player);
    }
    if (player == "change"){
      container.classList.toggle("player-orange");
      escolha1.classList.toggle("player-orange");
      escolha2.classList.toggle("player-orange");
      escolha3.classList.toggle("player-orange");
      escolha4.classList.toggle("player-orange");
      container.classList.toggle("player-blue");
      escolha1.classList.toggle("player-blue");
      escolha2.classList.toggle("player-blue");
      escolha3.classList.toggle("player-blue");
      escolha4.classList.toggle("player-blue");
    }
  }

  //faz a ação de escrever
  function revealOneCharacter(list, acabouBalao) {
    var next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");
    next.classes.forEach((c) => {
      next.span.classList.add(c);
    });
    var delay = next.isSpace ? 0 : next.delayAfter - 20;
    if (list.length > 0) {
      setTimeout(function () {
        revealOneCharacter(list, acabouBalao);
        //console.log(delay)
      }, delay)
    } else {
      console.log(acabouBalao); document.getElementById('nextText').disabled = false;
      if (acabouBalao) {
        //revela as escolhas
        escolha1.disabled = false;
        if (numeroEscolhas > 1) { escolha2.disabled = false; }
        if (numeroEscolhas > 2) { escolha3.disabled = false; }
        if (numeroEscolhas > 3) { escolha4.disabled = false; }
      }
    }

    //checa a mudança de humor:
    let spanClassList = next.span.classList;
    let isMad = spanClassList.contains("brava");
    let isHappy = spanClassList.contains("feliz");
    let isNormal = spanClassList.contains("default");
    let isSerio = spanClassList.contains("serio");
    let isSurpresa = spanClassList.contains("serio");
    let isTriste = spanClassList.contains("triste");
    let isIrritada = spanClassList.contains("irritada");
    let isMeh = spanClassList.contains("meh");
    let isMuitoFeliz = spanClassList.contains("muitofeliz");
    let isSmirk = spanClassList.contains("smirk");
    let isWithKat = spanClassList.contains("katarina");
    let isWithAle = spanClassList.contains("alessandra");
    let isRecepcionista = spanClassList.contains("Recepcionista");
    let trocaPlayer = spanClassList.contains("trocaPlayer")
    let isOrange = spanClassList.contains("isOrange")
    let isBlue = spanClassList.contains("isBlue")
    if (isHappy) {
      changeSpriteChar("feliz");
    }
    if (isSurpresa) {
      changeSpriteChar("surpresa");
    }
    if (isMad) {
      changeSpriteChar("brava");
    }
    if (isNormal) {
      changeSpriteChar("default");
    }
    if (isSerio) {
      changeSpriteChar("serio");
    }
    if (isTriste) {
      changeSpriteChar("triste");
    }
    if (isIrritada) {
      changeSpriteChar("irritada");
    }
    if (isMeh) {
      changeSpriteChar("meh");
    }
    if (isMuitoFeliz) {
      changeSpriteChar("muitofeliz");
    }
    if (isSmirk) {
      changeSpriteChar("smirk");
    }
    if (isWithKat) {
      changeSpriteChar("withKat")
    }
    if (isWithAle) {
      changeSpriteChar("withAle")
    }
    if (isRecepcionista) {
      changeSpriteChar("Recepcionista")
    }
    if (trocaPlayer) {
      changePlayer("change")
    }
    if (isBlue) {
      changePlayer("blue")
    }
    if (isOrange) {
      changePlayer("orange")
    }
  }

  revealOneCharacter(letras, acabouBalao);
}
export { textToBox, removeLastText, textToChoices };
//,changeSpriteChar,revealOneCharacter
