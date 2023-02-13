"use strict";

document.querySelector("main").innerHTML = `
<h2>Login</h2>
<div id="Username-wrapper">
    <div id="Username">Username:</div>
    <input type="text"></input>
</div>
<div id="Password-wrapper">
    <div id="Password">Password:</div>
    <input type="text"></input>
</div>
<p>Let the magic start</p>
<button>Login</button>
<div id="link">
<a href="#">New to this? Register for free</a>
</div>
`;

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
}

function new_user() {
  document.querySelector("body").style.backgroundColor = "green";
  document.querySelector("main > h2").textContent = "REGISTER";
  document.querySelector("p").textContent = "Ready when you are!";
  document.querySelector("a").textContent =
    "Already have an account? Go to loggin";
}
