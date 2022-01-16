import React from 'react';
import DaysList from './DaysList';
import { Button, Dropdown } from 'react-bootstrap';
import SimpleOverlayTriggerObject from '../OverlayTriggers/SimpleOverlayTriggerObject';

import '../../styles/App.css';

export const NAMES_MONTH = ['January', 'February', 'March', 'April', 'May', 'June','July','August', 'September', 'October', 'November', 'December'];
const NAMES_DAY = ['Mon', 'Thu', 'Wed', 'Thr', 'Fr', 'Sat', 'Sun'];

const Calendar = ({date, click, setMonth, setYear}) => {
  
  const icons = {
    leftArrow: <i id="left" class="bi bi-arrow-left px-sm-4 p-2"></i>,
    rightArrow: <i id="right" class="bi bi-arrow-right px-sm-4 p-2"></i>,
    currentMonth: <i id="currentMonth" class="bi bi-calendar2-check p-3"></i>,
    month: <i class="bi bi-calendar-month "></i>,
    year: <i class="bi bi-calendar3 "></i>,
  }
  
  const dropdownYearOptions = () => {
    const currentYear = date.year;
    let years = [];
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
    placement: 'top',
    object: <Button className="p-0 my-2 mx-1 mx-sm-3 shadow-none"  onClick={click} id='left'> {icons.leftArrow} </Button>
  }

  const rightArrow = {
    id: 'right',
    text: 'Next month',
    placement: 'top',
    object: <Button className="p-0 my-2 mx-1 mx-sm-3 shadow-none"  onClick={click} id='right'> {icons.rightArrow} </Button>
  }

  const currentMonth = {
    id: 'currentMonth',
    text: 'Actual month',
    placement: 'top',
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
    <div style={{margin:'0 5px'}} class="flex-shrink-0 border rounded-3 my-2 mx-md-2">

      <div class="d-flex rounded justify-content-between" style={{backgroundColor:'#014F86'}}>
        <div class="d-flex">
          {SimpleOverlayTriggerObject({ ...leftArrow})}
          
          <div>
            <p class="m-0 mt-1 mx-1 mx-sm-3 fs-4"> <strong> {date.year} </strong> </p>
            <p class="m-0 p-0 mx-1 mx-sm-3 fs-4 fw-light"> {NAMES_MONTH[date.month]} </p>
          </div>

        </div>

        <div class="d-flex">
          <div class="d-flex flex-column my-auto">
            {SimpleOverlayTriggerObject({...currentMonth})}

            <div class="d-flex">
              {SimpleOverlayTriggerObject({...changeMonth})}
              {SimpleOverlayTriggerObject({...changeYear})}
            </div>

          </div>
          {SimpleOverlayTriggerObject({...rightArrow})}
        </div>

      </div>
      
      <div class="px-0 border border-3 border-light rounded" style={{backgroundColor:'#2C7DA0'}}>

        <div class="d-flex justify-content-center mx-0 my-1" >
          {NAMES_DAY.map(day => <div class=" text-center p-0 mx-md-1 border border-dark rounded" style={{width: '14.285714285714286%', backgroundColor:'#ffc4d6'}}> {day} </div> )}
        </div>

        <DaysList date={date}/>
      </div>
    </div>
  );
}
 
export default Calendar;