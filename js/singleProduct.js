import { BASE_URL } from "./main.js";
import findElement from "./units/findElement.js";
import getData from "./main.js";
const elImage = findElement(".card-img-top");
const id = localStorage.getItem("id");
const elTitle = findElement(".card-title");
const elCategory = findElement(".card-category");
const elDescription = findElement(".card-text");
const elPrice = findElement(".card-price");
const elSelect = findElement("#select");

let data = {};
fetch(BASE_URL + "/products/" + id)
  .then((res) => res.json())
  .then((json) => {
    data = json;
    elTitle.textContent = data.title;
    elCategory.textContent = data.category;
    elDescription.textContent = data.description;
    elPrice.textContent = data.price;
    elImage.src = data.image;
  });
