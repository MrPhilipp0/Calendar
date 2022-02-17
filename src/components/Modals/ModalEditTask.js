import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import EditingTask from '../Calendar/Tasks/TaskVariants/EditingTask';

const ModalEditTask = ({
  modalEdit, handleModalEdit,
  shortText, handleShortTextChange, 
  important, handleImportantChange, 
  category, handleCategoryChange, 
  time, handleTimeChange,
  text, handleTextChange,
  id,
  handleSaveClick, handleBackClick, 
  modalShortName, handleModalShortName
}) => {

  const [alertShortName, setAlertShortName] = useState(false); 

  useEffect(() => {
    !shortText.length ? setAlertShortName(true) : setAlertShortName(false);
  },[shortText.length])

  const saveButtonFunction = () => {
    handleModalEdit();
    handleSaveClick();
  }

  const backButtonFunction = () => {
    handleModalEdit();
    handleBackClick();
  }


  return (
    <Modal size="xl" show={modalEdit} onHide={handleModalEdit} backdrop="static" keyboard={false} >
      <Modal.Header style={{ backgroundColor:'#014F86', color:'#fff0f3'}} closeButton={false}>
        <Modal.Title><strong>Editing Task</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditingTask 
          shortText={shortText} handleShortTextChange={handleShortTextChange} 
          important={important} handleImportantChange={handleImportantChange} 
          category={category} handleCategoryChange={handleCategoryChange} 
          time={time} handleTimeChange={handleTimeChange} 
          text={text} handleTextChange={handleTextChange}
          id={id}
          handleSaveClick={handleSaveClick} handleBackClick={handleBackClick} 
          modalShortName={modalShortName} handleModalShortName={handleModalShortName}
        />
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor:'#014F86', color:'#fff0f3'}} className="justify-content-between">
      <p>
        {alertShortName && 'You must write your short name task!'}
      </p>
      <div>
        <Button 
          variant="light" 
          onClick={shortText.length ? saveButtonFunction : undefined} 
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
 
export default ModalEditTask;