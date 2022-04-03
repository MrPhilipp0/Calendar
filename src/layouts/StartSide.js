import React, { useEffect, useRef } from 'react';
import { ReactComponent as HelloSVG } from '../SVG/hello.svg';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { MOBILE, COLORS } from '../store/constants';

import gsap from 'gsap';
import '../styles/App.css';

const buttonStyle = {borderRadius:'50px', borderColor:COLORS.blue5, backgroundColor:COLORS.blue5};

const StartSide = () => {

  const wrapperSVG = useRef(null);
  let wrapperButtons = useRef(null);

  useEffect(() => {
    const [elements] = wrapperSVG.current.children;
    const woman = elements.getElementById('woman');
    const man = elements.getElementById('man');
    const checks = elements.querySelectorAll('.check');
    const days = elements.querySelectorAll('.day');
    const calendar = elements.getElementById('kalendarz');
    
    const buttons = wrapperButtons.current.children;

    const tl = gsap.timeline({defaults: {ease: 'power4.in'}, yoyo: true});

    tl.addLabel('myLabel')
      .fromTo(calendar, {autoAlpha: 0}, {autoAlpha: 1, duration: 1})
      .fromTo([...days], {scale:0}, {scale:1, stagger: {amount: .4, from:'edges'}, duration: 1}, 'myLabel')
      .fromTo(man, {x: '-=1000'}, {x: '+=1000', duration: 2, ease:'expo'},  'myLabel')
      .fromTo(woman, {x: '+=1000'}, {x: '-=1000', duration: 2, ease:'expo'}, 'myLabel')
      .fromTo([...checks], {y: '-=1000'}, {y:'+=1000', stagger: .1, duration: 3}, 'myLabel -=3.5')
      .to([...checks], {scale: 1.2, duration: .5}, 'myLabel +=1.2')
      .to([...checks], {scale: 1, duration: .3})
      .fromTo([...buttons], {y: '100%', opacity: 0}, {y: '0%', opacity: 1, duration: .3, ease:'power3.in'}, )
  },[])


  return (
    <div className="startSide">

      {/* Header */}
      <div className="py-3 mt-0 mb-auto" style={{ backgroundColor:'#014F86', color:'#fff0f3'}}>
        <div className="d-flex align-items-center ms-4 ms-md-5">
          <label className="h1 fw-bolder m-0" style={{color:'#e0fbfc'}}> Schedule </label>
        </div>
      </div>

      {/* SVG */}
      <div className="startSideSVGWrapper my-3 shadow-lg">
        <div ref={wrapperSVG} style={{display:'flex', justifyContent:'center'}}>
          <HelloSVG className={MOBILE ? 'startSideSVGMobile' : 'startSideSVGDesktop'}/>
        </div>
        <div ref={wrapperButtons} className="d-flex flex-column position-absolute align-items-center" style={{top:'65%'}}>
          <Button style={{color:COLORS.dark1, ...buttonStyle}} size='lg' className="mb-4 p-sm-3 px-sm-5 display-5 shadow signInBtn" disabled> Sign In </Button>
          <Link to="tasks" className="display-5 continueBtn" style={{opacity:'0'}}>
            <Button style={buttonStyle} className="p-sm-3 px-sm-5 shadow" size='lg'> Continue without login </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
 
export default StartSide;