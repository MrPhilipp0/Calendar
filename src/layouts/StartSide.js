import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { ReactComponent as HelloSVG } from '../SVG/hello.svg';
import gsap from 'gsap';
import '../styles/App.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const StartSide = () => {

  const wrapper = useRef(null);

  // useEffect(() => {
  //   const [elements] = wrapper.current.children;
  //   const woman = elements.getElementById('woman');
  //   const womanCheck = elements.getElementById('womanCheck');
  //   const man = elements.getElementById('man');
  //   const checks = elements.querySelectorAll('.check');
  //   const days = elements.querySelectorAll('.day');
  //   const calendar = elements.getElementById('calendar');

  //   const tl = gsap.timeline({defaults: {ease: 'power4.inOut'}});

  //   tl.fromTo([...checks], {x:'-10000%'}, {x:'0%', stagger: .1, duration: 3});
  // },[])


  return (
    <div className="startSide">

      {/* Header */}
      <div className="py-3 mt-0 mb-auto" style={{ backgroundColor:'#014F86', color:'#fff0f3'}}>
        <div className="col-md-4 d-flex align-items-center ms-5">
          <label className="h1 fw-bolder m-0" style={{color:'#e0fbfc'}}> Schedule </label>
        </div>
      </div>

      {/* SVG */}
      <div className="startSideSVGWrapper">
        <div ref={wrapper} style={{display:'flex', justifyContent:'center'}}>
          <HelloSVG />
        </div>
        <Button variant="dark" size='lg' className="p-sm-3 px-sm-5 display-5 position-absolute align-items-center" style={{marginTop:'40vh'}} disabled> SIGN IN </Button>
        <Link to="tasks" className="display-5 position-absolute align-items-center"  style={{marginTop:'60vh'}}>
          <Button className="p-sm-3 px-sm-5" variant="dark" size='lg'> CONTINUE WITHOUT LOGIN </Button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
 
export default StartSide;