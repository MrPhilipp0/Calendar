import React, { useState } from 'react';
import { Col, Row, Form, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import ModalShortNameEditing from '../../Modals/ShortNameEditing';
import SimpleOverlayTriggerObject from '../../OverlayTriggers/SimpleOverlayTriggerObject';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCarSide, faCartShopping, faCouch, faPersonRunning, faPizzaSlice, faSuitcaseRolling, faPen, faClipboard, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/App.css';


const Task = (props) => {
  
  const [modalShortName, setModalShortName] = useState(false);
  const handleModalShortName = () => setModalShortName(!modalShortName);
  
  const [editing, setEditing] = useState(false); //flaga edytowania
  const [shortText, setShortText] = useState(props.shortName); //stan którkiej nazwy
  const [text, setText] = useState(props.text); //stan opisu
  const [check, setCheck] = useState(props.checkbox); //stan checkboxa
  const [important, setImportant] = useState(props.important); //stan ważności zadania
  const [category, setCategory] = useState(props.category);
  const [time, setTime] = useState(props.time);
  const [backUp, setBackUp] = useState({shortText, text, important}); //backup podczas edycji
  
  const iconsCategory = {
    Shopping: faCartShopping,
    Working: faBriefcase,
    Food: faPizzaSlice,
    'Free Time': faCouch,
    Sport: faPersonRunning,
    Travel: faCarSide,
    Holiday : faSuitcaseRolling,
    Other: faPen,
    noCheck: faClipboard,
    check: faClipboardCheck,
  }

  const categoryOverlayTrigger = {
    id: category,
    text: category,
    placement: 'top',
    object: 
    <label className="my-auto ms-2 fs-4">
      <FontAwesomeIcon icon={iconsCategory[`${category}`]}/>
    </label>
  }

  const editingModFunction = () => {
    setEditing(editing => !editing);
    props.editingMod(props.id, !editing);
  }

  const handleSubmit = e => e.preventDefault();

  const handleShortTextChange = e => { //aktualizacja krótkiej nazwy
    e.target.value.length < 16 && setShortText(shortText => e.target.value);
  }

  const handleTextChange = e => { //aktualizacja opisu
    e.target.value.length < 80 && setText(text => e.target.value);
  }

  const handleEditClick = (e) => { //działanie buttona edit
    editingModFunction();
    const back = {shortText, text, important, category, time};
    setBackUp(backText => back);
  }

  const handleBackClick = () => { //działanie buttona back
    editingModFunction();
    setShortText(shortText => backUp.shortText);
    setText(text => backUp.text);
    setImportant(important => backUp.important);
    setCategory(category => backUp.category);
    setTime(time => backUp.time);
  }

  const handleSaveClick = () => { //działanie buttona save
    if(shortText.length === 0) {
      handleModalShortName();
      setShortText(shortText => backUp.shortText);
    } else {
      editingModFunction();
      props.save(props.id, shortText, text, important, category, time);
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

  const handleCategoryChange = e => {
    setCategory(category => e.target.value);
  }

  const handleTimeChange = e => {
    setTime(time => e.target.value);
  }

  const importantStars = () => {
    let stars = [];
    stars.length = important;
    for (let i=0; i<stars.length; i++) {
      stars[i] = <i class="bi bi-star-fill lh-1" style={{color:"gold"}}></i>
    }
    return stars;
  }

  const TaskVariant = () => { //Wyświetlania taska, w zależności czy jest w stanie edycji czy nie
    if (editing) {
      return (
        <React.Fragment>
        <ModalShortNameEditing state={modalShortName} handle={handleModalShortName} />

        <Form noValidate onSubmit={handleSubmit} className="m-2">
          <Row noValidate className="mb-2">

            <Col sm="6">
              <Form.Floating className="mt-1">
                <Form.Control id="inputShortName" type="text" onChange={handleShortTextChange} value={shortText}/>
                <label htmlFor="inputShortName"> Short Name</label>
              </Form.Floating>
              
            </Col>

            <Form.Group as={Col} sm="2" className="lh-1 mt-2 mt-sm-0">
              <Form.Label>
                <div class="text-center m-0 p-0">
                  { /*importantStars() */}
                  Priority
                </div>
              </Form.Label>
              <Form.Select className="m-0" value={important} onChange={handleImportantChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} sm="2" className="lh-1 ps-sm-0 mt-2 mt-sm-0">
              <Form.Label>Category</Form.Label>
              <Form.Select className="ps-1 pe-0" value={category} onChange={handleCategoryChange}>
                <option value="Shopping">Shopping</option>
                <option value="Working">Working</option>
                <option value="Food">Food</option>
                <option value="Free Time">Free Time</option>
                <option value="Sport">Sport</option>
                <option value="Travel">Travel</option>
                <option value="Holiday">Holiday</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} sm="2" className="lh-1 ps-sm-0 mt-2 mt-sm-0">
              <Form.Label>Time</Form.Label>
              <Form.Control className="ps-1 pe-0" id="inputTime" type="time" onChange={handleTimeChange} value={time}/>
            </Form.Group>
          </Row>

          <Row>
            <Form.Floating className="mt-1" as={Col} sm={8}>
              <Form.Control style={{minHeight:'5rem'}} as="textarea" id="inputDescription" onChange={handleTextChange} value={text}/>
              <label class="ms-2" htmlFor="inputDescription">Description</label>
            </Form.Floating>

            <ButtonGroup as={Col} sm="4" className="mt-2 sm-mt-0">
              <Button className="me-2 rounded btn-dark" size="sm" onClick={handleSaveClick}>Save</Button>
              <Button className="rounded btn-dark" size="sm" onClick={handleBackClick}>Back</Button>
            </ButtonGroup>
          </Row>
        
        </Form>
      </React.Fragment>
      )
    } else {
      return (
        <div style={{backgroundColor:'#0096c7'}} class="d-flex border m-2 rounded">
          <div class="flex-grow-1 border-end">
            <div class="d-flex border-bottom justify-content-between">
              {SimpleOverlayTriggerObject({...categoryOverlayTrigger})}
              <p class="h4 text-center fw-bold p-1 my-1">{shortText}</p>
              <p class="my-auto me-2 p-1"><strong>{time}</strong></p>
            </div>
            <p class="text-break m-1">{text}</p>
          </div>
          <div class="d-flex flex-column justify-content-center m-1 ms-2">
            {importantStars()}
          </div>
          <div class="my-4 mx-2 btn-group" aria-label="Basic outlined example">
            <ButtonGroup className="mb-2">
              <ToggleButton
                className="shadow-none"
                id={props.id}
                type="checkbox"
                variant={check ? 'success' : 'danger'}
                checked={check}
                value="1"
                onChange={handleCheckedClick}
              >
                <FontAwesomeIcon className="fs-4" icon={check ? iconsCategory.check : iconsCategory.noCheck}/>
              </ToggleButton>
            </ButtonGroup>
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