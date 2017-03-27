// EE: Consider using "const" for variables that won't change. 
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
    type: 'GET', // This is default, probably don't need it
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
      resultObject.source = item.recipe.source;
      resultObject.ingredients = [];
      resultObject.ingredients.push(item.recipe.ingredientLines);
      
      // EE: This is more of a style opinion, but you may be able to simply use
      // an object literal here. For example:
      /*
        const resultObject = {
          label: item.recipe.label,
          url: item.recipe.url,
          image: item.recipe.image,
          source : recipe.source,
          ingredients: [ item.recipe.ingredientLines ]
        }
      */
      // Again, matter of opinion, but I always like less typing!
      
      
           
      resultArray.push(resultObject);
    });
    
    // EE: Consider moving these vars to the top of this block. Generally good practice to move variables
    // as far up as possible in JavaScript--the runtime may hoist them for you otherwise,
    // leading to unexpected behavior. Also: consider using "const"!
    var random = Math.floor((Math.random()*10)+1);
    var finish = resultArray[random];

    // EE: You're mixing a couple things in the string concatenation below. The line-by-line approach
    // was necessary in the dark days before ES6 template strings. But you're also using those below now,
    // so you can simply do:
    /*
      resultElement = `
        <div class="card">
          <h2>${finishData.label}</h2>
          ...
        </div>
      `;
    */
    // Basically, you don't need to worry about whitespace with ES6 template strings.
    function display(finishData) {
      resultElement += `<div class="card">`;
      resultElement += `<h2>${finishData.label}</h2>`;
      resultElement += `<a href="${finishData.url}" target="_blank"><img src="${finishData.image}"></a><br>`;
      resultElement += `<h4><a href="${finishData.url}" target="_blank">${finishData.source}</a><h4><br>`;
      resultElement += `<ul class="list">`;
      // EE: This is perfectly fine, but consider using "forEach" or "map"
      for (i=0; i < finishData.ingredients[0].length; i++) {
        resultElement += `<li>(${finishData.ingredients[0][i]})</li>`;
      }
      resultElement += `</ul>`;
      resultElement += `</div>`;  
        }
    display(finish);
    
  } else {
    resultElement += `<h4>No results</h4>`;
  }
  $('.search-results').prepend(resultElement);
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

$('#search').transition({ x: 200 });
