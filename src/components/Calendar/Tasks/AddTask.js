import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation} from 'react-router-dom';

import { addTask } from '../../../actions/taskActions';
import { NAMES_MONTH } from '../../../store/constants';
import SimpleOverlayTriggerObject from '../../OverlayTriggers/OverlayTriggerObject';

import { Form, Row, Col, Button } from 'react-bootstrap';
import ModalBackNewTask from '../../Modals/ModalBackNewTask';

const AddTask = (props) => {
  
  const location = useLocation();
  let {defaultTime} = location.state || '00:00'; //pobranie domyślnej godziny
  defaultTime = (defaultTime < 10 ? '0' + defaultTime : defaultTime) + ':00';
  const taskDate = location.pathname.slice(16,location.pathname.length-8).split('.'); //tablica rozdzielonej daty
  const idDay = location.pathname.slice(16,location.pathname.length-8);

    // weekDay odpowwiada za nazwę dnia tygodnia, która jest przypisana do taska
    let weekDay = new Date(taskDate[2], taskDate[1]-1, taskDate[0], 0, 0);
    weekDay = Intl.DateTimeFormat("en-US", { weekday: 'long'}).format(weekDay);

  // Domyślna struktura taska
  const START_TASK = {
    name: '',
    text: '',
    priority: 1,
    category: '0',
    time: defaultTime,
    idDay,
    weekDay,
    link: `/calendar/tasks/${idDay}`,
  }


  const [newTask, setNewTask] = useState(START_TASK);

  const handleChange = e => {
    const prevTask = JSON.parse(JSON.stringify(newTask));
    if (e.target.name === 'name') {
      if (e.target.value.length < 16) {
        prevTask[e.target.name] = e.target.value;
      }
    } else if (e.target.name === 'text') {
      if (e.target.value.length < 80) {
        prevTask[e.target.name] = e.target.value;
      }
    } else {
      prevTask[e.target.name] = e.target.value;
    }
    setNewTask(prevTask);
  }

  const handleSubmit = e => {
    e.preventDefault();
  }

  const sendTask = () => {
    props.addTaskToState(newTask);
    props.setBlockFlag(false);
    setNewTask(START_TASK);
  }

  const addNewTaskButton = () => {
    if (newTask.name.length === 0 || newTask.category === '0' || newTask.time === undefined) {
      // Walidacja związana z niewybraną nazwą, kategorią i czasem
      const elements = [];

      !newTask.name.length && elements.push(' short name');
      newTask.category === "0" && elements.push(' category');
      !newTask.time && elements.push(' time');

      const options = elements.toString();
      const message = `Please, check${options} task`;

      return <SimpleOverlayTriggerObject 
        id={newTask.id} 
        text={message} 
        placement={'top'} 
        object= {(
          <span className="d-inline-block">
            <Button className="me-4" disabled> SEND </Button> 
          </span>
        )}/>
    } else {
      return (
        <Link className="me-4" to={newTask.link}>
          <Button type='submit' onClick={sendTask}> SEND </Button> 
        </Link>
      )
    }
  }

  const backButton = () => {
    if (newTask.name.length === 0 && newTask.text.length === 0) { 
      return (
        <Link to={'/calendar/tasks/' + idDay}>
          <Button variant="primary" onClick={() => props.setBlockFlag(false)}>BACK</Button>
        </Link>
      )
    } else {
      return (
        <Button onClick={handleModalBack}>BACK</Button> 
      )
    }
  }

  // wyświetlanie komunikatu przy powrocie podczas dodawawnia nowego taska
  const [modalBack, setModalBack] = useState(false);
  const handleModalBack = () => setModalBack(!modalBack);
  const backModalFunction = () => {
    props.setBlockFlag(false);
    return (
      handleModalBack()
    )
  }

  return (
    <React.Fragment>
      {props.setBlockFlag(true)}
      <ModalBackNewTask state={modalBack} handle={handleModalBack} link={'/calendar/tasks/' + idDay} backFunction={backModalFunction}/>
      <div className="d-flex flex-column rounded-3 my-2 mx-md-2">

        {/* Header */}
        <div style={{ backgroundColor:'#014F86', color:'#fff0f3'}} className="d-flex mb-1 rounded">
          <p className="my-3 fs-3 fw-bold ms-4">ADD NEW TASK</p>
          <p className="my-3 fs-3 fw-light ms-auto me-4"> {taskDate[0]} {NAMES_MONTH[taskDate[1]]} {taskDate[2]} </p>
        </div>

        <div style={{ backgroundImage: 'linear-gradient(to right top, #fdc5f5, #edcbfe, #ddd2ff, #d0d7ff, #c6dbff, #bcdbff, #b2dafe, #a7dafc, #95d6fa, #81d1f7, #69cdf4, #4cc9f0)'}} className="p-1 px-2">
          <Form noValidate onSubmit={handleSubmit}>
            <Row>

              {/* Name */}
              <Form.Group as={Col} md="6">
                <Form.Label className="my-1 fw-bold">SHORT NAME</Form.Label>
                <Form.Control className="m-0 mb-2" name='name' value={newTask.name} onChange={handleChange} required type="text" placeholder="Name your task"/>
              </Form.Group>

              {/* Priority */}
              <Form.Group as={Col} md="3" sm="6">
                <Form.Label className="my-1 fw-bold">PRIORITY</Form.Label>
                <Form.Select name='priority' onChange={handleChange}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </Form.Select>
              </Form.Group>

              {/* Category */}
              <Form.Group as={Col} md="3" sm="6">
                <Form.Label className="my-1 fw-bold">CATEGORY</Form.Label>
                <Form.Select name='category' className="ps-1 pe-0" onChange={handleChange}>
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

              {/* Description */}
              <Form.Group as={Col} md="9">
                <Form.Label className="my-1 fw-bold">DESCRIPTION</Form.Label>
                <Form.Control className="m-0 mb-2" style={{minHeight:'5rem'}} as="textarea" name='text' value={newTask.text} onChange={handleChange} required type="text" placeholder="Describe your task"/>
              </Form.Group>

              {/* Time */}
              <Form.Group as={Col} sm="3">
                <Form.Label className="mb-1 fw-bold">TIME</Form.Label>
                <Form.Control className="ps-2" id="inputTime" type="time" name="time" onChange={handleChange} value={newTask.time} step='3000'/>
              </Form.Group>
            </Row>

            {/* Buttons */}
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

const mapDispatchToProps = dispatch => {
  return {
    addTaskToState : task => {
      dispatch(addTask(task));
    }
  }
}

export default connect(null, mapDispatchToProps)(AddTask);