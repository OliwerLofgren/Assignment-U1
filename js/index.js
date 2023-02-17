"use strict";
function login_data(un, pw) {
  const user = {
    user_name: un,
    password: pw,
  };

  const user_data = JSON.stringify(user);

  localStorage.setItem("user", user_data);

  const recent_user = JSON.parse(localStorage.getItem("user"));

  if (recent_user !== null) {
  }
}
