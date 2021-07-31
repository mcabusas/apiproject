    async function getFilms() {
        const response = await fetch("https://swapi.dev/api/films/")
        .then(res => {
            res.json()
            .then(apiData => {
                if(res.status === 200) {
                    var sortedFilms = apiData.results.sort((a, b) => a.episode_id - b.episode_id);
                    console.log(sortedFilms);

                    const htmlData = sortedFilms.map(film=>{
                        return `
                        <div class = "filmRow" id = ${film.episode_id}>
                            <div class = "filmColumn">
                                <div id = "filmRightColumn" style="text-align:center;">
                                    <p>Title: ${film.title}</p>
                                    <p>Episode: ${film.episode_id}</p>
                                    <p>Opening Crawl: ${film.opening_crawl}</p>
                                </div>  
                            </div>
                            <div class = "filmColumn">
                                <div id = "filmLeftColumn">
                                    <img src = "../images/episode${film.episode_id}.png">
                                </div>
                            </div>
                            <hr>
                        </div>
                        `
                    }).join("");
                    console.log(htmlData);
                    document.getElementsByClassName('films')[0].innerHTML = htmlData;
                    
                }
            })
        })
    }
