import { useContext, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { BlockFlagContext } from '../../Context/BlockFlagContext';
import HoursList from './HoursList';
import { NAMES_MONTH, ICONS, COLORS } from "../../../store/constants";

import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

const Tasks = () => {

  // użycie lokalizacji w celu zdobycia daty konkretnego dnia
  const location = useLocation();
  const taskDate = location.pathname.slice(16).split('.'); 

  const {blockFlag} = useContext(BlockFlagContext);
  const wrapper = useRef(null);

  useEffect(() => {
    const element = wrapper.current;

    gsap.set(element, {autoAlpha:0})
    
    const lt = gsap.timeline({defaults: {ease:'expo'}});
    lt.to(element, {duration: 1, autoAlpha:1})
  },[location])

  return ( 
    <div className="rounded-3 my-5 mx-1 mx-md-2 shadow" ref={!blockFlag ? wrapper : null}>

      <div style={{backgroundColor: COLORS.blue5, color: 'white'}} className="d-flex rounded">
        <Link className="ms-2 fs-2" to={!blockFlag && '/schedule/tasks/'}> 
          <Button className="mt-2" style={{borderRadius:'9px', borderColor:COLORS.blue3, background:COLORS.blue3}} >
            <FontAwesomeIcon  style={{color:'black'}} icon={ICONS.back}/>
          </Button>
        </Link>
        <p className="ms-3 mt-2 pt-1 fs-5">Tasks</p>
        <p className="ms-auto me-4 mt-2 pt-1 fs-5"> {taskDate[0]} {NAMES_MONTH[taskDate[1] - 1]} {taskDate[2]} </p>
      </div>

      <div style={{background: COLORS.changeOpacity(COLORS.white, 0.7), maxHeight:"60vh", overflowY:'auto', overflowX: 'hidden'}} className='flex-grow-1 border border-3 border-light'>
        <HoursList key={taskDate}/>
      </div>
    </div>
   );
}
 
export default Tasks;