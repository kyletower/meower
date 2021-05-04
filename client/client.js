console.log("Hello, world!");

const form = document.querySelector("form"); // whenever you see document, it's client/user side
const loadingElement = document.querySelector(".loading");
loadingElement.style.display = "none";
const API_URL = "http://localhost:5000/mews";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");

  const mew = {
    name,
    content,
  };
  // console.log(mew);

  form.style.display = "none";
  loadingElement.style.display = "";

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(mew),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((createdMew) => {
      console.log(createdMew);
    });
});
