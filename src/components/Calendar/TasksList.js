import React, { useState, useContext }  from 'react';
import Task from './Task';
import { TaskContext } from '../Context/TaskToContext';
import { useLocation } from 'react-router-dom';

const TasksList = ({ editingMod }) => {

  const location = useLocation();
  const idDay = location.pathname.slice(16);
  
  const {tasksList, setTasksList} = useContext(TaskContext);

  const [dayTasks, setDayTasks] = useState(tasksList.filter(day => day.idDay === idDay)[0]);

  let array = dayTasks === undefined ?  null : [...dayTasks.tasks] ; // pomocnicza tablica w celu aktualizacji stanu
  let array2 = [...tasksList];
  let index = null;

  const updateTasksList = () => {
    index = array2.findIndex(item => item.idDay === idDay);
    array2[index].tasks = array;
    array2 = array2.filter(day => day.tasks.length !== 0);
    setTasksList(tasks => array2);
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
    (dayTasks.tasks.filter(task => task.editing === true )).length > 0 ? editingMod(true) : editingMod(false);
  }

  const Tasks = () => dayTasks.tasks.map(task => <Task key={task.id} id={task.id} shortName={task.shortName} text={task.text} checkbox={task.checked} important={task.important} category={task.category} time={task.time} save={handleSaveTask} delete={handleDeleteTask} check={handleCheckbox} editingMod={handleEditingMod}/>)

  return (
    <div>
      {dayTasks && Tasks()}
    </div>
  );
}
 
export default TasksList;