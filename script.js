const searchForm = document.querySelector('form');
        const movieContainer = document.querySelector('.movie-info');
        const welcomeScreen = document.querySelector('.welcome-screen');
        const inputBox = document.querySelector('.inputBox');
        const featuredMovies = document.querySelectorAll('.featured-movie');

        // Add click event to featured movies
        featuredMovies.forEach(movie => {
            movie.addEventListener('click', () => {
                inputBox.value = movie.getAttribute('data-movie');
                searchForm.dispatchEvent(new Event('submit', { cancelable: true }));
            });
        });

        const getMovieInfo = async (movie) => {
            const myApiKey = "e0f272ad";
            const url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Unable to fetch movie data.');
                }
                
                const data = await response.json();
                
                if (data.Response === "False") {
                    throw new Error('Movie not found. Please check the title and try again.');
                }
                
                showMovieData(data);
            } catch (error) {
                movieContainer.innerHTML = `<h2>${error.message}</h2>`;
                movieContainer.style.display = "block";
                welcomeScreen.style.display = "none";
            }
        }

        const showMovieData = (data) => {
            welcomeScreen.style.display = "none";
            movieContainer.style.display = "block";

            const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster, Director, Writer, BoxOffice, imdbVotes} = data;

            // Create stars based on rating
            const ratingValue = parseFloat(imdbRating);
            const fullStars = Math.floor(ratingValue / 2);
            let starsHTML = '';
            
            for (let i = 0; i < 5; i++) {
                if (i < fullStars) {
                    starsHTML += '<i class="fas fa-star"></i>';
                } else {
                    starsHTML += '<i class="far fa-star"></i>';
                }
            }

            movieContainer.innerHTML = `
                <div class="movie-poster">
                    <img src="${Poster !== "N/A" ? Poster : "https://via.placeholder.com/300x450/333/fff?text=No+Image"}" alt="${Title}">
                </div>
                
                <h2>${Title}</h2>
                
                <div class="rating">
                    <span class="rating-value">${imdbRating}</span>
                    <div class="stars">${starsHTML}</div>
                    <span style="margin-left: 10px;">${imdbVotes} votes</span>
                </div>
                
                <div class="movie-genre"></div>
                
                <p><strong>Released Date:</strong> ${Released}</p>
                <p><strong>Duration:</strong> ${Runtime}</p>
                <p><strong>Director:</strong> ${Director}</p>
                <p><strong>Writer:</strong> ${Writer}</p>
                <p><strong>Cast:</strong> ${Actors}</p>
                ${BoxOffice !== "N/A" ? `<p><strong>Box Office:</strong> ${BoxOffice}</p>` : ''}
                <p><strong>Plot:</strong> ${Plot}</p>
            `;

            const movieGenreElement = document.createElement('div');
            movieGenreElement.classList.add('movie-genre');

            if (Genre !== "N/A") {
                Genre.split(",").forEach(element => {
                    const p = document.createElement('p');
                    p.innerText = element.trim();
                    movieGenreElement.appendChild(p);
                });
            }

            movieContainer.querySelector('.movie-genre').replaceWith(movieGenreElement);
        }

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const movieName = inputBox.value.trim();
            if (movieName !== '') {
                getMovieInfo(movieName);
            }
        });




// default 
function toggleAside() {
            document.getElementById("sideMenu").classList.toggle("open");
        }

        // Close sidebar on outside click
        document.addEventListener("click", function (e) {
            let sideMenu = document.getElementById("sideMenu");
            let hamburger = document.querySelector(".hamburger");
            if (window.innerWidth < 1000 && sideMenu.classList.contains("open")) {
                if (!sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    sideMenu.classList.remove("open");
                }
            }
        });

document.getElementById('year').textContent = new Date().getFullYear();