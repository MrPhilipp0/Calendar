import OverlayTriggerObject from '../OverlayTriggers/OverlayTriggerObject';

import { Col, Row } from 'react-bootstrap';
import { COLORS, ICONS } from '../../store/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as Priority1 } from '../../SVG/priority_1.svg';
import { ReactComponent as Priority2 } from '../../SVG/priority_2.svg';
import { ReactComponent as Priority3 } from '../../SVG/priority_3.svg';

const YourTasksSingleTask = ({task, checkTask}) => {

  const prioritySvg = () => {
    if (task.priority === 1) return <Priority1 />
    if (task.priority === 2) return <Priority2 />
    if (task.priority === 3) return <Priority3 />
  }

  const textPriority = () => {
    if (task.priority === 1) return 'Low priority'
    if (task.priority === 2) return 'Medium priority'
    if (task.priority === 3) return 'High priority'
  }
  const priorityTaskOverlayTrigger = {
    id: task.id,
    text: textPriority(),
    placement: 'top',
    object: prioritySvg()
  }

  return (
    <Col md={12} className="border-bottom py-1 importantShortTask">
      <Row>

        {/* Category icon */}
        <Col xs={2} className="d-flex">
          <OverlayTriggerObject 
            id={task.id}
            text={task.category}
            placement="top"
            object = {
              <div>
                <FontAwesomeIcon style={{transition: '.5s'}} className="pe-3 mt-1 fs-5" icon={ICONS[task.category]} color={task.check ? COLORS.green1 : COLORS.pink2}/>
              </div> }
          />
        </Col>

        {/* Time */}
        <Col xs={8} className='d-flex justify-content-start' >
          <span className="fs-5" style={{color: task.check ? COLORS.green1 : COLORS.pink2, transition: '.5s'}}>
            {task.time}
          </span>
        </Col>

        {/* Check */}
        <Col xs={2} className="d-flex justify-content-center ">
          <OverlayTriggerObject 
            id={task.id}
            text={task.check ? 'Not done!' : 'Done!'}
            placement="top"
            object = {
              <div style={{cursor:'pointer'}}>
                <FontAwesomeIcon className="p-0 mt-1 fs-5" style={{transition: '.5s'}} color={task.check ? COLORS.green1 : COLORS.pink2} icon={task.check ? ICONS.check : ICONS.noCheck} onClick={() => checkTask(task.id)}/>
              </div> }
          />
        </Col>
      </Row>

      <Row className="mt-1">

        {/* Priority */}
        <Col xs={2} className="pe-1 pt-2 d-flex">
          <OverlayTriggerObject {...priorityTaskOverlayTrigger} />
        </Col>

        {/*  Name */}
        <Col xs={9} className="d-flex justify-content-start">
          <p className="mb-1" style={{textDecoration: task.check && 'line-through', color: task.check ? COLORS.green2 : COLORS.pink3, transition: '.5s'}}>
            {task.name}
          </p>
        </Col>

      </Row>
    </Col>
  )
}
 
export default YourTasksSingleTask;