import { render, html } from "./../node_modules/lit-html/lit-html.js";

export let sItem = (el) => html`<option .value="${el._id}">${el.text}</option>`;

export let listItems = (arrElements) =>
  html`${arrElements.map((x) => sItem(x))}`;
