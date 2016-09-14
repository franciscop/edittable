# Edit Table

A simple React table to edit tabular data either with a REST API or through variables and functions:

![Example of the table](/web/example.png?raw=true)

Another simple example:

```js
import  EditTable from './edittable.jsx';

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
  first: { // totally unassuming name
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

By default


## Examples:

For a simple REST API you can pass only the url:

```js
import { EditTable } from './edittable.jsx';

class SimpleApi extends React.Component {
  render () {
    var fields = { name: 'Name *', email: 'Email *', description: 'Description' };
    return <EditTable name="users" url="/api/users" fields={fields} />;
  }
}
```

For local data manipulation you can do it passing the data manually:

```js
import { EditTable } from './edittable.jsx';

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
