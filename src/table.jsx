import React from 'react';
import Field from './field.jsx';
import { parseData, parseFields } from './helpers.js';
import API from './api.js';

var verbose = false;

class ContentRow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      data: {},
      olddata: {},
      error: {}
    };
  }
  edit(){
    var olddata = jQuery.extend({}, this.state.data);
    this.setState({ edit: true, olddata: olddata });
  }
  cancel(){
    this.setState({ edit: false, data: this.state.olddata, error: {} });
  }
  change(field, value){
    var data = this.state.data;
    data[field.name] = value;
    this.setState({ data: data });
  }
  update(){
    this.props.update(this.state.data);
    this.setState({ edit: false });
  }
  getActions(){
    if (this.state.edit) {
      return (
        <td className="actions">
          <button className="save fa fa-upload" onClick={this.update.bind(this)}/>
          <button className="cancel fa fa-times" onClick={this.cancel.bind(this)}/>
        </td>
      );
    } else {
      return (
        <td className="actions">
          <button className="edit fa fa-pencil" onClick={this.edit.bind(this)}></button>
          <button className="delete fa fa-trash" onClick={this.props.remove.bind(this, this.state.data.id)}></button>
        </td>
      );
    }
  }
  componentDidMount(){
    this.setState({ data: this.props.entry });
  }
  render(){
    var tableRow = [];
    var print = true;
    return (
      <tr key={('item-' + this.state.data.id)}>
        {Object.values(this.props.fields).map(field =>
          <td key={(field.name + '-' + this.state.data.id)}>
            {this.state.edit ? (
              <Field field={field} value={this.state.data[field.name]} onChange={this.change.bind(this, field)} />
            ) : (
              (parseData.call(this, this.state.data[field.name], field.display, v => v))
            )}
          </td>
        )}
        {this.getActions()}
      </tr>
    );
  }
}



function TableHead({fields}){
  return (
    <thead>
      <tr>
        {Object.values(fields).map(field =>
          <th key={('head-'+field.name)}>{field.title}</th>
        )}
        <th>Actions</th>
      </tr>
    </thead>
  );
}

class TableBody extends React.Component {
  render(){
    return (
      <tbody>
        {this.props.data.map(data =>
          <ContentRow entry={data} {...this.props} key={data.id} />
        )}
      </tbody>
    );
  }
}

class TableFoot extends React.Component {
  constructor(props){
    super(props);
    this.state = { data: {} };
  }
  add(){
    this.props.add(this.state.data);
    this.setState({ data: {} });
  }
  change(field, value){
    var data = this.state.data;
    data[field.name] = value;
    this.setState({ data: data });
  }
  render(){
    return (
      <tfoot>
        <tr>
          {Object.values(this.props.fields).map(field =>
            <td key={('new-'+field.name)}>
              <Field field={field} value={this.state.data[field.name]} onChange={this.change.bind(this, field)} />
            </td>
          )}
          <td className="actions">
            <button className="fa fa-plus" onClick={this.add.bind(this)}></button>
          </td>
        </tr>
      </tfoot>
    );
  }
}





export default class EditTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: props.data || [],
      error: false
    };
  }
  add(row){
    var data = this.state.data;
    data.push(row);
    this.setState({ data: data });
    if (this.props.update) this.props.update(this.state.data);
    api.post('/' + this.props.name, data);
  }
  update(entry){
    var data = this.state.data;
    var index = data.map(entry => entry.id).indexOf(entry.id);
    if (index === -1) throw new Error("That element is not in the dataset");
    data[index] = entry;
    this.setState({ data: data });
    if (this.props.update) this.props.update(this.state.data);
    api.put('/' + this.props.name + '/' + data.id, data, function(){
      console.log("Done!", arguments);
    }, function(){
      console.log("Error!", arguments);
    });
  }
  remove(id){
    var data = this.state.data;
    var index = data.map(entry => entry.id).indexOf(id)
    if (index === -1) throw new Error("That element is not in the dataset");
    this.setState({ data: (data.splice(index, 1) && data) });
    if (this.props.update) this.props.update(this.state.data);
    api.delete('/' + this.props.name + '/' + id, () => console.log("Error!", arguments));
  }
  render(){
    var fields = parseFields(this.props.fields);

    var tableHead = [];
    var tableNew = [];
    for (var name in fields) {
      let field = fields[name];
      tableHead.push(<th key={('head-' + name)}>{field.header}</th>);
      tableNew.push(<td key={('new-' + name)}><Field field={name} value="" placeholder={field.placeholder} onChange={this.change} /></td>);
    }

    return (
      <table className="edittable">
        <TableHead fields={fields}/>
        <TableBody data={this.state.data || []} fields={this.props.fields} update={this.update.bind(this)} remove={this.remove.bind(this)} />
        <TableFoot name={this.props.name} fields={this.props.fields} add={this.add.bind(this)} />
      </table>
    );
  }
}
