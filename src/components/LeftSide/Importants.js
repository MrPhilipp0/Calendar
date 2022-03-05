import { useRef, useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { BlockFlagContext } from '../Context/BlockFlagContext';
import { checkTask } from '../../actions/taskActions';
import Filter from './Filter';
import OverlayTriggerObject from '../OverlayTriggers/OverlayTriggerObject';

import { MOBILE, ACTUAL_DATE, ICONS, DEFAULT_FILTER_OBJECT, DEFAULT_FILTER_CATEGORIES } from '../../store/constants';

import { Button, Col,Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gsap from 'gsap';

import '../../styles/App.css';


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

const Importants = ({currentTasks, checkTask}) => {

  const mapStorageTasks = () => {
    let tasks = [];
    [...currentTasks].forEach(element => {
      !tasks.includes(element.idDay) && tasks.push(element.idDay);
    });
  
    tasks = tasks.map(idDay => {
      const dayArr = [...currentTasks].filter(task => task.idDay === idDay);
      dayArr.sort(sortingTasksFunctionByTime);
      const day = {
        idDay,
        weekDay: dayArr[0].weekDay,
        link: dayArr[0].link,
        tasks: dayArr,
      }
      return day;
    })
  
    tasks.sort(sortingTasksFunctionByDate);
    return tasks;
  }

  const {blockFlag} = useContext(BlockFlagContext);

  const [mainTasksArray, setMainTasksArray] = useState(mapStorageTasks());
  const [tasksArrayWithFilter, setTasksArrayWithFilter] = useState(mainTasksArray);
  const [filter, setFilter] = useState(DEFAULT_FILTER_OBJECT);

  const [visibilityTasksList, setVisibilityTasksList] = useState(true);

  const handleSetVisibilityTasksList = () => {
    !visibilityTasksList && animationFunction(0);
    setVisibilityTasksList(!visibilityTasksList);
  }

  const priorityStars = (taskPriority) => {
    let stars = [];
    stars.length = taskPriority;
    for (let i=0; i<stars.length; i++) {
      stars[i] = <i key={i} className="bi bi-star-fill lh-1 me-sm-1" style={{color:"gold"}}></i>
    }
    return <div className="d-flex justify-content-end">{stars}</div>;
  }


// **************************************
  // ANIMATIONS (GSAP)
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
    // Wyodrębnienie właściwości elements do tablicy w celu usunięcia wszystkich animacji
    gsap.killTweensOf(Object.values(elements).flat());
    if (mainTasksArray.length > 0) {
      gsap.effects.moveFromLeft([...elements.shortTasks], {stagger: .1, delay: a});
      gsap.effects.moveFromLeft([...elements.weekDays], {stagger: .2, duration: 1, delay: a});
    }
  };

  // eslint-disable-next-line
  useEffect(() => animationFunction(),[]);

  // Uploading main tasks state
  useEffect(() => {
    setMainTasksArray(mapStorageTasks());
  // eslint-disable-next-line
  },[currentTasks])
  
  // Filtration main tasks state
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
          return taskDate > ACTUAL_DATE
        } else if (filter.time === 'Past') {
          return taskDate < ACTUAL_DATE
        } else {
          return true;
        }
      })

      return day
    });
    setTasksArrayWithFilter(arrayTasks.filter(day => day.tasks.length > 0));

  },[filter, mainTasksArray])

  return (
    <div ref={wrapper} className="rounded text-center mt-2 mb-5 pt-3 mx-1 fs-6" style={{color:'rgba(240, 239, 235)'}} onLoad={animationFunction}>
      <div className="d-flex justify-content-center titleImportant">

        {/* Visibility list*/}
        <Button onClick={handleSetVisibilityTasksList} className="my-3 p-1 px-2 me-3">
          <FontAwesomeIcon icon={visibilityTasksList ? ICONS.showTasks : ICONS.hiddenTasks} className="p-0"/>
        </Button>
        
        <p className="fs-2 m-0 mt-2">
          <b>Your tasks:</b>
        </p>
      </div>

      {/* FILTER */}
      <div className="py-2 border-bottom border-top" >
        <Filter setFilter={setFilter} categories={DEFAULT_FILTER_CATEGORIES} animation={animationFunction}/>
      </div>

      <Row key='rowKey' className="m-0 tasksList" style={MOBILE ? {maxHeight:"30vh", overflowY:'auto'} : {maxHeight:"60vh", overflowY:'auto'}} hidden={!visibilityTasksList}>

        {/* MAP DAYS */} 
        {
          tasksArrayWithFilter.map(day => (
            <Col key={day.idDay} md={12} className="border-bottom py-1">
              <div className="d-flex ms-0 h5 justify-content-between dayElement">

                {/* Weekday */}
                <label className="fw-bold">
                  {day.weekDay}
                </label>
                <div>
                  {/* Date */}
                  <label className="pe-2">
                    {day.idDay}
                  </label>

                  {/* Go to the task */}
                  <OverlayTriggerObject 
                    id={day.idDay} 
                    text="Click to go to day" 
                    placement="top" 
                    object={
                      <Link to={!blockFlag ? day.link : '#'} className="pe-2" style={blockFlag ? {pointerEvents:'none', color:'grey'} : null}>
                        <FontAwesomeIcon icon={ICONS.goToTask} className="p-0"/>
                      </Link>
                    } 
                  />
                </div>
              </div>
              
              {/* MAP TASKS */}
              {
                day.tasks.map(task => (
                  <Col md={12} className="border-bottom py-1 importantShortTask" key={task.id + '_object'}>
                    <Row className="justify-content-between">
                      <Col xs={4} className="d-flex">

                        {/* Category icon */}
                        <OverlayTriggerObject 
                          id={task.id}
                          text={task.category}
                          placement="top"
                          object = {
                            <div>
                              <FontAwesomeIcon className="pe-3 mt-1" icon={ICONS[task.category]} color={task.check ? '#b5c99a' : '#ffc8dd'}/>
                            </div>
                          }
                        />
                        
                        {/* Time */}
                        <span className="me-2" style={{color: task.check ? '#87986a' : '#ffb3c1'}}>
                          {task.time}
                        </span>

                      </Col>
                      <Col xs={1} className="d-flex me-3">

                        {/* Check */}
                        <OverlayTriggerObject 
                          id={task.id}
                          text={task.check ? 'Not done!' : 'Done!'}
                          placement="top"
                          object = {
                            <div style={{cursor:'pointer'}}>
                              <FontAwesomeIcon className="p-0 mt-1"  color={task.check ? 'green' : 'red'} icon={task.check ? ICONS.check : ICONS.noCheck} onClick={() => checkTask(task.id)}/>
                            </div>
                          }
                        />
                        
                      </Col>
                    </Row>

                    <Row className="mt-1">
                      <Col xs={8} style={{color:'#fadde1'}} className="d-flex justify-content-start ms-4 ps-4">

                        {/*  Name */}
                        <p className="mb-1" style={{textDecoration: task.check && 'line-through', color: task.check ? '#87986a' : '#ffb3c1'}}>
                          {task.name}
                        </p>

                      </Col>
                      <Col xs={3} className="pe-2">

                        {/* Priority */}
                        {priorityStars(task.priority)}
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

const mapStateToProps = state => {
  return {
    currentTasks: state.TasksReducer.tasks,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkTask : id => {
      dispatch(checkTask(id));
    }
  }
}

 
export default connect(mapStateToProps, mapDispatchToProps)(Importants);