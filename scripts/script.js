$(document).ready(function(){
    $(".container").hide();
    $(".button-start").click(function(){
        $(".container").show();
        $(".logo-container").hide();
        // $("h1").hide();
      });

      
      region('https://pokeapi.co/api/v2/region')
        .then(function(region) {
          let regionList = region.results

          regionList.forEach(element => {
            let regionName = element.name;
            let regionUrl = element.url;
            
            let result = $(

              `             
              <option value="${element.name}">${element.name}</option>
              
              `
            )

             $('#region').prepend(result);
            
          });
        
        });

});


function getLocations(regions){

  return fetch(regions)
      .then(function(response){

          return response.json();

      })
      .then(function(regions){

          let regionName = region.name;
          let locationsArr = region.locations;
          locationsArr.forEach(element => {
             
              let locationList = $(
                `             
                <option value="${element.name}">${element.name}</option>
                
                `
              )

              $('#location').prepend(locationList);
                console.log('asdsad')
          });
        
      })
}

function region(url){

  return fetch(url)
  .then(function(response) {
    return response.json();
  })
  
}

