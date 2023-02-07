import findElement from "./units/findElement.js";
const elImage = findElement(".card-img-top");
const id = localStorage.getItem("id");
const elTitle = findElement(".card-title");
const elCategory = findElement(".card-category");
const elDescription = findElement(".card-text");
const elPrice = findElement(".card-price");
console.log();
let newObject = {
  image: elImage.value,
  name: elTitle.value,
  category: elCategory.value,
  description: elDescription.value,
  price: elPrice.value,
};
fetch(`https://63d61948dc3c55baf4309fc7.mockapi.io` + "/products/" + id, {
  method: "PUT",
  body: JSON.stringify(newObject),
})
  .then((res) => res.json())
  .then((json) => {
    newObject = json;
    elTitle.textContent = newObject.name;
    elCategory.textContent = newObject.category;
    elDescription.textContent = newObject.description;
    elPrice.textContent = newObject.price + "$";
    elImage.src = newObject.image;
  });
