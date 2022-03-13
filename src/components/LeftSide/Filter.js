import { useEffect, useRef, useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';

import gsap from 'gsap';
import '../../styles/App.css';

const Filter = ({setFilter, categories, animationMoveFromLeft, animationMoveToLeft}) => {

  const [switchAllCategories, setSwitchAllCategories] = useState(true);
  const [categoryCheckboxes, setCategoryCheckboxes] = useState(categories);
  const [verifiedCheckboxes, setVerifiedCheckboxes] = useState('All');
  const [timeCheckboxes, setTimeCheckboxes] = useState('AllTime');
  const [isActive, setIsActive] = useState(false); //visibility

  const handleIsActive = () => {
    isActive ? animationMoveFromLeft() : animationMoveToLeft();
    setIsActive(!isActive);
  };

  const handleCheckboxChange = e => {
    const target = e.target;
    let item = {};
    if (target.classList.contains('category')) {
      const arrayCategories = [...categoryCheckboxes];
      const index = arrayCategories.findIndex(item => item.name === target.value);
      item = arrayCategories[index];
      item.status = !item.status;
      arrayCategories.some(category => !category.status) && handleChangeSwitchAllCategories('Some category not active');
      arrayCategories.every(category => category.status) && handleChangeSwitchAllCategories('All categories are active');
      setCategoryCheckboxes(arrayCategories);
    } else if (target.classList.contains('verified')) {
      setVerifiedCheckboxes(target.value);
      item = {
        name: target.value,
        type: 'verified',
      }
    } else {
      setTimeCheckboxes(target.value);
      item = {
        name: target.value,
        type: 'time',
      }
    }
  }

  // switch all categories function
  const handleChangeSwitchAllCategories = (prop) => {
    if (prop === 'Some category not active') {
      setSwitchAllCategories(false);
    } else if (prop === 'All categories are active') {
      setSwitchAllCategories(true);
    } else {
      const status = !switchAllCategories;
      setSwitchAllCategories(status);
      const arrayCategories = [...categoryCheckboxes];
      status ? arrayCategories.map(category => category.status = true) : arrayCategories.map(category => category.status = false)
      setCategoryCheckboxes(arrayCategories);
    }
  }

  // updating filter
  useEffect(() => {
    const filterObject = {
      categories: categoryCheckboxes,
      verified: verifiedCheckboxes,
      time: timeCheckboxes,
    };
    setFilter(filterObject);
  }, [categoryCheckboxes, verifiedCheckboxes, timeCheckboxes, setFilter]);


  // GSAP Animations
  const wrapper = useRef(null);

  useEffect(() => {
    const menu = wrapper.current;
    isActive && gsap.fromTo(menu, {opacity: 0}, {duration: .8, opacity: 1});
  },[isActive])

  return (
    <Dropdown ref={wrapper} className="d-grid static" autoClose="outside" onToggle={handleIsActive} drop={isActive ? 'up' : 'down'}  x-placement="bottom-end">

      {/* Button filter */}
      <Dropdown.Toggle id="dropdown-autoclose-outside" >
        Filter
      </Dropdown.Toggle>
      
      <Dropdown.Menu className="w-100 align-items-center" ref={wrapper}>
        <div className="d-inlineblock mx-2 ">
          <Row className="justify-content-center">

            {/* CATEGORIES */}
            <Col className="d-inline border-end">
              <p className="d-flex justify-content-center"><b>Categories</b></p>

              {/* Categories -> Switch all categories */}
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={switchAllCategories} onChange={handleChangeSwitchAllCategories}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">All</label>
              </div>

              {/* Categories -> Single categories */}
              {categoryCheckboxes.map((category, index) => (
                <div key={index} className="input-group-text py-1">
                  <input className="form-check-input mt-0 category" type="checkbox" id={category.name} value={category.name} checked={category.status} aria-label="Checkbox for following text input" onChange={handleCheckboxChange}/>
                  <label htmlFor={category.name}>{'\xa0'} {category.name} </label>
                </div>
              ))}
            </Col>

                
            <Col className="d-flex flex-column justify-content-between">

              {/* VERIFICATION */}
              <div>
                <p className="d-flex justify-content-center"><b>Verification</b></p>

                {/* Verification -> All */}
                <div key={'check0'} className="form-check">
                  <input className="form-check-input mt-0 verified" type="radio" value='All' name="Verified radio" id="All" defaultChecked onChange={handleCheckboxChange}/>
                  <label className="form-check-label" htmlFor="All">{'\xa0'} All </label>
                </div>

                {/* Verification -> Verified */}
                <div key={'check1'} className="form-check">
                  <input className="form-check-input mt-0 verified" type="radio" value='Check' name="Verified radio" id="Verified" onChange={handleCheckboxChange}/>
                  <label className="form-check-label" htmlFor="Verified">{'\xa0'} Done </label>
                </div>

                {/* Verification -> NoVerified */}
                <div key={'check2'} className="form-check">
                  <input className="form-check-input mt-0 verified" type="radio" value='noCheck' name="Verified radio" id="NoVerified" onChange={handleCheckboxChange}/>
                  <label className="form-check-label" htmlFor="NoVerified">{'\xa0'} Not done </label>
                </div>
              </div>
              
              {/* TIME */}
              <div>
                <p className="d-flex justify-content-center"> <b> Last / Actual tasks </b></p>

                {/* Time -> Past */}
                <div key={'time0'} className="form-check">
                  <input className="form-check-input mt-0 time" type="radio" value='Past' name="Time radio" id="Past" onChange={handleCheckboxChange}/>
                  <label className="form-check-label" htmlFor="Past">{'\xa0'} Past </label>
                </div>

                {/* Time -> All */}
                <div key={'time1'} className="form-check">
                  <input className="form-check-input mt-0 time" type="radio" value='AllTime' name="Time radio" id="AllTime" defaultChecked onChange={handleCheckboxChange}/>
                  <label className="form-check-label" htmlFor="AllTime">{'\xa0'} All tasks </label>
                </div>

                {/* Time -> Future */}
                <div key={'time2'} className="form-check">
                  <input className="form-check-input mt-0 time" type="radio" value='Future' name="Time radio" id="Future" onChange={handleCheckboxChange}/>
                  <label className="form-check-label" htmlFor="Future">{'\xa0'} Future </label>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
 
export default Filter;