import { baseURL } from "./config.js";

const form = document.querySelector("#createPostForm");
const message = document.querySelector("#message");
const token = localStorage.getItem("accessToken");
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Error:${resposne.status}");
    }

    const result = await response.json();

    message.textContent = "post created successfully!";
    message.style.color = "green";

    console.log("API response:", result);

    form.reset();
  } catch (error) {
    message.textContent = "Failed to create post. Please try again.";
    message.style.color = "red";

    console.error("error:", error);
  }
});
