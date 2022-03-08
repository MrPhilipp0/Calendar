import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import OverlayTriggerObject from '../OverlayTriggers/OverlayTriggerObject';
import YourTasksSingleTask from './YourTasksSingleTask';

import { Col } from 'react-bootstrap';
import { ICONS } from '../../store/constants';

const YourTasksDay = ({day, checkTask, blockFlag}) => {
  return (
    <Col md={12} className="border-bottom py-1">
      <div className="d-flex ms-0 h5 justify-content-between dayElement">

        {/* Weekday */}
        <label className="fw-bold">
          {day.weekDay}
        </label>

        <div>
          {/* Date */}
          <label className="pe-2">
            {day.idDay}
          </label>

          {/* Go to the task */}
          <OverlayTriggerObject 
            id={day.idDay} 
            text="Click to go to day" 
            placement="top" 
            object={
              <Link to={!blockFlag ? day.link : '#'} className="pe-2" style={blockFlag ? {pointerEvents:'none', color:'grey'} : null}>
                <FontAwesomeIcon icon={ICONS.goToTask} className="p-0"/>
              </Link> } 
          />
        </div>
      </div>
    
    {/* MAP TASKS */}
    {
      day.tasks.map(task => (
        <YourTasksSingleTask key={task.id} task={task} checkTask={checkTask}/>
      ))
    }
  </Col>
  );
}
 
export default YourTasksDay;