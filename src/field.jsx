import React from 'react';
import Select from './field-select.jsx';
import Location from './field-location.jsx';

export default class Field extends React.Component {
  constructor(props){
    super(props);
    this.state = { error: false };
    this.change = this.change.bind(this, props.field);
  }
  change(field, e){
    var self = this;
    var value = e.target ? e.target.value : e;
    field.validate(value, function(good){
      self.setState({ error: !good });
      self.props.onChange(value);
    }, this);
  }
  render(){
    var props = $.extend({}, this.props);
    delete props.onChange;
    let { field, value } = props;
    if (typeof field.type !== 'string') {
      return <div>{field.type}</div>;
    }

    switch (field.type) {
      case 'select':
        return <Select {...props} error={this.state.error} onChange={this.change} value={value} />;
        break;
      case 'location':
        return <Location {...props} error={this.state.error} onChange={this.change} value={value || ''} />;
        break;
      case 'read':
        return <div>{value}</div>
        break;
      case 'none':
        return <div>{'-'}</div>;
        break;
      case 'password':
        value = '';
        // Overwrite it if it's the default one
        if (field.placeholder === field.title)
          field.placeholder = '******';
      default:
        return <input
          className={this.state.error ? 'error' : ''}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={value}
          onChange={this.change} />;
    }
  }
}
