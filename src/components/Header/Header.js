import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Timer from './Timer';

import { COLORS } from '../../store/constants';

const Header = () => {

  let headerWrapper = useRef(null);
  let titleWrapper = useRef(null);

  // GSAP Animation
  useEffect(() => {
    const [header] = headerWrapper.current.children;
    const [...title] = titleWrapper.current.children;

    gsap.set(header, {y:'-100%'});
    gsap.to(header, {duration: 3, y: '0%', ease: 'expo'}, '+=.5');

    const tl = gsap.timeline({repeat: -1});
      tl.fromTo([title],{duration:1, stagger:.3, ease: 'power3.out', color:COLORS.blue2}, {duration: 1, stagger:.3, ease: 'power3.in', color:COLORS.pink1})
        .to([title], {duration:1, delay:-1.7, stagger:.3, ease: 'power3.out', color:COLORS.blue2});
  },[])

  return (
    <div ref={headerWrapper} id="header">
      <header>
        <nav className="navbar d-flex justify-content-between ms-2 mt-2" style={{color: 'white'}}>
          <div ref={titleWrapper} className="d-flex" >
            {[...'Schedule'].map((letter, index) => <p key={index} className="h1 fw-bold">{letter}</p>)}
          </div>
          <Timer />
        </nav>
      </header>
      <div style={{color:'white'}} className="align-items-center d-flex flex-column my-3">
        <p style={{letterSpacing: '2px'}} className="h4 mb-0"> Filip Kniwel </p>
        <p style={{letterSpacing:'1px', fontSize:'small'}} className="fw-lighter"> filipkni14@gmail.com</p>
      </div>
    </div>
  );
}
 
export default Header;