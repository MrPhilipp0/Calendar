import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ModalBackNewTask = ({state, handle, link, backFunction}) => {

  return (
    <Modal show={state} onHide={handle}>

      <Modal.Header closeButton>
        <Modal.Title>Adding a new task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Are you sure you want to finish adding the new task? 
      </Modal.Body>

      <Modal.Footer>
        <Link to={link}>
          <Button variant="primary" onClick={backFunction}> Yes </Button>
        </Link>
        <Button variant="primary" onClick={handle}> No, back to adding </Button>
      </Modal.Footer>
      
    </Modal>
  );
}
 
export default ModalBackNewTask;