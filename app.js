var Edamam_URL = 'https://api.edamam.com/search';

$("#startButton").on('click', function(){
  $("#begin").remove();
  /*$("#begin").addClass("hidden");*/
  displayContent();
});

function displayContent(start){
  $("#container").removeClass("hidden");
};


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
  var resultArray = [];
  var resultElement = '';
  if (data.hits.length > 0) {
    data.hits.forEach(function(item) {
      var resultObject = {};
      resultObject.label = item.recipe.label;
      resultObject.url = item.recipe.url;
      resultObject.image = item.recipe.image;
           
      resultArray.push(resultObject);
    });
    
    var random = Math.floor((Math.random()*10)+1);
    var finish = resultArray[random];
    
    function display(finishData) {
      resultElement += `<a href="${finishData.url}" target="_blank">` + finishData.label + `</a>`,
      resultElement += `<a href="${finishData.url}" target="_blank"><img src="${finishData.image}"></a><br>`
    }
    display(finish);
    
  } else {
    resultElement += `<h4>No results</h4>`;
  }
  $('.search-results').html(resultElement);
};

/*$(#search).transition({ rotate: '45deg' });*/

function watchSubmit() {
  $('.search-form').submit(function(e) {
    e.preventDefault();
    var query = $('#inputQuery').val();
    getDataFromApi(query, displaySearchData);
  });
}

$(function(){watchSubmit();

});
