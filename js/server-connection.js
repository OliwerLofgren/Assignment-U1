"use strict";
const prefix = "https://teaching.maumt.se/apis/access/";
async function fetch_resource(link) {
  const rqst = await fetch(link);
  return rqst;
}

async function post_register(input_username, input_password) {
  document.querySelector(".feedback").classList.add("visible");
  document.querySelector("#filter").classList.add("visible");
  document.querySelector(
    ".feedback"
  ).innerHTML = `<p>Connecting to server...</p>`;

  const response = await fetch_resource(
    new Request("https://teaching.maumt.se/apis/access/", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        action: "register",
        user_name: input_username.value,
        password: input_password.value,
      }),
    })
  );

  if (response.ok) {
    document.querySelector(".feedback").classList.add("visible");
    document.querySelector("#filter").classList.add("visible");

    document.querySelector(".feedback").innerHTML = `  
      <p>Registration Complete. <br>Please proceed to login.</p>
      <button>OK</button>
      `;
  } else {
    document.querySelector(".feedback").classList.add("visible");
    document.querySelector("#filter").classList.add("visible");
    switch (response.status) {
      case 409:
        document.querySelector(".feedback").innerHTML = `
              <p>Sorry, that name is taken. Please try with another one</p>
              <button>OK</button>
              `;
        break;
      case 418:
        document.querySelector(".feedback").innerHTML = `
              <p>The server thinks its not a teapot!</p>
              <button>OK</button>
              `;
        break;
    }
  }
  document
    .querySelector(".feedback button")
    .addEventListener("click", remove_classes);
}

function remove_classes() {
  document.querySelector(".feedback").classList.remove("visible");
  document.querySelector("#filter").classList.remove("visible");
}

async function get_login() {
  const input_username = document.querySelector("input[type='Username']");
  const input_password = document.querySelector("input[type='Password']");

  document.querySelector(".feedback").classList.add("visible");
  document.querySelector("#filter").classList.add("visible");
  document.querySelector(".feedback").innerHTML = `Connecting to server...`;

  const response = await fetch_resource(
    `${prefix}?action=check_credentials&user_name=${input_username.value}&password=${input_password.value}`
  );

  if (response.ok) {
    localStorage.setItem("user", input_username.value);
    create_quiz(input_username.value);
    remove_classes();
  } else {
    document.querySelector(".feedback").classList.add("visible");
    document.querySelector("#filter").classList.add("visible");
    switch (response.status) {
      case 400:
        document.querySelector(".feedback").innerHTML = `
            <p>Bad request</p>
            <button>OK</button>
            `;
        break;
      case 404:
        document.querySelector(".feedback").classList.remove("visible");
        document.querySelector("#filter").classList.remove("visible");
        document.querySelector("main p").textContent =
          "Wrong username or password";
        document.querySelector("main p").style.backgroundColor = "ghostwhite";
        break;
      case 418:
        document.querySelector(".feedback").innerHTML = `
             <p>The server thinks it's not a teapot!</p>
             <button>OK</button>
             `;
        break;
    }
    document
      .querySelector(".feedback button")
      .addEventListener("click", remove_classes);
  }
}
