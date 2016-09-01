// API Table
// An editable table based on the API specified
import { EditTable } from './edittable.jsx';

class SimpleApi extends React.Component {
  render () {
    var fields = {
      name: 'Name *',
      email: 'Email *',
      description: 'Description'
    };
    return <EditTable name="users" api={true} fields={fields} />;
  }
}

// Load from a different URL
class UrlApi extends React.Component {
  render () {
    var fields = {
      name: 'Name *',
      email: 'Email *',
      description: 'Description'
    };
    return <EditTable name="users" url="/api/users" fields={fields} />;
  }
}


class CompleteApi extends React.Component {
  render () {

    var fields = {
      name: 'Name *',
      email: 'Email *',
      description: 'Description'
    };

    // Full API overwrite
    var api = {
      url: '/api/users',
      token: 'dfgrtherg',
      auth: function(data){
        data = data || {};
        data.token = this.token;
        return data;
      },
      get: function(callback){
        var url = this.url + (id ? '/' + id : '');
        $.get(url, this.auth(), callback.bind(this, null));
      },
      post: function(data, callback){
        $.post(this.url, this.auth(data), callback.bind(this, null));
      },
      put: function(id, data, callback){
        $.ajax({
          url: this.url + '/' + id,
          data: this.auth(data),
          type: 'PUT',
          success: callback.bind(this, null),
          error: callback.bind(this)
        });
      },
      delete: function(id, callback){
        $.ajax({
          url: this.url + '/' + id,
          data: this.auth(),
          type: 'DELETE',
          success: callback.bind(this, null),
          error: callback.bind(this)
        });
      }
    };

    return <EditTable name="users" api={api} fields={fields} />;
  }
}
