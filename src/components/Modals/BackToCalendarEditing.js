import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ModalBackToCalendarEditing = (props) => {

  return (
    <Modal show={props.state} onHide={props.handle}>
      <Modal.Header closeButton>
        <Modal.Title>Editing task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to back to calendar? Your changes will not be saved!
      </Modal.Body>
      <Modal.Footer>
        <Link to={props.link}>
          <Button variant="primary" onClick={props.handle}> Yes </Button>
        </Link>
        <Button variant="primary" onClick={props.handle}> No, back to editing </Button>
      </Modal.Footer>
    </Modal>
  );
}
 
export default ModalBackToCalendarEditing;