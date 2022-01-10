import React from 'react';
import { NAMES_MONTH } from "./Calendar";
import TasksList from "./TasksList";
import { Link, useLocation } from 'react-router-dom';

const Tasks = () => {
  const location = useLocation();


  const taskDate = location.pathname.slice(16).split('.'); //użycie lokalizacji w celu zdobycia daty konkretnego dnia, następnie rozdzielenie do tablicy numeru dnia, miesiąca i roku
  const linkToAddTask = `/Calendar/tasks/${location.pathname.slice(16)}/addTask`;

  return ( 
    <div style={{margin:'0 5px'}} class="d-flex flex-column border rounded-3 my-2">


      <div class="bg-secondary d-flex">
        <p class="my-3 fs-3 fw-bold ms-4">TASKS</p>
        <p class="my-3 fs-3 fw-light ms-auto me-4"> {taskDate[0]} {NAMES_MONTH[taskDate[1]]} {taskDate[2]} </p>
      </div>


      <div style={{flex:'1'}} class="d-flex bg-warning">
          <div class='flex-grow-1 border border-3 border-light bg-success'>
            <TasksList/>
          </div>

          <div class="d-flex flex-column border border-3 border-light bg-primary p-1 p-sm-4 align-items-center justify-content-sm-between">
            <Link to={linkToAddTask}> 
              <button class="px-4 mb-2 btn-sm btn-dark">Add new task</button> 
            </Link>
            <Link to='/Calendar/'> 
              <button class="mt-auto btn-sm btn-dark">Back to calendar</button> 
            </Link>
          </div>
      </div>


    </div>
   );
}
 
export default Tasks;