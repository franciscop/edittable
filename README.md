# Edit Table

A simple React table to edit tabular data either with a REST API or through variables and functions:

![Example of the table](/web/example.png?raw=true)

Another simple example:

```js
import EditTable from './edittable.jsx';

var data = [
  { id: '1', name: 'Test1', email: 'test1@test.com', description: 'Bla 1' },
  { id: '2', name: 'Test2', email: 'test2@test.com', description: 'Bla 2' },
  { id: '3', name: 'Test3', email: 'test3@test.com', description: 'Bla 3' }
];

class DataExample extends React.Component {
  render () {
    var fields = { name: 'Name *', email: 'Email *', description: 'Description' };
    return <EditTable name="users" url="/api/users" fields={fields} data={data} />;
  }
}
```



## Fields

There are many fields that can be used by default and new ones can be created easily. This is the most important configurable part of your app. They will manipulate and display your data for better integration. Full list of properties for reference:

```js
var fields = {
  first: { // any name here
    header: 'first',       // For the table header
    name: 'first',         // The field (and data key) name
    placeholder: 'first',  // The text to show as placeholder
    type: 'text',          // For validation and manipulation
    required: false,       // Self-explanatory. Parses the 'header *' if omitted
    readonly: false,       // Only display it, but cannot edit it
    validate: (val, cb, self) => cb(true)  // Validates the data as it's edited
    display: (val, cb, self) => cb(val),   // Transformation for displaying data
  }
};
```

Read the full fields documentation to know how to use them properly:

[![Fields Documentation](web/images/fields_button.png)](fields.md)



## Data format

The data retrieved should have a particular format: an array of elements, where each element is an object with keys as the field name and value as the value for that instance. Each element **is required to have a unique id** (the format of it doesn't matter):

```js
var data = [
  { id: '1', name: 'Test1', email: 'test1@test.com', description: 'Bla 1' },
  { id: '2', name: 'Test2', email: 'test2@test.com', description: 'Bla 2' },
  { id: '3', name: 'Test3', email: 'test3@test.com', description: 'Bla 3' },
  { id: '4', name: 'Test4', email: 'test4@test.com', description: 'Bla 4' }
];
```

This format is the one expected in case you pass down the data as a property or in case you retrieve it through the API.



## API

By default it is a simple REST API:

```js
var api {
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
```



## Use Cases (Examples)

Edit Table is really flexible, and while it was initially thought for a simple REST API now it's configurable deeply. Let's start with the default and easy case though:


### REST API

For a simple REST API you can pass only the url:

```js
import EditTable from './edittable.jsx';

class SimpleApi extends React.Component {
  render () {
    var fields = { name: 'Name *', email: 'Email *', description: 'Description' };
    return <EditTable url="/api/users" fields={fields} />;
  }
}
```

To make it token-based, you can do it just passing the token (code simplified):

```js
var token = cookies('token');  // Using http://github.com/franciscop/cookies.js
<EditTable url="/api/users" token={token} fields={fields} />;
```

And to use your own authentication method, you would overwrite the method `auth` within the API:

```js
var auth = function(data, callback){
  data = data || {};
  if (cookies('token')) {   // Using http://github.com/franciscop/cookies.js
    data.authtoken = cookies('token');
  }
  callback(data);
}
<EditTable url="/api/users" auth={auth} fields={fields} />;
```


### Local Manipulation

We also support not using a REST API. For instance, let's store the data within a variable (no persistence):

```js
import EditTable from './edittable.jsx';

class UserList extends React.Component {
  constructor(){
    super();
    this.state = { data: [
      { id: '1', name: 'Test1', email: 'test1@test.com', description: 'Bla 1' },
      { id: '2', name: 'Test2', email: 'test2@test.com', description: 'Bla 2' },
      { id: '3', name: 'Test3', email: 'test3@test.com', description: 'Bla 3' },
      { id: '4', name: 'Test4', email: 'test4@test.com', description: 'Bla 4' }
    ]};
  }

  update(data){
    this.setState({ data: data });
  }

  render () {
    var fields = { name: 'Name *', email: 'Email *', description: 'Description' };
    var data = this.state.data;
    var update = this.update.bind(this);
    return <EditTable fields={fields} data={data} update={update} />;
  }
}
```


### Bake your own

To make your own persistence model, just overwrite the API. This is the footprint of them:

```js
var api = {
  get: function(callback){ /* write your own */ },
  post: function(data, callback){ /* write your own */ },
  put: function(id, data, callback){ /* write your own */ },
  delete: function(id, callback){ /* write your own */ }
};
<EditTable fields={fields} api={api} />;
```
