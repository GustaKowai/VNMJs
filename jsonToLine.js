var add;
async function readJson(path){
    fetch(path)
    .then((response) => response.json())
    .then((json) => json.cena.dialogos.texto)
    .then((value)=> console.log(value))
}

readJson('cena1.json')