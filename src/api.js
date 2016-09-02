// Full API overwrite
var api = {
  url: '/api/users',
  auth: function(data, callback){
    data = data || {};
    if (this.token) data.token = this.token;
    callback(data);
  },
  ajax: function(url, method, data, callback){
    var self = this;
    callback = callback || function(){};
    this.auth(data, function(dataAuth){
      $.ajax({
        url: url,
        data: dataAuth,
        type: method,
        success: callback.bind(self, null),
        error: callback.bind(self)
      });
    });
  },
  get: function(callback){
    this.ajax(this.url, 'GET', {}, callback);
  },
  post: function(data, callback){
    this.ajax(this.url, 'POST', data, callback);
  },
  put: function(id, data, callback){
    this.ajax(this.url + '/' + id, 'PUT', data, callback);
  },
  delete: function(id, callback){
    this.ajax(this.url + '/' + id, 'DELETE', {}, callback);
  }
};

export default api;
