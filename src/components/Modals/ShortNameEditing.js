import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalShortNameEditing = (props) => {

  return (
    <Modal show={props.state} onHide={props.handle}>
      <Modal.Header closeButton>
        <Modal.Title>Write short name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your name task can't be empty!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handle}> Understood </Button>
      </Modal.Footer>
    </Modal>
  );
}
 
export default ModalShortNameEditing;