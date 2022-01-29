import React, {useRef, useEffect} from 'react';
import { TaskContext } from '../Context/TaskToContext';
import { BlockFlagContext } from '../Context/BlockFlagContext';
import { Col,Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

import { IconsCategory } from '../../App';
import '../../styles/App.css';

const Importants = () => {

const {tasksList} = React.useContext(TaskContext);
const {blockFlag} = React.useContext(BlockFlagContext);

const tasks = [];

tasksList.forEach(day => {
  day.tasks.forEach(task => {
    const idDayArray = day.idDay.split('.');
    idDayArray[0] = idDayArray[0].length === 1 ? '0' + idDayArray[0] : idDayArray[0];
    idDayArray[1] = idDayArray[1].length === 1 ? '0' + idDayArray[1] : idDayArray[1];
    task.day = idDayArray.join('.');
    task.link = `/Calendar/tasks/${day.idDay}`;
    tasks.push(task);
  }) 
})

const [tasksLength, setTasksLength] = React.useState(tasks.length);
const priorityWrapper = useRef(null);

useEffect(() => {
  if (tasks.length !== tasksLength) {
    setTasksLength(tasks.length)
  }
},[tasks.length, tasksLength])

useEffect(() => {
  const priorityLayout = priorityWrapper.current;
  const [...elements] = priorityLayout.children[2].children;

  gsap.set([priorityLayout, ...elements], {x:'-=300'})
  const lt = gsap.timeline({defaults: {ease: 'expo'}});

  lt.to(priorityLayout, {duration: 2, x:'+=300'}, '+=.5')
    .to([...elements], {duration: 2, x:'+=300', stagger:'.5'}, '-=1.5')
},[])



let style = null;
if (document.body.clientWidth < 768) {
  style = {maxHeight:"30vh", overflowY:'auto'};
} else {
  style = {maxHeight:"60vh", overflowY:'auto'};
}

const importantStars = (taskPriority) => {
  let stars = [];
  stars.length = taskPriority;
  for (let i=0; i<stars.length; i++) {
    stars[i] = <i className="bi bi-star-fill lh-1 me-sm-1" style={{color:"gold"}}></i>
  }
  return <div className="d-flex justify-content-end">{stars}</div>;
}

  return (
    <div ref={priorityWrapper} id="Priority" className="rounded text-center mt-2 mb-5 pt-3 mx-1 fs-6" style={{color:'rgba(240, 239, 235)'}}>
      <p className="fs-2"><strong>Your tasks:</strong></p>
      <div className="py-2 border-bottom border-top"></div>
      <Row id="PriorityElements" className="m-0" style={style}>


      {tasks.map(task => (
        <Col md={12} className="border-bottom py-2" key={task.id}>
          <Row>
            <Col xs={1} className="ps-2">
              <FontAwesomeIcon icon={IconsCategory[task.category]}/>
            </Col>
            <Col xs={9}>
              {task.shortName}
            </Col>
            <Col xs={1} className="ps-0">
              <Link to={!blockFlag ? task.link : '#'}>
                <FontAwesomeIcon disable={blockFlag} icon={IconsCategory.goToTask} />
              </Link>
            </Col>
            <Col xs={1} className="ps-0">
              <FontAwesomeIcon color={task.checked ? 'green' : 'red'} icon={task.checked ? IconsCategory.check : IconsCategory.noCheck}/>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col xs={5} className="ps-2 text-start">
              {task.day}
            </Col>
            <Col xs={3}>
              {task.time}
            </Col>
            
            <Col xs={4} className="me-0 pe-1 pe-sm-0">
              {importantStars(task.important)}
            </Col>
          </Row>
        </Col>
        ))}


      </Row>
    </div>
  );
}
 
export default Importants;