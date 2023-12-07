const startBtn = document.getElementById('start');

function changeURL(){
    const newUrl = "https://vnmteste.000webhostapp.com/VNMJs/";
    window.location.replace(newUrl);
}

startBtn.addEventListener('click',function(){changeURL()});