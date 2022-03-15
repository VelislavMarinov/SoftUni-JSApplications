import { getAllMemes } from "../api/data.js";
import { html } from "../lib.js";

let catalogPageTemplate = (data) => html`<section id="meme-feed">
  <h1>All Memes</h1>
  <div id="memes">
    <!-- Display : All memes in database ( If any ) -->
    ${data.length == 0
      ? html` <p class="no-memes">No memes in database.</p>`
      : data.map(memeTemplate)}
    <!-- Display : If there are no memes in database -->
  </div>
</section>`;

let memeTemplate = (meme) => html` <div class="meme">
  <div class="card">
    <div class="info">
      <p class="meme-title">${meme.title}</p>
      <img class="meme-image" alt="meme-img" src="${meme.imageUrl}" />
    </div>
    <div id="data-buttons">
      <a class="button" href="/details/${meme._id}">Details</a>
    </div>
  </div>
</div>`;

export async function catalogPage(ctx) {
  let memes = await getAllMemes();
  console.log(memes);
  ctx.render(catalogPageTemplate(memes));
}
