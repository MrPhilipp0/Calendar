import React from 'react';
import { Col, Row, Form, Button, ButtonGroup } from 'react-bootstrap';
import ModalShortName from '../Modals/ShortName';

const Task = (props) => {

  const [modalShortName, setModalShortName] = React.useState(false);
  const handleModalShortName = () => setModalShortName(!modalShortName);

  const [editing, setEditing] = React.useState(false); //flaga edytowania
  const [shortText, setShortText] = React.useState(props.shortName); //stan którkiej nazwy
  const [text, setText] = React.useState(props.text); //stan opisu
  const [check, setCheck] = React.useState(props.checkbox); //stan checkboxa
  const [important, setImportant] = React.useState(props.important); //stan ważności zadania
  const [backUp, setBackUp] = React.useState({shortText, text, important}); //backup podczas edycji
  
  const handleSubmit = e => e.preventDefault();

  const handleShortTextChange = e => { //aktualizacja krótkiej nazwy
    e.target.value.length < 16 && setShortText(shortText => e.target.value);
  }

  const handleTextChange = e => { //aktualizacja opisu
    e.target.value.length < 80 && setText(text => e.target.value);
  }

  const handleEditClick = (e) => { //działanie buttona edit
    setEditing(editing => !editing);
    const back = {shortText, text, important};
    setBackUp(backText => back)
  }

  const handleBackClick = () => { //działanie buttona back
    setEditing(editing => !editing);
    setShortText(shortText => backUp.shortText);
    setText(text => backUp.text);
    setImportant(important => backUp.important);
  }

  const handleSaveClick = () => { //działanie buttona save
    if(shortText.length === 0) {
      handleModalShortName();
      setShortText(shortText => backUp.shortText);
    } else {
      setEditing(editing => !editing);
      props.save(props.id, shortText, text, important);
    }
  }

  const handleDeleteClick = () => { //działanie buttona delete task
    props.delete(props.id);
  }

  const handleCheckedClick = e => {
    setCheck(check => !check);
    props.check(props.id, e.target.checked);
  }

  const handleImportantChange = e => {
    setImportant(important => Number(e.target.value));
  }

  const importantStars = () => {
    let stars = [];
    stars.length = important;
    for (let i=0; i<stars.length; i++) {
      stars[i] = <i class="bi bi-star-fill" style={{color:"gold"}}></i>
    }
    return stars;
  }


  const TaskVariant = () => { //Wyświetlania taska, w zależności czy jest w stanie edycji czy nie
    if (editing) {
      return (
        <React.Fragment>
        <ModalShortName state={modalShortName} handle={handleModalShortName} />

        <Form noValidate onSubmit={handleSubmit} className="m-2">
          <Row noValidate className="mb-2">

            <Col sm="8">
              <Form.Floating className="me-1">
                <Form.Control id="inputShortName" type="text" onChange={handleShortTextChange} placeholder='a' value={shortText}/>
                <label htmlFor="inputShortName"> Short Name</label>
              </Form.Floating>
              <Form.Floating className="ps-1">
                <Form.Control style={{minHeight:'5rem'}} as="textarea" id="inputDescription" onChange={handleTextChange} value={text}/>
                <label htmlFor="inputDescription">Description</label>
              </Form.Floating>
            </Col>

            <Form.Group as={Col} sm="2">
              <Form.Label as={Col} sm="12">
                <div class="text-center mt-2">
                  {importantStars()}
                </div>
              </Form.Label>
              <Form.Select value={important} onChange={handleImportantChange} id="selectImportant">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
            </Form.Group>

            <ButtonGroup vertical as={Col} sm="2" className="mt-2 sm-mt-0">
              <Button className="mb-2" size="sm" onClick={handleSaveClick}>Save</Button>
              <Button size="sm" onClick={handleBackClick}>Back</Button>
            </ButtonGroup>
          </Row>
        </Form>
        </React.Fragment>
      )
    } else {
      return (
        <div class="d-flex border m-2 rounded">
          <div class="flex-grow-1 border-end">
            <p class="h4 text-center fw-bold p-1 border-bottom">{shortText}</p>
            <p class="text-break m-1">{text}</p>
          </div>
          <div class="d-flex flex-column justify-content-center m-1 ms-2">
            {importantStars()}
          </div>
          <div class="my-4 mx-2 btn-group" aria-label="Basic outlined example">
            <input type="checkbox" class="btn-check" id={props.id} autocomplete="off" onChange={handleCheckedClick} checked={check}/>
            <label class="btn btn-outline-dark p-1" for={props.id}>Done!</label>
          </div>
          <div class="d-flex flex-column justify-content-between">
            <button class="m-1 btn btn-dark" onClick={handleEditClick}>Edit</button>
            <button class="m-1 btn btn-dark" onClick={handleDeleteClick}>Delete</button>
          </div>
        </div>
      )
    }
  }

  return (
    TaskVariant()    
  )
}
 
export default Task;