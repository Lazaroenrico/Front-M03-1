const baseURL = "http://localhost:3000/consoler";

async function findAllConsole() {
  const response = await fetch(`${baseURL}/find-consoler`);

  const consoles = await response.json();

  consoles.forEach(function (consoler) {
    document.querySelector("#cardList").insertAdjacentHTML(
      "beforeend",
      `
      <div class="card-list" id="card-list-${consoler.id}">

        <div class="card-list-container">

            <div class="card-name">${consoler.name}</div>
            <div class="card-description">${consoler.description}</div>
            <div class="card-price"> R$: ${consoler.price}</div>

            <div class="Console_acoes Acoes">
              <button class="Acoes-edit btn" onclick="openModal(${consoler.id})">Editar</button>
              <button class="Acoes-delete btn" onclick="openModalDelete(${consoler.id})">Apagar</button>
            </div>
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
  <div class="card-list" id="card-list-${consoler.id}">

    <div>
           
      <div class="card-name">${consoler.name}</div>
      <div class="card-description">${consoler.description}</div>
      <div class="card-price"> R$: ${consoler.price}</div>

      <div class="Console_acoes Acoes">
        <button class="Acoes-edit btn" onclick="openModal(${consoler.id})">Editar</button>

        <button class="Acoes-delete btn" onclick="openModalDelete(${consoler.id})">Apagar</button>
      </div>

    </div>

    <img class="card-img" src="${consoler.image}" alt="${consoler.name}">

    

  </div>
  `;
}

findAllConsole();

async function openModal(id) {
  if (id != null) {
    document.querySelector("#title-header-modal").innerText =
      "Atualizar um Console";
    document.querySelector("#button-form-modal").innerText = "Atualizar";

    const response = await fetch(`${baseURL}/find-consoler/${id}`);
    const consoli = await response.json();

    document.querySelector("#name").value = consoli.name;
    document.querySelector("#price").value = consoli.price;
    document.querySelector("#description").value = consoli.description;
    document.querySelector("#image").value = consoli.image;
    document.querySelector("#id").value = consoli.id;
  } else {
    document.querySelector("#title-header-modal").innerText =
      "Cadastra um Console";
    document.querySelector("#button-form-modal").innerText = "Cadastrar";
  }
  document.querySelector("#overlay").style.display = "flex";
}

function closeModal() {
  document.querySelector(".modal-overlay").style.display = "none";

  document.querySelector("#name").value = "";
  document.querySelector("#price").value = 0;
  document.querySelector("#description").value = "";
  document.querySelector("#image").value = "";
}

async function createConsole() {
  const id = document.querySelector("#id").value;
  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const description = document.querySelector("#description").value;
  const image = document.querySelector("#image").value;

  const consoli = {
    id,
    name,
    price,
    description,
    image,
  };
  const modeEditOn = id > 0;

  const endpoint = baseURL + (modeEditOn ? `/update/${id}` : `/create`);

  const response = await fetch(endpoint, {
    method: modeEditOn ? `put` : `post`,
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(consoli),
  });

  const newConsole = await response.json();

  const html = `
    <div class="card-list" id="card-list-${consoli.id}">

    <div class="card-container">
          
      <div class="card-name">${newConsole.name}</div>
      <div class="card-description">${newConsole.description}</div>
      <div class="card-price"> R$: ${newConsole.price}</div>

    </div>

    <img class="card-img" src="${newConsole.image}" alt="${newConsole.name}">
     
    <div class="Console_acoes Acoes">
      <button class="Acoes-edit btn" onclick="openModal(${consoli.id})">Editar</button>
      <button class="Acoes-delete btn" onclick="openModalDelete(${consoli.id})">Apagar</button>
  </div>
  </div>`;

  if (modeEditOn == true) {
    document.querySelector(`#card-list-${id}`).outerHTML = html;
  }
  if (modeEditOn == false) {
    document.querySelector("#cardList").insertAdjacentHTML("beforeend", html);
  }

  closeModal();
}

function openModalDelete(id) {
  document.querySelector("#overlay-delete").style.display = "flex";
  const btnYes = document.querySelector(".btn-delete-yes");

  btnYes.addEventListener("click", function () {
    deleteConsole(id);
  });
}

function closeModalDelete() {
  document.querySelector("#overlay-delete").style.display = "none";
}

async function deleteConsole(id) {
  const response = await fetch(`${baseURL}/delete/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });

  const result = await response.json();
  alert(result.message);
  closeModalDelete();

  document.getElementById("cardList").innerHTML = "";

  findAllConsole();
}

