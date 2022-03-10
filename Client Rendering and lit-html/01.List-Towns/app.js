import { render, html } from "./../node_modules/lit-html/lit-html.js";
import { ul, town } from "./townsTemplate.js";
let button = document.getElementById("btnLoadTowns");

let rootElement = document.getElementById("root");

button.addEventListener("click", (e) => {
  console.log("clicked");
  e.preventDefault();

  let townsElement = document.getElementById("towns");
  let splitedTowns = townsElement.value.split(", ");
  console.log(splitedTowns[0]);
  render(ul(splitedTowns), rootElement);
});
