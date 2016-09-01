import React from 'react';
import {render} from 'react-dom';
import EditTable from './table.jsx';

class DemoTable extends React.Component {
  constructor(){
    super();
    this.state = { data: [
      { id: '1', name: 'Test1', email: 'test1@test.com', choose: 'a', location: { text: 'Bla', id: 1 } },
      { id: '2', name: 'Test2', email: 'test2@test.com', choose: 'b', location: { text: 'Bla', id: 2 } },
      { id: '3', name: 'Test3', email: 'test3@test.com', choose: 'a', location: { text: 'Bla', id: 3 } },
      { id: '4', name: 'Test4', email: 'test4@test.com', choose: 'c', location: { text: 'Bla', id: 4 } },
      { id: '5', name: 'Test5', email: 'test5@test.com', choose: 'c', location: { text: 'Bla', id: 5 } },
      { id: '6', name: 'Test6', email: 'test6@test.com', choose: 'b', location: { text: 'Bla', id: 6 } },
    ]};
  }

  update(data){
    console.log("Data:", data);
    this.setState({ data: data });
  }

  render () {
    var fields = {
      id: { title: 'Id', readonly: true, display: (value, callback, self) => {
        var id = self.state.data.id.match(/\d+/);
        // callback(id ? id[0] : '')
        return id ? id[0] : '';
      } },
      name: 'Name *',
      email: { title: 'Email *', type: 'email' },
      choose: { title: 'Choose *', type: 'select', options: ['a', 'b', 'c'] },
      location: { title: 'Location', type: 'location', extract: 'text' }
    };

    var data = this.state.data;
    var update = this.update.bind(this);

    return <EditTable fields={fields} data={data} update={update} />;
  }
}

render(<DemoTable />, document.getElementById('container'));
