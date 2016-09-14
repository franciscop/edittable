# Edit Table

A simple React table to edit tabular data either with a REST API or through variables and functions:

![Example of the table](/web/example.png?raw=true)



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



## Fields

There are many fields that can be used by default, or you can create your own and pass it along if none fits your needs. Not only that, but this field will also manipulate your data for better integration. Full list of properties for reference:

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
