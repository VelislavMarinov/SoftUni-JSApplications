/* <div id="main">
      <textarea id="messages" cols="80" rows="12" disabled="true"></textarea>
      <div id="controls">
        <label for="author">Name: </label
        ><input name="author" type="text" /><br />
        <label for="content">Message: </label
        ><input name="content" type="text" />
        <input id="submit" type="button" value="Send" />
        <input id="refresh" type="button" value="Refresh" />
      </div>
    </div>*/

function attachEvents() {
  let baseUrl = "http://localhost:3030/jsonstore/messenger";
  let textArea = document.getElementById("messages");
  let name = document.getElementsByName("author")[0];
  let content = document.getElementsByName("content")[0];
  let div = document.getElementById("controls");
  let sendButton = document.getElementById("submit");
  let refreshButton = document.getElementById("refresh");

  sendButton.addEventListener("click", () => {
    fetch(baseUrl, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        author: name.value,
        content: content.value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        name.value = "";
        content.value = "";
      })
      .catch((err) => console.log("Error ocured"));
  });

  refreshButton.addEventListener("click", () => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        textArea.textContent = "";
        for (const person in result) {
          console.log(person);
          let element = result[`${person}`];
          let text = `${element.author}: ${element.content}\n`;
          textArea.textContent += text;
        }
      });
  });
}

attachEvents();
