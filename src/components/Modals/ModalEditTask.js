import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import EditingTask from '../Calendar/Tasks/TaskVariants/EditingTask';

import { connect } from 'react-redux';
import { updateTask } from '../../actions/taskActions';

const ModalEditTask = ({ 
  task, 
  modalEdit, handleModalEdit,
  updateTaskInState}) => {

  const [alertName, setAlertName] = useState(false); 
  const [editTask, setEditTask] = useState(task); //state with editing task

  const handleChange = e => {
    const prevTask = JSON.parse(JSON.stringify(editTask));
    const eName = e.target.name;
    const eValue = e.target.value;
    if (eName === 'name') {
      if (eValue.length < 16) {
        prevTask[eName] = eValue;
      }
    } else if (eName === 'text') {
      if (eValue.length < 80) {
        prevTask[eName] = eValue;
      }
    } else if (eName === 'date') {
      const newDate = eValue.split('-').reverse().join('.');
      prevTask['idDay'] = newDate;
    } else {
      prevTask[eName] = eValue;
    }
    setEditTask(prevTask);
  }

  // Showing AlertName
  useEffect(() => {
    !editTask.name.length ? setAlertName(true) : setAlertName(false);
  },[editTask.name.length])

  const saveButtonFunction = () => {
    handleModalEdit();
    updateTaskInState(editTask.id, editTask);
  }

  const backButtonFunction = () => {
    handleModalEdit();
    setEditTask(task);
  }


  return (
    <Modal 
      size="xl"
      show={modalEdit} 
      onHide={handleModalEdit} 
      backdrop="static" 
      keyboard={false} 
      >

      <Modal.Header style={{ backgroundColor:'#014F86', color:'#fff0f3' }} closeButton={false}>
        <Modal.Title><strong>Editing Task</strong></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <EditingTask task={editTask} handleChange={handleChange} />
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor:'#014F86', color:'#fff0f3'}} className="justify-content-between">
        <p>
          {alertName && 'You must write your short name task!'}
        </p>
        <div>

          <Button 
            variant="light" 
            onClick={editTask.name.length ? saveButtonFunction : undefined} 
            className="me-3"> 
            <strong> Save </strong>
          </Button>
          <Button
            variant="light" 
            onClick={backButtonFunction}> 
            <strong> Back </strong> 
          </Button>
          
        </div>
      </Modal.Footer>
    </Modal>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    updateTaskInState : (id, task) => {
      dispatch(updateTask(id,task))
    }
  }
}
 
export default connect(null, mapDispatchToProps)(ModalEditTask);