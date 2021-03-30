const covidAPI = "https://api.covidtracking.com/v1/states/co/daily.json";
const covidAPIDay = "https://api.covidtracking.com/v1/states/co/daily.json/01";
const covidCard = document.querySelector("#covid-card-container");
const covidUL = document.querySelector("#covid-ul");
const datePickerForm = document.querySelector('#date-picker')

fetch(covidAPI)
  .then((response) => response.json())
  .then((covidDays) => covidDays.forEach((covidDay) => {renderDayCard(covidDay)}))

function reformatDate(covidDay) {
  dateString = (covidDay.date).toString();
  yearSlice = dateString.slice(0, 4);
  monthSlice = dateString.slice(4, 6);
  daySlice = dateString.slice(6, 8);
  formattedDate = monthSlice + "-" + daySlice + "-" + yearSlice
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

function findCovidDate(covidDay) {
  let input = document.querySelector("input");
  input.onChange = function handleChange (event) {
    foundDate = covidDay.date.includes(input.value)
    console.log(foundDate)
  };
}

// function handleChange(e) {
//   log.textContent = `The field's value is
//       ${e.target.value.length} character(s) long.`;
// }