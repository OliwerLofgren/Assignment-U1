"use strict";
const prefix = "https://teaching.maumt.se/apis/access/";

async function post_register() {
  try {
    document.querySelector(".feedback").classList.add("visible");
    document.querySelector("#filter").classList.add("visible");
    document.querySelector(".feedback").innerHTML = `Connecting to server...`;

    const button_register = document
      .querySelector("button")
      .textContent.toLocaleLowerCase();
    const response = await fetch(prefix, {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        action: button_register,
        user_name: input_username.value,
        password: input_password.value,
      }),
    });

    const resource = await response.json();

    console.log(response);
    console.log(resource);

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

    function toggle_button() {
      document.querySelector(".feedback").classList.remove("visible");
      document.querySelector("#filter").classList.remove("visible");
    }
  } catch (error) {
    // document.querySelector(".feedback").innerHTML = `
    //   <p>${error.message}<p>
    //   <button>OK<button>
    //   `;
    console.log(error);
  }
}

async function get_login() {
  document.querySelector(".feedback").classList.add("visible");
  document.querySelector("#filter").classList.add("visible");
  document.querySelector(".feedback").innerHTML = `Connecting to server...`;

  console.log("Get Login");

  const response = await fetch(
    `${prefix}?action=check_credentials&user_name=${input_username.value}&password=${input_password.value}`
  );

  const resource = await response.json();

  if (response.ok) {
    // document.querySelector("main").innerHTML = `<img src="media/logo.png" />`;
    document.querySelector(".feedback").classList.remove("visible");
    document.querySelector("#filter").classList.remove("visible");
    get_quiz();
  } else {
    document.querySelector(".feedback").classList.remove("visible");
    document.querySelector("#filter").classList.remove("visible");

    document.querySelector("main p").style.backgroundColor = "ghostwhite";
    document.querySelector("main p").innerHTML = `
      Wrong password, please try again.
      `;
  }

  console.log(resource);
  console.log(response);

  document
    .querySelector(".feedback button")
    .addEventListener("click", toggle_button);
}
function toggle_button() {
  document.querySelector(".feedback").classList.remove("visible");
  document.querySelector("#filter").classList.remove("visible");
}
