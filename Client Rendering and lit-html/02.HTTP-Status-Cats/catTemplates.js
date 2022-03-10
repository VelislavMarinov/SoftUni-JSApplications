import { render, html } from "./../node_modules/lit-html/lit-html.js";

export let catLi = (cat, buttonEventHandler) => html`<li>
  <img
    src="./images/${cat.imageLocation}.jpg"
    width="250"
    height="250"
    alt="Card image cap"
  />
  <div class="info">
    <button class="showBtn" @click=${buttonEventHandler}>
      Show status code
    </button>
    <div class="status" style="display: none" id="${cat.id}">
      <h4>Status Code: ${cat.statusCode}</h4>
      <p>${cat.statusMessage}</p>
    </div>
  </div>
</li>`;

export let listOfCats = (cats, buttonEventHandler) =>
  html`<ul>
    ${cats.map((c) => catLi(c, buttonEventHandler))}
  </ul>`;
