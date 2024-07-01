let movieBlock = document.getElementById("movieBlock");
let apiKey = 'YOUR-API-KEY-HERE';

function saveData(id){
    console.log(id);
    localStorage.setItem("clickedMovie", String(id));
    location.href = "movieDetails.html"
}

async function fetchData(){
    try{
        const movieName = document.getElementById("movieName").value.toLowerCase();
        localStorage.setItem("searchInput", movieName);
        const response = await fetch("https://www.omdbapi.com/?apikey=" + apiKey + "&type=movie&s=" + movieName);
            
        if(!response.ok){
            throw new Error("Could not fetch");
        }

        const data = await response.json();

        if(data.Search != undefined){
            movieBlock.innerHTML = "";
            
            for(let i = 0; i <= data.Search.length - 1; i++){
                if(data.Search[i].Poster != "N/A"){
                    movieBlock.insertAdjacentHTML("beforeend", 
                    `
                        <div id='movie'>
                            <img onclick="saveData('${data.Search[i].imdbID}')" src='${data.Search[i].Poster}'>
                            <h1>${data.Search[i].Title}</h1>
                        </div>
                    `);
                }
            }
        }

    }
    catch(error){
        console.error(error);
    }
}


document.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        document.getElementById("search").click();
        document.getElementById("search").style.scale = 1.1;
    }else{
        document.getElementById("movieName").focus();
        
    }
})

document.addEventListener("keyup", function(e){
    if(e.key == "Enter"){
        document.getElementById("search").style.scale = 1;
    }
})

window.onload = function(){
    if(localStorage.getItem("searchInput") != undefined){
        document.getElementById("movieName").value = localStorage.getItem("searchInput");
        document.getElementById("search").click();
    }
}
