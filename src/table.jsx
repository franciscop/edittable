import React from 'react';
import Field from './field.jsx';
import { parseData, parseFields } from './helpers.js';
import api from './api.js';

var verbose = false;


function Actions(props) {
  switch(props.type){
    case 'edit':
      return (
        <td className="actions">
          <button className="save fa fa-upload" onClick={props.actions.update}/>
          <button className="cancel fa fa-times" onClick={props.actions.cancel}/>
        </td>
      );
      break;
    case 'display':
      return (
        <td className="actions">
          <button className="edit fa fa-pencil" onClick={props.actions.edit}></button>
          <button className="delete fa fa-trash" onClick={props.actions.remove}></button>
        </td>
      );
      break;
    default:
      console.log("No actions of that type");
  }
}



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
  componentDidMount(){
    this.setState({ data: this.props.entry });
  }
  render(){
    var tableRow = [];
    var print = true;
    var actions = {
      update: this.update.bind(this),
      cancel: this.cancel.bind(this),
      edit: this.edit.bind(this),
      remove: this.props.remove.bind(this, this.state.data.id)
    };
    return (
      <tr key={('item-' + this.state.data.id)}>
        {Object.values(this.props.fields).map(field =>
          <td key={(field.name + '-' + this.state.data.id)}>
            {this.state.edit && !field.readonly ? (
              <Field field={field} value={this.state.data[field.name]} onChange={this.change.bind(this, field)} />
            ) : (
              (parseData.call(this, this.state.data[field.name], field.display, v => v))
            )}
          </td>
        )}
        <Actions type={this.state.edit ? 'edit' : 'display'} actions={actions} />
      </tr>
    );
  }
}



function TableHead({fields}){
  return (
    <thead>
      <tr>
        {Object.values(fields).map(field =>
          <th key={('head-'+field.name)}>{field.header}</th>
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
    var self = this;
    this.props.add(this.state.data);
    var dat = {};
    for (var key in this.state.data) {
      dat[key] = '';
    }
    self.setState({ data: dat });
    console.log("Data:", dat, self.state.data);
  }
  change(field, value){
    var data = this.state.data;
    data[field.name] = value;
    this.setState({ data: data });
  }
  render(){
    if (this.state.error) {
      console.log("Error saving the data: ", this.state.error);
    }
    let fields = this.props.fields;
    let error = this.state.error;
    return (
      <tfoot>
        <tr>
          {Object.values(fields).map(field =>
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
    this.state = { data: props.data || [] };
    this.api = props.api || api;
    this.api.url = props.url || props.name || '/';
    this.api.token = props.token || false;
  }
  error(err){
    alert(err);
  }
  add(row){
    this.setState({ data: this.state.data.concat(row) });
    if (this.props.update) this.props.update(this.state.data);
    this.api.post(row);
  }
  update(entry){
    var data = this.state.data;
    var index = data.map(entry => entry.id).indexOf(entry.id);
    if (index === -1) throw new Error("That element is not in the dataset");
    data[index] = entry;
    this.setState({ data: data });
    if (this.props.update) this.props.update(this.state.data);
    api.put(entry.id, entry, function(){
      console.log("Done!", arguments);
    }, function(){
      console.log("Error!", arguments);
    });
  }
  remove(id){
    var data = this.state.data;
    var index = data.map(entry => entry.id).indexOf(id);
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
        <TableBody data={this.state.data || []} fields={this.props.fields} update={this.update.bind(this)} remove={this.remove.bind(this)} error={this.props.error || this.error} />
        <TableFoot name={this.props.name} fields={this.props.fields} add={this.add.bind(this)} error={this.props.error || this.error} />
      </table>
    );
  }
}
