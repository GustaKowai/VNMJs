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
//remove o texto do balão antes de colocar novo texto
function removeLastText() {
  var lastText = document.querySelectorAll('.revealed');
  lastText.forEach(revealed => { revealed.remove(); });
}
//Coloca os textos dentro das escolhas
function textToChoices(value) {
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
function textToBox(cena) {
  //pega todas as variáveis necessárias
  var activeChar = cena.dialogos.personagem
  var textLines = cena.dialogos.texto;
  var backgroundImg = cena.background;
  var nEscolhas = cena.dialogos.numeroEscolhas
  var numeroEscolhas = parseInt(nEscolhas, 10);
  //Muda o cenário
  var backgroundUrl = "url('img/background/" + backgroundImg + ".jpg')"
  document.body.style.backgroundImage = backgroundUrl;
  //Passa o texto para a caixa de texto, separando as letras
  textLines.forEach((line, index) => {
    if (index < textLines.length - 1) {
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
  //faz a ação de escrever
  function changeSpriteChar(mood) {
    var activeMood = "0";
    activeMood = "img/personagens/" + activeChar + "/" + mood + ".gif"
    //if (mood == "mad") {
    //    activeMood = "img/personagens/"+activeChar+"/5.gif"
    //  }
    //  if (mood == "happy") {
    //    activeMood = "img/personagens/"+activeChar+"/2.gif"
    //  }
    //  if (mood == "normal") {
    //    activeMood = "img/personagens/"+activeChar+"/1.gif"
    //  }

    document.getElementById("activeChar").src = activeMood;
  }
  //muda o humor do personagem

  function revealOneCharacter(list) {
    var next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");
    next.classes.forEach((c) => {
      next.span.classList.add(c);
    });
    var delay = next.isSpace ? 0 : next.delayAfter;
    if (list.length > 0) {
      setTimeout(function () {
        revealOneCharacter(list);
        //console.log(delay)
      }, delay)
    } else {
      //revela as escolhas
      escolha1.disabled = false;
      escolha2.disabled = false;
      if (numeroEscolhas > 2) { escolha3.disabled = false; }
      if (numeroEscolhas > 3) { escolha4.disabled = false; }
    }

    //checa a mudança de humor:
    let spanClassList = next.span.classList;
    let isMad = spanClassList.contains("mad");
    let isHappy = spanClassList.contains("happy");
    let isNormal = spanClassList.contains("normal");
    if (isHappy) {
      changeSpriteChar("happy");
    }

    if (isMad) {
      changeSpriteChar("mad");
    }
    if (isNormal) {
      changeSpriteChar("normal");
    }

  }

  revealOneCharacter(letras);
}
export { textToBox, removeLastText, textToChoices };
//,changeSpriteChar,revealOneCharacter
