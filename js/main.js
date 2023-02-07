import findElement from "./units/findElement.js";

export const BASE_URL = `https://63d61948dc3c55baf4309fc7.mockapi.io`;
const templateProduct = findElement("#product-template");
const elCards = findElement(".cards");
const elSelect = findElement("#select");
const loader = findElement("#loader");
const elSearch = findElement(".search");

let products = [];
//render
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
    rating.textContent = ` ${product.rating} ⭐️`;
    img.src = product.image;

    img.dataset.id = product.id;
    description.id = product.id;
    fragment.appendChild(template);
  });
  parent.appendChild(fragment);
}

// fetch
export const getData = async function getData(select) {
  const res = await fetch(BASE_URL + "/products");

  let data = await res.json();
  products = data;

  if (res.status === 404) {
    throw new Error("Malumot topilmadi❗️");
  }

  // select
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

    loader.style.display = "none";
    elSelect.appendChild(elOption);
  });

  renderProduct(products);
};
getData();

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

elCards.addEventListener("click", (evt) => {
  if (
    evt.target.className.includes("card-img-top") ||
    evt.target.className.includes("description")
  ) {
    const id = evt.target.dataset.id;
    localStorage.setItem("id", id);
    window.location.href = "/singleProduct.html";
  }
});

// swiper
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";

const swiper = new Swiper(".swiper", {
  // Optional parameters
  // direction: "vertical",
  loop: true,
  slidesPerView: 3,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
});

// search
export const search = elSearch.addEventListener("input", (evt) => {
  evt.preventDefault();

  let searchProduct = [];
  const value = elSearch.value;

  products.forEach((element) => {
    if (element.name.toLowerCase().includes(value.toLowerCase())) {
      searchProduct.push(element);
    }
  });
  renderProduct(searchProduct);
});
