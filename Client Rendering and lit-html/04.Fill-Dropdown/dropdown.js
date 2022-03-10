import { render, html } from "./../node_modules/lit-html/lit-html.js";
import { listItems } from "./itemsTemplate.js";
let menu = document.getElementById("menu");

let formElement = document.getElementById("form-data");
let form = new FormData(formElement);
let text = document.getElementById("itemText");
formElement.addEventListener("submit", addItem);

async function getElementsAndRenderThem() {
  let items = await fetch("http://localhost:3030/jsonstore/advanced/dropdown");
  let result = await items.json();

  let values = Object.values(result);
  console.log(values);

  render(listItems(values), menu);
}
getElementsAndRenderThem();

async function addItem(e) {
  e.preventDefault();

  let objToSend = { text: text.value };
  let addItem = await fetch(
    "http://localhost:3030/jsonstore/advanced/dropdown",
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(objToSend),
    }
  );
  await getElementsAndRenderThem();
}
