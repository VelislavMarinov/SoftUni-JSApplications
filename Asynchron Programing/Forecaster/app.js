function attachEvents() {
  function getSymbol(string, element) {
    if (string === "Sunny") {
      element.textContent = "☀";
    } else if (string === "Partly sunny") {
      element.textContent = "⛅";
    } else if (string === "Overcast") {
      element.textContent = "☁";
    } else if (string === "Rain") {
      element.textContent = "☂";
    }
  }

  function spanFactory(obj) {
    let degreee = "°";
    let day = document.createElement("span");
    day.classList.add("upcoming");

    let symbolSpan = document.createElement("span");
    symbolSpan.classList.add("symbol");
    getSymbol(obj.condition, symbolSpan);

    let tempSpan = document.createElement("span");
    tempSpan.classList.add("forecast-data");
    tempSpan.textContent = `${obj.low}${degreee}/${obj.high}${degreee}`;

    let conditionSpan = document.createElement("span");
    conditionSpan.classList.add("forecast-data");
    conditionSpan.textContent = obj.condition;

    day.appendChild(symbolSpan);
    day.appendChild(tempSpan);
    day.appendChild(conditionSpan);

    return day;
  }

  let baseUrl = "http://localhost:3030/jsonstore/forecaster/locations";

  let button = document.getElementById("submit");

  button.addEventListener("click", () => {
    fetch(baseUrl)
      .then((result) => {
        return result.json();
      })
      .then((res) => {
        let info = document.getElementById("location");
        let place = info.value;
        let obj = {};
        for (let i = 0; i < res.length; i++) {
          if (res[i].name === place) {
            obj = res[i];
          }
        }
        let location = obj.code;
        let currBaseUrl = "http://localhost:3030/jsonstore/forecaster/today/";
        let forecast = document.getElementById("forecast");
        fetch(`${currBaseUrl}${location}`)
          .then((result) => {
            return result.json();
          })
          .then((result) => {
            let degree = "°";
            let condition = result.forecast.condition;
            let curentObj = result;
            forecast.style.display = "block";
            let curentDiv = document.getElementById("current");
            let div = document.createElement("div");
            div.classList.add("forecasts");
            let SymbolSpan = document.createElement("span");

            getSymbol(condition, SymbolSpan);

            SymbolSpan.classList.add("symbol");
            div.appendChild(SymbolSpan);

            let spanInfo = document.createElement("span");
            spanInfo.classList.add("condition");

            let name = document.createElement("span");
            name.textContent = curentObj.name;
            name.classList.add("forecast-data");

            let spanTemp = document.createElement("span");
            let temp = `${curentObj.forecast.low}${degree}/${curentObj.forecast.high}${degree}`;
            spanTemp.textContent = temp;
            spanTemp.classList.add("forecast-data");

            let spanCondition = document.createElement("span");
            spanCondition.textContent = `${condition}`;
            spanCondition.classList.add("forecast-data");

            spanInfo.appendChild(name);
            spanInfo.appendChild(spanTemp);
            spanInfo.appendChild(spanCondition);
            div.appendChild(spanInfo);
            curentDiv.appendChild(div);

            fetch(
              `http://localhost:3030/jsonstore/forecaster/upcoming/${location}`
            )
              .then((result2) => {
                return result2.json();
              })
              .then((res) => {
                console.log(res);
                let upcoming = document.getElementById("upcoming");
                let forecastInfo = document.createElement("div");
                forecastInfo.classList.add("forecast-info");
                let objDay1 = res.forecast[0];
                let objDay2 = res.forecast[1];
                let objDay3 = res.forecast[2];

                let day1 = spanFactory(objDay1);

                let day2 = spanFactory(objDay2);

                let day3 = spanFactory(objDay3);

                upcoming.appendChild(day1);
                upcoming.appendChild(day2);
                upcoming.appendChild(day3);
              });
          });
      })
      .catch(() => {
        console.log("Error");
      });
  });
}

attachEvents();
