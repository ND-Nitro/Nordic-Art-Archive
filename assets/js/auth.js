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
  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");
  const formMessage = document.querySelector("#formMessage");

  function clearLoginErrors() {
    emailError.textContent = "";
    passwordError.textContent = "";
    formMessage.textContent = "";
  }

  function validateLoginForm(email, password) {
    let isValid = true;

    if (!email.trim()) {
      emailError.textContent = "Email is required.";
      isValid = false;
    }

    if (!password.trim()) {
      passwordError.textContent = "Password is required.";
      isValid = false;
    }

    return isValid;
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearLoginErrors();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!validateLoginForm(email, password)) {
      return;
    }

    try {
      formMessage.textContent = "Logging in...";

      const result = await sendRequest(API_LOGIN_URL, {
        email,
        password,
      });

      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("userName", result.data.name);
      localStorage.setItem("userEmail", result.data.email);

      formMessage.textContent = "Login succsessful.";

      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1000);
    } catch (error) {
      formMessage.textContent = error.message;
    }
  });
}

// this is the register function for register.html

if (registerForm) {
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");

  const nameError = document.querySelector("#nameError");
  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");
  const formMessage = document.querySelector("#formMessage");

  function clearRegisterErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    formMessage.textContent = "";
  }

  function validateRegisterForm(name, email, password) {
    let isValid = true;

    if (!name.trim()) {
      nameError.textContent = "Name is Required.";
      isValid = false;
    }

    if (!email.trim()) {
      emailError.textContent = "Email is Required.";
      isValid = false;
    }

    if (!password.trim()) {
      passwordError.textContent = "Password is Requierd.!";
      isValid = false;
    }

    if (password.trim().length < 8) {
      passwordError.textContent = "Password must be at least 8 characters.";
      isValid = false;
    }

    return isValid;
  }

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearRegisterErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!validateRegisterForm(name, email, password)) {
      return;
    }

    try {
      formMessage.textContent = "Registering...";

      await sendRequest(API_REGISTER_URL, {
        name,
        email,
        password,
      });

      formMessage.textContent = "Registration successful.";

      setTimeout(() => {
        window.location.href = "./login.html";
      }, 1000);
    } catch (error) {
      formMessage.textContent = error.message;
    }
  });
}
