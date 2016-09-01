import React from 'react';

var errors = {
  nogoogle: "Google Maps couldn't be found. " +
    "You will need it to use a 'location' field type. " +
    "Please make sure you include it and can access the internet.",
  noplaces: "Google Places not found, but Google Maps loaded correctly. " +
    "Remember to add &libraries=places to the url when you include the library"
};

export default class Location extends React.Component {
  componentDidMount(){
    var self = this;
    if (typeof google === 'undefined' || !google) {
      return console.error(errors.nogoogle);
    }
    if (!google.maps.places) {
      return console.error(errors.noplaces);
    }
    var searchBox = new google.maps.places.SearchBox(this.input_text);
    // When the user selects one of the locations
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) return self.props.onChange();
      self.props.onChange({
        id: places[0].place_id,
        text: places[0].formatted_address
      });
      $(self.input_id).get(0).value = places[0].place_id;
    });
  }
  render(){
    var field = this.props.field;
    var value = this.props.value;
    var id = '', text = '';
    if (value) {
      id = value.id || value;
      text = value.text;
    }
    return (
      <div>
        <input className={this.props.className} ref={c => this.input_text = c} name={field.name} data-type="location" onChange={this.props.onChange} value={text} placeholder={field.placeholder} />
        <input ref={c => this.input_id = c} name={(field.name + '_id')} data-type="location" type="hidden" value={id} />
      </div>
    );
  }
}
