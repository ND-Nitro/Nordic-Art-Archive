// here is the api collector ,, that will  fetch / get the corrwect api i need for login and register 
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");

const API_LOGIN_URL = "https://v2.api.noroff.dev/auth/login";
const API_REGISTER_URL = "https://v2.api.noroff.dev/auth/register";

async function sendRequest(url, bodyData) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Something went wrong.");
  }

  return result;
}

// this is the login function for login.html

if (loginForm) {
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
