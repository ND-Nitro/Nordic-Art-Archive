import { API_BASE_URL } from "./api/config.js";

const form = document.querySelector("#editPostForm");
const message = document.querySelector("#message");

const token = localStorage.getItem("accessToken");
const apiKey = localStorage.getItem("apiKey");

if (!token) {
  window.location.href = "../index.html";
}

if (!apiKey) {
  window.location.href = "../index.html";
}

const params = new URLSearchParams(window.location.search);
const artworkId = params.get("id");

if (!artworkId) {
  window.location.href = "../index.html";
}

const API_URL = `${API_BASE_URL}/artworks/${artworkId}`;

const titleInput = document.querySelector("#title");
const artistInput = document.querySelector("#artist");
const yearInput = document.querySelector("#year");
const mediumInput = document.querySelector("#medium");
const descriptionInput = document.querySelector("#description");
const locationInput = document.querySelector("#location");
const imageUrlInput = document.querySelector("#imageUrl");
const imageAltInput = document.querySelector("#imageAlt");

async function loadArtwork() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.errors?.[0]?.message || `Error: ${response.status}`,
      );
    }

    const artwork = result.data || result;

    titleInput.value = artwork.title || "";
    artistInput.value = artwork.artist || "";
    yearInput.value = artwork.year || "";
    mediumInput.value = artwork.medium || "";
    descriptionInput.value = artwork.description || "";
    locationInput.value = artwork.location || "";
    imageUrlInput.value = artwork.image?.url || "";
    imageAltInput.value = artwork.image?.alt || "";
  } catch (error) {
    message.textContent = error.message;
    message.style.color = "red";
    console.error("Error loading artwork:", error);
  }
}

if (form) {
  loadArtwork();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedData = {
      title: titleInput.value.trim(),
      artist: artistInput.value.trim(),
      year: Number(yearInput.value),
      medium: mediumInput.value.trim(),
      description: descriptionInput.value.trim(),
      location: locationInput.value.trim(),
      image: {
        url: imageUrlInput.value.trim(),
        alt: imageAltInput.value.trim(),
      },
    };

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.errors?.[0]?.message || `Error: ${response.status}`,
        );
      }

      message.textContent = "Artwork updated successfully!";
      message.style.color = "green";

      console.log("Updated artwork:", result);

      setTimeout(() => {
        window.location.href = `../artwork.html?id=${artworkId}`;
      }, 1200);
    } catch (error) {
      message.textContent = error.message;
      message.style.color = "red";
      console.error("Error updating artwork:", error);
    }
  });
}
