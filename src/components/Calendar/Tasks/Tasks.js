import { useContext, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { BlockFlagContext } from '../../Context/BlockFlagContext';
import HoursList from './HoursList';
import { NAMES_MONTH, ICONS } from "../../../store/constants";

import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <div className="rounded-3 my-2 mx-1 mx-md-2" ref={!blockFlag ? wrapper : null}>

      <div style={{ backgroundColor:'#014F86', color:'#fff0f3'}} className="d-flex rounded">
        <Link to={!blockFlag && '/'}> 
          <FontAwesomeIcon className="fs-1 my-3 ms-3" style={{color:'black'}} icon={ICONS.back}/>
        </Link>
        <p className="my-3 fs-3 fw-bold ms-4">TASKS</p>
        <p className="my-3 fs-3 fw-light ms-auto me-4"> {taskDate[0]} {NAMES_MONTH[taskDate[1] - 1]} {taskDate[2]} </p>
      </div>

      <div style={{background:'rgba(255, 255, 255, 0.4)', maxHeight:"60vh", overflowY:'auto', overflowX: 'hidden'}} className='flex-grow-1 border border-3 border-light'>
        <HoursList key={taskDate}/>
      </div>
    </div>
   );
}
 
export default Tasks;