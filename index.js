const covidAPI = "https://api.covidtracking.com/v1/states/co/daily.json";
const covidAPIDay = "https://api.covidtracking.com/v1/states/co/daily.json/01";
const covidCard = document.querySelector("#covid-card-container");
const covidUL = document.querySelector("#covid-ul");

fetch(covidAPI)
  .then((response) => response.json())
  .then((covidDays) =>
    covidDays.forEach((covidDay) => {
      const covidDate = document.createElement("li");
      dateString = covidDay.date
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

      cardUL.append(
        covidDate,
        covidPositive,
        covidHospitalizations,
        covidDeaths
      );

      const cardDiv = document.createElement("div");
      cardDiv.append(cardUL);
      covidCard.append(cardDiv);
    })
  );

function reformatDate(covidDay) {
  dateString = (covidDay.date).toString();
  yearSlice = dateString.slice(0, 4);
  monthSlice = dateString.slice(4, 6);
  daySlice = dateString.slice(6, 8);
  formattedDate = monthSlice + "-" + daySlice + "-" + yearSlice
  return formattedDate
}
// ------------------------------------
// $(function() {
//       $('#datepicker').datepicker({
//         onSelect: function() {
//           var date = $(this).val();
//           checkRange(date);
//         }
//       });
//     });

//     function checkRange(date) {
//       $('#div1').hide();
//       $('#div2').hide();
//       var checkDate = new Date(date),
//           a = new Date('2014/01/01'),
//           b = new Date('2015/01/02'),
//           c = new Date('2015/01/03'),
//           d = new Date('2016/09/10'),
//           inRange1 = checkDate >= a && checkDate = c && checkDate 