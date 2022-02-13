import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ModalBackNewTask = (props) => {

  const backFunction = () => {
    props.setBlockFlag(false);
    return (
      props.handle
    )
  }


  return (
    <Modal show={props.state} onHide={props.handle}>
      <Modal.Header closeButton>
        <Modal.Title>Adding a new task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to finish adding the new task? 
      </Modal.Body>
      <Modal.Footer>
        <Link to={props.link}>
          <Button variant="primary" onClick={backFunction}> Yes </Button>
        </Link>
        <Button variant="primary" onClick={props.handle}> No, back to adding </Button>
      </Modal.Footer>
    </Modal>
  );
}
 
export default ModalBackNewTask;