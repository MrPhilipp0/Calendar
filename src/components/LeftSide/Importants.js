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

  let tasksArray = [...tasksList];
  
  const priorityWrapper = useRef(null);

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
      stars[i] = <i key={i} className="bi bi-star-fill lh-1 me-sm-1" style={{color:"gold"}}></i>
    }
    return <div className="d-flex justify-content-end">{stars}</div>;
  }

  useEffect(() => {
    const priorityLayout = priorityWrapper.current;
    const [...elements] = priorityLayout.querySelectorAll( '.importantShortTask');
    // const [...dayElements] =  priorityLayout.querySelectorAll( '.dayElement');
    const titleImportant = priorityLayout.querySelector('.titleImportant');

    gsap.set([priorityLayout, ...elements, titleImportant], {x:'-=500'})
    const lt = gsap.timeline({defaults: {ease: 'expo'}});

    lt.addLabel('time')
      .to(priorityLayout, {duration: 2, x:'+=500'}, '+=.5')
      .to([...elements], {duration: 2, x:'+=500', stagger:'.2'}, '-=1.5')
      .to(titleImportant, {duration: 3, x:'+=500'}, 'time');

  },[])

  const sortingTasksFunctionByDate = (a, b) => {
    let date1 = a.idDay.split('.');
    let date2 = b.idDay.split('.');
    date1 = new Date(date1[2], date1[1]-1, date1[0], 0, 0);
    date2 = new Date(date2[2], date2[1]-1, date2[0], 0, 0);
    date1 = date1.getTime();
    date2 = date2.getTime();
    return date1 - date2
  }

  const sortingTasksFunctionByTime = (a, b) => {
    let time1 = a.time.split(':');
    let time2 = b.time.split(':');
    time1 = 60 * time1[0] + time1[1];
    time2 = 60 * time2[0] + time2[1];
    return time1 - time2
  }

  tasksArray.sort(sortingTasksFunctionByDate);
  tasksArray.forEach(day => {
    day.tasks.sort(sortingTasksFunctionByTime);
  });

  return (
    <div ref={priorityWrapper} className="rounded text-center mt-2 mb-5 pt-3 mx-1 fs-6" style={{color:'rgba(240, 239, 235)'}}>
      <p className="fs-2 titleImportant"><strong>Your tasks:</strong></p>
      <div className="py-2 border-bottom border-top"></div>
      <Row key='rowKey' className="m-0" style={style}>

      {
        tasksArray.map(day => (
          <Col key={day.idDay} md={12} className="border-bottom py-1">
            <div className="d-flex ms-0 h5 justify-content-between dayElement">
              <label className="fw-bold">
                {day.weekDay}
              </label>
              <div>
                <label className="pe-2">
                  {day.idDay}
                </label>

                {/* Go to task */}
                
                <SimpleOverlayTriggerObject 
                  id={day.idDay} 
                  text="Click to go to day" 
                  placement="top" 
                  object={
                    <Link to={!blockFlag ? day.link : '#'} className="pe-2" style={blockFlag ? {pointerEvents:'none', color:'grey'} : null}>
                      <FontAwesomeIcon icon={IconsCategory.goToTask} className="p-0"/>
                    </Link>
                  } 
                />
              </div>
            </div>

            {
              day.tasks.map(task => (
                <Col md={12} className="border-bottom py-1 importantShortTask" key={task.id + '_object'}>
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