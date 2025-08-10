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

eventsData.forEach((event) => {
  console.log(event.title);
});
