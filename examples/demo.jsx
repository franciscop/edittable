import { EditTable } from './edittable.jsx';

class UserList extends React.Component {
  render () {

    var fields = {
      name: 'Name *',
      email: 'Email *',
      description: 'Description'
    };

    var data = [
      { id: '1', name: 'Test1', email: 'test1@test.com', description: 'Bla 1' },
      { id: '2', name: 'Test2', email: 'test2@test.com', description: 'Bla 2' },
      { id: '3', name: 'Test3', email: 'test3@test.com', description: 'Bla 3' },
      { id: '4', name: 'Test4', email: 'test4@test.com', description: 'Bla 4' },
      { id: '5', name: 'Test5', email: 'test5@test.com', description: 'Bla 5' },
      { id: '6', name: 'Test6', email: 'test6@test.com', description: 'Bla 6' },
    ];

    var api = {
      url: '/api/users',
      token: 'dfgrtherg',
      get: function(id, cb){},
      post: function(data, cb){},
      put: function(id, data, cb){},
      delete: function(id){}
    };

    // Example

    return (<EditTable
      name="users"
      url="/api/users"
      token={auth.user.token}
      fields={fields}
      data={data}
    />);
  }
}
