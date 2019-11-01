
$(document).ready(function(){
    
    //Intro Loading

    $('body').css('background-image', 'url("/images/Opelucid_City_anime.png")');
    $('.loader').hide()
    $('.player').hide()
    $(".loader").fadeIn(3000);
    

    var loader = document.querySelector('.sound-intro')
    $('.play-btn').click(function(){
        $(".loader").fadeOut(500);
        $('body').css('background-image', 'url("/images/bg2.png")')
        $('.player').show();

        var soundBattle = document.querySelector('.sound-battle')
        var audio = document.createElement('audio')
        audio.setAttribute('autoplay', 'true')
        var source = document.createElement('source')
        source.setAttribute('src', 'http://23.237.126.42/ost/pokemon-gameboy-sound-collection/gbhogmtx/107-battle%20%28vs%20wild%20pokemon%29.mp3')
        source.setAttribute('type', 'audio/ogg')

        audio.appendChild(source)

        soundBattle.append(audio)
        $('.intro-bmg').remove()
    })
    
    $('.play-btn').mouseover(function(){
        $(this).css('transform', 'scale(1.5)')
    })
    $('.play-btn').mouseout(function(e){
        $(this).css('transform', 'scale(1)')
        

        
    })
    document.querySelector('.details').style.borderColor = "transparent";
    var triggerCapture = document.querySelector('.capture')
    triggerCapture.style.display ="none"
    

    
        
    
    
    //-------------------------------------------------------------

    var regionSelect = document.querySelector('.region-select')
    var locationSelect = document.querySelector('.location-select')
    var areaSelect = document.querySelector('.area-select')
    var exploreBtn = document.querySelector('.explore-btn')
    var appendEncounter = document.querySelector('.new')
    var detailsBox = document.querySelector('.details')

    var pokemonsOwned = [];
    
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
            document.querySelector('.captured').style.borderColor = "transparent";
            document.querySelector('.emptyDiv').style.display = 'none'
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
                console.log(areaList)
                areaList.areas.forEach(elemArea => {

                    var areaOption = document.createElement('option')
                    
                    areaOption.setAttribute('class', `areaOption`)
                    areaOption.value = elemArea.url
                    areaOption.text = elemArea.name
                    
                    areaSelect.append(areaOption)
                })
            })
        })

        exploreBtn.addEventListener('click', function(){

            document.querySelector('.capture-bmg').innerHTML =""
            triggerCapture.style.display = ""
            document.querySelector('.details').style.borderColor = "lightslategray";
            getData(`${$('.area-select').val()}`)
            .then(function(pokeData){
                appendEncounter.innerHTML= ""
                detailsBox.innerHTML=""
                document.querySelector('.tooltiptext').innerHTML = "Capture "
                var randomNum = Math.floor((Math.random() * pokeData.pokemon_encounters.length -1) + 1)

                
                getData(`${pokeData.pokemon_encounters[randomNum].pokemon.url}`)
                .then(function(encPoke){
                    
                    var stats = [];
                    encPoke.stats.map(statElem =>{
                        stats.push(statElem.base_stat)
                    })
                    
                    var capImage = document.createElement('img')
                    capImage.setAttribute('class', 'capture-btn')
                    capImage.setAttribute('data-id', `${encPoke.name}`)
                    capImage.setAttribute('data-src', `${encPoke.sprites.front_shiny}`)
                    
                    capImage.setAttribute('src', `${encPoke.sprites.front_shiny}`)
                    console.log(stats)

                    var spanDiv = document.createElement('div')
                    var headerDiv = document.createElement('div')

                    headerDiv.setAttribute('class', 'name-header')
                    spanDiv.setAttribute('class', 'poke-details')

                    var capSpan = document.createElement('span')
                    var capSpan1 = document.createElement('span')
                    var capSpan2 = document.createElement('span')
                    var capSpan3 = document.createElement('span')
                    var capSpan4 = document.createElement('span')
                    var capSpan5 = document.createElement('span')
                    var capSpanHeader = document.createElement('span')
                    var pokeName = document.createElement('span')

                    capSpan.innerText += `Speed: ${stats[0]}`
                    capSpan1.innerText = `Special Defense: ${stats[1]}`
                    capSpan2.innerText = `Special Attack: ${stats[2]}`
                    capSpan3.innerText = `Defense: ${stats[3]}`
                    capSpan4.innerText = `Defense: ${stats[4]}`
                    capSpan5.innerText = `HP: ${stats[5]}`
                    pokeName.innerText = `${encPoke.name}`.toUpperCase();

                    capSpanHeader.innerText = `${encPoke.name}`.toUpperCase()
                    

                    spanDiv.appendChild(capSpan)
                    spanDiv.appendChild(capSpan1)
                    spanDiv.appendChild(capSpan2)
                    spanDiv.appendChild(capSpan3)
                    spanDiv.appendChild(capSpan4)
                    spanDiv.appendChild(capSpan5)

                    document.querySelector('.tooltiptext').append(pokeName)

                    headerDiv.append(capSpanHeader)
                    detailsBox.append(headerDiv)
                    detailsBox.append(spanDiv)
                    appendEncounter.append(capImage)
                })

            })

        })

        triggerCapture.addEventListener('click', function(){
            triggerCapture.style.display ="none"
            document.querySelector('.capturing').style.display = "flex"
            document.querySelector('.capture-btn').style.display = "none"
            
            setTimeout(function(){
                if(pokemonsOwned.length > 5) {
                    alert('Your Pokebag is full')
                }
                else{
                    document.querySelector('.capturing').style.display = "none"
                    triggerCapture.style.display ="none"
                    document.querySelector('.captured').style.borderColor = "lightslategray";
                    document.querySelector('.details').style.borderColor = "transparent";
                    document.querySelector('.tooltiptext').innerHTML = "Capture "
    
                    console.log($('.capture-btn').data('id'))
                    console.log($('.capture-btn').data('src'))
                    
                    var pokeObj = {
                        name: $('.capture-btn').data('id'),
                        imgUrl: $('.capture-btn').data('src')
                    }
    
                    pokemonsOwned.push(pokeObj)
                    detailsBox.innerHTML=""
                    document.querySelector('.captured').innerHTML=""
                    document.querySelector('.new').innerHTML = ""
                    
                    console.log(pokemonsOwned)
                    
                    pokemonsOwned.map(pokemonMap => {
                        var mainDiv = document.createElement('div')
                        mainDiv.setAttribute('class', 'captured-details')
                        var firstChildDiv = document.createElement('div')
                        var secondChildDiv = document.createElement('div')
                        secondChildDiv.setAttribute('style', 'text-align: center;')
                        var headImg = document.createElement('img')
                        headImg.setAttribute('src', `${pokemonMap.imgUrl}`)
                        
                        firstChildDiv.append(headImg)
        
                        var spanBtm = document.createElement('span')
                        spanBtm.innerText = `${pokemonMap.name}`.toUpperCase()
        
                        secondChildDiv.append(spanBtm)
        
                        mainDiv.append(firstChildDiv)
                        mainDiv.append(secondChildDiv)
                        
                        document.querySelector('.captured').append(mainDiv)
    
                        var audio = document.createElement('audio')
                        audio.setAttribute('autoplay', 'true')
                        var source = document.createElement('source')
                        source.setAttribute('src', 'http://23.237.126.42/ost/pokemon-gameboy-sound-collection/gjqttmbp/108-victory%20%28vs%20wild%20pokemon%29.mp3')
                        source.setAttribute('type', 'audio/ogg')
    
                        audio.appendChild(source)
    
                        document.querySelector('.capture-bmg').append(audio)
                        document.querySelector('.sound-battle').innerHTML =""
                    })
                }
            }, 5000)
            
            
        })

        if(pokemonsOwned.length == 0){
            var emtpyDiv = document.createElement('div')
            emtpyDiv.setAttribute('class', 'emptyDiv')
            var emptySpan = document.createElement('span')

            emptySpan.innerText = "Explore Pokemons, Select a Region!"

            emtpyDiv.append(emptySpan)

            document.querySelector('.captured').append(emtpyDiv)
        }
        

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
