import Day from './Day';
import { NAMES_WEEKDAY } from '../../store/constants';

const DaysList = ({date}) => {

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
  let j=1;
  for (let i=0; i < objects.length; i++) {
    const dayNumber = j < 10 ? '0' + j : j;
    const monthNumber = Number(month +1) < 10 ? '0' + Number(month +1) : Number(month +1);

    if(i >= indexOfFirstDayOfMonth - 1 && i <= numberOfLastDayOfMonth - 2 + indexOfFirstDayOfMonth) {
      objects[i] = {
        number: j,
        id: dayNumber + '.' + monthNumber + '.' + year,
      };
      j++;
    } else { 
      objects[i] = {
        number: 0,
        id: '-' + i + '.' + monthNumber + '.' + year,
      };
    }
    weeks[Math.floor((i)/7)].push(objects[i]);
  }

  // obcięcie tablicy tworzącej dni do 5 tygodni, jeżeli miesiąc mieści się w nich.
  if (weeks[5][0].number === 0) weeks.length = 5; 
  

  const Weeks = weeks.map((week, index) => (
    <div key={index + '_week'} className="d-flex justify-content-center mx-0 my-0" >
      {week.map((day,index) => 
        <Day 
          key={day.id} 
          id={day.id} 
          number={day.number} 
          date={date} 
          weekday={NAMES_WEEKDAY[index]}
        />)}
    </div>
  ))
  
  return ( 
    <div className="dayList">
      {Weeks}
    </div>
  );
}
 
export default DaysList;