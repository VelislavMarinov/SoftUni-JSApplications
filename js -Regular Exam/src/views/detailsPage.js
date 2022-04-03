import { isLoggedIn } from "../api/api.js";
import {
  deletePet,
  donate,
  getPetDetails,
  getPetDonation,
} from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../utils.js";
import { getDonations, addDonation } from "../app.js";

let detailsPageTemplate = (
  pet,
  checkIfUserIsCreator,
  onDelete,
  onSubmit,
  getPetDonations
) => html`<section id="detailsPage">
  <div class="details">
    <div class="animalPic">
      <img src="${pet.image}" />
    </div>
    <div>
      <div class="animalInfo">
        <h1>Name: ${pet.name}</h1>
        <h3>Breed: ${pet.breed}</h3>
        <h4>Age: ${pet.age}</h4>
        <h4>Weight: ${pet.weight}</h4>
        <h4 id="donation" class="donation">
          Donation: ${getPetDonations * 100}$
        </h4>
      </div>
      ${checkIfUserIsCreator
        ? html` <div class="actionBtn">
            <!-- Only for registered user and creator of the pets-->
            ${isLoggedIn()
              ? html`<a href="/edit/${pet._id}" class="edit">Edit</a>
                  <a @click=${onDelete} href="/homepage" class="remove"
                    >Delete</a
                  >`
              : html``}
          </div>`
        : html`${isLoggedIn()
            ? html`<div class="actionBtn">
                <a @click=${onSubmit} href="#" class="donate">Donate</a>
              </div>`
            : html``}`}
    </div>
  </div>
</section>`;

export async function detailsPage(ctx) {
  let pathname = ctx.pathname;
  let id = pathname.split("/")[2];
  let userData = getUserData();

  let pet = await getPetDetails(id);
  let getPetDonations = await getPetDonation(pet._id);
  console.log(getPetDonations);

  let checkIfUserIsCreator = false;

  let bool = userData && userData.id == pet._ownerId ? true : false;
  checkIfUserIsCreator = bool;

  ctx.render(
    detailsPageTemplate(
      pet,
      checkIfUserIsCreator,
      onDelete,
      onSubmit,
      getPetDonations
    )
  );
  async function onSubmit(e) {
    e.preventDefault();
    let button = document.querySelector(".donate");
    button.style.display = "none";
    let result = await donate({ petId: pet._id });
    let donation = document.getElementById("donation");
    let current = await getPetDonation(pet._id);
    console.log(current);
    donation.textContent = `Donation: ${current * 100}$`;

    ctx.page.redirect(`${ctx.pathname}`);
  }

  async function onDelete(e) {
    e.preventDefault();
    if (userData) {
      const choice = confirm(
        "Are you sure you want to delete this pet forever ?"
      );

      if (choice) {
        await deletePet(pet._id);
        ctx.page.redirect("/homepage");
      }
    }
  }
}
