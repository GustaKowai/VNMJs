function mouseover(x) {
  switch (x) {
    case 'start':
      {
        document.getElementById("Screen").src = "login-screen-play.png";
        console.log("passou por cima")
      };
      break;
    case 'continue':
      {

      };
      break;
    case 'creditos':
      {

      };
      break;
      // etc... 
    default:
      ;
      break;
  }

}

// reset the image when the user isn't hovering.
function mouseleave() {
  document.getElementById("Screen").src = "login-screen.png";
}
function changeURL(){
    const newUrl = "https://vnmteste.000webhostapp.com/VNMJs/";
    window.location.replace(newUrl);
}

var img = document.querySelector('img');
img.addEventListener('mousedown', function(e) {
      console.log(e.screenX)
      console.log(e.screenY)
})