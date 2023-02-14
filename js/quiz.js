random_pet_name = array_random_element(ALL_BREEDS).name;
random_pet_picture = array_random_element(ALL_BREEDS).url;

function array_random_element(array) {
  const random_index = Math.floor(array.length * Math.random());
  return array[random_index];
}
function get_quiz() {
  console.log("Quiz started");
  document.querySelector("main").innerHTML = `
 
  <div id="login-info">
  <p>${input_username.value}</p>
  <button>Logout</button>
  </div>
  <img src="media/logo.png" />
  <div id="alternatives">
  <button class="alt">${
    ALL_BREEDS[random_number(ALL_BREEDS.length)].name
  }</button>
  <button class="alt">${
    ALL_BREEDS[random_number(ALL_BREEDS.length)].name
  }</button>
  <button class="alt">${
    ALL_BREEDS[random_number(ALL_BREEDS.length)].name
  }</button>
  <button class="alt">${
    ALL_BREEDS[random_number(ALL_BREEDS.length)].name
  }</button>
</div>
<div id="image"></div>
`;
}

function random_number(max) {
  return Math.floor(max * Math.random());
}
