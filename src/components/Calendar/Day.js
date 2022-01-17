import React from 'react';
import { Link } from 'react-router-dom';
import { TaskContext } from '../Context/TaskToContext';
import SimpleOverlayTriggerObject from '../OverlayTriggers/SimpleOverlayTriggerObject';

const Day = (props) => {
  const {tasksList} = React.useContext(TaskContext);
  const daysWithTasks = tasksList.filter(item => item.idDay === props.keys)[0];

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

  const trueDay = Number(props.keys.slice(0,1)); // zmienna divów bez danego dnia ........ 

  const dayTasksCounter = () => {
    if (daysWithTasks) {
      return (
        <div class="">
          <svg class="mb-0"viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="45">
            <path fill="#f72585" d="M45.2,-51.4C58.8,-42.5,70.2,-28.4,72.9,-12.9C75.6,2.6,69.6,19.7,61.1,36C52.5,52.4,41.5,68.1,26.5,74.2C11.5,80.2,-7.6,76.7,-22.9,68.6C-38.2,60.5,-49.8,48,-59.7,33.3C-69.5,18.6,-77.5,1.8,-78,-16.9C-78.5,-35.6,-71.3,-56.1,-57.1,-64.8C-42.8,-73.6,-21.4,-70.7,-2.8,-67.3C15.8,-64,31.6,-60.3,45.2,-51.4Z" transform="translate(100 80)" />
            <text fontSize="450%" class="fw-bold" x="75" y="125" width="300%" height="300%" fill="black" transform="translate(0 -20)" >{daysWithTasks.tasks.length}</text>
          </svg>
        </div>

      );
    }
  }

  const dayObjectText = () => {
    const day = tasksList.filter(day => day.idDay === props.keys);
    let object = null;
    if (day.length) {
      object = day[0].tasks.map(task => {
        return (
          <div>
            <label><strong>{task.shortName}</strong></label>
            <div className="d-flex justify-content-between">
              <p className="me-2">{task.category}</p>
              <p>{task.time}</p>
            </div>
          </div>
        )
      })
    }
    return (object);
  }

  const overlayTriggerPlacement = () => {
    if (props.weekday === "Mon" || props.weekday === "Thu" || props.weekday === "Wed") {
      return 'right'
    } else {
      return 'left'
    }
  }

  const dayObject = {
    id: props.keys,
    text: dayObjectText(),
    placement: overlayTriggerPlacement(),
    object: 
    <Link to={link} style={dayStyle} class="mx-md-1 border col-success text-reset text-decoration-none Days actualDayStyle">
      <div class="" key={props.keys} > 
        <p class="flex-shrink-1 fw-bold text-end me-2 mt-1 mb-0 lh-1">
          {props.number} 
        </p>
        <div class="mt-1 w-100 flex-shrink-1">
          {dayTasksCounter()}
        </div>
      </div>
    </Link>
  }
  
  // funkcja która dla dnia który istnieje tworzy konkretny blok z linkiem do niego, jeżeli nie istnieje to tworzy pusty div.
  const day = () => {
    if (trueDay) {
      if (daysWithTasks) {
        return (
          SimpleOverlayTriggerObject({...dayObject})
        )
      } else {
        return (
          dayObject.object
        )
      }
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