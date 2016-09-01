# Edit Table

A simple React table to edit tabular data either with a REST API or through variables and functions:



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

On its simplest form, the fields is just an array:

```js
var fields = ['name', 'email', 'password'];
```

This will render a crude table where both the title, the placeholder text and the request name will be the same. It will work properly with data of the type:

```js
var data = [
  { name: 'John Doe', email: 'john@doe.com', password: 'why-am-i-not-hashed?' },
  ...
];
```

However let's say we want to change the header (and placeholder) texts:

```js
var fields = {
  name: 'Full name *',
  email: 'Email *',
  password: 'Password'
};
```

> EditTable automatically parses the header ending on `*` and requires those fields. We can deactivate this by setting the config.autorequire to false [NOTE: not yet deactivable].

Now let's take advantage of those field types. We'll use the `email` and `password` fields, and the latter assumes that the password is empty as you should not store it in plaintext nor pass the hash of it:

```js
var fields = {
  name: 'Full name *',   // We keep it this way, a simple required text input
  email: { header: 'Email *', type: 'email' },
  password: { header: 'Password', type: 'password' }
}
```

Awesome, now it's working properly. Let's move to see what field types are there.

## Field type `field.type = text`

There are many field types, some basic ones and some complex ones. The basic ones compile into an <input> with some lax properties, while the advanced ones include external APIs and make wonders. You can of course include your own fields.

### default

If you don't include the `type` property inside a field, it will be assumed as `text` and a single `<input type="text">` will be rendered.

```js
var fields = {
  name: 'Name',
  name: { header: 'Name', type: 'text' }  // Exactly the same
};
```

### email

If it's not empty it will be validated as an email.

```js
var fields = {
  email: { header: 'Email', type: 'email' }
};
```

### password

This is a bit more complex, since it will display as `******` when we are displaying it and it will be an empty field with the type="password" when we edit it.

```js
var fields = {
  password: { header: 'Password', type: 'password' }
};
```

```html
<input type="password" placeholder="******" />
```

> By default it shows ****** as placeholder, not the `header` as other fields do. This is to show that the password will be hidden while typing

You can change the default placeholder as expected by passing the placeholder parameter:

```js
var fields = {
  password: { header: 'Password', type: 'password', placeholder: '**********' }
};
```

### select

Displays a dropdown with several options to choose. You *have* to assign to the field another parameter called options:

```js
var fields = {
  choose: {
    header: 'Choose a fruit',
    type: 'select',
    options: ['orange', 'mango', 'banana'],
    defaults: 'orange'
  }
};
```

This options parameter accepts several forms:

1. A single string that will be split and share value and text:

    ```js
    options: 'orange mango banana'
    ```

    ```html
    <select ...>
      <option value="orange">orange</option>
      <option value="mango">mango</option>
      <option value="banana">banana</option>
    </select>
    ```

2. A simple array. It will render the same way as the text split above:

    ```js
    options: ['orange', 'mango', 'banana']
    ```

3. A simple object:

    ```js
    options: {
      orange: 'Juicy orange',
      mango: 'Delicious mango',
      banana: 'Sweet banana'
    }
    ```

    ```html
    <select ...>
      <option value="orange">Juicy orange</option>
      <option value="mango">Delicious mango</option>
      <option value="banana">Sweet banana</option>
    </select>
    ```


## Header

The value of the head of the table. This is also inherited by most text properties if they are not set. In it's simplest form, it's just the value in the field:

```js
var fields = {
  email: 'Email *'   // header = 'Email *'
};
```

Or you can specify it if you are going to set more properties:

```js
var fields = {
  email: { header: 'Email *', type: 'email' }
};
```

## Name

The key that will be used to store, send, update, etc the specific field. It is similar to input's `name` attribute. If not set, it uses the key of the field:

```js
var fields = {
  email: 'Email *',  // name = 'email'
  password: { header: 'Password', type: 'password' }  // name = 'password'
};
```

Otherwise it just uses the specified name:

```js
var fields = {
  email: { header: 'Email *', name: 'main_email' }  // name = 'main_email'
};
```

## Placeholder

The gray text that appears by default when the field is empty. It defaults to the `header` value if it's not explicitly set:

```js
var fields = {
  email: { header: 'Email *', placeholder: 'john@doe.com' }
};
```

> For the field type `password` it automatically gets set to `******` unless you overwrite it manually to hint the user that it will be hidden as they type



## Required

To require a field, both at editing and at creating a new one, you can simply make sure that the text ends with an `*`:

```js
var fields = {
  email: 'Email *'
};
```

This will be parsed automatically into a required field. Otherwise, you can pass the parameter `required` set to true:

```js
var fields = {
  email: { header: 'Email [required]', required: true }
};
```


## Readonly

You might want some fields not to be editable. Then just pass the property `readonly` set to true:

```js
var fields = {
  id: { header: 'Id', readonly: true }
};
```


## Validate

Define a test that has to be passed so the user's input is considered valid data:

```js
var fields = {
  password: {
    header: 'Password *',
    validate: (value, callback) => callback(value && value.length > 6)
  }
};
```

> When defining our own validate method the required field is ignored so you might want to make sure you are also validating that it's not empty if you want to do so

The function validate receives three parameters: `(value, callback, self)`. The `value` is the current value of the field being edited. The callback *has* to be called and self includes other data that might be relevant.

The callback accepts two parameter, the first one indicates whether the test is passed (`true`) or not (`false`) and the second one indicates the error if any. You should *not* pass true AND a second parameter as it doesn't make sense. It is an async function so you can check against any API would you like to do so. For example, let's check if the nickname is available:

```js
var fields = {
  nickname: {
    header: 'Nickname',
    validate: function(value, callback){
      $.post('/users/nickname_available', { nick: value }, function(data){
        if (data.available) {
          callback(true);
        } else {
          callback(false, 'Nickname not available');
        }
      });
    }
  }
};
```




## Display

A function to manipulate the data in case we want to display it differently than the way it is stored. Let's say we want to display only the end of a hash:

```js
var fields = {
  hash: {
    header: 'Hash',
    display: (hash, callback) => callback(hash.slice(-6))
  }
};
```

Now let's say that we want to show [user creation date from MongoDB's id timestamp](http://stackoverflow.com/a/6453709/938236). This usercase is different, since we are creating a whole new field derived from another and making it readonly, so it's only for display purposes:

```js
var data = [
  { id: '5498da1bf83a61f58ef6c6d5', email: 'john@doe.com' },
  ...
];

var fields = {
  id: { header: 'Id', readonly: true },
  email: { header: 'Email *', type: 'email' },
  creation: {
    header: 'Created at',
    readonly: true,         // Since it doesn't exist in our data
    display: (value, callback) => callback(IdToDate(value))
  }
};
```
