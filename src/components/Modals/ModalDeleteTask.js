import { Modal, Button } from 'react-bootstrap';
import { COLORS } from '../../store/constants.js';

const buttonStyle = {borderRadius:'50px', borderColor:COLORS.blue5, backgroundColor:COLORS.blue5};

const ModalDeleteTask = ({state, handle, deleteTask}) => {

  return (
    <Modal show={state} onHide={handle}>

      <Modal.Header closeButton style={{backgroundColor:COLORS.blue5, color:COLORS.white}}>
        <Modal.Title>Deleting a task</Modal.Title>
      </Modal.Header>

      <Modal.Body className="fs-5">
        Are you sure you want to delete this task? 
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" style={buttonStyle} onClick={deleteTask}> Yes </Button>
        <Button variant="primary" style={buttonStyle} onClick={handle}> No </Button>
      </Modal.Footer>
      
    </Modal>
  );
}
 
export default ModalDeleteTask;