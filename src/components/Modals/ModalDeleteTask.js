import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalDeleteTask = (props) => {

  return (
    <Modal show={props.state} onHide={props.handle}>
      <Modal.Header closeButton>
        <Modal.Title>Deleting a task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this task? 
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.deleteTask}> Yes </Button>
        <Button variant="primary" onClick={props.handle}> No </Button>
      </Modal.Footer>
    </Modal>
  );
}
 
export default ModalDeleteTask;