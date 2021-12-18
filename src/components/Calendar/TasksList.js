import React  from 'react';
import Task from './Task';
import { TaskContext } from './TaskToContext';

const TasksList = () => {
  
  const {tasksList, setTasksList} = React.useContext(TaskContext);

  let array = []; // pomocnicza tablica w celu aktualizacji stanu
  let index = null;

  const handleSaveTask = (id, shortName, text) => { //aktualizacja stanu tasków
    array = [...tasksList];
    index = array.findIndex(item => item.id === id);
    array[index].shortName = shortName;
    array[index].text = text;
    setTasksList(tasks => array);
  }

  const handleDeleteTask = (id) => { //usuwanie taska
    array = [...tasksList];
    array = array.filter(task => task.id !== id);
    setTasksList(tasks => array);
  }

  // Wyświetlanie wszystkich zadań (aktualnie wszystkich, później z danego dnia)
  const Tasks = () => tasksList.map(task => <Task key={task.id} id={task.id} shortName={task.shortName} text={task.text} save={handleSaveTask} delete={handleDeleteTask}/>)

  return (
    <div>
      {tasksList.length > 0 ? Tasks() : null}
    </div>
  );
}
 
export default TasksList;