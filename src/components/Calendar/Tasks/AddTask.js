import React, { useState, useContext } from 'react';
import { NAMES_MONTH } from '../Calendar';
import { Link, useLocation } from 'react-router-dom';
import { TaskContext } from '../../Context/TaskToContext';
import { Form, Row, Col, Button, Tooltip, OverlayTrigger} from 'react-bootstrap';
import ModalBackNewTask from '../../Modals/BackNewTask.js';

let taskCounter = 3;

const AddTask = ({setBlockFlag}) => {

  const [modalBack, setModalBack] = useState(false);
  const handleModalBack = () => setModalBack(!modalBack);

  const [shortText, setShortText] = useState(''); //stan którkiej nazwy
  const [text, setText] = useState(''); //stan opisu
  const [important, setImportant] = useState(1);
  const [category, setCategory] = useState('0');
  const [time, setTime] = useState();
  const {tasksList, setTasksList} = useContext(TaskContext);
  
  const location = useLocation();
  const taskDate = location.pathname.slice(16,location.pathname.length-8).split('.');
  const idDay = location.pathname.slice(16,location.pathname.length-8);

  const handleSubmit = e => e.preventDefault();

  const handleShortTextChange = e => { //aktualizacja krótkiej nazwy
    e.target.value.length < 16 && setShortText(shortText => e.target.value);
  }

  const handleTextChange = e => { //aktualizacja opisu
    setText(text => e.target.value);
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

  const sendTask = () => {
    const currentTask = {
      id: taskCounter,
      checked: false,
      shortName: shortText,
      text,
      important,
      category,
      time,
    };
    let array = [...tasksList];

    let index = array.findIndex(task => task.idDay === idDay); 

    let splitIdDay = idDay.split('.');
    let d = new Date(splitIdDay[2], splitIdDay[1]-1, splitIdDay[0], 0, 0);
    let opts = { weekday: 'long'}
    d = Intl.DateTimeFormat("en-US", opts).format(d);

    if (index === -1) {
      
      array.push({
        idDay: idDay, 
        tasks: [currentTask],
        link:`/Calendar/tasks/${idDay}`,
        weekDay: d,
      });
    } else {
      array[index].tasks.push(currentTask);
    }

    setTasksList(array);
    setBlockFlag(false);
    taskCounter++;
  }

  const backButton = () => {
    if (shortText.length === 0 && text.length === 0 && time === undefined) { 
      return (
        <Link to={'/Calendar/tasks/' + idDay}>
          <Button variant="primary" onClick={() => setBlockFlag(false)}>BACK</Button>
        </Link>
      )
    } else {
      return (
        <Button onClick={handleModalBack}>BACK</Button> 
      )
    }
  }

  const overlayTriggerSendButton = (text) => {
    return (
      <OverlayTrigger
        key={'send-button'}
        placement={'top'}
        overlay={
          <Tooltip
            id={'send-button'}>
            {text} 
          </Tooltip>
        }>
        <span className="d-inline-block">
          <Button className="me-4" disabled> SEND </Button> 
        </span>
      </OverlayTrigger>
    )
  }

  const addNewTaskButton = () => {
    if (shortText.length === 0 || category === '0' || time === undefined) {
      const elements = [];

      !shortText.length && elements.push(' short name');
      category === "0" && elements.push(' category');
      !time && elements.push(' time');

      const options = elements.toString();
      const message = `Please, check${options} task`;

      return overlayTriggerSendButton(message);
    } else {
      return (
        <Link className="me-4" to={'/Calendar/tasks/' + idDay}>
          <Button type='submit' onClick={sendTask}> SEND </Button> 
        </Link>
      )
    }
  }

  return (
    <React.Fragment>
      {setBlockFlag(true)}
      <ModalBackNewTask state={modalBack} handle={handleModalBack} link={'/Calendar/tasks/' + idDay} setBlockFlag={setBlockFlag}/>
      <div className="d-flex flex-column rounded-3 my-2 mx-md-2">

        <div style={{ backgroundColor:'#014F86', color:'#fff0f3'}} className="d-flex mb-1 rounded">
          <p className="my-3 fs-3 fw-bold ms-4">ADD NEW TASK</p>
          <p className="my-3 fs-3 fw-light ms-auto me-4"> {taskDate[0]} {NAMES_MONTH[taskDate[1]]} {taskDate[2]} </p>
        </div>

        <div style={{ backgroundImage: 'linear-gradient(to right top, #fdc5f5, #edcbfe, #ddd2ff, #d0d7ff, #c6dbff, #bcdbff, #b2dafe, #a7dafc, #95d6fa, #81d1f7, #69cdf4, #4cc9f0)'}} className="p-1 px-2">
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} md="6">
                <Form.Label className="m-1 fw-bold">SHORT NAME</Form.Label>
                <Form.Control className="m-0 mb-2" value={shortText} onChange={handleShortTextChange}  required type="text" placeholder="Name your task"/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please, write short name task.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" sm="6">
                <Form.Label className="my-1 fw-bold">PRIORITY</Form.Label>
                <Form.Select onChange={handleImportantChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="3" sm="6">
                <Form.Label className="my-1 fw-bold">CATEGORY</Form.Label>
                <Form.Select className="ps-1 pe-0" onChange={handleCategoryChange}>
                  <option value="0"></option>
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
            </Row>
            <Row>
              <Form.Group as={Col} md="9">
                <Form.Label className="m-1 fw-bold">DESCRIPTION</Form.Label>
                <Form.Control className="m-0 mb-2" style={{minHeight:'5rem'}} as="textarea" value={text} onChange={handleTextChange} required type="text" placeholder="Describe your task"/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="3">
                <Form.Label className="mb-1 fw-bold">TIME</Form.Label>
                <Form.Control className="ps-2" id="inputTime" type="time" onChange={handleTimeChange} value={time} step='3000'/>
              </Form.Group>
            </Row>
            <div className="m-2">
              {addNewTaskButton()}
              {backButton()}
            </div>
          </Form>
        </div>
      </div> 
    </React.Fragment>
  );
}
 
export default AddTask;