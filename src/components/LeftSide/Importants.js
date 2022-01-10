import React from 'react';
import { TaskContext } from '../Context/TaskToContext';
import { ToggleButton } from 'react-bootstrap';

const Importants = () => {

const {tasksList} = React.useContext(TaskContext);
const importantsList = {star1:[], star2:[], star3:[]};

const [checked3star, setChecked3Star] = React.useState(false);
const [checked2star, setChecked2Star] = React.useState(false);
const [checked1star, setChecked1Star] = React.useState(false);

tasksList.forEach(day => {
  day.tasks.forEach(task => {
    switch (task.important) {
      case 1:
        importantsList.star1.push(<li class="text-start p-0 m-0 mb-1 fs-6 list-group-item" key={task.id}>{task.shortName}</li>);
        break;
      case 2:
        importantsList.star2.push(<li class="text-start p-0 m-0 mb-1 fs-6 list-group-item" key={task.id}>{task.shortName}</li>);
        break;
      case 3:
        importantsList.star3.push(<li class="text-start p-0 m-0 mb-1 fs-6 list-group-item" key={task.id}>{task.shortName}</li>);
        break
      default:
        break;
    }
  }) 
})

  return (
    <div class="flex-grow-1 border rounded text-center mt-2 p-4 mx-md-1 mx-3 fs-3" style={{backgroundColor:'#e3f2fd'}}>
      <p class=""><strong>Your tasks:</strong></p>
      <div>


        <div class="border border-dark rounded mt-2">
        <ToggleButton type="checkbox" id="toggle-check3" variant="outline-dark" size="sm" checked={checked3star} value="1" onChange={(e) => setChecked3Star(e.currentTarget.checked)} className="mb-2 mt-1">
          <p class="text-center mb-0" style={{letterSpacing:'0.2rem'}}>
            <i class="bi bi-star-fill" style={{color:"gold"}}></i>
            <i class="bi bi-star-fill" style={{color:"gold"}}></i>
            <i class="bi bi-star-fill" style={{color:"gold"}}></i>
          </p>
        </ToggleButton>
          <ul class="list-group list-group-flush px-2">{checked3star && importantsList.star3}</ul>
        </div>


        <div class="border border-dark rounded mt-2">
        <ToggleButton type="checkbox" id="toggle-check2" variant="outline-dark" size="sm" checked={checked2star} value="1" onChange={(e) => setChecked2Star(e.currentTarget.checked)} className="mb-2 mt-1">
          <p class="text-center mb-0" style={{letterSpacing:'0.2rem'}}>
            <i class="bi bi-star-fill" style={{color:"gold"}}></i>
            <i class="bi bi-star-fill" style={{color:"gold"}}></i>
          </p>
        </ToggleButton>
          <ul class="list-group list-group-flush px-2">{checked2star && importantsList.star2}</ul>
        </div>


        <div class="border border-dark rounded mt-2">
        <ToggleButton type="checkbox" id="toggle-check1" variant="outline-dark" size="sm" checked={checked1star} value="1" onChange={(e) => setChecked1Star(e.currentTarget.checked)} className="mb-2 mt-1">
          <p class="text-center mb-0" style={{letterSpacing:'0.2rem'}}>
            <i class="bi bi-star-fill" style={{color:"gold"}}></i>
          </p>
        </ToggleButton>
          <ul class="list-group list-group-flush px-2"> {checked1star && importantsList.star1}</ul>
        </div>
      </div>
    </div>
    
  );
}
 
export default Importants;