import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { ACTUAL_DATE, COLORS, ICONS, NAMES_MONTH, NAMES_WEEKDAY } from '../../store/constants';
import DaysList from './DaysList';
import OverlayTriggerObject from '../OverlayTriggers/OverlayTriggerObject';

import { Button, Dropdown } from 'react-bootstrap';
import gsap from 'gsap';
import '../../styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const buttonStyle = {borderRadius:'9px', borderColor:COLORS.blue3, backgroundColor:COLORS.blue3};


const Calendar = ({date, click, handleChangeDate, currentTasks}) => {

  let calendarWrapper = useRef(null);

  const tasksCounterInMonth = currentTasks.filter(task => (
    Number(task.idDay.slice(3,5)) === date.month+1
    &&
    Number(task.idDay.slice(6)) === date.year
    )
  ).length;

  useEffect(() => {
    const days = calendarWrapper.querySelectorAll('.Days');
    const tl = gsap.timeline({autoRemoveChildren: true});
    gsap.set([...days], {opacity: 1, scale: 1})

    tl.fromTo([...days],{opacity: 0, scale: .9},{opacity: 1, scale:1,  stagger: {from: 'edges', amount: .5, grid: 'auto'}, duration: .002})
  },[date])

  const leftArrowButton = {
    id: 'left',
    text: 'Previous month',
    placement: 'bottom',
    object:
      <Button 
        id='left'
        className="my-2 mx-1 mx-md-2"  
        onClick={() => click('left')}
        style={buttonStyle}> 
        <FontAwesomeIcon icon={ICONS.leftArrow}/>
      </Button>
  }

  const rightArrowButton = {
    id: 'right',
    text: 'Next month',
    placement: 'bottom',
    object:
      <Button 
        id='right'
        className="my-2 mx-1 me-md-2"  
        onClick={() => click('right')}
        style={buttonStyle}> 
        <FontAwesomeIcon icon={ICONS.rightArrow}/>
      </Button>
  }

  const currentMonthButton = {
    id: 'currentMonth',
    text: 'Actual month',
    placement: 'bottom',
    object:
      <Button 
        id='currentMonth'
        className="my-2"  
        onClick={() => click('currentMonth')}
        style={buttonStyle}> 
        <FontAwesomeIcon icon={ICONS.currentMonth}/>
      </Button>
  }

  const changeMonthButton = {
    id: 'changeMonth',
    text: 'Change month',
    placement: 'left',
    object:
      <Dropdown className="my-2 mx-1">

        <Dropdown.Toggle className="px-1" style={{borderRadius: buttonStyle.borderRadius}} variant="success" id="dropdown-basic">
          <FontAwesomeIcon icon={ICONS.month}/>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{maxHeight:"10rem", overflowY:'auto'}} >
          {NAMES_MONTH.map((month,index) => (<Dropdown.Item key={index + '_month'} eventKey={index} onClick={() => {handleChangeDate('month',index)}}> {month} </Dropdown.Item>))}
        </Dropdown.Menu>

      </Dropdown>
  }

  const dropdownYearOptions = () => {
    const currentYear = ACTUAL_DATE.getFullYear();
    let years = [currentYear];
    for (let i = currentYear-10; i <= currentYear+10; i++) {
      years.push(i)
    }
    
    return (years.map((year, index) => {
      if (year === currentYear) {
        return <Dropdown.Item key={index + '_year'} className="border-3 border-top border-bottom" tabIndex="-1" eventKey={year} onClick={() => {handleChangeDate('year', year)}}> {year} </Dropdown.Item>
      } else {
        return <Dropdown.Item key={index + '_year'} eventKey={year} onClick={() => {handleChangeDate('year',year)}}> {year} </Dropdown.Item>
      }
    }))
  }

  const changeYearButton = {
    id: 'changeYear',
    text: 'Change year',
    placement: 'left',
    object: 
    <Dropdown className="my-2">

      <Dropdown.Toggle className="px-1" variant="success" style={{borderRadius: buttonStyle.borderRadius}} id="dropdown-basic">
        <FontAwesomeIcon icon={ICONS.year}/>
      </Dropdown.Toggle> 

      <Dropdown.Menu align='end' style={{maxHeight:"10rem", overflowY:'auto'}} >
        {dropdownYearOptions()}
      </Dropdown.Menu>

    </Dropdown>
  } 


  return ( 
    <div className='flex-shrink-0 rounded rounded-5 my-5 mx-1 mx-md-2 shadow' style={{backgroundColor: COLORS.changeOpacity(COLORS.white, 0.7)}} id="Calendar" ref={el => calendarWrapper = el}>
      <div className="d-flex rounded justify-content-between" style={{backgroundColor: COLORS.blue5}}>
        <div className="d-flex">
          {/* Left arrow button */}
          <OverlayTriggerObject { ...leftArrowButton}/>
          
          {/* Year + month */}
          <div className="mt-1" style={{color: 'white'}}>
            <p className="ms-sm-3 mb-0 pt-2 fs-5">{NAMES_MONTH[date.month]} <strong> {date.year} </strong> </p>
          </div>

        </div>

        <div className="d-flex">
          <div className="d-flex">
            
            {/* Current date */}
            <OverlayTriggerObject {...currentMonthButton} />

            {/* Change month and year */}
            <OverlayTriggerObject {...changeMonthButton} />
            <OverlayTriggerObject  {...changeYearButton} />

          </div>
          {/* Right arrow button */}
          <OverlayTriggerObject {...rightArrowButton} />
        </div>

      </div>
      
      <div>

        {/* Weekday names */}
        <div className="d-flex justify-content-center border-bottom border-2 mx-2">
          {NAMES_WEEKDAY.map((day, index) => 
            <div 
              key={index + '_weekday'} 
              className=" text-center py-1" 
              style={{width: '14.285714285714286%', letterSpacing:'1px'}}
            > 
              <strong> {day} </strong>
            </div>)
          }
        </div>

        <div className="mx-2 my-1 border-bottom border-2">
          <DaysList date={date}/>
        </div>

        {/* Done / noDone + tasksCounter */}
        <div className="ms-2 ms-md-4 d-flex justify-content-between">
          <label className="d-flex">
            <svg width="13" viewBox="0 0 10 10" className="mb-3 me-2">
              <circle cx="5" cy="5" r="5" fill={COLORS.pink2}/>
            </svg>
            <p>No done</p>
            <svg width="13" viewBox="0 0 10 10" className="ms-2 ms-md-5 mb-3 me-2">
              <circle cx="5" cy="5" r="5" fill={COLORS.green1}/>
            </svg>
            <p>Done</p>
          </label>
          <div className="d-flex me-2 me-md-4">
            <strong>
              {tasksCounterInMonth}
            </strong>
            <p>
              {'\xa0'} {tasksCounterInMonth === 1 ? 'task' : 'tasks'} in <b>{NAMES_MONTH[date.month]}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentTasks: state.TasksReducer.tasks,
  };
} 
 
export default connect(mapStateToProps)(Calendar);