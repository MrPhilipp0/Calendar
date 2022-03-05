import { Modal, Button } from 'react-bootstrap';

const ModalDeleteTask = ({state, handle, deleteTask}) => {

  return (
    <Modal show={state} onHide={handle}>

      <Modal.Header closeButton>
        <Modal.Title>Deleting a task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Are you sure you want to delete this task? 
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={deleteTask}> Yes </Button>
        <Button variant="primary" onClick={handle}> No </Button>
      </Modal.Footer>
      
    </Modal>
  );
}
 
export default ModalDeleteTask;