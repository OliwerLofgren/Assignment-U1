function login_data(username, password) {
  const user = {
    user_name: username,
    password: password,
  };

  const user_json = JSON.stringify(user);
  localStorage.setItem("user", user_json);
}
