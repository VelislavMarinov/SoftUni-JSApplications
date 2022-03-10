import { render, html } from "./../node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";
import { townsListTemplate } from "./townsTemplate.js";

function search() {
  let townsElement = document.getElementById("towns");
  render(townsListTemplate(towns), townsElement);
  let liElemts = Array.from(townsElement.getElementsByTagName("li"));

  let SearchTextElement = document.getElementById("searchText");

  let buttonSearchElement = document.querySelector("article button");

  buttonSearchElement.addEventListener("click", (e) => {
    e.preventDefault();

    let textForSearch = SearchTextElement.value;

    liElemts.forEach((x) => {
      let elementText = x.textContent;

      elementText = elementText.toLowerCase();

      if (elementText.includes(textForSearch.toLowerCase())) {
        x.classList.add("active");
      } else {
        x.classList.remove("active");
      }
    });
  });
}

search();
