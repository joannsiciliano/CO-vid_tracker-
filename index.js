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

function dateToString(covidDay) {
  dateString = covidDay.date.toString();
  yearSlice = dateString.slice(0, 4);
  monthSlice = dateString.slice(4, 6);
  daySlice = dateString.slice(6, 8);
  formattedDate = monthSlice + "-" + daySlice + "-" + yearSlice;
  return formattedDate
}

function dateToInteger(dateString) {
  yearSlice = dateString.slice(0, 4);
  monthSlice = dateString.slice(5, 7);
  daySlice = dateString.slice(8, 10);
  formattedDate = parseInt(yearSlice + monthSlice + daySlice)
  return formattedDate
}

function renderDayCard(covidDay) {
  const covidDate = document.createElement("li");
  dateString = covidDay.date;
  formattedDate = reformatDate(covidDay);
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

// function cardGrabber(covidDay) {
//   if (date - picker.value === covidDay.date) {
//     body.append(cardUL);
//   }
// }