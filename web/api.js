// Super simple API para manejar el front-end de la web
var api = (function API($, version, prefix){

  this.prefix = prefix || this.prefix;
  this.version = version || this.version;

  // Extra data that will be appended to each petition
  this.extra = this.extra || {};

  var self = this;

  // Generate a get request
  this.ajax = function(url, data, success, error, method){
    var prefix = '/' + (self.prefix ? self.prefix.replace(/^\/*/, '').replace(/\/*$/g, '') + '/' : '');
    var base = prefix + (self.version ? self.version.replace(/^\/*/, '').replace(/\/*$/g, '') + '/' : '');
    if (typeof data === 'string') {
      for (var key in this.extra) {
        if (this.extra[key] !== undefined) {
          data = key + '=' + this.extra[key] + '&' + data;
        }
      }
    } else {
      for (var key in this.extra) {
        if (this.extra[key] !== undefined && data[key] === undefined) {
          data[key] = this.extra[key];
        }
      }
    }
    $.ajax(base + url.replace(/^\//, ''), {
      method: method || 'GET',
      data: data,
      dataType: 'json',
      success: success || function(){ console.log(arguments); },
      error: error || function(){ alert(self.defaultError || 'Error, please reload and try again'); }
    });
  }

  // Generate a get request
  this.get = function(url, data, success, error){
    this.ajax(url, data, success, error, 'GET');
  };

  // Generate a post request
  this.post = function(url, data, success, error){
    this.ajax(url, data, success, error, 'POST');
  };

  this.put = function(url, data, success, error){
    this.ajax(url, data, success, error, 'PUT');
  };

  this.delete = function(url, data, success, error){
    this.ajax(url, data, success, error, 'DELETE');
  };

  this.use = function(number, callback){
    if (number) {
      callback(new API($, number));
    } else {
      callback(self);
    }
  };
  return this;
})(jQuery);
