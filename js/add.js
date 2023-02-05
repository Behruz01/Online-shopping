import findElement from "./units/findElement.js";
const BASE_URL = `https://63d61948dc3c55baf4309fc7.mockapi.io`;
const templateProduct = findElement("#product-template");
const elCards = findElement(".cards");
const loader = findElement("#loader");
const form = findElement("#addForm");
const editForm = findElement(".editForm");

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

    const deleteBtn = findElement(".btn-outline-danger", template);
    const editBtn = findElement(".btn-outline-info", template);

    deleteBtn.dataset.id = products.id;
    editBtn.dataset.id = products.id;

    title.textContent = product.name;
    date.textContent = product.createdAt;
    category.textContent = product.category;
    price.textContent = "Prise:  " + product.price + "$";
    rating.textContent = ` ${product.rating.count} from ${product.rating.rate} ⭐️`;
    img.src = product.image;
    description.textContent = product.description;

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
  // const createdAt = evt.target.createdAt.value;
  const description = evt.target.description;

  const newObject = {
    name,
    image,
    category,
    price,
    rating: { rate: rating, couny: 1000 },
    description,
  };
  fetch(BASE_URL + "/products", {
    method: "POST",
    body: JSON.stringify(newObject),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("added product");
      console.log(data);
      form.reset();
    })
    .catch((err) => {
      console.log("Not found");
    });
});
// delete product
elCards.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.className.includes("btn-outline-danger")) {
    const id = evt.target.dataset.id;
    fetch(BASE_URL + "/products/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("post o'chirildi ✅");
        getData();
      })
      .catch((err) => {
        alert("post o'chirilmadi ❌");
      });
  }
});

// Edit product
elCards.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.className.includes("btn-outline-info")) {
    const id = target.dataset.id;
    products.forEach((product) => {
      if (product.id === id) {
        const image = editForm.image;
        const title = editForm.title;
        const category = editForm.category;
        const price = editForm.price;
        const rating = editForm.rating;
        const editImg = findElement("#editImage");
        const editButton = findElement("#saveBtn");

        editImg.src = product.image;
        image.alt = product.name;

        image.value = product.value;
        title.value = product.name;
        category.value = product.category;
        price.value = product.price;
        rating.value = product.rating;

        editButton.addEventListener("click", () => {
          console.log("salom");
          newObject = {
            id: product.id,
            image: image.value,
            name: title.value,
            category: category.value,
            price: price.value,
            rating: rating.value,
          };

          fetch(BASE_URL + "/products/" + id, {
            method: "PUT",
            body: JSON.stringify(newObject),
          })
            .then((res) => res.json())
            .then((data) => {
              getData();
              alert("Mahsulot o'zgartirildi✅ ");
            })
            .catch((err) => {
              alert("Mahsulot o'zgartirilmadi❌");
            });
        });
      }
    });
  }
});
