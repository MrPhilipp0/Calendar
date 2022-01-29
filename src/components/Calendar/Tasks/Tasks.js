import React, { useState, useContext } from 'react';
import { NAMES_MONTH } from "../Calendar";
import TasksList from "./TasksList";
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ModalBackToCalendarEditing from '../../Modals/BackToCalendarEditing';
import { BlockFlagContext } from '../../Context/BlockFlagContext';
import { TaskContext } from '../../Context/TaskToContext';

const Tasks = () => {
  const location = useLocation();
  const {blockFlag, setBlockFlag} = useContext(BlockFlagContext);
  const {tasksList, setTasksList} = useContext(TaskContext);

  const [modalBackToCalendar, setModalBackToCalendar] = useState(false);
  const handleModalBackToCalendar = () => setModalBackToCalendar(!modalBackToCalendar);

  const taskDate = location.pathname.slice(16).split('.'); //użycie lokalizacji w celu zdobycia daty konkretnego dnia, następnie rozdzielenie do tablicy numeru dnia, miesiąca i roku
  const linkToAddTask = `/Calendar/tasks/${location.pathname.slice(16)}/addTask`;

  const setNoEditingAllTasks = () => {
    let currentTasks = tasksList;
    currentTasks.forEach(day => {
      day.tasks.forEach(task => {
        task.editing = false;
      });
    });
    setTasksList(currentTasks);
    setModalBackToCalendar(!modalBackToCalendar);
    setBlockFlag(false);
  }

  return ( 
    <div className="rounded-3 my-2 mx-md-2" >
    <ModalBackToCalendarEditing state={modalBackToCalendar} handle={handleModalBackToCalendar} link='/Calendar/' setNoEditingAllTasks={setNoEditingAllTasks}/>

      <div style={{ backgroundColor:'#014F86'}} className="d-flex rounded">
        <p className="my-3 fs-3 fw-bold ms-4">TASKS</p>
        <p className="my-3 fs-3 fw-light ms-auto me-4"> {taskDate[0]} {NAMES_MONTH[taskDate[1]]} {taskDate[2]} </p>
      </div>


      <div>
        <div style={{backgroundImage: 'linear-gradient(to bottom, #90e0ef, #9bddff, #b7d6ff, #dcceff, #fdc5f5)', maxHeight:"60vh", overflowY:'auto'}} className='flex-grow-1 border border-3 border-light'>
          <TasksList/>
        </div>

        <div style={{backgroundColor:'rgba(227, 242, 253, 0.4)'}} className="p-1 p-sm-3 text-center text-sm-start">
          <Link to={blockFlag ? '#' : linkToAddTask}> 
            <Button className="px-3 me-2" variant="dark" disabled={blockFlag} > Add New Task </Button>
          </Link>
          <Link to={!blockFlag && '/Calendar/'}> 
            <Button variant="dark" onClick={blockFlag ? handleModalBackToCalendar : undefined}>Back To Calendar</Button> 
          </Link>
        </div>
      </div>


    </div>
   );
}
 
export default Tasks;