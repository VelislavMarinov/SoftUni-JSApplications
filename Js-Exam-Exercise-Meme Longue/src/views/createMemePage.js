import { createMeme } from "../api/data.js";
import { html } from "../lib.js";

let createMemePageTemplate = (onSubmit) => html` <section id="create-meme">
  <form @submit=${onSubmit} id="create-form">
    <div class="container">
      <h1>Create Meme</h1>
      <label for="title">Title</label>
      <input id="title" type="text" placeholder="Enter Title" name="title" />
      <label for="description">Description</label>
      <textarea
        id="description"
        placeholder="Enter Description"
        name="description"
      ></textarea>
      <label for="imageUrl">Meme Image</label>
      <input
        id="imageUrl"
        type="text"
        placeholder="Enter meme ImageUrl"
        name="imageUrl"
      />
      <input type="submit" class="registerbtn button" value="Create Meme" />
    </div>
  </form>
</section>`;

export async function createMemePage(ctx) {
  ctx.render(createMemePageTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    let form = new FormData(e.target);
    let title = form.get("title");
    let description = form.get("description");
    let imageUrl = form.get("imageUrl");

    let body = {
      title,
      description,
      imageUrl,
    };
    if (title != "" && description != "" && imageUrl != "") {
      await createMeme(body);

      ctx.page.redirect("/memes");
    }
  }
}
