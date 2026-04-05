import { API_BASE_URL } from "./api/config.js";

const form = document.querySelector("#createPostForm");
const message = document.querySelector("#message");

const token = localStorage.getItem("accessToken");
const apiKey = localStorage.getItem("apiKey");

const API_URL = `${API_BASE_URL}/artworks`;

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value.trim();
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
      if (!token) {
        throw new Error("You must be logged in.");
      }

      if (!apiKey) {
        throw new Error("Missing API key.");
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.errors?.[0]?.message || `Error: ${response.status}`,
        );
      }

      message.textContent = "Post created successfully!";
      message.style.color = "green";

      console.log("API response:", result);

      form.reset();
    } catch (error) {
      message.textContent = error.message;
      message.style.color = "red";

      console.error("error:", error);
    }
  });
}
