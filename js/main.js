import findElement from "./units/findElement.js";

const BASE_URL = `https://63d61948dc3c55baf4309fc7.mockapi.io`;
const templateProduct = findElement("#product-template");
const elCards = findElement(".cards");
const elSelect = findElement("#select");

let products = [];

function renderProduct(array, parent = elCards) {
  parent.textContent = "";

  const fragment = document.createDocumentFragment();
  array.forEach((product) => {
    const template = templateProduct.content.cloneNode(true);

    const title = findElement(".card-title", template);
    const date = findElement(".date", template);
    const img = findElement(".card-img-top", template);
    const category = findElement(".category", template);
    const price = findElement(".price", template);
    const rating = findElement(".rating", template);
    const ratingFull = findElement(".rating-full", template);
    const ratingHalf = findElement(".rating-half", template);
    const ratingStarts = findElement(".rating-stars", template);

    title.textContent = product.name;
    date.textContent = product.createdAt;
    category.textContent = product.category;
    price.textContent = "Prise:  " + product.price + "$";
    rating.textContent = product.rating;
    img.src = product.image;

    fragment.appendChild(template);
  });
  parent.appendChild(fragment);
}

(async function () {
  const res = await fetch(BASE_URL + "/products");

  let data = await res.json();
  products = data;

  console.log(products);
  renderProduct(products);
})();

//select
function renderSelect(arr, p) {
  elSelect.innerHTML = `
        <option value="products">products</option>
      `;
  // elSelect.textContent = null;
  let newArray = [];

  arr.forEach((element) => {
    if (!newArray.includes(element.category)) {
      newArray.push(element.category);
    }
  });
  newArray.forEach((elem) => {
    let elOption = document.createElement("option");
    elOption.value = elem;
    elOption.textContent = elem;

    p.appendChild(elOption);
  });
}

renderSelect(products, elSelect);
//options

elSelect.addEventListener("change", (evt) => {
  const opt = elSelect.value;

  let filteredPost = [];

  if (opt == "products") {
    renderProduct(products);
  } else {
    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      if (element.category == opt) {
        filteredPost.push(element);
      }
    }
    renderProduct(filteredPost);
  }
});
