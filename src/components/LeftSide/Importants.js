import React, { useRef, useEffect, useState } from 'react';
import { TaskContext } from '../Context/TaskToContext';
import { BlockFlagContext } from '../Context/BlockFlagContext';
import { Button, Col,Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import SimpleOverlayTriggerObject from '../OverlayTriggers/SimpleOverlayTriggerObject';
import { actualDate } from '../../App';

import { IconsCategory } from '../../App';
import '../../styles/App.css';
import Filter from './Filter';

const DEFAULT_CATEGORIES = [
  {
    name: 'Shopping',
    status: true,
    type: 'category',
  },
  {
    name: 'Working',
    status: true,
    type: 'category',
  },
  {
    name:'Food',
    status: true,
    type: 'category',
  },
  {
    name: 'Free Time',
    status: true,
    type: 'category',
  },
  {
    name: 'Sport',
    status: true,
    type: 'category',
  },
  {
    name: 'Travel',
    status: true,
    type: 'category', 
  },
  {
    name: 'Holiday',
    status: true,
    type: 'category',
  },
  {
    name: 'Other',
    status: true,
    type: 'category',
  },
];

const DEFAULT_FILTER_OBJECT = {
  categories: DEFAULT_CATEGORIES,
  verified: 'All',
  time: 'AllTime',
}

const Importants = () => {

  const [visibilityTasksList, setVisibilityTasksList] = useState(true);
  
  const {tasksList} = React.useContext(TaskContext);
  const {blockFlag} = React.useContext(BlockFlagContext);


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

  const handleSetVisibilityTasksList = () => {
    !visibilityTasksList && animationFunction(0);
    setVisibilityTasksList(!visibilityTasksList);
  }

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

  let tasks = [...tasksList];
  tasks.sort(sortingTasksFunctionByDate);
  tasks.forEach(day => {
    day.tasks.sort(sortingTasksFunctionByTime);
  });

  const [mainTasksArray, setMainTasksArray] = useState(tasks);
  const [tasksArrayWithFilter, setTasksArrayWithFilter] = useState(mainTasksArray);

  const [filter, setFilter] = useState(DEFAULT_FILTER_OBJECT);

  useEffect(() => {
    let tasks = [...tasksList];
    tasks.sort(sortingTasksFunctionByDate);
    tasks.forEach(day => {
      day.tasks.sort(sortingTasksFunctionByTime);
    });
    setMainTasksArray(tasks.filter(day => day.tasks.length > 0));
  },[tasksList])


  // Filtration
  useEffect(() => {
    let arrayTasks = JSON.parse(JSON.stringify(mainTasksArray));
    arrayTasks.map(day => {
      day.tasks = day.tasks.filter(task => (

        // Filtration by verification
        (filter.verified === 'All' ? true : (filter.verified === 'Check' ? task.checked : !task.checked))
        &&

        // Filtration by categories
        (filter.categories.some(category => category.status && category.name === task.category))
      ));

        // Filtration by date
      day.tasks = day.tasks.filter(task => {
        const taskDay = day.idDay.split('.');
        const taskTime = task.time.split(':');
        const taskDate = new Date(taskDay[2], taskDay[1]-1, taskDay[0], taskTime[0], taskTime[1]);

        if (filter.time === 'Future') {
          return taskDate > actualDate
        } else if (filter.time === 'Past') {
          return taskDate < actualDate
        } else {
          return true;
        }
      })

      return day
    });
    setTasksArrayWithFilter(arrayTasks.filter(day => day.tasks.length > 0));

  },[filter, mainTasksArray])

  
  
  // Animations (GSAP)
  const wrapper = useRef(null);

  gsap.registerEffect({
    name: "moveFromLeft",
    effect: (targets, config) => {
    gsap.set(targets, {x:'-125%', autoAlpha: .1})
      return gsap.to(targets, {
        duration: config.duration, 
        x:'0%',
        ease: 'expo',
        autoAlpha: 1,
        stagger: config.stagger,
        delay: config.delay,
      });
    },
    defaults: {duration: 1.5, stagger: 0, delay: 0},
    extendTimeline: false
  });

  const animationFunction = (a = 1) => {
    const elements = {
      shortTasks: [...wrapper.current.querySelectorAll( '.importantShortTask')],
      weekDays: [...wrapper.current.querySelectorAll( '.dayElement')],
    };
    // Konwersja obiektu elements do tablicy w celu usunięcia wszystkich animacji
    gsap.killTweensOf(Object.values(elements).flat());
    if (mainTasksArray.length > 0) {
      gsap.effects.moveFromLeft([...elements.shortTasks], {stagger: .1, delay: a});
      gsap.effects.moveFromLeft([...elements.weekDays], {stagger: .2, duration: 1, delay: a});
    }
  };

  // eslint-disable-next-line
  useEffect(() => animationFunction(),[]);

  return (
    <div ref={wrapper} className="rounded text-center mt-2 mb-5 pt-3 mx-1 fs-6" style={{color:'rgba(240, 239, 235)'}} onLoad={animationFunction}>
      <div className="d-flex justify-content-center titleImportant">
        <Button onClick={handleSetVisibilityTasksList} className="my-3 p-1 px-2 me-3">
          <FontAwesomeIcon icon={visibilityTasksList ? IconsCategory.showTasks : IconsCategory.hiddenTasks} className="p-0"/>
        </Button>
        <p className="fs-2 m-0 mt-2">
          <b>Your tasks:</b>
        </p>
      </div>

      <div className="py-2 border-bottom border-top" >
        <Filter setFilter={setFilter} categories={DEFAULT_CATEGORIES} animation={animationFunction}/>
      </div>

      <Row key='rowKey' className="m-0 tasksList" style={style} hidden={!visibilityTasksList}>
        {
          tasksArrayWithFilter.map(day => (
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

                        {/* Category icon */}
                        <SimpleOverlayTriggerObject 
                          id={task.id}
                          text={task.category}
                          placement="top"
                          object = {
                            <div>
                              <FontAwesomeIcon className="pe-3 mt-1" icon={IconsCategory[task.category]} color={task.checked ? '#b5c99a' : '#ffc8dd'}/>
                            </div>
                          }
                        />
                        

                        {/* Time */}
                        <span className="me-2" style={{color: task.checked ? '#87986a' : '#ffb3c1'}}>
                          {task.time}
                        </span>
                      </Col>
                      <Col xs={1} className="d-flex me-3">

                        {/* Check */}
                        <FontAwesomeIcon className="p-0 mt-1"  color={task.checked ? 'green' : 'red'} icon={task.checked ? IconsCategory.check : IconsCategory.noCheck}/>
                      </Col>
                    </Row>

                    <Row className="mt-1">
                      <Col xs={8} style={{color:'#fadde1'}} className="d-flex justify-content-start ms-4 ps-4">

                        {/* Short Name */}
                        <p className="mb-1" style={{textDecoration: task.checked && 'line-through'}}>
                          {task.shortName}
                        </p>
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
        {!tasksArrayWithFilter.length && 
          <label className="py-2 fs-5">
            No tasks, add new task or change filter.
          </label>
        } 
      </Row>
    </div>
  );
}

 
export default Importants;