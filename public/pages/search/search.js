$( function() {
    var availableTags = [
      "McDonald's",
      "No Frills",
      "Real Canadian Superstore"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  } );