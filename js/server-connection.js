"use strict";
const prefix = "https://teaching.maumt.se/apis/access/";
async function send_response(link) {
  const rqst = await fetch(link);
  return rqst;
}

async function post_register(input_username, input_password) {
  console.log("Register incoming");
  document.querySelector(".feedback").classList.add("visible");
  document.querySelector("#filter").classList.add("visible");
  document.querySelector(
    ".feedback"
  ).innerHTML = `<p>Connecting to server...</p>`;

  const response = await send_response(
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

  console.log(response);

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
    .addEventListener("click", toggle_button);
}

function toggle_button() {
  document.querySelector(".feedback").classList.remove("visible");
  document.querySelector("#filter").classList.remove("visible");
}

async function get_login() {
  const input_username = document.querySelector("input[type='Username']");
  const input_password = document.querySelector("input[type='Password']");

  document.querySelector(".feedback").classList.add("visible");
  document.querySelector("#filter").classList.add("visible");
  document.querySelector(".feedback").innerHTML = `Connecting to server...`;

  console.log("Get Login");

  const response = await send_response(
    `${prefix}?action=check_credentials&user_name=${input_username.value}&password=${input_password.value}`
  );

  if (response.ok) {
    localStorage.setItem("user", input_username.value);
    create_quiz(input_username.value);
    toggle_button();
  } else {
    document.querySelector("main p").style.backgroundColor = "ghostwhite";
    document.querySelector("main p").innerHTML = `
      Wrong password, please try again.
      `;
  }

  console.log(response);
}
