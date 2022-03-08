import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ACTUAL_DATE, COLORS } from '../../store/constants';
import OverlayTriggerObject from '../OverlayTriggers/OverlayTriggerObject';


const Day = (props) => {
  // przypisanie do zmiennej stanu magazynu z zadaniami konkretnego dnia
  const tasksInThisDay = props.currentTasks.filter(item => item.idDay === props.id);

  // stała z linkiem do danego dnia
  const link = `/schedule/tasks/${props.id}`; 

  const actualDay = 
  (ACTUAL_DATE.getDate() < 10 ? '0' + ACTUAL_DATE.getDate() : ACTUAL_DATE.getDate())
   + '.' + 
  (Number(ACTUAL_DATE.getMonth()+1) < 10 ? '0' + Number(ACTUAL_DATE.getMonth()+1) : Number(ACTUAL_DATE.getMonth()+1))
   + '.' + 
  ACTUAL_DATE.getFullYear(); 
  
  // zmienna zarządzająca klasami stylów 
  let dayStyle = {
    width: '14.285714285714286%',
    minHeight: '70px',
    backgroundColor: COLORS.blue3,
  }; 
  if (actualDay === props.id) {
    dayStyle.backgroundColor = COLORS.blue5;
  }

  // ************************************
  // Zarządzanie wiadomością jakie taski mamy konkretnego dnia po najechaniu na dzień
  const dayTasksCounter = () => {
    if (tasksInThisDay.length > 0) {
      return (
        <div>
          <svg className="mb-0"viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="45">
            <path fill={COLORS.pink4} d="M45.2,-51.4C58.8,-42.5,70.2,-28.4,72.9,-12.9C75.6,2.6,69.6,19.7,61.1,36C52.5,52.4,41.5,68.1,26.5,74.2C11.5,80.2,-7.6,76.7,-22.9,68.6C-38.2,60.5,-49.8,48,-59.7,33.3C-69.5,18.6,-77.5,1.8,-78,-16.9C-78.5,-35.6,-71.3,-56.1,-57.1,-64.8C-42.8,-73.6,-21.4,-70.7,-2.8,-67.3C15.8,-64,31.6,-60.3,45.2,-51.4Z" transform="translate(100 80)" />
            <text fontSize="450%" className="fw-bold" x="75" y="125" width="300%" height="300%" fill="black" transform="translate(0 -20)" >{tasksInThisDay.length}</text>
          </svg>
        </div>
      );
    }
  }

  // Tekst w wiadomości (max 5 tasków na dzień)
  const dayObjectText = () => {
    let object = null;
    if (tasksInThisDay.length > 0) {
      object = JSON.parse(JSON.stringify(tasksInThisDay));
      object.length = object.length > 5 ? 5 : object.length;
      object = object.map((task, index) => {
        return (
          <div key={index + '_text'}>
            <label>
              <strong>{task.name}</strong>
            </label>
            <div className="d-flex justify-content-between">
              <p className="me-2">{task.category}</p>
              <p>{task.time}</p>
            </div>
          </div>
        )
      })
      tasksInThisDay.length > 5 && object.push(
        <div key={object.length + 1 + '_dots'} className="d-flex justify-content-center">
          <label><strong> ... </strong></label>
        </div>
      );
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
    id: props.id,
    text: dayObjectText(),
    placement: overlayTriggerPlacement(),
    object: 
    <Link to={link} style={dayStyle} className="border col-success text-reset text-decoration-none Days actualDayStyle">
      <div> 
        <p className="flex-shrink-1 fw-bold text-end me-2 mt-1 mb-0 lh-1">
          {props.number} 
        </p>
        <div className="mt-1 w-100 flex-shrink-1">
          {dayTasksCounter()}
        </div>
      </div>
    </Link>
  }

  return ( 
    // jeżeli props.number === 0 to znaczy że nie istnieje taki dzień w danym miesiącu w danym miejscu
    props.number ? (
      tasksInThisDay.length > 0 ? OverlayTriggerObject({...dayObject}) : dayObject.object
    ) : (
      <div 
        key={props.keys} 
        className="text-center border" 
        style={{width: '14.285714285714286%', backgroundColor:COLORS.blue2,minHeight:'70px'}}>
      </div>
    )
  );
}

const mapStateToProps = state => {
  return {
    currentTasks: state.TasksReducer.tasks,
  };
} 
 
export default connect(mapStateToProps)(Day);