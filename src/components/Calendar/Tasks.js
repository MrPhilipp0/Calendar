import React from 'react';
import { NAMES_MONTH } from "./Calendar";
import TasksList from "./TasksList";
import { Link, useLocation } from 'react-router-dom';
import '../../styles/TasksMenu.css';

const Tasks = () => {
  const location = useLocation();


  const taskDate = location.pathname.slice(7).split('.'); //użycie lokalizacji w celu zdobycia daty konkretnego dnia, następnie rozdzielenie do tablicy numeru dnia, miesiąca i roku
  const linkToAddTask = `/tasks/${location.pathname.slice(7)}/addTask`;

  return ( 
    <div className="calendar">

      {/* tzw. header */}
      <header className='headerTasks'> 
        <h2>TASKS</h2>
        <h2>{taskDate[0]} {NAMES_MONTH[taskDate[1]]} {taskDate[2]}</h2>
      </header>

      <section className='mainSectionTasks'>

        {/* Lewa część */}
        <div className='leftSectionTasks'>
          <TasksList />
        </div>

        {/* Prawa część */}
        <div className='rightSectionTasks'>
          
          <Link to={linkToAddTask}> <button>Add new task</button> </Link>
          <Link to='/'> <button>Back to calendar</button> </Link>
        </div>
        <div>
        </div>

      </section>
    </div>
   );
}
 
export default Tasks;