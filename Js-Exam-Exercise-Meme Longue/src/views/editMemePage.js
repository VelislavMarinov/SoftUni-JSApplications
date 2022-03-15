import { html } from "../lib.js";
import { editMeme, getMemeDetails } from "../api/data.js";

let editMemePageTemplate = (meme, onSubmit) => html` <section id="edit-meme">
  <form @submit=${onSubmit} id="edit-form">
    <h1>Edit Meme</h1>
    <div class="container">
      <label for="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Enter Title"
        name="title"
        value="${meme.title}"
      />
      <label for="description">Description</label>
      <textarea
        id="description"
        placeholder="Enter Description"
        name="description"
      >
                    ${meme.description}
                </textarea
      >
      <label for="imageUrl">Image Url</label>
      <input
        id="imageUrl"
        type="text"
        placeholder="Enter Meme ImageUrl"
        name="imageUrl"
        value="${meme.imageUrl}"
      />
      <input type="submit" class="registerbtn button" value="Edit Meme" />
    </div>
  </form>
</section>`;

export async function editMemePage(ctx) {
  let pathname = ctx.pathname;
  let id = pathname.split("/")[2];
  let meme = await getMemeDetails(id);
  console.log(meme);
  ctx.render(editMemePageTemplate(meme, onSubmit));

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

    await editMeme(body, id);

    ctx.page.redirect(`/details/${id}`);
  }
}
