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

  datePickerForm.value = "";
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
  cardContainer.innerHTML = "";

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

  cardUL.append(
    covidDate,
    covidPositive,
    totalTested,
    percentPositive,
    covidHospitalizations,
    covidDeaths
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

// 
// --explanation of statistic/definition on hover?
// Date: Date

// Date on which data was collected by The COVID Tracking Project.
// Positive Cases: 
// Cases (confirmed plus probable)

// Total number of confirmed plus probable cases of COVID-19 reported by the state or territory, ideally per the August 5, 2020 CSTE case definition. Some states are following the older April 5th, 2020 CSTE case definition or using their own custom definitions. Not all states and territories report probable cases. If a state is not reporting probable cases, this field will just represent confirmed cases.
// Total Tests Administered: 
// Total test results

// At the national level, this metric is a summary statistic which, because of the variation in test reporting methods, is at best an estimate of US viral (PCR) testing. Some states/territories report tests in units of test encounters, some report tests in units of specimens, and some report tests in units of unique people. Moreover, some jurisdictions include antigen tests in their total test counts without reporting a separate total of viral (PCR) tests. Therefore, this value is an aggregate calculation of heterogeneous figures. Please consult each state or territory’s individual data page to see whether that jurisdiction lumps antigen and PCR tests together and to see what units that jurisdiction uses for test reporting.

// In most states, the totalTestResults field is currently computed by adding positive and negative values because, historically, some states do not report totals, and to work around different reporting cadences for cases and tests. In Colorado, Delaware, the District of Columbia, Florida, Hawaii, Minnesota, Nevada, New York, North Dakota, Pennsylvania, Rhode Island, Virginia, Washington, and Wisconsin, where reliable testing encounters figures are available with a complete time series, we directly report those figures in this field. In Alaska, America Samoa, Arizona, Arkansas, California, Connecticut, Georgia, Illinois, Indiana, Kentucky, Maine, Maryland, Massachusetts, Michigan, Missouri, Montana, Nebraska, New Hampshire, New Mexico, North Carolina, Ohio, Oregon, South Dakota, Tennessee, Texas, Utah, Vermont, West Virginia, and Wyoming, where reliable specimens figures are available with a complete time series, we directly report those figures in this field. In Alabama and Idaho where reliable unique people figures are available with a complete time series, we directly report those figures in this field. We are in the process of switching all states over to use directly reported total figures, using a policy of preferring testing encounters, specimens, and people, in that order.
// Percent Positive: Cases (confirmed plus probable)

// Total number of confirmed plus probable cases of COVID-19 reported by the state or territory, ideally per the August 5, 2020 CSTE case definition. Some states are following the older April 5th, 2020 CSTE case definition or using their own custom definitions. Not all states and territories report probable cases. If a state is not reporting probable cases, this field will just represent confirmed cases.
// Current Hospitalizations: Currently hospitalized/Now hospitalized
// Individuals who are currently hospitalized with COVID-19. Definitions vary by state / territory, and it is not always clear whether pediatric patients are included in this metric. Where possible, we report patients hospitalized with confirmed or suspected COVID-19 cases.
// Deaths: Deaths (confirmed and probable)
// Total fatalities with confirmed OR probable COVID-19 case diagnosis (per the expanded CSTE case definition of April 5th, 2020 approved by the CDC). In some states, these individuals must also have COVID-19 listed on the death certificate to count as a COVID-19 death. When states post multiple numbers for fatalities, the metric includes only deaths with COVID-19 listed on the death certificate, unless deaths among cases is a more reliable metric in the state.
// // create gif demo

