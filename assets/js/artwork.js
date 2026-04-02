const ownerActions = document.querySelectorAll(".owner-actions");
const token = localStorage.getItem("accessToken");

if (ownerActions) {
  if (token) {
    ownerActions.classList.remove("hidden");
  } else {
    ownerActions.classList.add("hidden");
  }
}
