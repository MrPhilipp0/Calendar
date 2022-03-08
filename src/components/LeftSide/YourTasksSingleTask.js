import OverlayTriggerObject from '../OverlayTriggers/OverlayTriggerObject';

import { Col, Row } from 'react-bootstrap';
import { COLORS, ICONS } from '../../store/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const YourTasksSingleTask = ({task, checkTask}) => {

  const priorityStars = (taskPriority) => {
    let stars = [];
    stars.length = taskPriority;
    for (let i=0; i<stars.length; i++) {
      stars[i] = <i key={i} className="bi bi-star-fill lh-1 me-sm-1" style={{color:"gold"}}></i>
    }
    return <div className="d-flex justify-content-end">{stars}</div>;
  }

  return (
    <Col md={12} className="border-bottom py-1 importantShortTask">
      <Row className="justify-content-between">
        <Col xs={4} className="d-flex">

          {/* Category icon */}
          <OverlayTriggerObject 
            id={task.id}
            text={task.category}
            placement="top"
            object = {
              <div>
                <FontAwesomeIcon style={{transition: '.5s'}} className="pe-3 mt-1" icon={ICONS[task.category]} color={task.check ? COLORS.green1 : COLORS.pink2}/>
              </div> }
          />
          
          {/* Time */}
          <span className="me-2" style={{color: task.check ? COLORS.green1 : COLORS.pink2, transition: '.5s'}}>
            {task.time}
          </span>

        </Col>
        <Col xs={1} className="d-flex me-3">

          {/* Check */}
          <OverlayTriggerObject 
            id={task.id}
            text={task.check ? 'Not done!' : 'Done!'}
            placement="top"
            object = {
              <div style={{cursor:'pointer'}}>
                <FontAwesomeIcon className="p-0 mt-1" style={{transition: '.5s'}} color={task.check ? 'green' : 'red'} icon={task.check ? ICONS.check : ICONS.noCheck} onClick={() => checkTask(task.id)}/>
              </div> }
          />
        </Col>
      </Row>

    <Row className="mt-1">
      <Col xs={8} style={{color:'#fadde1'}} className="d-flex justify-content-start ms-4 ps-4">

        {/*  Name */}
        <p className="mb-1" style={{textDecoration: task.check && 'line-through', color: task.check ? COLORS.green2 : COLORS.pink3, transition: '.5s'}}>
          {task.name}
        </p>

      </Col>
      <Col xs={3} className="pe-2">

        {/* Priority */}
        {priorityStars(task.priority)}
      </Col>

    </Row>
  </Col>
  )
}
 
export default YourTasksSingleTask;