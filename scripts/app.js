window.onload = function(){
$(document).ready(function(){
    
    //Intro Loading
    $('body').css('background-image', 'url("/images/Opelucid_City_anime.png")');
    $('.loader').hide()
    $('.player').hide()
    $(".loader").fadeIn(3000);
    
    $('.play-btn').click(function(){
        $(".loader").fadeOut(500);
        $('body').css('background-image', 'url("/images/bg2.png")')
        $('.player').show();
    })
    
    $('.play-btn').mouseover(function(){
        $(this).css('transform', 'scale(1.5)')
    })
    $('.play-btn').mouseout(function(e){
        $(this).css('transform', 'scale(1)')
    })

    var regionSelect = document.querySelector('.region-select')
    var locationSelect = document.querySelector('.location-select')
    var areaSelect = document.querySelector('.area-select')
    var exploreBtn = document.querySelector('.explore-btn')


    //API
    getData('https://pokeapi.co/api/v2/region/')
    .then(function(region){
        region.results.forEach(regions => {
            
            var regionOption = document.createElement('option')
            
            regionOption.setAttribute('data-url', `${regions.url}`)
            regionOption.value = regions.url
            regionOption.text = regions.name

            regionSelect.append(regionOption)

        });

        regionSelect.addEventListener('change', function(){

            getData(`${$('.region-select').val()}`)
            .then(function(location){
                let locArr = location.locations
                locationSelect.innerHTML= ""

                
                locArr.forEach(elemLoc => {
                    
                    var locationOption = document.createElement('option')
                    
                    locationOption.setAttribute('class', `locationOption`)
                    locationOption.value = elemLoc.url
                    locationOption.text = elemLoc.name
                    
                    locationSelect.append(locationOption)

                }) 
            })
        })

        locationSelect.addEventListener('change', function(){
            getData(`${$('.location-select').val()}`)
            .then(function(areaList){
                areaSelect.innerHTML= ""

                areaList.areas.forEach(elemArea => {

                    var areaOption = document.createElement('option')
                    
                    areaOption.setAttribute('class', `areaOption`)
                    areaOption.value = elemArea.url
                    areaOption.text = elemArea.name
                    
                    areaSelect.append(areaOption)
                })
            })
        })

        $('.capture-btn').mouseover(function(){
            $(this).css('transform', 'scale(1.3)')
        })
        $('.capture-btn').mouseout(function(e){
            $(this).css('transform', 'scale(1)')
        })

        exploreBtn.addEventListener('click', function(){
            getData(`${$('.area-select').val()}`)
            .then(function(pokeData){
                console.log(pokeData)
                console.log(pokeData.pokemon_encounters.length)

                pokeData.pokemon_encounters.forEach(pokeElement => {

                    console.log(pokeElement.pokemon)
                    getData(`${pokeElement.pokemon.url}`)
                    .then(function(pokeDetails){
                        console.log(pokeDetails)
                    })

                });
            })
        })
        
    }).catch(function(err){
        console.log("API NOT FOUND")
    })

    //Fetch Data Function
    function getData(url){
        return fetch(url)
        .then(function(response) {
        return response.json();
        })
    }

})
}