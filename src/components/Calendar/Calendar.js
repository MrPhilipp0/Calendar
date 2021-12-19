import React from 'react';
import DaysList from './DaysList';

export const NAMES_MONTH = ['January', 'February', 'March', 'April', 'May', 'June','July','August', 'September', 'October', 'November', 'December'];

const Calendar = ({date, click}) => {

  return ( 

    <div className='calendar'>
      <div style={{
        display:'flex',
        borderBottom:'solid 2px black', 
        marginBottom:'20px', 
        paddingBottom:'10px', 
        flexDirection:'row',
        justifyContent:'space-between'}}>
        
        {/* Button przejścia do poprzedniego miesiaca */}
        <button onClick={click} id={'left'}>Left</button>

        {/* Dodać button z 'przejdź do ... miesiąca i ... roku' */}

        {/* Wyświetlanie miesiaca i roku w którym jesteśmy w kalendarzu */}
        <h1> {date.year}, {NAMES_MONTH[date.month]} </h1>

        {/* Button przejścia do aktualnego miesiaca i roku */}
        <button onClick={click} id={'today'}>Today</button>

        {/* Button przejścia do następnego miesiąca */}
        <button onClick={click} id={'right'}>Right</button>
      </div>
      <div style={{display:'flex', flexDirection:'inherit', justifyContent:'space-between', margin:'auto 35px'}}>
        <p>Mon</p>
        <p>Thu</p>
        <p>Wed</p>
        <p>Thr</p>
        <p>Fr</p>
        <p>Sat</p>
        <p>Sun</p>
      </div>

      {/* renderowanie dni w danym miesiącu */}
      <DaysList date={date}/>
    </div>
  );
}
 
export default Calendar;