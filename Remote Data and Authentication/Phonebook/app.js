function attachEvents() {
  let baseUrlForGetAndPost = "http://localhost:3030/jsonstore/phonebook";
  let loadButton = document.getElementById("btnLoad");
  let deletUrl = `http://localhost:3030/jsonstore/phonebook/`;

  let createButton = document.getElementById("btnCreate");
  let textPerson = document.getElementById("person");
  let textPhone = document.getElementById("phone");

  let list = document.getElementById("phonebook");

  let button = document.createElement("button");
  button.innerText = "DELETE";

  createButton.addEventListener("click", () => {
    fetch(baseUrlForGetAndPost, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        person: textPerson.value,
        phone: textPhone.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  });

  loadButton.addEventListener("click", () => {
    fetch(baseUrlForGetAndPost)
      .then((result) => result.json())
      .then((result) => {
        while (list.firstChild) {
          list.removeChild(list.firstChild);
        }
        for (const key in result) {
          let obj = result[`${key}`];
          let li = document.createElement("li");
          li.textContent = `${obj.person}: ${obj.phone}`;
          li.id = `li${obj._id}`;

          let button = document.createElement("button");
          button.innerText = "DELETE";
          button.id = `${obj._id}`;
          console.log(`${deletUrl}${obj._id}`);
          console.log(button.id);

          button.addEventListener("click", (e) => {
            let b = e.currentTarget;
            let element = document.getElementById(`li${b.id}`);

            fetch(`${deletUrl}${b.id}`, {
              method: "DELETE",
              headers: { "Content-type": "application/json" },
            });
            list.removeChild(element);
          });

          li.appendChild(button);

          list.appendChild(li);
        }
      });
  });
}

attachEvents();
