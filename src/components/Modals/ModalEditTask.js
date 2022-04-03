import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import EditingTask from '../Calendar/Tasks/TaskVariants/EditingTask';

import { connect } from 'react-redux';
import { updateTask } from '../../actions/taskActions';
import { COLORS } from '../../store/constants';

const buttonStyle = {borderRadius:'50px', borderColor:COLORS.blue2, backgroundColor:COLORS.blue2, color:COLORS.dark1};

const ModalEditTask = ({ 
  task, 
  modalEdit, handleModalEdit,
  updateTaskInState}) => {

  const [alertName, setAlertName] = useState(false); 
  const [alertTime, setAlertTime] = useState(false); 
  const [alertDate, setAlertDate] = useState(false); 
  const [editTask, setEditTask] = useState(task); //state with editing task

  const handleChange = e => {
    const prevTask = JSON.parse(JSON.stringify(editTask));
    const eName = e.target.name;
    const eValue = e.target.value;

    switch (eName) {
      case 'name':
        if (e.target.value.length < 31) {
          prevTask[eName] = eValue;
        }
        break;
      case 'text':
        if (e.target.value.length < 80) {
          prevTask[eName] = eValue;
        }
        break;
      case 'date':
        prevTask['idDay'] = eValue.split('-').reverse().join('.');
        break;
      case 'priority':
        prevTask[eName] = Number(eValue);
        break;
      default:
        prevTask[eName] = eValue;
        break;
    }
    setEditTask(prevTask);
  }

  // Show Alerts
  useEffect(() => {
    !editTask.name.length ? setAlertName(true) : setAlertName(false);
    !editTask.time.length ? setAlertTime(true) : setAlertTime(false);
    !editTask.idDay.length ? setAlertDate(true) : setAlertDate(false);
  },[editTask.name.length, editTask.time.length, editTask.idDay.length])

  const saveButtonFunction = () => {
    handleModalEdit();
    updateTaskInState(editTask.id, editTask);
    console.log(editTask);
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

      <Modal.Footer className="justify-content-between" style={{backgroundColor:COLORS.blue5}}>
        <div className="d-flex flex-column">
          <p> {alertName && 'You must write your short name task!'} </p>
          <p> {alertTime && 'You must write correct time'} </p>
          <p> {alertDate && 'You must write correct date'} </p>
        </div>
        <div>
          <Button 
            style={buttonStyle}
            onClick={(editTask.name.length && editTask.time.length && editTask.idDay.length) ? saveButtonFunction : undefined} 
            className="me-3"> 
            Save
          </Button>
          <Button
            style={buttonStyle}
            onClick={backButtonFunction}> 
            Back
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