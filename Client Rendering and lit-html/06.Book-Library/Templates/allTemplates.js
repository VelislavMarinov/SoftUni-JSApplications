import { render, html } from "../../node_modules/lit-html/lit-html.js";

export let buttonLoadTemplate = () =>
  html`<button id="loadBooks">LOAD ALL BOOKS</button>`;

export let booksTemplate = (books) =>
  html`${books.map(
    (x) => html` <tr>
      <td>${x.title}</td>
      <td>${x.author}</td>
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>`
  )}`;

export let authorsListElementTemplates = () => {
  html`<table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody id="tbody"></tbody>
  </table>`;
};
