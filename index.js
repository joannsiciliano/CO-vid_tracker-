console.log("sdafasdf");
const covidAPI = "https://api.covidtracking.com/v1/states/co/daily.json";
const covidAPIDay = "https://api.covidtracking.com/v1/states/co/daily.json/01";
const covidCard = document.querySelector("#covid-card-container");
const covidUL = document.querySelector("#covid-ul");

fetch(covidAPI)
  .then((response) => response.json())
  .then((covidDays) =>
    covidDays.forEach((covidDay) => {
      const covidDate = document.createElement("li");
      covidDate.textContent = "Date: " + covidDay.date;

      const covidPositive = document.createElement("li");
      covidPositive.innerHTML = "Positive Cases: " + covidDay.positive;

      const covidHospitalizations = document.createElement("li");
      covidHospitalizations.innerHTML =
        "Current Hospitalizations: " + covidDay.hospitalizedCurrently;

      const covidDeaths = document.createElement("li");
      covidDeaths.innerHTML = "Deaths: " + covidDay.death;

      const cardUL = document.createElement("ul");

      cardUL.append(
        covidDate,
        covidPositive,
        covidHospitalizations,
        covidDeaths
      );

      const cardDiv = document.createElement("div");
      cardDiv.append(cardUL);
      console.log(cardDiv);
      covidCard.append(cardDiv);
    })
  );
console.log(covidUL);
