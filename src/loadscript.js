//var loaded = [];

var loaded = false;
var loading = false;

export default function loadscript(url, callback){
  if (loading) return false;
  if (loaded) return callback(google);
  loading = true;
  var script = document.createElement("script")
  script.type = "text/javascript";
  script.className = 'googlemapsscript';
  if (script.readyState){  //IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
          script.readyState == "complete"){
        script.onreadystatechange = null;
        loaded = true;
        callback(google);
      }
    };
  } else {  // Others
    script.onload = function(){
      loaded = true;
      callback(google);
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}
