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
const category = urlParams.get("category");

const url = "https://kea-alt-del.dk/t7/api/products/?limit=200&category=" + category;

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then(dataReceived);

function dataReceived(data) {
  //do something with the data
  console.log(data);
  data.forEach(listProduct);
}

function listProduct(oneProduct) {
  console.log("listProduct");
  //Fang template
  const template = document.querySelector("template").content;
  //Lav en kopi
  const copy = template.cloneNode(true);

  //Ændre indhold
  copy.querySelector(".produkt-navn").textContent = oneProduct.productdisplayname;
  if (oneProduct.soldout) {
    //produktet er udsolgt
    copy.querySelector("article").classList.add("udsolgt");
  }

  if (oneProduct.discount) {
    // Der er rabat tilgængelig
    copy.querySelector(".rabat-pris").classList.add("rabat");
    copy.querySelector(".rabat-pris span").textContent = oneProduct.discount;

    copy.querySelector(".produkt-pris").style.display = "block"; // VIS produktpris
  } else {
    // Ingen rabat tilgængelig
    copy.querySelector(".rabat-pris").style.display = "none"; // SKJUL rabatpris
    copy.querySelector(".produkt-pris").style.display = "block";
  }

  if (oneProduct.soldout) {
    // Produktet er udsolgt
    copy.querySelector(".rabat-pris").classList.add("rabat");
    copy.querySelector(".produkt-pris").classList.add("førpris");
    copy.querySelector(".produkt-pris span").textContent = oneProduct.soldout;
  } else {
    // Produktet er ikke udsolgt
    copy.querySelector(".produkt-pris").classList.remove("førpris"); // FJERN førpris
  }

  copy.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${oneProduct.id}.webp`;
  copy.querySelector(".brand").textContent = oneProduct.articletype;
  copy.querySelector(".type").textContent = oneProduct.brandname;
  copy.querySelector(".produkt-pris span").textContent = `${oneProduct.price} DKK`;
  copy.querySelector(".produkt-link").setAttribute("href", `produkt.html?id=${oneProduct.id}`);

  const parenntElement = document.querySelector("main");
  //appende
  parenntElement.appendChild(copy);
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
