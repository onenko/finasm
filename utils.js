
function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if(rawFile.readyState === 4) {
      if(rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        alert(allText);
      }
    }
  }
  rawFile.send(null);
}

function readTextFile2(file) {      //this will read file 
  var xmlhttp;
  if(window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
  } else{
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4) {
      var allText = xmlhttp.responseText;    /*here we get all lines from text file*/
    }
  }
  xmlhttp.open("GET", file, true);
  xmlhttp.send();
}

function readTextFile3(file) {
  var reader = new FileReader();
  reader.onload = function(progressEvent) {
    var allText = this.result;
    console.log(allText);
  };
  reader.readAsText(file);
}

