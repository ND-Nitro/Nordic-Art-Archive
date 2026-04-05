import { API_BASE_URL } from "./api/config.js";

const ARTWORKS_URL = `${API_BASE_URL}/artworks`;

const titleElement = document.querySelector("#artworkTitle");
const imageElement = document.querySelector("#artworkImage");
const metaElement = document.querySelector("#artworkMeta");
const descriptionElement = document.querySelector("#artworkDescription");
const ownerActions = document.querySelector("#ownerActions");
const editButton = document.querySelector("#editButton");
const deleteButton = document.querySelector("#deleteBtn");

function getArtworkIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function showOwnerActions() {
  const token = localStorage.getItem("accessToken");

  if (!ownerActions) return;

  if (token) {
    ownerActions.classList.remove("hidden");
    ownerActions.style.display = "flex";
  } else {
    ownerActions.classList.add("hidden");
    ownerActions.style.display = "none";
  }
}

function renderArtwork(artwork) {
  const title = artwork.title || "Untitled";
  const artist = artwork.artist || "Unknown artist";
  const year = artwork.year || "Unknown year";
  const medium = artwork.medium || "Unknown medium";
  const location = artwork.location || "Unknown location";
  const description = artwork.description || "No description available.";
  const imageUrl =
    artwork.image?.url || "https://via.placeholder.com/900x700?text=No+Image";
  const imageAlt = artwork.image?.alt || title;

  document.title = `${title} | Nordic Art Archive`;

  titleElement.textContent = title;
  imageElement.src = imageUrl;
  imageElement.alt = imageAlt;

  metaElement.innerHTML = `
    <p><strong>Artist:</strong> ${artist}</p>
    <p><strong>Year:</strong> ${year}</p>
    <p><strong>Medium:</strong> ${medium}</p>
    <p><strong>Location:</strong> ${location}</p>
  `;

  descriptionElement.textContent = description;

  if (editButton && artwork.id) {
    editButton.href = `./edit.html?id=${artwork.id}`;
  }
}

function renderError(message) {
  titleElement.textContent = "Artwork not found";
  imageElement.style.display = "none";
  metaElement.innerHTML = `<p>${message}</p>`;
  descriptionElement.textContent = "Please try again later.";
}

async function fetchArtwork() {
  const artworkId = getArtworkIdFromUrl();

  if (!artworkId) {
    renderError("Missing artwork id in URL.");
    return;
  }

  try {
    const response = await fetch(`${ARTWORKS_URL}/${artworkId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch artwork. Status: ${response.status}`);
    }

    const result = await response.json();
    const artwork = result.data;

    renderArtwork(artwork);
    showOwnerActions();
  } catch (error) {
    console.error("Error fetching artwork:", error);
    renderError("Could not load artwork.");
  }
}

async function handleDelete() {
  const artworkId = getArtworkIdFromUrl();

  if (!artworkId) {
    alert("Missing artwork id.");
    return;
  }

  const token = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  if (!token) {
    alert("You must be logged in to delete an artwork.");
    return;
  }

  if (!apiKey) {
    alert("Missing API key.");
    return;
  }

  const confirmed = window.confirm(
    "Are you sure you want to delete this artwork?",
  );

  if (!confirmed) return;

  try {
    const response = await fetch(`${ARTWORKS_URL}/${artworkId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
    });

    if (!response.ok) {
      let errorMessage = "Failed to delete artwork.";

      try {
        const result = await response.json();
        errorMessage =
          result.errors?.[0]?.message || `Error: ${response.status}`;
      } catch {
        errorMessage = `Error: ${response.status}`;
      }

      throw new Error(errorMessage);
    }

    alert("Artwork deleted successfully.");
    window.location.href = "./index.html";
  } catch (error) {
    console.error("Error deleting artwork:", error);
    alert(error.message);
  }
}

if (deleteButton) {
  deleteButton.addEventListener("click", handleDelete);
}

showOwnerActions();
fetchArtwork();
