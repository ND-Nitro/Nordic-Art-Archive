const ownerActions = document.querySelectorAll(".owner-actions");
const token = localStorage.getItem("accessToken");

ownerActions.forEach((action) => {
  if (token) {
    action.style.display = "flex";
  } else {
    action.style.display = "none";
  }
});
