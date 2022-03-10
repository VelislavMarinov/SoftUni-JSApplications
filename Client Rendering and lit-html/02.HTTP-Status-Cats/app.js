import { render, html } from "./../node_modules/lit-html/lit-html.js";
import { listOfCats } from "./catTemplates.js";
import cats from "./catSeeder.js";

let allCats = document.getElementById("allCats");
render(listOfCats(cats.cats, buttonEventHandler), allCats);

function buttonEventHandler(e) {
  let button = e.target;
  let buttonText = button.textContent.trim();

  let parent = button.parentElement;
  let infoElement = parent.querySelector("div");

  if (buttonText === "Show status code") {
    button.textContent = "Hide status code";
    infoElement.style.display = "block";
  } else {
    button.textContent = "Show status code";
    infoElement.style.display = "none";
  }

  console.log(infoElement);
}
