const covidAPI = "https://api.covidtracking.com/v1/states/co/daily.json";
const datePickerForm = document.querySelector("#date-picker");

datePickerForm.addEventListener("change", (event) => {
  event.preventDefault();
  const dateString = datePickerForm.value;
  const formattedFormInput = dateToInteger(dateString);

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
  return formattedDateString;
}

function dateToInteger(dateString) {
  yearSlice = dateString.slice(0, 4);
  monthSlice = dateString.slice(5, 7);
  daySlice = dateString.slice(8, 10);
  dateInteger = parseInt(yearSlice + monthSlice + daySlice);
  return dateInteger;
}

function renderDayCard(covidDay) {
  const cardContainer = document.querySelector("#covid-card-container");

  const cardDiv = document.createElement("div");
  const cardUL = document.createElement("ul");

  const covidDate = document.createElement("li");
  dateInteger = covidDay.date;
  formattedDate = dateToString(dateInteger);
  covidDate.textContent = "Date: " + formattedDate;

  const covidPositive = document.createElement("li");
  covidPositive.innerHTML = "Positive Cases: " + covidDay.positive;

  const totalTested = document.createElement("li");
  totalTested.textContent =
    "Total Tests Administered: " + covidDay.totalTestResults;

  const percentPositive = document.createElement("li");
  let numPosi = (covidDay.positive / covidDay.totalTestResults) * 100;
  percentPositive.textContent =
    "Percent Positive: " + Number(numPosi.toPrecision(3)) + "%";

  const covidHospitalizations = document.createElement("li");
  covidHospitalizations.innerHTML =
    "Current Hospitalizations: " + covidDay.hospitalizedCurrently;

  const covidDeaths = document.createElement("li");
  covidDeaths.innerHTML = "Deaths: " + covidDay.death;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.id = "delete-button";
  deleteBtn.addEventListener("click", () => {
    cardDiv.remove();
  });

  cardUL.append(
    covidDate,
    covidPositive,
    totalTested,
    percentPositive,
    covidHospitalizations,
    covidDeaths,
    deleteBtn
  );
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
