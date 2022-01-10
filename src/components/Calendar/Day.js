import React from 'react';
import { Link } from 'react-router-dom';
import { TaskContext } from '../Context/TaskToContext';

const Day = (props) => {
  const {tasksList} = React.useContext(TaskContext);
  const shortNames = tasksList.filter(item => item.idDay === props.keys)[0];

  const actualDate = new Date();
  const actualDay = actualDate.getDate() + '.' + actualDate.getMonth() + '.' + actualDate.getFullYear(); 
  let dayStyle = {
    width: '14.285714285714286%',
    minHeight:'70px',
    backgroundColor:'#61A5C2',
  }; //zmienna zarządzająca klasami stylów 

  if (actualDay === props.keys) {
    dayStyle.backgroundColor = '#014F86';
  }

  const link = `/Calendar/tasks/${props.keys}`; // stała z linkiem do danego dnia

  let noDay = Number(props.keys.slice(0,1)); // zmienna divów bez danego dnia ........ 

  const viewShortNames = () => {
    if (shortNames !== undefined) {
      return (
        shortNames.tasks.map(task => (<p className='truncate-text-multiline'>{task.shortName}</p>))
      );
    }
  }
  
  // funkcja która dla dnia który istnieje tworzy konkretny blok z linkiem do niego, jeżeli nie istnieje to tworzy pusty div.
  const day = () => {
    if (noDay) {
      return (
        <Link to={link} style={dayStyle} class="mx-md-1 border col-success text-reset text-decoration-none Days actualDayStyle">
          <div class="d-md-flex" key={props.keys} > 
            <div class="mt-1 w-100 flex-shrink-4">
              {viewShortNames()}
            </div>
            <p class="flex-shrink-1 fw-bold text-end me-2 mt-1">
              {props.number} 
            </p>
          </div>
        </Link>
      )
    } else {
      return (
        <div class=" text-center mx-md-1 border" key={props.keys} style={{width: '14.285714285714286%', backgroundColor:'#A9D6E5'}}></div>
      )
      }
  }
  
  return ( 
    day()
  );
}
 
export default Day;