// Burgermenuen
document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const nav = document.querySelector("nav");

  burgerMenu.addEventListener("click", function () {
    nav.classList.toggle("active");
    burgerMenu.classList.toggle("open");
  });
});

fetch("https://kea-alt-del.dk/t7/api/categories ")
  .then((res) => res.json())
  .then(showCategories);

function showCategories(cats) {
  cats.forEach(showCategory);
}

function showCategory(cat) {
  //fanger template
  const template = document.querySelector("template").content;

  //cloner
  const clone = template.cloneNode(true);

  //Ændre indhold
  clone.querySelector("a").textContent = cat.category;
  clone.querySelector("a").href = `produktliste.html?category=${cat.category}`;

  //appender
  document.querySelector(".letterGroup ol").appendChild(clone);
}
