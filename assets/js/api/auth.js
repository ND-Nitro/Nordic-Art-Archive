import { API_BASE_URL } from "./config.js";

const loginForm = document.querySelector("#loginform");
const registerForm = document.querySelector("#registerform");

const API_LOGIN_URL = `${API_BASE_URL}/auth/login`;
const API_REGISTER_URL = `${API_BASE_URL}/auth/register`;

async function sendRequest(url, bodyData) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Something went wrong.");
  }

  return result;
}

function setFieldError(element, message) {
  if (element) {
    element.textContent = message;
  }
}

function setFormMessage(element, message) {
  if (element) {
    element.textContent = message;
  }
}

function isValidEmail(email) {
  return email.includes("@");
}

// Loginform for login.html

if (loginForm) {
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");
  const formMessage = document.querySelector("#formMessage");

  function clearLoginErrors() {
    setFieldError(emailError, "");
    setFieldError(passwordError, "");
    setFormMessage(formMessage, "");
  }

  function validateLoginForm(email, password) {
    let isValid = true;

    if (!email) {
      setFieldError(emailError, "Email is required.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setFieldError(emailError, "Please enter a valid email.");
      isValid = false;
    }

    if (!password) {
      setFieldError(passwordError, "Password is required.");
      isValid = false;
    }

    return isValid;
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearLoginErrors();

    const email = emailInput?.value.trim() || "";
    const password = passwordInput?.value.trim() || "";

    if (!validateLoginForm(email, password)) {
      return;
    }

    try {
      setFormMessage(formMessage, "Logging in...");

      const result = await sendRequest(API_LOGIN_URL, {
        email,
        password,
      });

      console.log("Login result:", result);

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("userName", result.name);
      localStorage.setItem("userEmail", result.email);

      setFormMessage(formMessage, "Login successful.");

      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1000);
    } catch (error) {
      setFormMessage(formMessage, error.message);
    }
  });
}

// Registerform for register.html

if (registerForm) {
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const passwordConfirmInput = document.querySelector("#passwordConfirm");

  const nameError = document.querySelector("#nameError");
  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");
  const passwordConfirmError = document.querySelector("#passwordConfirmError");
  const formMessage = document.querySelector("#formMessage");

  function clearRegisterErrors() {
    setFieldError(nameError, "");
    setFieldError(emailError, "");
    setFieldError(passwordError, "");
    setFieldError(passwordConfirmError, "");
    setFormMessage(formMessage, "");
  }

  function validateRegisterForm(name, email, password, passwordConfirm) {
    let isValid = true;

    if (!name) {
      setFieldError(nameError, "Name is required.");
      isValid = false;
    }

    if (!email) {
      setFieldError(emailError, "Email is required.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setFieldError(emailError, "Please enter a valid email.");
      isValid = false;
    }

    if (!password) {
      setFieldError(passwordError, "Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setFieldError(passwordError, "Password must be at least 8 characters.");
      isValid = false;
    }

    if (!passwordConfirm) {
      setFieldError(passwordConfirmError, "Please confirm your password.");
      isValid = false;
    } else if (password !== passwordConfirm) {
      setFieldError(passwordConfirmError, "Passwords do not match.");
      isValid = false;
    }

    return isValid;
  }

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearRegisterErrors();

    const name = nameInput?.value.trim() || "";
    const email = emailInput?.value.trim() || "";
    const password = passwordInput?.value.trim() || "";
    const passwordConfirm = passwordConfirmInput?.value.trim() || "";

    if (!validateRegisterForm(name, email, password, passwordConfirm)) {
      return;
    }

    try {
      setFormMessage(formMessage, "Registering...");

      await sendRequest(API_REGISTER_URL, {
        name,
        email,
        password,
      });

      setFormMessage(formMessage, "Registration successful.");

      setTimeout(() => {
        window.location.href = "./login.html";
      }, 1000);
    } catch (error) {
      setFormMessage(formMessage, error.message);
    }
  });
}
