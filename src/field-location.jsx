import React from 'react';

var loaded = false;
var loading = false;

function loadGoogle(key, callback){
  if (loading) return false;
  if (loaded) return callback(google);
  loading = true;
  var script = document.createElement("script")
  script.type = "text/javascript";
  script.className = 'googlemapsscript';
  if (script.readyState){  //IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
          script.readyState == "complete"){
        script.onreadystatechange = null;
        loaded = true;
        callback(google);
      }
    };
  } else {  // Others
    script.onload = function(){
      loaded = true;
      callback(google);
    };
  }

  script.src = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&libraries=places';
  document.getElementsByTagName("head")[0].appendChild(script);
}

export default class Location extends React.Component {
  componentDidMount(){
    var self = this;

    loadGoogle(this.props.field.key, function loadSearch(google){
      if (typeof google === 'undefined' || !google || !google.maps.places) {
        return console.error("Couldn't find Google");
      }
      var searchBox = new google.maps.places.SearchBox(self.input_text);
      // When the user selects one of the locations
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) return self.props.onChange();
        self.props.onChange({
          id: places[0].place_id,
          text: places[0].formatted_address
        });
        self.input_id.value = places[0].place_id;
      });
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
