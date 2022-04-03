import { ICONS, TASKS_COLORS } from '../../../../store/constants'
import ModalDeleteTask from '../../../Modals/ModalDeleteTask';
import OverlayTriggerObject from '../../../OverlayTriggers/OverlayTriggerObject';

import { Button, ButtonGroup, Col, Row, ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../../styles/App.css';

import { ReactComponent as Priority1 } from '../../../../SVG/priority_1.svg';
import { ReactComponent as Priority2 } from '../../../../SVG/priority_2.svg';
import { ReactComponent as Priority3 } from '../../../../SVG/priority_3.svg';

const TaskInHoursList = ({ task, deleteTask, checkTask, 
  handleModalEdit, 
  modalDelete, handleModalDelete }) => {

  const prioritySvg = () => {
    if (task.priority === 1) return <Priority1 />
    if (task.priority === 2) return <Priority2 />
    if (task.priority === 3) return <Priority3 />
  }

  const categoryOverlayTrigger = {
    id: task.category,
    text: task.category,
    placement: 'top',
    object: 
    <label className="my-auto ms-1 pb- fs-5">
      <FontAwesomeIcon icon={ICONS[task.category]}/>
    </label>
  }

  const checkOverlayTrigger = {
    id: task.id,
    text: task.check ? 'Not done!' : 'Done!',
    placement: 'top',
    object: 
      <ToggleButton
        className="shadow-none"
        id={task.id}
        type="checkbox"
        variant={task.check ? 'success' : 'danger'}
        checked={task.check}
        value="1"
        onChange={checkTask} >
        <FontAwesomeIcon className="fs-6" icon={task.check ? ICONS.check : ICONS.noCheck}/>
      </ToggleButton>
  }

  const deleteTaskOverlayTrigger = {
    id: task.id,
    text: 'Delete task',
    placement: 'top',
    object: 
      <Button className="px-2 mt-1" onClick={handleModalDelete}>
        <FontAwesomeIcon className="fs-6 mt-1" icon={ICONS.delete}/>
      </Button>
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
    object: 
      <div className="ms-2 mb-1" onClick={handleModalEdit}>
        {prioritySvg()}
      </div>
  }

  return (
    <Col style={{boxShadow: '4px 3px 8px black'}}>
      <ModalDeleteTask state={modalDelete} handle={handleModalDelete} deleteTask={deleteTask}/>
      <div style={{background:TASKS_COLORS[task.category]}} className="d-flex taskInHoursList" id={`NoEditingTask${task.id}`} >

        <div className="d-flex">
          <Row className="flex-column" onClick={handleModalEdit}>
            
            <Col> {/* TIME */}
              <p className="ms-1 p-1 mb-0"><strong>{task.time}</strong></p>
            </Col>

            <Col> {/* CATEGORY */}
              <div className="mx-2 mt-1">
                <OverlayTriggerObject {...categoryOverlayTrigger} />
              </div>
            </Col>

            <Col> {/* PRIORITY */}
              <OverlayTriggerObject {...priorityTaskOverlayTrigger} />
            </Col>

          </Row>
          <Row className="flex-column" onClick={handleModalEdit}>

            <Col> {/* NAME */}
              <p className="h5 text-start fw-bold p-1 ms-2 mt-1 mb-0" style={{textDecoration: task.check && 'line-through'}}>{task.name}</p>
            </Col>

            <Col> {/* TEXT */}
              <p className="text-break m-2 mt-0" style={{fontSize:"13px"}}>{task.text}</p>
            </Col>

          </Row>
          <Row className="flex-column py-1 pe-2 my-auto">

            <ButtonGroup vertical> {/* CHECK + DELETE */}
              <OverlayTriggerObject {...checkOverlayTrigger} />

              <OverlayTriggerObject {...deleteTaskOverlayTrigger} />
            </ButtonGroup>
          </Row>
        </div>  
          
      </div>
    </Col>
  );
}
 
export default TaskInHoursList;