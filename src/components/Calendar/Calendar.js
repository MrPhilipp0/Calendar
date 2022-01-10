import React from 'react';
import DaysList from './DaysList';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import '../../styles/App.css';

export const NAMES_MONTH = ['January', 'February', 'March', 'April', 'May', 'June','July','August', 'September', 'October', 'November', 'December'];
const NAMES_DAY = ['Mon', 'Thu', 'Wed', 'Thr', 'Fr', 'Sat', 'Sun'];

const Calendar = ({date, click}) => {

  const leftArrowIcon = <i id="left" class="bi bi-arrow-left h1 p-2"></i>;
  const rightArrowIcon = <i id="right" class="bi bi-arrow-right h1 p-2"></i>;
  const todayIcon = <i id="today" class="bi bi-calendar2-check p-3"></i>
  const goToIcon = <i class="bi bi-calendar2-month "></i>;

  const overlayTriggerButton = (text, buttonText, id) => {
    return (
      <OverlayTrigger
        key={id}
        placement={'top'}
        overlay={
          <Popover>
            <Popover.Body>
              {text} 
            </Popover.Body>
          </Popover>
        }>
        <Button className="p-0 my-2 mx-3" onClick={click} id={id}> {buttonText} </Button> 
      </OverlayTrigger>
    )
  }


  return ( 
    <div style={{margin:'0 5px'}} class="flex-shrink-0 border rounded-3 mt-2">

      <div class="d-flex justify-content-between" style={{backgroundColor:'#014F86'}}>
        <div class="d-flex">
          {overlayTriggerButton('Previous month', leftArrowIcon, 'left')}
          <div>
            <p class="m-0 mt-1 mx-3 fs-4"> <strong> {date.year} </strong></p>
            <p class="m-0 p-0 mx-3 fs-4 fw-light"> {NAMES_MONTH[date.month]} </p>
          </div>
        </div>
        <div class="d-flex">
          <div class="d-flex flex-column my-auto">
            {overlayTriggerButton('Actual month', todayIcon, 'today')}
            {overlayTriggerButton('Go to...', goToIcon, '')}
          </div>
          {overlayTriggerButton('Next month', rightArrowIcon, 'right')}
        </div>
      </div>
      
      <div class="px-0 border border-3 border-light rounded" style={{backgroundColor:'#2C7DA0'}}>

        <div class="d-flex justify-content-center mx-0 my-1" >
          {NAMES_DAY.map(day => <div class=" text-center p-0 mx-md-1 border rounded" style={{width: '14.285714285714286%', backgroundColor:'#2C7DA0'}}> {day} </div> )}
        </div>

        <DaysList date={date}/>
      </div>
    </div>
  );
}
 
export default Calendar;