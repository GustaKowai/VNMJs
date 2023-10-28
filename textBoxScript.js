var container = document.querySelector(".text")

var speeds = {
  slow: 120,
  normal: 80,
  fast: 40
}

var textLines = [
  { string: "Olá.", speed: speeds.normal},
  { string: "Tudo bom?", speed: speeds.normal, classes:["green"]},
  { string: "O que você faz aqui?", speed: speeds.fast },
  { string: "Não lembro de ter te chamado.", speed: speeds.slow, classes:["red"]}
]
//Linhas de texto de falas
var letras = [];

textLines.forEach((line,index)=> {
  if (index < textLines.length-1){
    line.string += "  ";
  }
  line.string.split("").forEach(letra=>{
    var span = document.createElement("span");
    span.textContent = letra;
    container.appendChild(span);
    letras.push({
      span:span,
      isSpace: letra === " ",
      delayAfter: line.speed,
      classes: line.classes || [],
    })
  })
})
//faz a ação de escrever
function changeSpriteChar(mood){
  console.log(mood)
  if(mood == "mad"){
    activeMood = "img/personagens/char1/5.gif"
  }
  if(mood == "happy"){
    activeMood = "img/personagens/char1/2.gif"
  }
  if(mood == "normal"){
    activeMood = "img/personagens/char1/1.gif"
  }
  console.log(mood)
 
  document.getElementById("activeChar").src = activeMood;  
}
//muda o humor do personagem

function revealOneCharacter(list){
  var next = list.splice(0,1)[0];
  next.span.classList.add("revealed");
    next.classes.forEach((c)=> {
      next.span.classList.add(c);
    });
  var delay = next.isSpace ? 0 : next.delayAfter;
  if (list.length > 0){
    setTimeout(function(){
      revealOneCharacter(list);
    },delay)
  }
  //checa a mudança de humor:
  let spanClassList = next.span.classList;
  let hasRed = spanClassList.contains("red");
  let hasGreen = spanClassList.contains("green");
  if (hasGreen){
      changeSpriteChar("happy")
      console.log("Feliz")
  }
 
  if (hasRed){
      changeSpriteChar("mad");
      console.log("Puto")
  }
  if (!hasGreen && !hasRed){
    changeSpriteChar("normal")
    console.log("normal")
  }
 
}


revealOneCharacter(letras);


