"use strict";

login_data();
function login_data(un, pw) {
  if (localStorage.getItem("user") === null) {
    login_register_page();
  } else {
    create_quiz(localStorage.getItem("user"));
  }
}
