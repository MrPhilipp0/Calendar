import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { COLORS } from '../../store/constants.js';

const buttonStyle = {borderRadius:'50px', borderColor:COLORS.blue5, backgroundColor:COLORS.blue5};
const ModalBackNewTask = ({state, handle, link, backFunction}) => {

  return (
    <Modal show={state} onHide={handle}>

      <Modal.Header closeButton style={{backgroundColor:COLORS.blue5, color:COLORS.white}}>
        <Modal.Title>Adding a new task</Modal.Title>
      </Modal.Header>

      <Modal.Body className="fs-5">
        Are you sure you want to finish adding the new task? 
      </Modal.Body>

      <Modal.Footer>
        <Link to={link}>
          <Button variant="primary" style={buttonStyle} onClick={backFunction}> Yes </Button>
        </Link>
        <Button variant="primary" style={buttonStyle} onClick={handle}> No, back to adding </Button>
      </Modal.Footer>
      
    </Modal>
  );
}
 
export default ModalBackNewTask;