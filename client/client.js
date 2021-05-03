console.log("Hello, world!");

const form = document.querySelector("form"); // whenever you see document, it's client/user side

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");

  const mew = {
    name,
    content,
  };
  console.log(mew);
});
