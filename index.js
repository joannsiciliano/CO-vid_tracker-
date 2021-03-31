const covidAPI = "https://api.covidtracking.com/v1/states/co/daily.json";
const datePickerForm = document.querySelector("#date-picker");

datePickerForm.addEventListener("change", (event) => {
  event.preventDefault();
  const dateString = datePickerForm.value; 
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
  
  datePickerForm.value = ""
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
  const cardContainer = document.querySelector("#covid-card-container");
  cardContainer.innerHTML = "";

  const cardDiv = document.createElement("div");
  const cardUL = document.createElement("ul");

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

  cardUL.append(covidDate, covidPositive, covidHospitalizations, covidDeaths);
  cardDiv.append(cardUL);
  cardContainer.append(cardDiv);
}

function navButtons() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}