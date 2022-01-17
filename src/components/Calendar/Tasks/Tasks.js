import React, { useState } from 'react';
import { NAMES_MONTH } from "../Calendar";
import TasksList from "./TasksList";
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ModalBackToCalendarEditing from '../../Modals/BackToCalendarEditing';

const Tasks = () => {
  const location = useLocation();
  const [editingMod, setEditingMod] = useState(false);

  const [modalBackToCalendar, setModalBackToCalendar] = useState(false);
  const handleModalBackToCalendar = () => setModalBackToCalendar(!modalBackToCalendar);

  const taskDate = location.pathname.slice(16).split('.'); //użycie lokalizacji w celu zdobycia daty konkretnego dnia, następnie rozdzielenie do tablicy numeru dnia, miesiąca i roku
  const linkToAddTask = `/Calendar/tasks/${location.pathname.slice(16)}/addTask`;

  return ( 
    <div class=" border rounded-3 my-2 mx-md-2" >
    <ModalBackToCalendarEditing state={modalBackToCalendar} handle={handleModalBackToCalendar} link='/Calendar/'/>

      <div style={{ backgroundColor:'#014F86'}} class="d-flex rounded">
        <p class="my-3 fs-3 fw-bold ms-4">TASKS</p>
        <p class="my-3 fs-3 fw-light ms-auto me-4"> {taskDate[0]} {NAMES_MONTH[taskDate[1]]} {taskDate[2]} </p>
      </div>


      <div class="">
        <div style={{backgroundImage: 'linear-gradient(to bottom, #90e0ef, #9bddff, #b7d6ff, #dcceff, #fdc5f5)'}} class='flex-grow-1 border border-3 border-light'>
          <TasksList editingMod={setEditingMod}/>
        </div>

        <div style={{ backgroundColor:'#b5179e'}} class="border border-3 border-light rounded p-1 p-sm-3 text-center text-sm-start">
          <Link to={editingMod ? '#' : linkToAddTask}> 
            <Button className="px-3 me-2" variant="dark" disabled={editingMod}> Add New Task </Button>
          </Link>
          <Link to={!editingMod && '/Calendar/'}> 
            <Button variant="dark" onClick={editingMod ? handleModalBackToCalendar : undefined}>Back To Calendar</Button> 
          </Link>
        </div>
      </div>


    </div>
   );
}
 
export default Tasks;