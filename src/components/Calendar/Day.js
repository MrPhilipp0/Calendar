import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortingTasksFunctionByTime } from '../LeftSide/YourTasks';

import { ACTUAL_DATE, COLORS } from '../../store/constants';
import OverlayTriggerObject from '../OverlayTriggers/OverlayTriggerObject';

import '../../styles/App.css';

const Day = (props) => {
  // przypisanie do zmiennej stanu magazynu z zadaniami konkretnego dnia
  const tasksInThisDay = props.currentTasks.filter(item => item.idDay === props.id);
  const verifiedTasksInThisDay = {
    done:tasksInThisDay.filter(item => item.check === true),
    noDone:tasksInThisDay.filter(item => item.check === false),
  }

  // stała z linkiem do danego dnia
  const link = `/schedule/tasks/${props.id}`; 

  const actualDay = 
  (ACTUAL_DATE.getDate() < 10 ? '0' + ACTUAL_DATE.getDate() : ACTUAL_DATE.getDate())
   + '.' + 
  (Number(ACTUAL_DATE.getMonth()+1) < 10 ? '0' + Number(ACTUAL_DATE.getMonth()+1) : Number(ACTUAL_DATE.getMonth()+1))
   + '.' + 
  ACTUAL_DATE.getFullYear(); 

  // ************************************
  // Zarządzanie wiadomością jakie taski mamy konkretnego dnia po najechaniu na blok
  const dayTasksCounter = () => {
    if (tasksInThisDay.length > 0) {
      const verifiedCircle = (color, tasks) => (
        <svg width="18" viewBox="0 0 10 10" className="mx-md-1">
          <circle cx="5" cy="5" r="5" fill={color}/>
          <text fontSize="55%" className="fw-bold" x="2.5" y="28" width="100%" height="100%" fill="black" transform="translate(0 -20)" >{tasks}</text>
        </svg>
      );
      return (
        <div className="d-flex justify-content-center">
          {verifiedTasksInThisDay.done.length ? verifiedCircle(COLORS.green1, verifiedTasksInThisDay.done.length) : null}
          {verifiedTasksInThisDay.noDone.length ? verifiedCircle(COLORS.pink2, verifiedTasksInThisDay.noDone.length) : null}
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
      object = object.sort(sortingTasksFunctionByTime)
      object = object.map((task, index) => {
        return (
          <div key={index + '_text'}>
            <label>
              <svg width="13" viewBox="0 0 10 10" className="me-1 mb-1">
                <circle cx="5" cy="5" r="5" fill={task.check ? COLORS.green1 : COLORS.pink2}/>
              </svg>
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
    <Link to={link} className="text-decoration-none Days actualDayStyle" style={actualDay === props.id ? {backgroundColor: COLORS.blue1, boxShadow:`0px 0px 20px ${COLORS.blue1}`} : null}>
      <div> 
        <p className="flex-shrink-1 fw-bold text-center mt-1 mb-0 lh-1" style={actualDay === props.id ? {color: COLORS.blue4, fontSize: '20px'} : null}>
          {props.number} 
        </p>
        <div className="mt-1">
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
        className="text-center my-1" 
        style={{width: '14.285714285714286%',minHeight:'70px'}}>
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