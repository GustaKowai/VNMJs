var container = document.querySelector(".text")
var speeds = {
  slow: 120,
  normal: 80,
  fast: 40
}

function removeLastText(){
    var lastText = document.querySelectorAll('.revealed');
    lastText.forEach(revealed=>{revealed.remove();});
}
//Linhas de texto de falas
var letras = [];
function textToBox(cena) {
  var activeChar = cena.dialogos.personagem
  var textLines = cena.dialogos.texto;
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
  if (mood == "mad") {
    activeMood = "img/personagens/"+activeChar+"/5.gif"
  }
  if (mood == "happy") {
    activeMood = "img/personagens/"+activeChar+"/2.gif"
  }
  if (mood == "normal") {
    activeMood = "img/personagens/"+activeChar+"/1.gif"
  }

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
export{textToBox,removeLastText};
//,changeSpriteChar,revealOneCharacter
