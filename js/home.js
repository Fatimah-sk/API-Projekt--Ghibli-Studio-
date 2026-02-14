import { fetchJSON } from "./api.js";
import{initAboutModal} from "./aboutModal.js";

const API = "https://ghibliapi.vercel.app";
const grid = document.querySelector("#moviesGrid");
const searchInput = document.querySelector("#search");

let movies = [];

const movieImages = {
  "Castle in the Sky": "assets/images/movies/castle-in-the-sky.jpg",
  "Grave of the Fireflies": "assets/images/movies/grave-of-the-fireflies.jpg",
  "My Neighbor Totoro": "assets/images/movies/my-neighbor-totoro.jpg",
  "Kiki's Delivery Service": "assets/images/movies/kikis-delivery-service.jpg",
  "Only Yesterday": "assets/images/movies/only-yesterday.jpg",
  "Porco Rosso": "assets/images/movies/porco-rosso.jpg",
  "Pom Poko": "assets/images/movies/pom-poko.jpg",
  "Whisper of the Heart": "assets/images/movies/whisper-of-the-heart.jpg",
  "Princess Mononoke": "assets/images/movies/princess-mononoke.jpg",
  "My Neighbors the Yamadas": "assets/images/movies/my-neighbors-the-yamadas.jpg",
  "Spirited Away": "assets/images/movies/spirited-away.jpg",
  "The Cat Returns": "assets/images/movies/the-cat-returns.jpg",
  "Howl's Moving Castle": "assets/images/movies/howls-moving-castle.jpg",
  "Tales from Earthsea": "assets/images/movies/tales-from-earthsea.jpg",
  "Ponyo": "assets/images/movies/ponyo.jpg",
  "The Secret World of Arrietty": "assets/images/movies/arrietty.jpg",
  "From Up on Poppy Hill": "assets/images/movies/from-up-on-poppy-hill.jpg",
  "The Wind Rises": "assets/images/movies/the-wind-rises.jpg",
  "The Tale of the Princess Kaguya": "assets/images/movies/the-tale-of-the-princess-kaguya.jpg",
  "When Marnie Was There": "assets/images/movies/when-marnie-was-there.jpg",
  "The Red Turtle": "assets/images/movies/the-red-turtle.jpg",
  "Earwig and the Witch": "assets/images/movies/earwig-and-the-witch.jpg",
};



function getImagePath(title) {
  const fileName = title
    .toLowerCase()
    .replace(/'/g, "")        // fjerner '
    .replace(/’/g, "")        // fjerner fancy '
    .replace(/:/g, "")        // fjerner :
    .replace(/\s+/g, "-");    // mellomrom → -

  return `assets/images/movies/${fileName}.jpg`;
}


function render(list) {
  grid.innerHTML = list.map(movie => {
    const image = getImagePath(movie.title);

    return `
      <a class="card" href="details.html?id=${movie.id}">
        <img src="${image}" alt="${movie.title}" class="card-img">
        <div class="cardBody">
        <p>${movie.title} • ${movie.release_date}</p>
      </div>
      </a>
    `;
  }).join("");
}


async function init() {
  try {
    grid.innerHTML = `<p>Loading...</p>`;
    movies = await fetchJSON(`${API}/films`);
    render(movies);

  } catch (err) {
    grid.innerHTML = `<p class="error">Error loading movies</p>`;
    console.error(err);
  }
}

searchInput?.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase().trim();
  const filtered = movies.filter(m => m.title.toLowerCase().includes(q));
  render(filtered);
});


initAboutModal();

init();

