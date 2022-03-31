import { editAlbum } from "../api/data.js";
import { html } from "../lib.js";
import { getAlbumDetails } from "../api/data.js";

let edintPageTemplate = (albumData, onSubmit) => html`<section class="editPage">
  <form @submit=${onSubmit}>
    <fieldset>
      <legend>Edit Album</legend>

      <div class="container">
        <label for="name" class="vhide">Album name</label>
        <input
          id="name"
          name="name"
          class="name"
          type="text"
          value="${albumData.name}"
        />

        <label for="imgUrl" class="vhide">Image Url</label>
        <input
          id="imgUrl"
          name="imgUrl"
          class="imgUrl"
          type="text"
          value="${albumData.imgUrl}"
        />

        <label for="price" class="vhide">Price</label>
        <input
          id="price"
          name="price"
          class="price"
          type="text"
          value="${albumData.price}"
        />

        <label for="releaseDate" class="vhide">Release date</label>
        <input
          id="releaseDate"
          name="releaseDate"
          class="releaseDate"
          type="text"
          value="${albumData.releaseDate}"
        />

        <label for="artist" class="vhide">Artist</label>
        <input
          id="artist"
          name="artist"
          class="artist"
          type="text"
          value="${albumData.artist}"
        />

        <label for="genre" class="vhide">Genre</label>
        <input
          id="genre"
          name="genre"
          class="genre"
          type="text"
          value="${albumData.genre}"
        />

        <label for="description" class="vhide">Description</label>
        <textarea name="description" class="description" rows="10" cols="10">
 ${albumData.description} </textarea
        >

        <button class="edit-album" type="submit">Edit Album</button>
      </div>
    </fieldset>
  </form>
</section>`;

export async function editPage(ctx) {
  let pathname = ctx.pathname;
  let id = pathname.split("/")[2];

  let album = await getAlbumDetails(id);

  ctx.render(edintPageTemplate(album, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    let form = new FormData(e.target);
    let body = {
      name: form.get("name"),
      imgUrl: form.get("imgUrl"),
      price: form.get("price"),
      releaseDate: form.get("releaseDate"),
      artist: form.get("artist"),
      genre: form.get("genre"),
      description: form.get("description"),
    };
    if (
      body.name != "" &&
      body.imgUrl != "" &&
      body.price != "" &&
      body.releaseDate != "" &&
      body.artist != "" &&
      body.genre != "" &&
      body.description != ""
    ) {
      await editAlbum(album._id, body);

      ctx.page.redirect(`/details/${album._id}`);
    }
  }
}
