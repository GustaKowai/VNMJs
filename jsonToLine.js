var add;
async function readJson(path){
    fetch(path)
    .then((response) => response.json())
    //.then((json) => console.log(json.cena.dialogos.texto))
}

readJson('cena1.json').then(
    function(value){console.log(value);}
);
