import { html } from "./../node_modules/lit-html/lit-html.js";

export let town = (t) => html`<li>${t}</li>`;

export let ul = (arr) =>
  html`<ul>
    ${arr.map((el) => town(el))}
  </ul>`;
