import { fetchJSON } from "./api.js";
import { initAboutModal } from "./aboutModal.js";
import { initTrailerModal} from "./trailerModal.js";


const API = "https://ghibliapi.vercel.app";

const params = new URLSearchParams(location.search);
const id = params.get("id");

const titleEl = document.querySelector("#title");
const infoEl = document.querySelector("#info");
const charsBtn = document.querySelector("#loadChars");
const charsEl = document.querySelector("#characters");
const imageEl = document.querySelector("#movieImage");
const metaEl = document.querySelector("#meta");
const trailerBtn = document.querySelector("#watchTrailer");


// YouTube trailer links (embed links)
const trailerLinks = {
  "Castle in the Sky": "https://www.youtube.com/embed/8ykEy-yPBFc",
  "Grave of the Fireflies": "https://www.youtube.com/embed/4vPeTSRd580",
  "My Neighbor Totoro": "https://www.youtube.com/embed/92a7Hj0ijLs",
  "Kiki's Delivery Service": "https://www.youtube.com/embed/4bG17OYs-GA",
  "Only Yesterday": "https://www.youtube.com/embed/5gSKk-wwLsY",
  "Porco Rosso": "https://www.youtube.com/embed/awEC-aLDzjs",
  "Pom Poko": "https://www.youtube.com/embed/_7cowIHjCD4",
  "Whisper of the Heart": "https://www.youtube.com/embed/0pVkiod6V0U",
  "Princess Mononoke": "https://www.youtube.com/embed/4OiMOHRDs14",
  "My Neighbors the Yamadas": "https://www.youtube.com/embed/1C9ujuCPlnY",
  "Spirited Away": "https://www.youtube.com/embed/ByXuk9QqQkk",
  "The Cat Returns": "https://www.youtube.com/embed/Gp-H_YOcYTM",
  "Howl's Moving Castle": "https://www.youtube.com/embed/iwROgK94zcM",
  "Tales from Earthsea": "https://www.youtube.com/embed/8hxYx3Jq3kI",
  "Ponyo": "https://www.youtube.com/embed/CsR3KVgBzSM",
  "Arrietty": "https://www.youtube.com/embed/9CtIXPhPo0g",
  "From Up on Poppy Hill": "https://www.youtube.com/embed/9nzpk_Br6yo",
  "The Wind Rises": "https://www.youtube.com/embed/RzSpDgiF5y8",
  "The Tale of the Princess Kaguya": "https://www.youtube.com/embed/W71mtorCZDw",
  "When Marnie Was There": "https://www.youtube.com/embed/jjmrxqcQdYg",
  "The Red Turtle": "https://www.youtube.com/embed/Sw7BggqBpTk",
  "Earwig and the Witch": "https://www.youtube.com/embed/Lk5YWIbwzRE",
};

// store current movie title so the button knows what to play
let currentMovieTitle = "";



const detailImages = {
  "Castle in the Sky": "assets/images/detailsImages/castle-in-the-sky.jpg",
  "Grave of the Fireflies": "assets/images/detailsImages/fireflies.jpg",
  "My Neighbor Totoro": "assets/images/detailsImages/totoro.jpg",
  "Kiki's Delivery Service": "assets/images/detailsImages/kiki.jpg",
  "Only Yesterday": "assets/images/detailsImages/yesterday.jpg",
  "Porco Rosso": "assets/images/detailsImages/porco.jpg",
  "Pom Poko": "assets/images/detailsImages/pom-poko.jpg",
  "Whisper of the Heart": "assets/images/detailsImages/whisper-of-the-heart.jpg",
  "Princess Mononoke": "assets/images/detailsImages/mononoke.jpg",
  "My Neighbors the Yamadas": "assets/images/detailsImages/the-yamadas.jpg",
  "Spirited Away": "assets/images/detailsImages/spirited-away.jpg",
  "The Cat Returns": "assets/images/detailsImages/the-cat-returns.jpg",
  "Howl's Moving Castle": "assets/images/detailsImages/howls-moving-castle.jpg",
  "Tales from Earthsea": "assets/images/detailsImages/tales-from-earthsea.jpg",
  "Ponyo": "assets/images/detailsImages/ponyo.jpg",
  "Arrietty": "assets/images/detailsImages/arrietty.jpg",
  "From Up on Poppy Hill": "assets/images/detailsImages/from-up-on-poppy-hill.jpg",
  "The Wind Rises": "assets/images/detailsImages/the-wind-rises.jpg",
  "The Tale of the Princess Kaguya": "assets/images/detailsImages/the-tale-of-the-princess-kaguya.jpg",
  "When Marnie Was There": "assets/images/detailsImages/When-Marnie-Was-There.jpg",
  "The Red Turtle": "assets/images/detailsImages/the-red-turtle.jpg",
  "Earwig and the Witch": "assets/images/detailsImages/earweg.jpg"
};


