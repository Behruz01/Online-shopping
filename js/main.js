import findElement from "./units/findElement.js";

export const BASE_URL = `https://63d61948dc3c55baf4309fc7.mockapi.io`;
const templateProduct = findElement("#product-template");
const elCards = findElement(".cards");
const elSelect = findElement("#select");
const loader = findElement("#loader");
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
    const description = findElement(".description", template);

    const ratingFull = findElement(".rating-full", template);
    const ratingHalf = findElement(".rating-half", template);
    const ratingStarts = findElement(".rating-stars", template);

    title.textContent = product.name;
    date.textContent = product.createdAt;
    description.textContent = product.description;
    category.textContent = product.category;
    price.textContent = "Prise:  " + product.price + "$";
    rating.textContent = ` ${product.rating.count} from ${product.rating.rate} ⭐️`;
    img.src = product.image;
    img.style.height = "300px";
    fragment.appendChild(template);
  });
  parent.appendChild(fragment);
}
export const getData = async function getData(select) {
  const res = await fetch(BASE_URL + "/products");

  let data = await res.json();
  products = data;

  if (res.status === 404) {
    throw new Error("Malumot topilmadi!");
  }

  let newArray = [];

  products.forEach((element) => {
    if (!newArray.includes(element.category)) {
      newArray.push(element.category);
    }
  });

  newArray.forEach((elem) => {
    let elOption = document.createElement("option");
    elOption.value = elem;
    elOption.textContent = elem;

    elSelect.appendChild(elOption);
  });

  renderProduct(products);
};
getData(elSelect);

// options;

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
export default getData;
