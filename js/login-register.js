"use strict";

function quiz_or_login_page() {
  if (localStorage.getItem("user") === null) {
    login_register_page();
  } else {
    create_quiz(localStorage.getItem("user"));
  }
}

function login_register_page() {
  document.querySelector("main").innerHTML = `
  <h2>Login</h2>
  <div class="login-wrapper">
  <label for="Username" id="Username">Username:</label>
  <input type="Username"></input>
  </div>
  <div class="login-wrapper">
  <label for="Password" id="Password">Password:</label>
  <input type="Password"></input>
  </div>
  <p>Let the magic start</p>
  <button>Login</button>
  <div id="link">
  <a href="#">New to this? Register for free</a>
  </div>
  `;
  document.querySelector("a").addEventListener("click", switch_page);

  function switch_page() {
    document.querySelector("#link").classList.toggle("selected");

    if (document.querySelector("#link").classList.contains("selected")) {
      register();
    } else {
      login();
    }
  }

  document.querySelector("main button").addEventListener("click", check_button);

  function check_button() {
    const input_username = document.querySelector("input[type='Username']");
    const input_password = document.querySelector("input[type='Password']");

    if (input_username.value === "" && input_username.value === "") {
      document.querySelector(".feedback").classList.add("visible");
      document.querySelector("#filter").classList.add("visible");
      document.querySelector(".feedback").innerHTML = `
        <p>  Write your username and password </p>
        <button> Ok </button>
        `;

      document
        .querySelector(".feedback button")
        .addEventListener("click", remove_classes);
    } else {
      if (document.querySelector("button").textContent === "Register") {
        post_register(input_username, input_password);
      } else {
        get_login();
      }
    }
  }

  function login() {
    document.querySelector("#wrapper").style.transition = "background-color 1s";
    document.querySelector("#wrapper").style.backgroundColor =
      "rgb(160, 139, 75)";
    document.querySelector("main > h2").textContent = "LOGIN";
    document.querySelector("p").textContent = "Let the magic start!";
    document.querySelector("a").textContent = "New to this? Register for free";
    document.querySelector("button").textContent = "Login";
  }

  function register() {
    document.querySelector("#wrapper").style.transition = "background-color 1s";
    document.querySelector("#wrapper").style.backgroundColor =
      "rgb(255, 182, 113)";
    document.querySelector("main > h2").textContent = "REGISTER";
    document.querySelector("p").textContent = "Ready when you are!";
    document.querySelector("a").textContent =
      "Already have an account? Go to loggin";
    document.querySelector("button").textContent = "Register";
  }
}
