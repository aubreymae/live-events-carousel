document.addEventListener("DOMContentLoaded", () => {
  // --- ELEMENT SELECTORS ---
  const track = document.querySelector(".carousel-track");
  const prevButton = document.getElementById("prev-btn");
  const nextButton = document.getElementById("next-btn");
  const paginationNumContainer = document.getElementById("pagination-numbers");

  // --- STATE ---
  let currentPage = 1;
  let cardsPerPage;
  let totalPages;

  /**
   * Generate the HTML for a single event card.
   * @param {object} event - the event data object.
   * @returns {string} - the HTML string for the card
   */
  function createCardHTML(event) {
    const safeTitle = event.title.replace(/\s+/g, "-");
    return `
    <article class="event-card" aria-labelledby="event-title-${safeTitle}">
      <div class="card-image-container">
        <img src="${event.img}" alt="A small image representing the topic of the event, dynamically generated." />
        <div class="card-date">${event.date}</div>
      </div>
      <div class="card-content">
        <div class="card-meta">
          <p>${event.type}</p>
          <p>${event.time}</p>
        </div>
        <h3 id="event-title-${safeTitle}">${event.title}</h3>
        <p class="card-description">${event.description}</p>
        <a href="${event.url}" class="card-button">Read event details</a>
      </div>
    </article>
  `;
  }

  /**
   * Sets the number of cards to display based on window width.
   * Key to creating a responsive carousel.
   */
  function setCardsPerPage() {
    if (window.innerWidth < 760) {
      cardsPerPage = 1;
    } else if (window.innerWidth < 1024) {
      cardsPerPage = 2;
    } else {
      cardsPerPage = 3;
    }
  }

  /**
   * Initializes the carousel, called on page load and window resize.
   */
  function setupCarousel() {
    setCardsPerPage();
    totalPages = Math.ceil(eventsData.length / cardsPerPage);

    track.innerHTML = eventsData.map(createCardHTML).join("");

    const cards = track.querySelectorAll(".event-card");
    const cardWidth = `${100 / cardsPerPage}%`;
    // cards.forEach((card) => {
    //   card.style.width = cardWidth;
    // });

    createPageNumbers();
    updateCarousel();
  }

  /**
   * Update the carousel's position and UI elements.
   */
  function updateCarousel() {
    const cards = track.querySelectorAll(".event-card");
    if (cards.length === 0) return;

    const totalTrackWidth = track.scrollWidth;
    const visibleTrackWidth = track.offsetWidth;
    const maxOffset = totalTrackWidth - visibleTrackWidth;

    const pageIndex = currentPage - 1;
    const pageCount = totalPages > 1 ? totalPages - 1 : 1;

    const offset = maxOffset * (pageIndex / pageCount);

    track.style.transform = `translateX(-${offset}px)`;

    prevButton.disabled = currentPage === 1;
    prevButton.setAttribute(
      "aria-disabled",
      currentPage === 1 ? "true" : "false"
    );

    nextButton.disabled = currentPage === totalPages;
    nextButton.setAttribute(
      "aria-disabled",
      currentPage === totalPages ? "true" : "false"
    );

    const pageNumberButtons =
      paginationNumContainer.querySelectorAll(".page-number");
    pageNumberButtons.forEach((button) => {
      button.classList.toggle(
        "active",
        parseInt(button.dataset.page) === currentPage
      );
      button.setAttribute(
        "aria-current",
        parseInt(button.dataset.page) === currentPage ? "page" : "false"
      );
    });
  }

  /**
   * Creates the pagination number buttons.
   */
  function createPageNumbers() {
    paginationNumContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.dataset.page = i;
      pageButton.className = "page-number";
      pageButton.setAttribute("aria-label", `Go to page ${i}`);

      pageButton.addEventListener("click", () => {
        currentPage = i;
        updateCarousel();
      });

      paginationNumContainer.appendChild(pageButton);
    }
  }

  // --- Event listeners ---
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updateCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      updateCarousel();
    }
  });

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setupCarousel, 200);
  });

  // --- Initialization ---
  setupCarousel();
});
