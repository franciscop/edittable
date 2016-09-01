var Auth = function(){
  api.prefix = 'api';
  api.version = false;
  var self = this;
  self.user = false;
  self.setUser = function(user){
    if (user) {
      api.extra.token = user.token;
      self.user = user;
      cookies.set({ token: user.token });
    } else {
      cookies.set({ token: null });
    }
  }
  self.login = function(data, success, error){
    api.post('/users/login', data, function(user, text, xhr){
      self.setUser(user);
      if (success) success.call(xhr, user);
    }, function(xhr, text, err){
      if (error) error.call(xhr, xhr.responseJSON ? xhr.responseJSON.error : false);
    });
  };
  self.logout = function(success, error){
    cookies.set({ token: null });
    api.extra.token = undefined;
    api.post('/users/logout', {}, success, error);
  };
  self.check = function(callback){
    var token = cookies.get('token');
    if (!token || token === 'undefined') {
      cookies.set({ token: null });
      return callback(null);
    }
    api.post('/users/auth', {token: token}, function(user, text, xhr){
      self.setUser(user);
      callback(user);
    }, function(xhr, text, error){
      self.setUser(null);
      callback(null);
    });
  };
  return self;
}

var auth = new Auth();
