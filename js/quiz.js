"use strict";
function create_quiz(username) {
  get_quiz();

  function get_quiz() {
    document.querySelector("main").innerHTML = `
      <div id="login-info">
      <p>${username}</p>
      </div>
      <div class="quiz-game">
      </div>
      `;

    document.querySelector("#wrapper").style.backgroundImage =
      "url('/media/logo.png')";

    const logout_button = document.createElement("button");
    logout_button.classList.add("logout");
    logout_button.textContent = "Logout";
    document.querySelector("#login-info").append(logout_button);
    logout_button.addEventListener("click", logout);

    function logout() {
      localStorage.removeItem("user");
      location.reload();
    }

    get_alternatives();

    async function get_alternatives() {
      const dog_array = [];
      for (let i = 0; i <= 4; i++) {
        if (!dog_array.includes(ALL_BREEDS[random_number(ALL_BREEDS.length)])) {
          dog_array.push(ALL_BREEDS[random_number(ALL_BREEDS.length)]);
        }
      }

      document.querySelector(".feedback").classList.add("visible");
      document.querySelector("#filter").classList.add("visible");

      document.querySelector(".feedback").textContent =
        "Getting a random image....";
      document.querySelector(".feedback").style.backgroundColor = "white";

      const random_dog = dog_array[random_number(dog_array.length)];
      const dog_url = `https://dog.ceo/api/breed/${random_dog.url}/images/random`;
      const random_dog_picture = await (await fetch_resource(dog_url)).json();

      document
        .querySelector("#wrapper")
        .style.removeProperty("background-image");

      document.querySelector(".feedback").classList.remove("visible");
      document.querySelector("#filter").classList.remove("visible");

      const dog_dom = document.createElement("img");
      dog_dom.classList.add("image");
      dog_dom.src = `${random_dog_picture.message}`;

      const alt_dom = document.createElement("div");
      alt_dom.classList.add("alternatives");

      document.querySelector(".quiz-game").append(dog_dom);
      document.querySelector(".quiz-game").append(alt_dom);

      for (let i = 0; i < 4; i++) {
        const button_dom = document.createElement("button");
        button_dom.classList.add("alt");
        document.querySelector(".alternatives").append(button_dom);

        button_dom.textContent = dog_array[i].name;
        button_dom.addEventListener("click", () => {
          if (button_dom.textContent.includes(random_dog.name)) {
            document.querySelector(".feedback").classList.add("visible");
            document.querySelector("#filter").classList.add("visible");
            document.querySelector(".feedback").style.backgroundColor =
              "rgb(75, 139, 75)";
            document.querySelector(".feedback").innerHTML = `
            <p>Correct answer!</p>
            <button>ONE MORE</button>
            `;
          } else {
            document.querySelector(".feedback").classList.add("visible");
            document.querySelector("#filter").classList.add("visible");
            document.querySelector(".feedback").style.backgroundColor =
              "tomato";
            document.querySelector(".feedback").innerHTML = `
            <p>Wrong answer! <br>Please try again!</p>
            <button>ONE MORE</button>
            `;
          }
          document
            .querySelector(".feedback button")
            .addEventListener("click", remove_classes);
          document
            .querySelector(".feedback button")
            .addEventListener("click", get_quiz);
        });
      }
    }
  }
}
