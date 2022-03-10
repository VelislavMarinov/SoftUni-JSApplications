import { render, html } from "./../node_modules/lit-html/lit-html.js";

export let townTemplete = (town) => html`<li>${town}</li>`;

export let townsListTemplate = (towns) =>
  html`<ul>
    ${towns.map((e) => townTemplete(e))}
  </ul>`;
