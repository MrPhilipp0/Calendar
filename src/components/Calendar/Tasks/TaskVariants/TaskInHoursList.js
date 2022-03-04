import React from 'react';
import ModalDeleteTask from '../../../Modals/ModalDeleteTask';
import SimpleOverlayTriggerObject from '../../../OverlayTriggers/SimpleOverlayTriggerObject';
import { Button, ButtonGroup, Col, ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconsCategory } from '../../../../App';
import '../../../../styles/App.css';
import { TasksColors } from '../../../../App';

const TaskInHoursList = ({ task, deleteTask, checkTask, 
  handleModalEdit, 
  modalDelete, handleModalDelete }) => {

  const categoryOverlayTrigger = {
    id: task.category,
    text: task.category,
    placement: 'top',
    object: 
    <label className="my-auto fs-5">
      <FontAwesomeIcon icon={IconsCategory[task.category]}/>
    </label>
  }

  const priorityStars = () => {
    let stars = [];
    stars.length = Number(task.priority);
    for (let i = 0; i < stars.length; i++) {
      stars[i] = <i key={i} className="bi bi-star-fill lh-1" style={{color:"gold"}}></i>
    }
    return stars;
  }
  

  return (
    <Col style={{boxShadow: '4px 3px 8px black'}}>
      <ModalDeleteTask state={modalDelete} handle={handleModalDelete} deleteTask={deleteTask}/>
      <div style={{background:TasksColors[task.category]}} className="d-flex taskInHoursList" id={`NoEditingTask${task.id}`} >

        <div className="flex-grow-1" onClick={() => handleModalEdit()}>
          <div className="d-flex">
            <p className="ms-1 p-1 mb-0"><strong>{task.time}</strong></p>
            <p className="h5 text-center fw-bold p-1 ms-2 mt-1 mb-0" style={{textDecoration: task.check && 'line-through'}}>{task.name}</p>
          </div>
          <div className="d-flex">
            <div className="mx-2 mt-1">
              {SimpleOverlayTriggerObject({...categoryOverlayTrigger})}
            </div>
            <p className="text-break m-2" style={{fontSize:"13px"}}>{task.text}</p>
          </div>
        </div>
        <div className="mt-1 mb-1 my-auto mx-1">
          <ButtonGroup vertical className="py-1">
            <ToggleButton
              className="shadow-none"
              id={task.id}
              type="checkbox"
              variant={task.check ? 'success' : 'danger'}
              checked={task.check}
              value="1"
              onChange={checkTask}
            >
              <FontAwesomeIcon className="fs-6" icon={task.check ? IconsCategory.check : IconsCategory.noCheck}/>
            </ToggleButton>
            <Button className="px-2" onClick={handleModalDelete}>
              <FontAwesomeIcon className="fs-6 mt-1" icon={IconsCategory.delete}/>
            </Button>
          </ButtonGroup>
        </div>

        <div className="d-flex flex-column justify-content-center m-1 mx-1" onClick={handleModalEdit}>
          {priorityStars()}
        </div>

        
          
      </div>
    </Col>
  );
}
 
export default TaskInHoursList;