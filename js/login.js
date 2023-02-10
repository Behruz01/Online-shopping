import findElement from "./units/findElement.js";
const userInput = findElement("#user-input");
const passWordInp = findElement("#password-input");
const form = findElement(".login-form");
const userError = findElement("#user-error");
const passwordError = findElement("#password-error");

const errorText = (element, text) => {
  element.textContent = text;
  element.style.display = "block";
  const timer = setTimeout(() => {
    element.style.display = "none";

    clearTimeout(timer);
  }, 3000);
};
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (userInput.value.length == 0) {
    errorText(userError, "Iltimos ma'lumot kiritng!!!");
  }
  if (passWordInp.value.length < 6) {
    errorText(passwordError, "Ma'lumot 6ta belgidan kam bo'lmasligi kerak!!!");
  }
  const login = {
    //   email: "eve.holt@reqres.in",
    //   password: "cityslicka",
    email: userInput.value,
    password: passWordInp.value,
  };

  fetch("https://reqres.in/api/login ", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(login),
  })
    .then((res) => {
      if (res.status == 400) {
        throw new Error("Bunday foydalanuvchi topilmadi");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.token) {
        const token = data.token;
        localStorage.setItem("token", token);
        window.location.href = "/admin.html";
      }
    })
    .catch((err) => {
      errorText(userError, err);
    });
});
