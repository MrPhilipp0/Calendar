import React from 'react';
import { Link } from 'react-router-dom';
import { TaskContext } from '../Context/TaskToContext';

const Day = (props) => {
  const {tasksList, setTasksList} = React.useContext(TaskContext);
  const shortNames = tasksList.filter(item => item.idDay === props.keys)[0];

  const actualDate = new Date();
  let classList = 'Days'; //zmienna zarządzająca klasami stylów 
  const actualDay = actualDate.getDate() + '.' + actualDate.getMonth() + '.' + actualDate.getFullYear(); 
  if (actualDay === props.keys) classList += ' actualDay';

  const link = `/Calendar/tasks/${props.keys}`; // stała z linkiem do danego dnia

  let noDay = Number(props.keys.slice(0,1)); // zmienna divów bez danego dnia ........ 

  const viewShortNames = () => {
    if (shortNames !== undefined) {
      return (
        shortNames.tasks.map(task => (<p className='truncate-text-multiline'>{task.shortName}</p>))
      )
    }
  }
  
  // funkcja która dla dnia który istnieje tworzy konkretny blok z linkiem do niego, jeżeli nie istnieje to tworzy pusty div.
  const day = () => {
    if (noDay) {
      return (
        <Link className='link' to={link} >
          <div className={classList} key={props.keys}>
            <h4 style={{margin:'5px'}}> {props.number} </h4>
            {viewShortNames()}
          </div>
        </Link>
      )
    } else {
      return <div className='noDays' key={props.keys}></div>
    }
  }
  
  return ( 
    day()
  );
}
 
export default Day;