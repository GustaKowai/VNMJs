function readXml(xmlFile) {

  var xmlDoc;

  if (typeof window.DOMParser != "undefined") {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", xmlFile, false);
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType('text/xml');
    }
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
  }
  else {
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = "false";
    xmlDoc.load(xmlFile);
  }
  var tagObj = xmlDoc.getElementsByTagName("rota");
  var dialogoObj = tagObj[0].getElementsByTagName("dialogos")[0].childNodes[0].nodeValue;
  var charValue =dialogoObj[0].getElementsByTagName("personagem")[0].childNodes[0].nodeValue;
  var textValue = dialogoObj[0].getElementsByTagName("text")[0].childNodes[0].nodeValue;
  var speedValue = dialogoObj[0].getElementsByTagName("speed")[0].childNodes[0].nodeValue;
  var humorValue = dialogoObj[0].getElementsByTagName("humor")[0].childNodes[0].nodeValue;
  var classesValue = tagObj[0].getElementsByTagName("classes")[0].childNodes[0].nodeValue;
}

readXml();
console.log(charValue);