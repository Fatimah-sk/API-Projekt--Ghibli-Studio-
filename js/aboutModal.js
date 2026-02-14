export function initAboutModal() {

  // Lag HTML automatisk hvis den ikke finnes
  if (!document.querySelector("#aboutModal")) {
    const modalHTML = `
<div id="aboutModal" class="modal hidden">
<div class="modal-content about-box">
    <button id="closeAbout" class="modal-close">✕</button>
    <div>
        <img src="assets/images/TEXT.png" alt="" class="ghibliText">
        <P class="aboutText">
          This website is a Studio Ghibli movie gallery where you can browse films,
          search by title, and open a details page with more info, characters, and trailers.
        </P>
        <ul class="about-list">
          <li>🔎 Search movies instantly</li>
          <li>🎬 Details page with hero image and info</li>
          <li>👤 Toggle characters list</li>
          <li>▶️ Watch trailer in a modal</li>
        </ul>
        <p class="about-credit">
          Created by <b>Fatimah SK</b> • © 2026
        </p>
      </div>
      <img src="assets/images/5.png" alt="" class="aboutImage">

    </div>
</div>
</div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
}

  const aboutLink = document.querySelector("#aboutLink");
  const aboutModal = document.querySelector("#aboutModal");
  const closeAbout = document.querySelector("#closeAbout");


  function openAbout() {
    aboutModal.classList.remove("hidden");
  }

  function closeAboutModal() {
    aboutModal.classList.add("hidden");
  }

  aboutLink.addEventListener("click", (e) => {
    e.preventDefault();
    openAbout();
  });

  closeAbout.addEventListener("click", closeAboutModal);

  aboutModal.addEventListener("click", (e) => {
    if (e.target === aboutModal) closeAboutModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !aboutModal.classList.contains("hidden")) {
      closeAboutModal();
    }
  });
}
