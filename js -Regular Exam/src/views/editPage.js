import { editPet, getPetDetails } from "../api/data.js";
import { html } from "../lib.js";

let editPetPageTemplate = (petdata, onSubmit) => html`<section id="editPage">
  <form @submit=${onSubmit} class="editForm">
    <img src="${petdata.image}" />
    <div>
      <h2>Edit PetPal</h2>
      <div class="name">
        <label for="name">Name:</label>
        <input name="name" id="name" type="text" value="${petdata.name}" />
      </div>
      <div class="breed">
        <label for="breed">Breed:</label>
        <input name="breed" id="breed" type="text" value="${petdata.breed}" />
      </div>
      <div class="Age">
        <label for="age">Age:</label>
        <input name="age" id="age" type="text" value="${petdata.age}" />
      </div>
      <div class="weight">
        <label for="weight">Weight:</label>
        <input
          name="weight"
          id="weight"
          type="text"
          value="${petdata.weight}"
        />
      </div>
      <div class="image">
        <label for="image">Image:</label>
        <input name="image" id="image" type="text" value="${petdata.image}" />
      </div>
      <button class="btn" type="submit">Edit Pet</button>
    </div>
  </form>
</section>`;

export async function editPage(ctx) {
  let pathname = ctx.pathname;
  let id = pathname.split("/")[2];

  let pet = await getPetDetails(id);

  ctx.render(editPetPageTemplate(pet, onSubmit));

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
      let result = await editPet(pet._id, body);

      ctx.page.redirect(`/details/${pet._id}`);
    }
  }
}
