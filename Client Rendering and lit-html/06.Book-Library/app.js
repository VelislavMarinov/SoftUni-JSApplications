import { render, html } from "./../node_modules/lit-html/lit-html.js";
import {
  booksTemplate,
  buttonLoadTemplate,
  authorsListElementTemplates,
} from "./Templates/allTemplates.js";

render(buttonLoadTemplate(), document.body);
render(authorsListElementTemplates(), document.body);
