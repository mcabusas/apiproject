const apiToken = "10219774809222534"; 

function getFromLocalStorage() {
    const heroIds = JSON.parse(localStorage.getItem("heroArray"));

    return heroIds === null ? [] : heroIds;
}

function removeFromLocalStorage() {
    let heroId = getIdFromURL();
    let array = getFromLocalStorage();

    localStorage.setItem('heroArray', JSON.stringify(
        array.filter((id) => id !== heroId)
    ));
}


function addToLocalStorage() {

    let heroId = getIdFromURL();
    let array = getFromLocalStorage();
    array.filter((id) => {
        if(id != heroId){
            localStorage.setItem('heroArray', JSON.stringify(
                [...array, heroId]
            ));
        }else {
            console.log('error');
        }
    })
    
    console.log(heroId);
}




function getId(id) {
    console.log(id);
    let relVal = '';
    let statsContainer = document.getElementById("stats".concat('', id));
    if(statsContainer.style.display == 'none'){
        statsContainer.style.display = "block";
    } else if(statsContainer.style.display == "block"){
        statsContainer.style.display = 'none';
    }
    
}

function getIdFromURL() {
    let queryString =  window.location.search;

    const urlParams = new URLSearchParams(queryString);

    let heroId = urlParams.get('heroId');
    return heroId;
}

async function heroStats(){

    let heroId = getIdFromURL();
    
    await fetch(`https://www.superheroapi.com/api.php/10219774809222534/${heroId}`)
    .then(response => {
        response.json()
        .then(apiData => {
            if (apiData.response === "success") {
                console.log(apiData);
                console.log(apiData.powerstats);

                document.getElementById('heroName').innerHTML = apiData.name;
                document.getElementById('heroImg').src = apiData.image.url;

                for(let [key, value] of Object.entries(apiData.powerstats)){
                    let li = document.createElement('li')
                    document.getElementById('stats1').appendChild(li);
                    li.innerHTML = `${key}: ${value}`
                }

                for(let [key, value] of Object.entries(apiData.biography)) {
                    let li = document.createElement('li')
                    document.getElementById('stats2').appendChild(li);
                    li.innerHTML = `${key}: ${value}`
                }

                for(let [key, value] of Object.entries(apiData.appearance)) {
                    let li = document.createElement('li')
                    document.getElementById('stats3').appendChild(li);
                    li.innerHTML = `${key}: ${value}`
                }

                for(let [key, value] of Object.entries(apiData.connections)) {
                    let li = document.createElement('li')
                    document.getElementById('stats5').appendChild(li);
                    li.innerHTML = `${key}: ${value}`
                }

                for(let [key, value] of Object.entries(apiData.work)) {
                    let li = document.createElement('li')
                    document.getElementById('stats4').appendChild(li);
                    li.innerHTML = `${key}: ${value}`
                }
            }
        })
    })
}

