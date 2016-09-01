componentDidMount(){
  var self = this;
  $('[name="start"], [name="end"], [name="startFilter"], [name="endFilter"]').each(function(i, input){
    // Avoid re-calling it if it's already been called on those elements
    if (self.props.field === $(input).attr('name') &&
        $(input).siblings('.picker').length === 0) {

      var $input = $(input).pickadate({
        hiddenName: true,
        formatSubmit: 'yyyy-mm-dd',
        onClose: function () {
          self.props.onChange(this._hidden.value);
        }
      });
      var picker = $input.pickadate('picker');
      var date = input.value.split('-').map(n => parseInt(n));
      date[1]--; // Months are 0-indexed
      if (input.value) picker.set('select', date);
    }
  });
}
