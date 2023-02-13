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

const creditals = {
  user_name: input_username.value,
  password: input_password.value,
};
document.querySelector("a").addEventListener("click", switch_login_register);

function switch_login_register() {
  document.querySelector("#link").classList.toggle("selected");

  if (document.querySelector("#link").classList.contains("selected")) {
    new_user();
  } else {
    login();
  }
}

function check_button() {
  if (document.querySelector("button").textContent === "Login") {
    console.log("Login");
    document.querySelector("button").addEventListener("click", get_login);
  } else {
    console.log("Register");
    document.querySelector("button").addEventListener("click", post_register);
  }
}
check_button();

function login() {
  document.querySelector("body").style.backgroundColor = "turquoise";
  document.querySelector("main > h2").textContent = "LOGIN";
  document.querySelector("p").textContent = "Let the magic start!";
  document.querySelector("a").textContent = "New to this? Register for free";
  document.querySelector("button").textContent = "Login";
}
const prefix = "https://teaching.maumt.se/apis/access/";
async function get_login() {
  console.log("hej Login");
  const response = await fetch(
    `${prefix}?action=check_credentials&user_name=${creditals.user_name}&password=${creditals.password}`
  );

  const resource = await response.json();

  console.log(resource);
  console.log(response);
}

function new_user() {
  document.querySelector("body").style.backgroundColor = "green";
  document.querySelector("main > h2").textContent = "REGISTER";
  document.querySelector("p").textContent = "Ready when you are!";
  document.querySelector("a").textContent =
    "Already have an account? Go to loggin";
  document.querySelector("button").textContent = "Register";
}

async function post_register() {
  console.log("hej post");

  const response = await fetch(prefix, {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      action: "register",
      ...creditals,
    }),
  });
  const resource = await response.json();

  console.log(response);
  console.log(resource);
}
