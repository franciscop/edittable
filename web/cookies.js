var cookies = {
  get: function(name){
    var cookies = {};
    document.cookie.split(/;\s*/).map(part => part.split('='))
      .forEach(parts => cookies[parts[0]] = parts[1]);
    return cookies[name] || undefined;
  },
  set: function(data, opt){
    opt = opt || {};
    opt.timeout = opt.timeout || 365*24*3600*1000;
    var expires = this.expires(opt.timeout);
    for (var key in data) {
      if (data[key] === undefined || data[key] === null) {
        expires = this.expires(-10);
      }
      document.cookie = key + "=" + data[key] + "; " + expires;
    }
  },
  expires: function(time){
    var expires = new Date();
    expires.setTime(expires.getTime() + time);
    expires = "expires="+expires.toUTCString();
    return expires;
  }
};
