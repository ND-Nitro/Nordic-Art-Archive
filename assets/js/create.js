import { baseURL } from "./config.js";

const form = document.querySelector("#createPostForm");
const message = document.querySelector("#message");

const API_URL = `${baseURL}/artworks`;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document - querySelector("#title").value.trim();
  const artist = document.querySelector("#artist").value.trim();
  const year = Number(document.querySelector("#year").value);
  const medium = document.querySelector("#medium").value.trim();
  const description = document.querySelector("#description").value.trim();
  const location = document.querySelector("#location").value.trim();
  const imageUrl = document.querySelector("#imageUrl").value.trim();
  const imageAlt = document.querySelector("#imageAlt").value.trim();

  const postData = {
    title: title,
    artist: artist,
    year: year,
    medium: medium,
    description: description,
    location: location,
    image: {
      url: imageUrl,
      alt: imageAlt,
    },
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    message.textContent = "Artwork created successfully!";
  } catch (error) {
    message.textContent = "Error creating artwork. Please try again.";
  }
});
