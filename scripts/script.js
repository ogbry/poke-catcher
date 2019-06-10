$(document).ready(function(){
    $(".container").hide();
    $(".button-start").click(function(){
        $(".container").show();
        $(".logo-container").hide();
        $("h1").hide();
      });

      
      region('https://pokeapi.co/api/v2/region')
        .then(function(region) {
          let regionList = region.results

          regionList.forEach(element => {
            let regionName = element.name;
            let regionUrl = element.url;
            
            let result = $(

              `             
              <option value="${element.url}">${element.name}</option>
              
              `
            )

             $('#region').prepend(result);
           
          });
        
          
        });
       
});

  
function getLocations(region){

  return fetch(region)

      .then(function(response){

          return response.json();
        
      })
      .then(function(regionsLocation){
         let locationsArr = regionsLocation.locations;

         var locals = document.getElementById('location');
            locals.innerHTML="";
          locationsArr.forEach(element => {
              let locationList = $(

                `             
                <option value="${element.name}">${element.name}</option>
                
                `
              )

              $('#location').prepend(locationList);
                
          });
        
      })
}

function getAreas(region){

  return fetch(region)

      .then(function(response){

          return response.json();
        
      })
      
      .then(function(locationsArea){
        let areasArr = locationsArea.areas;

        var areas = document.getElementById('area');
          areas.innerHTML="";
          // console.log(areasArr)
           areasArr.forEach(element => {
             let areaList = $(

               `             
               <option value="${element.name}">${element.name}</option>
                
               `
             )

             $('#area').prepend(areaList);
               
          });
         
        })
}


function region(url){

  return fetch(url)
  .then(function(response) {
    return response.json();
  })
  
}

