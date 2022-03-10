function solve() {
  let baseUrl = "http://localhost:3030/jsonstore/bus/schedule/";
  let boxToUpdate = document.getElementsByClassName("info")[0];
  let departButton = document.getElementById("depart");
  let arriveButton = document.getElementById("arrive");
  let stopId = "depot";
  let nextStop = "";
  function depart() {
    fetch(`${baseUrl}${stopId}`)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        let stopName = result.name;
        boxToUpdate.textContent = `Next stop ${stopName}`;
        nextStop = result.next;
        arriveButton.disabled = false;
        departButton.disabled = true;
      });
  }

  function arrive() {
    boxToUpdate.textContent = `Arriving at ${stopId}`;

    stopId = nextStop;
    departButton.disabled = false;
    arriveButton.disabled = true;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
