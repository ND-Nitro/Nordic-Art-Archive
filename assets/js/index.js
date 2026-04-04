import { API_BASE_URL } from "./api/config.js";

const ARTWORKS_URL = `${API_BASE_URL}/artworks`;
const artGrid = document.querySelector("#artGrid");

function createArtworkCard(artwork) {
  const imageUrl =
    artwork.image?.url || "https://via.placeholder.com/600x600?text=No+Image";
  const imageAlt = artwork.image?.alt || artwork.title || "Artwork preview";
  const title = artwork.title || "Untitled";
  const artist = artwork.artist || "Unknown artist";
  const year = artwork.year || "Unknown year";
  const id = artwork.id;

  return `
    <a href="./artwork.html?id=${id}" class="art-card">
      <img src="${imageUrl}" alt="${imageAlt}" class="art-card-image" />
      <div class="art-card-content">
        <h2 class="art-card-title">${title}</h2>
        <p class="art-card-artist">${artist}</p>
        <p class="art-card-year">${year}</p>
      </div>
    </a>
  `;
}

async function fetchArtworks() {
  try {
    const response = await fetch(ARTWORKS_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch artworks: ${response.status}`);
    }

    const result = await response.json();

    const artworks = result.data;

    artGrid.innerHTML = artworks.map(createArtworkCard).join("");
  } catch (error) {
    console.error("Error fetching artworks:", error);

    artGrid.innerHTML = `
      <p class="form-message">Failed to load artworks.</p>
    `;
  }
}

fetchArtworks();
