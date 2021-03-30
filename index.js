const covidAPI = "https://api.covidtracking.com/v1/states/co/daily.json";
const covidCard = document.querySelector("#covid-card-container");
const covidUL = document.querySelector("#covid-ul");
const datePickerForm = document.querySelector("#date-picker");

datePickerForm.addEventListener("change", (event) => {
  event.preventDefault();
  const dateString = datePickerForm.value; //string ex: "2021-03-03"
  const formattedFormInput = dateToInteger(dateString)

  fetch(covidAPI)
    .then((response) => response.json())
    .then((covidDays) =>
      covidDays.forEach((covidDay) => {
        if (covidDay.date === formattedFormInput) {
          renderDayCard(covidDay);
        }
      })
    );
});

function dateToString(dateInteger) {
  dateString = dateInteger.toString();
  yearSlice = dateString.slice(0, 4);
  monthSlice = dateString.slice(4, 6);
  daySlice = dateString.slice(6, 8);
  formattedDateString = monthSlice + "-" + daySlice + "-" + yearSlice;
  return formattedDateString
}

function dateToInteger(dateString) {
  yearSlice = dateString.slice(0, 4);
  monthSlice = dateString.slice(5, 7);
  daySlice = dateString.slice(8, 10);
  dateInteger = parseInt(yearSlice + monthSlice + daySlice);
  return dateInteger
}

function renderDayCard(covidDay) {
  const covidDate = document.createElement("li");
  dateInteger = covidDay.date;
  formattedDate = dateToString(dateInteger);
  covidDate.textContent = "Date: " + formattedDate;

  const covidPositive = document.createElement("li");
  covidPositive.innerHTML = "Positive Cases: " + covidDay.positive;

  const covidHospitalizations = document.createElement("li");
  covidHospitalizations.innerHTML =
    "Current Hospitalizations: " + covidDay.hospitalizedCurrently;

  const covidDeaths = document.createElement("li");
  covidDeaths.innerHTML = "Deaths: " + covidDay.death;

  const cardUL = document.createElement("ul");

  cardUL.append(covidDate, covidPositive, covidHospitalizations, covidDeaths);

  const cardDiv = document.createElement("div");
  cardDiv.append(cardUL);
  covidCard.append(cardDiv);
}