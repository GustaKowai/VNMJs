var container = document.querySelector(".text")

var speeds = {
  slow: 120,
  normal: 70,
  fast: 40
}

var textLines = [
  { string: "Olá.", speed: speeds.normal},
  { string: "Tudo bom?", speed: speeds.normal, classes:["green"]},
  { string: "Você é um cabeça de pudim!", speed: speeds.fast },
]

var letras = [];

textLines.forEach((line,index)=> {
  if (index < textLines.length-1){
    line.string += " ";
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
}

revealOneCharacter(letras);