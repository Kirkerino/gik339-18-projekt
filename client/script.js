const url = 'http://localhost:3000/movies';
const movieForm = document.getElementById('movieForm');

window.addEventListener('load', fetchData);

// Function to fetch movies from the database (GET)
function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((movies) => {
      if (movies.length > 0) {
        let html = `<div class="row row-cols-1 row-cols-md-4 g-4 w-75 mx-auto">`;
        movies.forEach((movie) => {
          html += `
          <div class="col">
            <div class="border border-2 border-primary-subtle rounded-5 grid text-center bg-dark-subtle bg-gradient">
              <h2 class="pt-4 fw-semibold">${movie.name} (${movie.year})</h2>
              <p class="mb-1 text-muted">${movie.genre}</p>
              <p>${convertRuntime(movie.runtime)}</p>
              <h1 class="fw-semibold" style="color:${getRatingColor(movie.rating)}">${movie.rating}</h1>
              <div class="flex justify-between pb-4 pt-2">
                <button class="btn btn-outline-primary btn-sm mt-2" onclick="setCurrentMovie(${movie.id})">Update</button>
                <button class="btn btn-outline-danger btn-sm mt-2" onclick="deleteMovie(${movie.id})">Remove</button>
              </div>
            </div>
          </div>`;
        });
        html += `</div>`;

        const listContainer = document.getElementById('listContainer');
        listContainer.innerHTML = '';
        listContainer.insertAdjacentHTML('beforeend', html);
      }
    });
}

// Function to set current movie into form for editing (GET)
function setCurrentMovie(id){
    console.log('current',id);
    fetch(`${url}/${id}`)
       .then((result) => result.json())
       .then((movie) => {
          console.log(movie); 
          movieForm.name.value = movie.name;
          movieForm.year.value = movie.year;
          movieForm.genre.value = movie.genre;
          movieForm.runtime.value = movie.runtime;
          movieForm.rating.value = movie.rating;

          localStorage.setItem("currentId", movie.id);
    });
}

// Function to handle both adding new movies into the database and updating pre-existing movies (POST & PUT)
movieForm.addEventListener('submit',handlesubmit);

function handlesubmit(e){
    e.preventDefault();
    const serverMovieObject = {name: '', year: '', genre: '', runtime: '', rating:''};
    serverMovieObject.name = movieForm.name.value;
    serverMovieObject.year = movieForm.year.value;
    serverMovieObject.genre = movieForm.genre.value;
    serverMovieObject.runtime = movieForm.runtime.value;
    serverMovieObject.rating = movieForm.rating.value;

    const id = localStorage.getItem('currentId');
  if (id) {
    serverMovieObject.id = id;
  }
    const request = new Request(url, {
        method: serverMovieObject.id ? 'PUT' : 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(serverMovieObject)
      });
      alert('Movie saved!')

      fetch(request).then((response) => {
        fetchData();

        localStorage.removeItem('currentId');
        movieForm.reset();
      });
}

// Function to remove movies from database (DELETE)
function deleteMovie(id) {
  console.log('delete', id);
  alert('Movie deleted!');
  fetch(`${url}/${id}`, { method: 'DELETE' }).then((result) => fetchData());
}

// Function to determine color based on rating
function getRatingColor(rating) {
  const parsedRating = parseFloat(rating);
  const clampedRating = Math.max(1, Math.min(parsedRating, 10));
  const green = Math.round((clampedRating / 10) * 255);
  const red = 255 - green;

  return `rgb(${red}, ${green}, 0)`;
}

// Function to convert minutes to hours and minutes format
function convertRuntime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}min`;
}