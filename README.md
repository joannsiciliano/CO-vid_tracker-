# COvid-19 Tracker

## Table of Contents

![-](https://i.imgur.com/SHaN5GA.gif)[General Info](#general-info)![-](https://i.imgur.com/SHaN5GA.gif)

![-](https://i.imgur.com/SHaN5GA.gif)[Technologies](#technologies) ![-](https://i.imgur.com/SHaN5GA.gif)
![-](https://i.imgur.com/SHaN5GA.gif)[Setup](#setup)![-](https://i.imgur.com/SHaN5GA.gif)
![-](https://i.imgur.com/SHaN5GA.gif)[Features](#features)![-](https://i.imgur.com/SHaN5GA.gif)
![-](https://i.imgur.com/SHaN5GA.gif)[Code Example](#code-example)![-](https://i.imgur.com/SHaN5GA.gif)
![-](https://i.imgur.com/SHaN5GA.gif)[Inspiration](#inspiration)![-](https://i.imgur.com/SHaN5GA.gif)
![-](https://i.imgur.com/SHaN5GA.gif) [Contact](#contact)![-](https://i.imgur.com/SHaN5GA.gif)

## General Info

The COvid-19 Tracker displays the impact of the Covid-19 pandemic in Colorado between March 2020 and March 2021.

Source: [The COVID Tracking Project](https://covidtracking.com/)
API: https://api.covidtracking.com/v1/states/co/daily.json/

## Technologies

- JavaScript
- Html
- CSS

## Setup

To use the COvid-19 Tracker, fork and clone this GitHub repository and run lite-server.

## Features

Search for Covid-19 data by date in the state of Colorado

## Code Example

```
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
```

## Inspiration

We are inspired by the advancements in science over the past year that have propelled our understanding of the Covid-19 pandemic. Our goal is to present factual data on Covid-19 in the state of Colorado and promote vaccination among the general public.

## Contact

Covid-19 Tracker was created by [JoAnn Siciliano](https://www.linkedin.com/in/joannsiciliano/) and [Haley Warson](https://www.linkedin.com/in/haleywarson/).

Contact us with any questions. ![-](https://i.imgur.com/SHaN5GA.gif)
