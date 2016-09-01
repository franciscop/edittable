// Full API overwrite
export var api = {
  url: '/api/users',
  auth: function(data, callback){
    data = data || {};
    if (this.token) data.token = this.token;
    callback(data);
  },
  get: function(callback){
    var url = this.url;
    var self = this;
    callback = callback || function(){};
    this.auth({}, function(dataAuth){
      $.get(url, dataAuth, callback.bind(self, null));
    });
  },
  post: function(data, callback){
    var self = this;
    callback = callback || function(){};
    this.auth(data, function(dataAuth){
      $.post(this.url, dataAuth, callback.bind(self, null));
    });
  },
  put: function(id, data, callback){
    var url = this.url + '/' + id;
    var self = this;
    callback = callback || function(){};
    this.auth(data, function(dataAuth){
      $.ajax({
        url: url,
        data: dataAuth,
        type: 'PUT',
        success: callback.bind(self, null),
        error: callback.bind(self)
      });
    });
  },
  delete: function(id, callback){
    var url = this.url + '/' + id;
    var self = this;
    callback = callback || function(){};
    this.auth({}, function(dataAuth){
      $.ajax({
        url: url,
        data: dataAuth,
        type: 'DELETE',
        success: callback.bind(self, null),
        error: callback.bind(self)
      });
    });
  }
};
