function isLoggedIn() {
  const token = localStorage.getItem("accessToken");
  return Boolean(token);
}
function createNavbar() {
  const loggedIn = isLoggedIn();

  const authButtons = loggedIn
    ? `
    <a href="./create.html" class="btn btn-primary">
    Create
    </a>

      <button id="logoutBtn" class="btn btn-secondary">
        Logout
      </button>
    `
    : `
      <a href="./account/login.html" class="btn btn-secondary">
        Login
      </a>
      <a href="./account/register.html" class="btn btn-primary">
        Register
      </a>
    `;

  return `
    <div class="container header-wrapper">
      <a href="./index.html" class="logo">
        Nordic Art Archive
      </a>

      <nav class="site-nav" aria-label="Main navigation">
        <a href="./index.html" class="nav-link">Home</a>
        <a href="./about.html" class="nav-link">About</a>
      </nav>

      <div class="header-actions">
        ${authButtons}
      </div>
    </div>
  `;
}

function renderNavbar() {
  const navbar = document.querySelector("#navbar");

  if (!navbar) return;

  navbar.classList.add("site-header");

  navbar.innerHTML = createNavbar();

  const logoutBtn = document.querySelector("#logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }
}

function handleLogout() {
  localStorage.removeItem("accessToken");

  window.location.href = "./index.html";
}

renderNavbar();
