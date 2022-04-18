const baseURL = "http://localhost:3000/consoler";

async function findAllConsole() {
  const response = await fetch(`${baseURL}/find-consoler`);

  const consoles = await response.json();

  consoles.forEach(function (consoler) {
    document.querySelector("#cardList").insertAdjacentHTML(
      "beforeend",
      `
      <div class="card-list">
        <div class="card-container">
            <div class="card-name">${consoler.name}</div>
            <div class="card-description">${consoler.description}</div>
            <div class="card-price"> R$: ${consoler.price}</div>
        </div>

        <img class="card-img" src="${consoler.image}" alt="${consoler.name}">

      </div>

      `
    );
  });
}
async function findByIdConsole() {
  const id = document.querySelector("#idConsole").value;

  const response = await fetch(`${baseURL}/find-consoler/${id}`);
  const consoler = await response.json();

  const consoleChosenDiv = document.querySelector("#consoleChosen");

  consoleChosenDiv.innerHTML = `
  <div class="card-list">

    <div class="card-container">
           
      <div class="card-name">${consoler.name}</div>
      <div class="card-description">${consoler.description}</div>
      <div class="card-price"> R$: ${consoler.price}</div>

    </div>

    <img class="card-img" src="${consoler.image}" alt="${consoler.name}">

  </div>
  `;
}

findAllConsole();

function openModalRegister() {
  document.querySelector(".modal-overlay").style.display = "flex";
}

function closeModalRegister() {
  document.querySelector(".modal-overlay").style.display = "none";

  document.querySelector("#name").value = "";
  document.querySelector("#price").value = 0;
  document.querySelector("#description").value = "";
  document.querySelector("#image").value = "";
}

async function createConsole() {
  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const description = document.querySelector("#description").value;
  const image = document.querySelector("#image").value;

  const consoli = {
    name,
    price,
    description,
    image,
  };

  const response = await fetch(`${baseURL}/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(consoli),
  });

  const newConsole = await response.json();

  const html = `
    <div class="card-list">

    <div class="card-container">
          
      <div class="card-name">${newConsole.name}</div>
      <div class="card-description">${newConsole.description}</div>
      <div class="card-price"> R$: ${newConsole.price}</div>

    </div>

    <img class="card-img" src="${newConsole.image}" alt="${newConsole.name}">

  </div>`;

  document.querySelector("#cardList").insertAdjacentHTML("beforeend", html);

  closeModalRegister();
}
