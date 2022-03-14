import { useEffect, useRef } from 'react';

import { ACTUAL_DATE, COLORS, ICONS, NAMES_MONTH, NAMES_WEEKDAY } from '../../store/constants';
import DaysList from './DaysList';
import OverlayTriggerObject from '../OverlayTriggers/OverlayTriggerObject';

import { Button, Dropdown } from 'react-bootstrap';
import gsap from 'gsap';
import '../../styles/App.css';


const Calendar = ({date, click, handleChangeDate}) => {

  let calendarWrapper = useRef(null);

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
        className="px-2 p-md-0 my-2 mx-2 mx-sm-3 shadow-none"  
        onClick={click}> 
        {ICONS.leftArrow} 
      </Button>
  }

  const rightArrowButton = {
    id: 'right',
    text: 'Next month',
    placement: 'bottom',
    object:
      <Button 
        id='right'
        className="px-2 p-md-0 my-2 mx-2 mx-sm-3 shadow-none"  
        onClick={click}> 
        {ICONS.rightArrow} 
      </Button>
  }

  const currentMonthButton = {
    id: 'currentMonth',
    text: 'Actual month',
    placement: 'bottom',
    object:
      <Button 
        id='currentMonth'
        className="p-0 my-2 mx-1 mx-sm-3 shadow-none"  
        onClick={click}> 
        {ICONS.currentMonth} 
      </Button>
  }

  const changeMonthButton = {
    id: 'changeMonth',
    text: 'Change month',
    placement: 'top',
    object:
      <Dropdown className="p-0 my-1 mx-1">

        <Dropdown.Toggle className="p-1" variant="success" id="dropdown-basic">
          {ICONS.month}
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
    placement: 'top',
    object: 
    <Dropdown className="p-0 my-1 mx-1">

      <Dropdown.Toggle className="p-1" variant="success" id="dropdown-basic">
        {ICONS.year}
      </Dropdown.Toggle> 

      <Dropdown.Menu align='end' style={{maxHeight:"10rem", overflowY:'auto'}} >
        {dropdownYearOptions()}
      </Dropdown.Menu>

    </Dropdown>
  } 


  return ( 
    <div className='flex-shrink-0 rounded-3 my-3 mx-md-2' id="Calendar" ref={el => calendarWrapper = el}>
      <div className="d-flex rounded justify-content-between" style={{backgroundColor: COLORS.changeOpacity(COLORS.dark1, .6)}}>
        <div className="d-flex">
          {/* Left arrow button */}
          <OverlayTriggerObject { ...leftArrowButton}/>
          
          {/* Year + month */}
          <div className="mt-1" style={{color: 'white'}}>
            <p className="m-0 mt-1 mx-1 mx-sm-3 fs-4"> <strong> {date.year} </strong> </p>
            <p className="m-0 p-0 mx-1 mx-sm-3 fs-4 fw-light"> {NAMES_MONTH[date.month]} </p>
          </div>

        </div>

        <div className="d-flex">
          <div className="d-flex flex-column my-auto">
            
            {/* Current date */}
            <OverlayTriggerObject {...currentMonthButton} />

            {/* Change month and year */}
            <div className="d-flex position-relative" >
              <OverlayTriggerObject {...changeMonthButton} />
              <OverlayTriggerObject  {...changeYearButton} />
            </div>

          </div>
          {/* Right arrow button */}
          <OverlayTriggerObject {...rightArrowButton} />
        </div>

      </div>
      
      <div className="px-0 border border-3 border-light rounded" style={{backgroundColor: COLORS.blue4}}>

        {/* Weekday names */}
        <div className="d-flex justify-content-center border-bottom" >
          {NAMES_WEEKDAY.map((day, index) => 
            <div 
              key={index + '_weekday'} 
              className=" text-center py-1 border-start border-end" 
              style={{width: '14.285714285714286%'}}
            > 
              <strong> {day} </strong>
            </div>)
          }
        </div>

        <DaysList date={date}/>
      </div>
    </div>
  );
}
 
export default Calendar;