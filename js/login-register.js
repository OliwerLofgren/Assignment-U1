"use strict";

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
const input_username = document.querySelector("input[type='Username']");

const input_password = document.querySelector("input[type='Password']");
document.querySelector("a").addEventListener("click", switch_login_register);

function switch_login_register() {
  document.querySelector("#link").classList.toggle("selected");

  if (document.querySelector("#link").classList.contains("selected")) {
    new_user();
  } else {
    login();
  }
}

function login() {
  document.querySelector("body").style.backgroundColor = "turquoise";
  document.querySelector("main > h2").textContent = "LOGIN";
  document.querySelector("p").textContent = "Let the magic start!";
  document.querySelector("a").textContent = "New to this? Register for free";
  document.querySelector("button").textContent = "Login";
}

function new_user() {
  document.querySelector("body").style.backgroundColor = "green";
  document.querySelector("main > h2").textContent = "REGISTER";
  document.querySelector("p").textContent = "Ready when you are!";
  document.querySelector("a").textContent =
    "Already have an account? Go to loggin";
  document.querySelector("button").textContent = "Register";
}
document.querySelector("main button").addEventListener("click", check_button);
function check_button() {
  if (document.querySelector("button").textContent === "Register") {
    post_register();
  } else {
    console.log("Login Hej");
    get_login();
  }
}
document.querySelector("button").addEventListener("click", post_register);
