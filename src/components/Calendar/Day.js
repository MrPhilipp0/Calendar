import React from 'react';
import { Link } from 'react-router-dom';

const Day = (props) => {
  const actualDate = new Date();
  let classList = 'Days'; //zmienna zarządzająca klasami stylów 
  const actualDay = actualDate.getDate() + '.' + actualDate.getMonth() + '.' + actualDate.getFullYear(); 
  if (actualDay === props.keys) classList += ' actualDay';

  const link = `/Calendar/tasks/${props.keys}`; // stała z linkiem do danego dnia

  let noDay = Number(props.keys.slice(0,1)); // zmienna divów bez danego dnia ........ 
  
  // funkcja która dla dnia który istnieje tworzy konkretny blok z linkiem do niego, jeżeli nie istnieje to tworzy pusty div.
  const day = () => {
    if (noDay) {
      return (
        <Link className='link' to={link} >
          <div className={classList} key={props.keys}> {props.number} </div>
        </Link>
      )
    } else {
      return <div className='noDays' key={props.keys}> . </div>
    }
  }
  
  return ( 
    day()
  );
}
 
export default Day;