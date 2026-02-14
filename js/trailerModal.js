export function initTrailerModal({ trailerBtn, getTrailerUrl }) {

    // Lag HTML automatisk hvis den ikke finnes
      if (!document.querySelector("#trailerModal")) {
    const modalHTML = `
    <div id="trailerModal" class="modal hidden">
  <div class="modal-content">
    <button id="closeTrailer" class="modal-close">✕</button>
    <iframe
      id="trailerFrame"
      src=""
      title="Trailer"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</div>`;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    }


    const modalEl = document.querySelector("#trailerModal");
    const trailerFrame = document.querySelector("#trailerFrame");
    const closeTrailerBtn = document.querySelector("#closeTrailer");

    function openTrailer(Url) {
  modalEl.classList.remove("hidden");
  // autoplay when opened
  trailerFrame.src = `${Url}?autoplay=1&rel=0`;
}


function closeTrailer() {
  modalEl.classList.add("hidden");
  trailerFrame.src = ""; // stop video
}

  // زر المشاهدة
trailerBtn?.addEventListener("click", () => {
  const url = getTrailerUrl?.();

  if (!url) {
    alert("Sorry, trailer not available for this movie yet.");
    return;
  }

  openTrailer(url);
});
closeTrailerBtn?.addEventListener("click", closeTrailer);

// close when clicking outside the video
modalEl?.addEventListener("click", (e) => {
  if (e.target === modalEl) closeTrailer();
});
 
// close with ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalEl.classList.contains("hidden")) {
    closeTrailer();
  }
});
}





