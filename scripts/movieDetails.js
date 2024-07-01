let apiKey = 'YOUR-API-KEY-HERE';

async function fetchData(){
    try{
        const response = await fetch("https://www.omdbapi.com/?apikey=" + apiKey + "&type=movie&i=" + localStorage.getItem("clickedMovie") + '&plot=full');
        const data = await response.json()
        console.log(data)
        document.getElementById('poster').src = data.Poster;
        document.getElementById('movieTitle').textContent = data.Title;
        document.getElementById('genre').textContent = data.Genre;
        document.getElementById('moviePlot').textContent = data.Plot;
        document.getElementById('imdb').textContent += data.Ratings[0].Value;
        document.getElementById('rottenTomatoes').textContent += data.Ratings[1].Value;
        document.getElementById('metaCritic').textContent += data.Ratings[2].Value;
    }
    catch(error){
        console.error(error)
    }
}

window.onload = fetchData();