var loaded = [];
var loading = [];

export default function loadscript(url, callback){
  if (loading.indexOf(url) >= 0) {
    document.querySelector('[src="' + url + '"]').addEventListener('load', callback);
    return false;
  }
  if (loaded.indexOf(url) >= 0) return callback();
  loading.push(url);
  var script = document.createElement("script")
  script.type = "text/javascript";
  if (script.readyState){  //IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
          script.readyState == "complete"){
        script.onreadystatechange = null;
        loaded.push(url);
        var index = loading.indexOf(url);
        if (index >= 0) delete loading[index];
        callback();
      }
    };
  } else {  // Others
    script.onload = function(){
      loaded.push(url);
      var index = loading.indexOf(url);
      if (index >= 0) delete loading[index];
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}
