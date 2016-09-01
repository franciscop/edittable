// Local Table
// A simple table based on the local content

import { EditTable } from './edittable.jsx';

class UserList extends React.Component {
  constructor(){
    super();
    this.state = { data: [
      { id: '1', name: 'Test1', email: 'test1@test.com', description: 'Bla 1' },
      { id: '2', name: 'Test2', email: 'test2@test.com', description: 'Bla 2' },
      { id: '3', name: 'Test3', email: 'test3@test.com', description: 'Bla 3' },
      { id: '4', name: 'Test4', email: 'test4@test.com', description: 'Bla 4' },
      { id: '5', name: 'Test5', email: 'test5@test.com', description: 'Bla 5' },
      { id: '6', name: 'Test6', email: 'test6@test.com', description: 'Bla 6' },
    ]};
  }

  update(data){
    this.setState({ data: data });
  }

  render () {
    var fields = {
      name: 'Name *',
      email: 'Email *',
      description: 'Description'
    };

    var data = this.state.data;
    var update = this.update.bind(this);

    return <EditTable fields={fields} data={data} update={update} />;
  }
}
