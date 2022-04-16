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
            <div class="card-price"> R$ ${consoler.price}</div>
        </div>

        <img class="card-img" src="${consoler.image}" alt="${consoler.name}">

      </div>

      `
    );
  });
}
async function findByIdConsole(){

  const id = document.querySelector("#idConsole").value

  const response = await fetch(`${baseURL}/find-consoler/${id}`);
  const consoler = await response.json();

  const consoleChosenDiv = document.querySelector("#consoleChosen")

  consoleChosenDiv.innerHTML = `
  <div class="card2-list">

    <div class="card2-container">

      <div class="card2-name">${consoler.name}</div>
      <div class="card2-description">${consoler.description}</div>
      <div class="card2-price"> R$ ${consoler.price}</div>

    </div>

    <img class="card-img" src="${consoler.image}" alt="${consoler.name}">

  </div>
  `
}

findAllConsole();