// Parse the data for displaying each field
export function parseData(data, extract, callback){

  if (extract) {
    return typeof extract === 'string' ?
      callback(data[extract]) :
      extract.call(this, data, callback, this);
    }

  if (!data)
    return callback('');

  if (typeof data === 'string')
    return callback(data);

  if (data && data.text)
    return callback(data.text);

  throw new Error('The data is malformed, it should be a string, an object with ' +
    'the property "text" or you should define how to show it with "field.display"');
}

// Parse each field and inflate it
export function parseFields(fields){
  if (typeof fields === 'string') fields = fields.split(/\s+/);
  if (fields instanceof Array) {
    fields = fields.reduce(function(fields, item) {
      fields[item] = item;
      return fields;
    }, {});
  }
  for (let name in fields) {
    if (typeof fields[name] === 'string') {
      fields[name] = { header: fields[name] };
    }
    fields[name].header = fields[name].header || name;
    fields[name].name = fields[name].name || name;
    fields[name].type = fields[name].type || 'text';
    fields[name].placeholder = fields[name].placeholder || fields[name].header;
    fields[name].title = fields[name].title || false;
    if (fields[name].readonly) fields[name].type = 'read';

    fields[name].required = fields[name].required || !!fields[name].header.match(/\*\s*$/);
    var defValidate = (data, cb) => cb(fields[name].required ? !!data : true);
    fields[name].validate = fields[name].validate || defValidate;
  }
  return fields;
}
