function getInfo() {
  let input = document.querySelector("#stopId");
  let infoId = input.value;

  let baseUrl = "http://localhost:3030/jsonstore/bus/businfo/";
  fetch(`${baseUrl}${input.value}`)
    .then((result) => {
      return result.json();
    })
    .then((res) => {
      document.getElementById("stopName").textContent = res.name;
      let list = document.getElementById("buses");
      let buses = res.buses;
      for (const bus in buses) {
        let li = document.createElement("li");
        li.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`;
        list.appendChild(li);
      }

      console.log(res.buses);
    })
    .catch(() => {
      document.getElementById("stopName").textContent = "Error";
    });
}
