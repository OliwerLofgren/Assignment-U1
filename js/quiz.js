function random_number(max) {
  return Math.floor(max * Math.random());
}

async function get_quiz() {
  console.log("Quiz started");
  document.querySelector("main").innerHTML = `
  <div id="login-info">
  <p>${input_username.value}</p>
  <button>Logout</button>
  </div>
  <div class="quiz-game">
  <div class="alternatives"></div>
  </div>
`;
  get_dog_info();
}

async function get_dog_info() {
  const random_dog = ALL_BREEDS[random_number(ALL_BREEDS.length)];
  const dog_url = `https://dog.ceo/api/breed/${random_dog.url}/images/random`;
  const random_dog_picture = await (await send_response(dog_url)).json();

  const dog_dom = document.createElement("div");
  dog_dom.classList.add("image");
  // dog_dom.style.backgroundImage = url(`${random_dog_picture.message}`);
  document.querySelector(".quiz-game").append(dog_dom);

  const alt_dom = document.createElement("div");
  alt_dom.classList.add("alternatives");
  document.querySelector(".quiz-game").append(alt_dom);

  for (let i = 0; i < 4; i++) {
    const button_dom = document.createElement("button");
    button_dom.classList.add("alt");
    document.querySelector(".alternatives").append(button_dom);
    button_dom.textContent = ALL_BREEDS[random_number(ALL_BREEDS.length)].name;
    button_dom.addEventListener("click", () => {
      if (button_dom.textContent.includes(dog_url)) {
        console.log("+");
      } else {
        console.log("-");
      }
    });
  }
}
