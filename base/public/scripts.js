document.body.addEventListener("htmx:configRequest", function (event) {
  const form = event.target;
  const username = form.querySelector("#id_username").value;
  const errorSmall = form.querySelector("#username-error");

  if (username.length < 3) {
    event.preventDefault();
    errorSmall.innerText = "Username must be at least 3 characters long..";
  } else {
    errorSmall.innerText = "";
  }
});
