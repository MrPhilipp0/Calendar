import React, {useRef, useEffect} from 'react';
import { TaskContext } from '../Context/TaskToContext';
import { BlockFlagContext } from '../Context/BlockFlagContext';
import { Col,Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import SimpleOverlayTriggerObject from '../OverlayTriggers/SimpleOverlayTriggerObject';

import { IconsCategory } from '../../App';
import '../../styles/App.css';

const Importants = () => {

const {tasksList} = React.useContext(TaskContext);
const {blockFlag} = React.useContext(BlockFlagContext);

const tasks = {};

tasksList.forEach(day => {
  let idDayArray = day.idDay.split('.');
  idDayArray[0] = idDayArray[0].length === 1 ? '0' + idDayArray[0] : idDayArray[0];
  idDayArray[1] = idDayArray[1].length === 1 ? '0' + idDayArray[1] : idDayArray[1];
  let d = new Date(idDayArray[2], idDayArray[1]-1, idDayArray[0], 0, 0);
  let opts = { weekday: 'long'}
  d = Intl.DateTimeFormat("en-US", opts).format(d);
  idDayArray = idDayArray.join(".");
  if (!tasks[idDayArray]) {
    tasks[idDayArray] = {
      weekDay: d,
      tasks: [],
      link: `/Calendar/tasks/${day.idDay}`,
    }
  }

  day.tasks.forEach(task => {

    task.day = idDayArray;
    task.link = `/Calendar/tasks/${day.idDay}`;
    tasks[idDayArray].tasks.push(task);
  }) 
})

console.log(tasks);
const priorityWrapper = useRef(null);


// useEffect(() => {
//   const priorityLayout = priorityWrapper.current;
//   const [...elements] = priorityLayout.children[2].children;

//   gsap.set([priorityLayout, ...elements], {x:'-=500'})
//   const lt = gsap.timeline({defaults: {ease: 'expo'}});

//   lt.to(priorityLayout, {duration: 2, x:'+=500'}, '+=.5')
//     .to([...elements], {duration: 2, x:'+=500', stagger:'.5'}, '-=1.5');
// },[])



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

      {
        Object.entries(tasks).map(day => (
          <Col md={12} className="border-bottom py-2" key={day[0]}>
            <div className="d-flex ms-0 h5 justify-content-between">
              <label className="fw-bold">
                {day[1].weekDay}
              </label>
              <div>
                <label className="pe-2">
                  {day[0]}
                </label>

                {/* Go to task */}
                
                <SimpleOverlayTriggerObject 
                  id={day[0]} 
                  text="Click to go to day" 
                  placement="top" 
                  object={
                    <Link to={!blockFlag ? day[1].link : '#'} className="pe-2">
                      <FontAwesomeIcon disable={blockFlag} icon={IconsCategory.goToTask} className="p-0"/>
                    </Link>
                  } 
                />
              </div>
            </div>

            {
              day[1].tasks.map(task => (
                <Col md={12} className="border-bottom py-2" key={task.id}>
                  <Row className="justify-content-between">
                    <Col xs={4} className="d-flex">

                      {/* Icon */}
                      <FontAwesomeIcon className="pe-3 mt-1" icon={IconsCategory[task.category]}/>

                      {/* Time */}
                      <span className="me-2" style={{color:'rgba(250, 221, 225,0.6)'}}>{task.time || 'All day'}</span>
                    </Col>
                    <Col xs={1} className="d-flex me-3">

                      {/* Check */}
                      <FontAwesomeIcon className="p-0 mt-1"  color={task.checked ? 'green' : 'red'} icon={task.checked ? IconsCategory.check : IconsCategory.noCheck}/>
                    </Col>
                  </Row>

                  <Row className="mt-1">
                    <Col xs={8} style={{color:'#fadde1'}} className="d-flex justify-content-start ms-4 ps-4">

                      {/* Short Name */}
                      {task.shortName}
                    </Col>
                    <Col xs={3} className="pe-2">

                      {/* Priority */}
                      {importantStars(task.important)}
                    </Col>

                  </Row>
                </Col>
              ))
            }
          </Col>
        ))
          }
      </Row>
    </div>
  );
}
 
export default Importants;