import React from 'react';
import {render} from 'react-dom';
import EditTable from '../src/table.jsx';

var demoData = [
  { id: 1, name: 'Test1', email: 'test1@test.com', choose: 'First', location: { text: 'Valencia, Spain', id: 1 } },
  { id: 2, name: 'Test2', email: 'test2@test.com', choose: 'Second', location: { text: 'Tokyo, Japan', id: 2 } },
  { id: 3, name: 'Test3', email: 'test3@test.com', choose: 'First', location: { text: 'London, UK', id: 3 } },
  { id: 4, name: 'Test4', email: 'test4@test.com', choose: 'Third', location: { text: 'San Francisco, USA', id: 4 } },
];

// Create an instance with few fields
class DemoTable extends React.Component {
  constructor(){
    super();
    this.state = { data: demoData };
  }

  update(data){
    this.setState({ data: data });
  }

  render () {
    var fields = {
      id: { header: 'Id', readonly: true, display: (value, callback, self) => {
        var name = self.state.data.name;
        var matched = name && name.match ? name.match(/\d+/) : null;
        return matched ? matched[0] : '-';
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

render(<DemoTable />, document.getElementById('demotable'));



// Create an instance with few fields
class DateTable extends React.Component {
  constructor(){
    super();
    this.state = { data: demoData.map(el => {
      el.date = '2016-0' + Math.floor(Math.random() * 9 + 1) + '-' + Math.floor(Math.random() * 18 + 10);
      return el;
    }) };
  }

  update(data){
    this.setState({ data: data });
  }

  render () {
    var fields = {
      date: { header: 'Date *', type: 'date' },
      email: { header: 'Email *', type: 'email' },
      location: { header: 'Location', type: 'location', extract: 'text' }
    };

    var data = this.state.data;
    var update = this.update.bind(this);

    return <EditTable url="/api/users" fields={fields} data={data} update={update} />;
  }
}

render(<DateTable />, document.getElementById('datetable'));
