import React from 'react';
import {render} from 'react-dom';
import EditTable from './table.jsx';

class DemoTable extends React.Component {
  constructor(){
    super();
    this.state = { data: [
      { name: 'Test1', email: 'test1@test.com', choose: 'First', location: { text: 'Valencia, Spain', id: 1 } },
      { name: 'Test2', email: 'test2@test.com', choose: 'Second', location: { text: 'Tokyo, Japan', id: 2 } },
      { name: 'Test3', email: 'test3@test.com', choose: 'First', location: { text: 'London, UK', id: 3 } },
      { name: 'Test4', email: 'test4@test.com', choose: 'Third', location: { text: 'San Francisco, USA', id: 4 } },
    ]};
  }

  update(data){
    console.log("Data:", data);
    this.setState({ data: data });
  }

  render () {
    var fields = {
      id: { header: 'Id', readonly: true, display: (value, callback, self) => {
        var name = self.state.data.name;
        return name && name.match ? name.match(/\d+/)[0] : '-';
      } },
      name: { header: 'Name *' },
      email: { header: 'Email *', type: 'email' },
      choose: { header: 'Choose *', type: 'select', options: {
        first: 'First',
        second: 'Second',
        third: 'Third'
      } },
      location: { header: 'Location', type: 'location', extract: 'text' }
    };

    var data = this.state.data;
    var update = this.update.bind(this);

    return <EditTable fields={fields} data={data} update={update} />;
  }
}

render(<DemoTable />, document.getElementById('container'));
