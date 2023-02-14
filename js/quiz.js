function get_quiz() {
  console.log("Quiz started");
  document.querySelector("main").innerHTML = `
 
  <div id="login-info">
  <p>${input_username.value}</p>
  <button>Logout</button>
  </div>
  `;
}
