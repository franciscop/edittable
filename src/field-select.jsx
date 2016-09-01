import React from 'react';

function parseOptions(options){
  if (!options) throw new Error('Need options for type="select"');
  if (options instanceof Array) {
    options = options.reduce(function(all, one){
      all[one] = one;
      return all;
    }, {});
  }
  return options;
}

export default function Select({ field, name, value, onChange, className }) {
  var options = parseOptions(field.options);
  return (
    <select className={className} name={name} value={value} onChange={onChange}>
      {Object.keys(options).map(function(value) {
        return <option key={('option-' + name + '-value-' + value)} value={value}>{options[value]}</option>;
      })}
    </select>
  );
}