async function loadMovie() {
  try {
    const movie = await fetchJSON(`${API}/films/${id}`);
    
    titleEl.textContent = movie.title;
    metaEl.textContent = `${movie.release_date} • ${movie.director} • Score: ${movie.rt_score}`;

    const img = detailImages[movie.title];
    imageEl.src = img;
    imageEl.alt = movie.title;

    currentMovieTitle = movie.title;
    trailerBtn.disabled = false;

    imageEl.onerror = () => {
    imageEl.src = "assets/images/detailsImages/default.jpg";
    };


    infoEl.innerHTML = `
      <p><b>Title:</b> ${movie.title}</p> <br>
      <p><b>Director:</b> ${movie.director}</p> <br>
      <p><b>Producer:</b> ${movie.producer}</p> <br>
      <p><b>Running time:</b> ${movie.running_time} min</p> <br>
      <p><b>Year:</b> ${movie.release_date}</p> <br>
      <p><b>Score:</b> ${movie.rt_score}</p> 
      <p class="desc">${movie.description}</p>
    `;

    // نخزن روابط الشخصيات الخاصة بهالفيلم (إذا موجودة)
    charsBtn.dataset.peopleUrls = JSON.stringify(movie.people || []);
  } catch (err) {
    infoEl.innerHTML = `<p class="error">Error loading movie details</p>`;
    console.error(err);
  }
}

async function loadCharacters() {
  try {
    charsEl.innerHTML = `<p>Loading characters...</p>`;

    // الطريقة الأقوى: نجلب كل الشخصيات ونفلتر حسب الفيلم
    const people = await fetchJSON(`${API}/people`);
    const movieUrl = `${API}/films/${id}`;

    const related = people.filter(p => (p.films || []).includes(movieUrl));

    if (!related.length) {
      charsEl.innerHTML = `<p class="muted">No characters associated with this movie in the API.</p>`;
      return;
    }

    charsEl.innerHTML = `
      <ul>
        ${related.map(c => `<li>${c.name} <span >(${c.gender}) </span></li>`).join("")}
      </ul>
    `;
  } catch (err) {
    charsEl.innerHTML = `<p class="error">Error loading characters</p>`;
    console.error(err);
  }
}

let charactersLoaded = false;
let charactersVisible = false;

charsBtn?.addEventListener("click", async () => {
  // إذا الشخصيات ما انجابوا قبل → جيبيهم مرة وحدة
  if (!charactersLoaded) {
    await loadCharacters();
    charactersLoaded = true;
    charactersVisible = true;

    charsBtn.textContent = "Hide characters";
    charsEl.style.display = "block";
    return;
  }

  // Toggle: إخفاء / إظهار بدون إعادة تحميل
  if (charactersVisible) {
    charsEl.style.display = "none";
    charsBtn.textContent = "Show characters";
    charactersVisible = false;
  } else {
    charsEl.style.display = "block";
    charsBtn.textContent = "Hide characters";
    charactersVisible = true;
  }
});




initAboutModal();
initTrailerModal({
  trailerBtn,
  getTrailerUrl: () => trailerLinks[currentMovieTitle]
});
loadMovie();
