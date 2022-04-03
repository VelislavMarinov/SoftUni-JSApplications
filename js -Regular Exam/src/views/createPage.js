import { createPet } from "../api/data.js";
import { html } from "../lib.js";

let createPetPageTemplate = (onSubmit) => html`<section id="createPage">
  <form @submit=${onSubmit} class="createForm">
    <img src="./images/cat-create.jpg" />
    <div>
      <h2>Create PetPal</h2>
      <div class="name">
        <label for="name">Name:</label>
        <input name="name" id="name" type="text" placeholder="Max" />
      </div>
      <div class="breed">
        <label for="breed">Breed:</label>
        <input name="breed" id="breed" type="text" placeholder="Shiba Inu" />
      </div>
      <div class="Age">
        <label for="age">Age:</label>
        <input name="age" id="age" type="text" placeholder="2 years" />
      </div>
      <div class="weight">
        <label for="weight">Weight:</label>
        <input name="weight" id="weight" type="text" placeholder="5kg" />
      </div>
      <div class="image">
        <label for="image">Image:</label>
        <input
          name="image"
          id="image"
          type="text"
          placeholder="./image/dog.jpeg"
        />
      </div>
      <button class="btn" type="submit">Create Pet</button>
    </div>
  </form>
</section>`;

export async function createPetPage(ctx) {
  ctx.render(createPetPageTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    let form = new FormData(e.target);
    let body = {
      name: form.get("name"),
      breed: form.get("breed"),
      age: form.get("age"),
      weight: form.get("weight"),
      image: form.get("image"),
    };
    if (
      body.name != "" &&
      body.breed != "" &&
      body.age != "" &&
      body.weight != "" &&
      body.image != ""
    ) {
      let result = await createPet(body);

      ctx.page.redirect("/homepage");
    }
  }
}
