// Burgermenuen
document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const nav = document.querySelector("nav");

  burgerMenu.addEventListener("click", function () {
    nav.classList.toggle("active");
    burgerMenu.classList.toggle("open");
  });
});

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

fetch("https://kea-alt-del.dk/t7/api/products/" + id)
  .then((response) => response.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  console.log(product);

  document.querySelector(".produkt-navn").textContent = product.productdisplayname;
  document.querySelector(".brand").textContent = product.brandname;
  document.querySelector(".type").textContent = product.articletype;
  document.querySelector(".id").textContent = product.id;
  document.querySelector(".season").textContent = product.season;
  document.querySelector(".kategori").textContent = product.category;
  document.querySelector(".siden").textContent = product.productionyear;
  document.querySelector(".underkategori").textContent = product.usagetype;

  document.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  document.querySelector(".produkt-pris").textContent = product.price + " DKK";

  if (product.discount) {
    document.querySelector(".rabat-pris").textContent = "Rabatpris: " + product.discount + " DKK";
  } else {
    document.querySelector(".rabat-pris").style.display = "none"; // SKJUL rabatpris hvis ikke der er rabat.
  }

  if (product.soldout) {
    document.querySelector(".status").textContent = "Status: Udsolgt";
  }
}

// [{"id":1163,
// "gender":"Men",
// "category":"Apparel",
// "subcategory":"Topwear",
// "articletype":"Tshirts",
// "season":"Summer",
// "productionyear":2011,"usagetype":"Sports",
// "productdisplayname":"Sahara Team India Fanwear Round Neck Jersey",
// "price":895,"discount":null,"brandname":"Nike","soldout":0}
