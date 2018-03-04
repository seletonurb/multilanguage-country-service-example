$(function() {

  function getLanguage() {
    var languageRadios = document.getElementsByName('languages');
    var selectedLanguage;

    languageRadios.forEach(function(languageRadio) {
      if (languageRadio.checked) {
        selectedLanguage = languageRadio.value;
      }
    });

    return selectedLanguage || 'en';
  }

  $("#countries").autocomplete({
    source: function(request, response) {
      var language = getLanguage();
      // console.log("request: " + JSON.stringify(request));
      $.ajax({
        url: "/api/search-countries",
        dataType: "json",
        data: {
          q: request.term,
          language: language,
        },
        success: function(data, textStatus, jqXHR) {
          console.log("data: " + JSON.stringify(data));
          response($.map(data, function(item) {
            return {
              label: item.name,
              value: item.code
            };
          }));
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("error jqXHR: " + JSON.stringify(jqXHR));
          console.log("error textStatus: " + JSON.stringify(textStatus));
          console.log("error errorThrown: " + JSON.stringify(errorThrown));
        }
      });
    }
  });

  $('#countries').on('autocompleteselect', function(e, ui) {
    $('#result-country').html(JSON.stringify(ui.item));
  });
});
