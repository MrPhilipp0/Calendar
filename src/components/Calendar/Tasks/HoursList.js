import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { ICONS } from '../../../store/constants';
import OverlayTriggerObject from '../../OverlayTriggers/OverlayTriggerObject';
import Task from './Task';

import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HoursList = (props) => {

  const location = useLocation();
  const idDay = location.pathname.slice(7);
  const linkToAddTask = `/tasks/${idDay}/addTask`;

  const dayTasks = props.currentTasks.filter(task => task.idDay === idDay)

  // Sprawdzanie czy w danej godzinie występują jakieś zadania i zwrócenie ich do wyświetlenia
  const checkTasksHour = hour => {
    const tasksInHour = dayTasks.filter(task => (Number(task.time.split(':')[0]) === hour));

    return tasksInHour.map(task => (
      <Task key={task.id + '_task'} id={task.id}/>
    ))
  }

  const hoursList = [];
  for (let i=0; i<24; i++) {
    hoursList.push(i);
  }
  

  //Przy odpaleniu danego dnia, automatyczne scrolowanie do pierwszego taska
  const referenceToScroll = useRef(null);

  useEffect(() => {
    const element = [...referenceToScroll.current.querySelectorAll('.TASK')];
    element.length > 0 && element[0].scrollIntoView({behavior: "smooth", block: "center"});
  },[])

  return (
    <div className="my-2" ref={referenceToScroll}>
      {
        hoursList.map(hour => (
          <Row key={hour + '_hour'} className="mx-1 py-1 border-3 border-bottom border-dark">

            <Col xs={1} className="p-0 m-0 justify-content-center d-flex">
              <p className="fw-bold h6 ps-2 ps-sm-0">{hour}{':00'}</p>
            </Col>

            <Col xs={10}>
              <Row style={{ transition:'2s'}} className="ps-2 ps-sm-0">
                {dayTasks && checkTasksHour(hour)}
              </Row>
            </Col>

            <Col xs={1} className="d-flex justify-content-center">
              <OverlayTriggerObject
                id={hour + '_addTask'}
                text="Add task"
                placement="left"
                object = {
                  <Link to={linkToAddTask} state={{defaultTime: hour}}>
                    <FontAwesomeIcon className="fs-4" icon={ICONS.add}/>
                  </Link>
                }
              />
              
            </Col>
          </Row>
        ))
      }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentTasks: state.TasksReducer.tasks,
  };
} 
 
export default connect(mapStateToProps)(HoursList);