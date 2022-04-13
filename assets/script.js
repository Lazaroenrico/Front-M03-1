const baseURL = "http://localhost:4900/console";

async function findAllConsole() {
  const response = await fetch(`${baseURL}/find-console`);

  const consoles = await response.json();

  consoles.forEach(function (console) {
    document.querySelector("#cardList").insertAdjacentHTML(
      "beforend",
      `
      <div class="card-list">
        <div>
            <div class="card-name">${console.name}</div>
            <div class="card-price">${console.price}</div>
            <div class="card-description">${console.description}</div>
        </div>

        <img class="card-img" src="${console.image}" alt="">

    </div>

      `
    );
  });
}
