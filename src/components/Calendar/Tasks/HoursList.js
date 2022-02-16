import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconsCategory } from '../../../App';
import { Link, useLocation } from 'react-router-dom';
import { TaskContext } from '../../Context/TaskToContext';
import Task from './Task';


const HoursList = () => {

  const location = useLocation();
  const linkToAddTask = `/Calendar/tasks/${location.pathname.slice(16)}/addTask`;
  const idDay = location.pathname.slice(16);

  const {tasksList, setTasksList} = useContext(TaskContext);
  const [dayTasks, setDayTasks] = useState(tasksList.filter(day => day.idDay === idDay)[0]);

  let array = dayTasks === undefined ?  null : [...dayTasks.tasks] ; // pomocnicza tablica w celu aktualizacji stanu
  let array2 = [...tasksList];
  let index = null;
  
  React.useEffect(() => {
    setDayTasks(tasksList.filter(day => day.idDay === idDay)[0]);
  },[tasksList, idDay])

  const updateTasksList = () => {
    index = array2.findIndex(item => item.idDay === idDay);
    array2[index].tasks = array;
    array2 = array2.filter(day => day.tasks.length > 0);
    setTasksList(array2);
  }

  const handleSaveTask = (id, shortName, text, important, category, time) => { //aktualizacja stanu tasków
    index = array.findIndex(item => item.id === id);
    array[index].shortName = shortName;
    array[index].text = text;
    array[index].important = important;
    array[index].category = category;
    array[index].time = time;
    setDayTasks(tasks => ({
      idDay: idDay,
      tasks: array,
    }));
    updateTasksList();
  }

  const handleDeleteTask = (id) => { //usuwanie taska
    array = array.filter(task => task.id !== id);
    setDayTasks(tasks => ({
      idDay: idDay,
      tasks: array,
    }));
    updateTasksList();
  }

  const handleCheckbox = (id, value) => {
    index = array.findIndex(item => item.id === id);
    array[index].checked = value;
    setDayTasks(tasks => ({
      idDay: idDay,
      tasks: array,
    }));
    updateTasksList();
  }

  const handleEditingMod = (id, editState) => {
    index = array.findIndex(item => item.id === id);
    array[index].editing = editState;
    setDayTasks(tasks => ({
      idDay: idDay,
      tasks: array,
    }));
    updateTasksList();
  }

  const checkTasksHour = (tasksArray, hour) => {
    const tasksInHour = tasksArray.filter(task => (Number(task.time.split(':')[0]) === hour));

    return tasksInHour.map(task => (
      <Task key={task.id + '_task'} id={task.id} shortName={task.shortName} text={task.text} checkbox={task.checked} important={task.important} category={task.category} time={task.time} save={handleSaveTask} delete={handleDeleteTask} check={handleCheckbox} editingMod={handleEditingMod}
      />
    ))
  }

  const hoursList = [];
  for (let i=0; i<24; i++) {
    hoursList.push(i);
  }
  

  //Przy odpaleniu danego dnia, automatyczne scrolowanie do pierwszego taska
  const referenceToScroll = React.useRef(null);

  useEffect(() => {
    const element = [...referenceToScroll.current.querySelectorAll('.TASK')];
    element.length > 0 && element[0].scrollIntoView({behavior: "smooth", block: "center"});
  },[])

  return (
    <div className="my-2" ref={referenceToScroll}>
      {
        hoursList.map(hour => (
          <Row key={hour + '_hour'} className="mx-1 py-1 border-3 border-bottom border-dark">
            <Col xs={1} className="p-0 m-0 justify-content-center d-flex">
              <p className="fw-bold h5">{hour}{':00'}</p>
            </Col>
            <Col xs={10}>
              <Row style={{ transition:'2s'}}>
                {dayTasks && checkTasksHour(dayTasks.tasks, hour)}
              </Row>
            </Col>
            <Col xs={1} className="d-flex justify-content-center">
              <Link to={linkToAddTask}>
                <FontAwesomeIcon className="fs-4" icon={IconsCategory.add}/>
              </Link>
            </Col>
          </Row>
        ))
      }
    </div>
  );
}
 
export default HoursList;