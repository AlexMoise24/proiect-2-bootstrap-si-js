const allHoverImage = document.querySelectorAll(".fotoDetail img");
const imageContainer = document.querySelector(".img-container");

window.addEventListener("DOMContentLoaded", () => {
  allHoverImage[0].parentElement.classList.add(".active");
});
allHoverImage.forEach((image) => {
  image.addEventListener("mouseover", () => {
    imageContainer.querySelector("img").src = image.src;
  });
});
