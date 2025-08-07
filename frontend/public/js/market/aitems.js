const options = document.querySelectorAll(".custom-options div");
const selected = document.getElementById("selected-option");
const customSelect = document.querySelector(".custom-select");

options.forEach((option) => {
  option.addEventListener("click", () => {
    selected.textContent = option.textContent;
    customSelect.classList.remove("open");
  });
});
