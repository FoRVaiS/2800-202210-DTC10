$( function() {
    var availableTags = [

    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  } );