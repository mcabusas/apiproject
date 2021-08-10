const apiToken = "10219774809222534";   
function randomWithRange() {
    return Math.floor(Math.random() * 731) + 1;
}

function redirectToProfile(heroId){
    console.log(heroId);
    location.href = `profile.html?heroId=${heroId}`;   
}

async function getAllHeroes () {
    const heroArray = [];
    for(let i = 1; i <= 150; i++){
        await fetch(`https://www.superheroapi.com/api.php/${apiToken}/${i}`)
        .then(response => {
            response.json()
            .then(apiData => {
                heroArray.push(apiData);
                console.log(response);
                console.log(heroArray);

                docFrag = document.createDocumentFragment(),
                        heroRow = document.getElementsByClassName('heroRow'),
                        heroRow[0].innerHTML = '',


                        heroArray.forEach(element => {
                            heroCol = document.createElement('div'),
                            heroCol.setAttribute('class', 'heroCol'),
                            heroId = document.createElement('div'),
                            heroId.setAttribute('id', `hero${element.image.url}`),
                            heroImg = document.createElement('img'),
                            heroImg.setAttribute('class', 'heroImg'),
                            heroImg.src = element.image.url,
                            heroName = document.createElement('p'),
                            heroName.innerHTML = `Name: ${element.name}`,
                            heroButton = document.createElement('button'),
                            heroButton.setAttribute('class', 'button'),
                            heroButton.onclick = function() { redirectToProfile(element.id); },
                            heroButton.setAttribute('id', element.id),
                            heroButton.innerHTML = "View profile",

                            heroId.appendChild(heroImg),
                            heroId.appendChild(heroName),
                            heroId.appendChild(heroButton),
                            heroCol.appendChild(heroId),
                            docFrag.appendChild(heroCol),
                            document.getElementsByClassName('heroRow')[0].appendChild(docFrag)
                        }),
                        
                        document.getElementsByClassName('heroRow')[0].appendChild(docFrag)
            })
        })

    }
}


async function getRandomHero(){
    let superId = randomWithRange();
    console.log(superId);
        await fetch(`https://www.superheroapi.com/api.php/${apiToken}/${superId}`)
        .then(response => {
            response.json()
            .then(apiData => {
                if(response.status === 200) {
                    console.log(apiData);
                    console.log(response.json());
                    const htmlData = `

                        ${

                        docFrag = document.createDocumentFragment(),
                        heroRow = document.getElementsByClassName('heroRow'),
                        heroRow[0].innerHTML = '',

                        heroCol = document.createElement('div'),
                        heroCol.setAttribute('class', 'heroCol'),
                        heroId = document.createElement('div'),
                        heroId.setAttribute('id', `hero${apiData.image.url}`),
                        heroImg = document.createElement('img'),
                        heroImg.setAttribute('class', 'heroImg'),
                        heroImg.src = apiData.image.url,
                        heroName = document.createElement('p'),
                        heroName.innerHTML = `Name: ${apiData.name}`,
                        heroButton = document.createElement('button'),
                        heroButton.setAttribute('class', 'button'),
                        heroButton.onclick = function() { redirectToProfile(apiData.id); },
                        heroButton.setAttribute('id', apiData.id),
                        heroButton.innerHTML = "View profile",

                        heroId.appendChild(heroImg),
                        heroId.appendChild(heroName),
                        heroId.appendChild(heroButton),
                        heroCol.appendChild(heroId),
                        docFrag.appendChild(heroCol),
                        document.getElementsByClassName('heroRow')[0].appendChild(docFrag)
                    }
                        
                    `               
                        
                    

                    

                    
                }
            })
        })
}


async function searchHero(heroName){
    console.log(heroName);
    await fetch(`https://www.superheroapi.com/api.php/10219774809222534/search/${heroName}`)
        .then(response => {
            response.json()
            .then(apiData => {
                if(apiData.response === 'success') {

                    console.log(apiData.results);
                    console.log(apiData);

                    document.getElementById('loader').style.display = "none";

                    const htmlData = `
                    

                    ${

                        docFrag = document.createDocumentFragment(),
                        heroRow = document.getElementsByClassName('heroRow'),
                        heroRow[0].innerHTML = '',


                        apiData.results.forEach(element => {
                            heroCol = document.createElement('div'),
                            heroCol.setAttribute('class', 'heroCol'),
                            heroId = document.createElement('div'),
                            heroId.setAttribute('id', `hero${element.image.url}`),
                            heroImg = document.createElement('img'),
                            heroImg.setAttribute('class', 'heroImg'),
                            heroImg.src = element.image.url,
                            heroName = document.createElement('p'),
                            heroName.innerHTML = `Name: ${element.name}`,
                            heroButton = document.createElement('button'),
                            heroButton.setAttribute('class', 'button'),
                            heroButton.onclick = function() { redirectToProfile(element.id); },
                            heroButton.setAttribute('id', element.id),
                            heroButton.innerHTML = "View profile",

                            heroId.appendChild(heroImg),
                            heroId.appendChild(heroName),
                            heroId.appendChild(heroButton),
                            heroCol.appendChild(heroId),
                            docFrag.appendChild(heroCol),
                            document.getElementsByClassName('heroRow')[0].appendChild(docFrag)
                        }),
                        
                        document.getElementsByClassName('heroRow')[0].appendChild(docFrag)
                    }
                

                    `

                    
                }else {
                    document.getElementById('loader').style.display = "block";
                }
            })
        })
}

