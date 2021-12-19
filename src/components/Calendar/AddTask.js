import React from 'react';
import { NAMES_MONTH } from './Calendar';
import { Link, useLocation } from 'react-router-dom';
import { TaskContext } from '../Context/TaskToContext';

let taskCounter = 5;

const AddTask = () => {

  const [shortText, setShortText] = React.useState(''); //stan którkiej nazwy
  const [text, setText] = React.useState(''); //stan opisu
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

  const sendTask = () => {
    const currentTask = {
      shortName: shortText,
      text: text,
      id: taskCounter,
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

    setShortText(shortText => '');
    setText(text => '');
    taskCounter++;
  }

  return (
    <div className="calendar">

      {/* tzw. header */}
      <header className='headerTasks'> 
        <h2>ADD NEW TASK</h2>
        <h2>{taskDate[0]} {NAMES_MONTH[taskDate[1]]} {taskDate[2]}</h2>
      </header>

      <section className='mainSectionTasks'>

        {/* Lewa część */}
        <div className='leftSectionTasks'>
          <form onSubmit={handleSubmit}>

            <h2>Short task name:</h2>
            <input type='text' placeholder='Max 15 chars' value={shortText} onChange={handleShortTextChange} />

            <h2>Description: </h2>
            <textarea cols="25" rows="10" value={text} placeholder="Write task description" onChange={handleTextChange}></textarea>

          </form>
        </div>

        {/* Prawa część */}
        <div className='rightSectionTasks'>
          
          <Link to={'/Calendar/tasks/' + tasksLink}>  <button type='submit' onClick={sendTask}> SEND </button> </Link>
          <Link to={'/Calendar/tasks/' + tasksLink}> <button>Back</button> </Link>
        </div>

      </section>
    </div>
  );
}
 
export default AddTask;