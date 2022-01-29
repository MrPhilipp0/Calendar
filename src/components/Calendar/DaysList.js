import React from 'react';
import Day from './Day';
import { NAMES_WEEKDAY } from './Calendar';

const DaysList = ({date}) => {

  // const day = date.day;
  const month = date.month;
  const year = date.year;
  const firstDayOfMonth = new Date(year, month, 1,0,0,0,0); //pierwszy dzień w danym miesiacu
  const lastDayOfMonth = new Date(year, month + 1, 0,0,0,0,0); //ostatni dzień w miesiącu
  const indexOfFirstDayOfMonth = firstDayOfMonth.getDay(); //(1 - pon, 2 - wt, 3-śr, ...)
  const numberOfLastDayOfMonth = lastDayOfMonth.getDate(); // liczba dni w miesiącu

  const objects = []; //pomocnicza tablica do tworzenia dni
  objects.length = 42;
  const weeks = [[],[],[],[],[],[]];

  // iterowanie po tablicy 42 elementów (tak jakby 6 tygodni), przypisanie wartości dopiero od pierwszego dnia w miesiącu oraz dnia tygodnia
  const days = () => {
    let j=1;
    for(let i=0; i < objects.length; i++) {
      if(i >= indexOfFirstDayOfMonth - 1 && i <= numberOfLastDayOfMonth - 2 + indexOfFirstDayOfMonth) {
        objects[i] = {
          number: j,
          key: j + '.' + Number(month +1) + '.' + year,
        };
        j++;
      } else { 
        objects[i] = {
          number: 0,
          key: '0' + i + '.' + Number(month +1) +'.' + year,
        };
      }
      weeks[Math.floor((i)/7)].push(objects[i]);
    }
  }
  
  days();
  //obcięcie tablicy tworzącej dni do 5 tygodni, jeżeli miesiąc mieści się w nich.
  // if (weeks[5][0].number === 0) weeks.length = 5; 
  
  // mapowanie po tablicy objects w celu utworzenia wszystkich dni w miesiącu
  // const Days = objects.map(day => <Day key={day.key} keys={day.key} number={day.number} date={date}/>);

  const Weeks = weeks.map(week => (
    <div className="d-flex justify-content-center mx-0 my-0" >
      {week.map((day,index) => <Day key={day.key} keys={day.key} number={day.number} date={date} weekday={NAMES_WEEKDAY[index]}/>)}
    </div>
  ))
  
  return ( 
    <div className="dayList">
      {Weeks}
    </div>
  );
}
 
export default DaysList;