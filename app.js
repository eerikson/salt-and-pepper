var Edamam_URL = 'https://api.edamam.com/search';


function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: Edamam_URL,
    data: {
      app_id: "b0c0dab4",
      app_key: "f312cd5d8d6125c74991aaca9988db77",
      q: searchTerm, 

    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}


function displaySearchData(data) {
  var resultElement = '';
  if (data.hits) {
    data.hits.forEach(function(item) {
      resultElement += `<a href="${item.recipe.url}" target="_blank">` + item.recipe.label + `</a>`,
      resultElement += `<img src="${item.recipe.image}">` 
    });
  }
  else {
    resultElement += '<h4>No results</h4>';
  }
  
  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displaySearchData);
  });
}

$(function(){watchSubmit();

});
