import React from 'react';
import { TaskContext } from '../Context/TaskToContext';

const Importants = () => {

const {tasksList} = React.useContext(TaskContext);
const importantsList = {star1:[], star2:[], star3:[]};

tasksList.forEach(day => {
  day.tasks.forEach(task => {
    switch (task.important) {
      case 1:
        importantsList.star1.push(<li key={task.id}>{task.shortName}</li>);
        break;
      case 2:
        importantsList.star2.push(<li key={task.id}>{task.shortName}</li>);
        break;
      case 3:
        importantsList.star3.push(<li key={task.id}>{task.shortName}</li>);
        break
      default:
        break;
    }
  }) 
})

  return (
    <div className='importants'>
      <h2>Important tasks:</h2>
        <ul>
          <li>
            <h6>3 star</h6>
            <ul>
              {importantsList.star3}
            </ul>
          </li>
          <li>
            <h6>2 star</h6>
            <ul>
              {importantsList.star2}
            </ul>
          </li>
          <li>
            <h6>1 star</h6>
            <ul>
              {importantsList.star1}
            </ul>
          </li>
        </ul>
    </div>
  );
}
 
export default Importants;