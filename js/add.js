import findElement from "./units/findElement.js";
const BASE_URL = `https://63d61948dc3c55baf4309fc7.mockapi.io`;
// import { getData } from "./main.js";
const templateProduct = findElement("#product-template");
const elCards = findElement(".cards");
// const elSelect = findElement("#select");
const loader = findElement("#loader");
const form = findElement("#addForm");

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
// try {
const getData = async function getData() {
  const res = await fetch(BASE_URL + "/products");

  let data = await res.json();
  products = data;

  loader.style.display = "none";
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
  });

  renderProduct(products);
};
getData();

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const image = evt.target.image.value;
  const category = evt.target.category.value;
  const price = evt.target.price.value;
  const rating = evt.target.rating.value;
  const createdAt = evt.target.createdAt.value;

  const newObject = {
    name,
    image,
    category,
    price,
    rating,
    createdAt,
  };
  fetch(BASE_URL + "/products", {
    method: "POST",
    body: JSON.stringify(newObject),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("added product");
      console.log(data);
      form.reset();
    })
    .catch((err) => {
      console.log("Not found");
    });
});
