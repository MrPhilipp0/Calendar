import React from 'react';
import { NAMES_MONTH } from './Calendar';
import { Link, useLocation } from 'react-router-dom';
import { TaskContext } from '../Context/TaskToContext';
import { Form, Row, Col, Button, Tooltip, OverlayTrigger} from 'react-bootstrap';
import ModalBackNewTask from '../Modals/BackNewTask.js';

let taskCounter = 5;

const AddTask = () => {

  const [modalBack, setModalBack] = React.useState(false);
  const handleModalBack = () => setModalBack(!modalBack);

  const [shortText, setShortText] = React.useState(''); //stan którkiej nazwy
  const [text, setText] = React.useState(''); //stan opisu
  const [important, setImportant] = React.useState(1);
  const [category, setCategory] = React.useState('0');
  const {tasksList, setTasksList} = React.useContext(TaskContext);
  
  const location = useLocation();
  const taskDate = location.pathname.slice(16,location.pathname.length-8).split('.');
  const tasksLink = location.pathname.slice(16,location.pathname.length-8);

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

  const sendTask = () => {
    const currentTask = {
      id: taskCounter,
      checked: false,
      shortName: shortText,
      text: text,
      important,
    };
    let array = [...tasksList];

    let index = array.findIndex(task => task.idDay === tasksLink); 
    if (index === -1) {
      array.push({idDay:tasksLink, tasks:[currentTask]});
    } else {
      array[index].tasks.push(currentTask);
    }

    // array.push(currentTask);
    setTasksList(tasksList => array);
    taskCounter++;
  }

  const overlayTriggerSendButton = (text) => {
    return (
      <OverlayTrigger
        key={'send-button'}
        placement={'top'}
        overlay={
          <Tooltip id={'send-button'}>
            {text} 
          </Tooltip>
        }>
        <span className="d-inline-block">
          <Button className="me-4" disabled> SEND </Button> 
        </span>
      </OverlayTrigger>
    )
  }

  const checkNewTask = () => {
    if (shortText.length === 0 && category === '0') {
      return (
        overlayTriggerSendButton('You must write short name and set category!')
      );
    } else if (shortText.length === 0) {
      return (
        overlayTriggerSendButton('You must write short name!')
      )
    } else if (category === '0') {
      return (
        overlayTriggerSendButton('You must set category!') 
      )
    } else {
      return (
        <Link class="me-4" to={'/Calendar/tasks/' + tasksLink}>
          <Button type='submit' onClick={sendTask}> SEND </Button> 
        </Link>
      )
    }
  }

  

  return (
    <React.Fragment>
      <ModalBackNewTask state={modalBack} handle={handleModalBack} link={'/Calendar/tasks/' + tasksLink}/>
      <div style={{opacity: 1}} class="d-flex flex-column border rounded-3 my-2">

        <div class="bg-secondary d-flex">
          <p class="my-3 fs-3 fw-bold ms-4">ADD NEW TASK</p>
          <p class="my-3 fs-3 fw-light ms-auto me-4"> {taskDate[0]} {NAMES_MONTH[taskDate[1]]} {taskDate[2]} </p>
        </div>

        <div class="bg-warning p-1 px-2">
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} md="8">
                <Form.Label className="m-1">Short Name</Form.Label>
                <Form.Control className="m-0 mb-3" value={shortText} onChange={handleShortTextChange}  required type="text" placeholder="Name your task"/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please, write short name task.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2" sm="6">
                <Form.Label>Priority</Form.Label>
                <Form.Select onChange={handleImportantChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="2" sm="6">
                <Form.Label>Category</Form.Label>
                <Form.Select onChange={handleCategoryChange}>
                  <option value="0"></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="12">
                <Form.Label className="m-1">Description</Form.Label>
                <Form.Control className="m-0 mb-3" style={{minHeight:'5rem'}} as="textarea" value={text} onChange={handleTextChange} required type="text" placeholder="Name your task"/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div class="m-2">
              {checkNewTask()}
              <Button onClick={handleModalBack}>BACK</Button> 
            </div>
          </Form>
        </div>
      </div> 
    </React.Fragment>
  );
}
 
export default AddTask;