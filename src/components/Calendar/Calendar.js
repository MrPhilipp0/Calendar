import React, { useEffect, useRef } from 'react';
import DaysList from './DaysList';
import { Button, Dropdown } from 'react-bootstrap';
import SimpleOverlayTriggerObject from '../OverlayTriggers/SimpleOverlayTriggerObject';
import { actualDate } from '../../App';
import gsap from 'gsap';

import '../../styles/App.css';

export const NAMES_MONTH = ['January', 'February', 'March', 'April', 'May', 'June','July','August', 'September', 'October', 'November', 'December'];
export const NAMES_WEEKDAY = ['Mon', 'Thu', 'Wed', 'Thr', 'Fr', 'Sat', 'Sun'];

const Calendar = ({date, click, setMonth, setYear}) => {
  const icons = {
    leftArrow: <i id="left" class="bi bi-arrow-left px-sm-4 p-2"></i>,
    rightArrow: <i id="right" class="bi bi-arrow-right px-sm-4 p-2"></i>,
    currentMonth: <i id="currentMonth" class="bi bi-calendar2-check p-3"></i>,
    month: <i class="bi bi-calendar-month "></i>,
    year: <i class="bi bi-calendar3 "></i>,
  }

  const calendarWrapper = useRef(null);

  useEffect(() => {
    const calendar = calendarWrapper.current;
    const weeksList = [...calendar.children[1].children[1].children];

    gsap.set([...weeksList, calendar], {autoAlpha:0})
    
    const lt = gsap.timeline({defaults: {ease:'expo'}});
    lt.to(calendar, {duration: 2, autoAlpha:1})
      .to([...weeksList],{duration:1, autoAlpha:1, stagger:'0.2'}, '-=2')
  },[])
  
  const dropdownYearOptions = () => {
    const currentYear = actualDate.getFullYear();
    let years = [currentYear];
    for (let i = currentYear-10; i <= currentYear+10; i++) {
      years.push(i)
    }
    
    return (years.map(year => {
      if (year === currentYear) {
        return <Dropdown.Item className="border-3 border-top border-bottom" tabIndex="-1" eventKey={year} onClick={() => {setYear(year)}}> {year} </Dropdown.Item>
      } else {
        return <Dropdown.Item eventKey={year} onClick={() => {setYear(year)}}> {year} </Dropdown.Item>
      }
    }))
  }

  const leftArrow = {
    id: 'left',
    text: 'Previous month',
    placement: 'bottom',
    object: <Button className="p-0 my-2 mx-1 mx-sm-3 shadow-none"  onClick={click} id='left'> {icons.leftArrow} </Button>
  }

  const rightArrow = {
    id: 'right',
    text: 'Next month',
    placement: 'bottom',
    object: <Button className="p-0 my-2 mx-1 mx-sm-3 shadow-none"  onClick={click} id='right'> {icons.rightArrow} </Button>
  }

  const currentMonth = {
    id: 'currentMonth',
    text: 'Actual month',
    placement: 'bottom',
    object: <Button className="p-0 my-2 mx-1 mx-sm-3 shadow-none"  onClick={click} id='currentMonth'> {icons.currentMonth} </Button>
  }

  const changeMonth = {
    id: 'changeMonth',
    text: 'Change month',
    placement: 'top',
    object:
      <Dropdown className="p-0 my-1 mx-1">
        <Dropdown.Toggle className="p-1" variant="success" id="dropdown-basic">
          {icons.month}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{maxHeight:"10rem", overflowY:'auto'}} >
          {NAMES_MONTH.map((month,index) => (<Dropdown.Item eventKey={index} onClick={() => {setMonth(index)}}> {month} </Dropdown.Item>))}
        </Dropdown.Menu>
      </Dropdown>
  }

  const changeYear = {
    id: 'changeYear',
    text: 'Change year',
    placement: 'top',
    object: 
    <Dropdown className="p-0 my-1 mx-1">
      <Dropdown.Toggle className="p-1" variant="success" id="dropdown-basic">
        {icons.year}
      </Dropdown.Toggle> 
      <Dropdown.Menu style={{maxHeight:"10rem", overflowY:'auto'}} >
        {dropdownYearOptions()}
      </Dropdown.Menu>
    </Dropdown>
  } 


  return ( 
    <div style={{margin:'0 5px'}} className='flex-shrink-0 rounded-3 my-3 mx-md-2' id="Calendar" ref={calendarWrapper}>

      <div className="d-flex rounded justify-content-between" style={{backgroundColor:'rgba(1, 79, 134, 0.8)'}}>
        <div className="d-flex">
          {SimpleOverlayTriggerObject({ ...leftArrow})}
          
          <div style={{color:'#fff0f3'}}>
            <p className="m-0 mt-1 mx-1 mx-sm-3 fs-4"> <strong> {date.year} </strong> </p>
            <p className="m-0 p-0 mx-1 mx-sm-3 fs-4 fw-light"> {NAMES_MONTH[date.month]} </p>
          </div>

        </div>

        <div className="d-flex">
          <div className="d-flex flex-column my-auto">
            {SimpleOverlayTriggerObject({...currentMonth})}

            <div className="d-flex">
              {SimpleOverlayTriggerObject({...changeMonth})}
              {SimpleOverlayTriggerObject({...changeYear})}
            </div>

          </div>
          {SimpleOverlayTriggerObject({...rightArrow})}
        </div>

      </div>
      
      <div className="px-0 border border-3 border-light rounded" style={{backgroundColor:'#2C7DA0'}}>

        <div className="d-flex justify-content-center border-bottom" >
          {NAMES_WEEKDAY.map(day => 
            <div className=" text-center py-1 border-start border-end" 
            style={{width: '14.285714285714286%'}}> 
              <strong>
                {day} 
              </strong>
            </div> )}
        </div>

        <DaysList date={date}/>
      </div>
    </div>
  );
}
 
export default Calendar;