import React, { useEffect, useRef, useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import '../../styles/App.css';
import gsap from 'gsap';

const Filter = ({setFilter, categories, animation}) => {

  const [switchAllCategories, setSwitchAllCategories] = useState(true);
  const [categoryCheckboxes, setCategoryCheckboxes] = useState(categories);
  const [verifiedCheckboxes, setVerifiedCheckboxes] = useState('All');
  const [timeCheckboxes, setTimeCheckboxes] = useState('AllTime');
  const [isActive, setIsActive] = useState(false);

  const handleIsActive = () => {
    isActive && animation(0);
    setIsActive(!isActive);
  };

  const handleCheckboxChange = e => {
    const checkbox = e.target;
    let item = {};
    if (checkbox.classList.contains('category')) {
      const arrayCategories = [...categoryCheckboxes];
      const index = arrayCategories.findIndex(item => item.name === checkbox.value);
      item = arrayCategories[index];
      item.status = !item.status;
      arrayCategories.some(category => !category.status) && handleChangeSwitchAllCategories('Some category not active');
      arrayCategories.every(category => category.status) && handleChangeSwitchAllCategories('All categories are active');
      setCategoryCheckboxes(arrayCategories);
    } else if (checkbox.classList.contains('verified')) {
      setVerifiedCheckboxes(checkbox.value);
      item = {
        name: checkbox.value,
        type: 'verified',
      }
    } else {
      setTimeCheckboxes(checkbox.value);
      item = {
        name: checkbox.value,
        type: 'time',
      }
    }
  }

  // switch all categories
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

  //dropdown-menu
  const wrapper = useRef(null);

  // const animationMenu = () => {
  //   const menu = wrapper.current.querySelector('.dropdown-menu');
  //   console.log(menu);
  // }

  useEffect(() => {
    const menu = wrapper.current;
    isActive && gsap.fromTo(menu, {opacity: 0}, {duration: .8, opacity: 1});
    // !isActive && gsap.fromTo(menu, {opacity: 1}, {duration: .8, opacity: 0});

    // console.log(menu);
  },[isActive])

  return (
  <Dropdown ref={wrapper} className="d-grid static" autoClose="outside" onToggle={handleIsActive} drop={isActive ? 'up' : 'down'}  x-placement="bottom-end">
    <Dropdown.Toggle id="dropdown-autoclose-outside" >
      Filter
    </Dropdown.Toggle>

    <Dropdown.Menu className="w-100 align-items-center" ref={wrapper}>
      <div className="d-inlineblock mx-2 ">
        <Row className="justify-content-center">

          <Col className="d-inline border-end">
            <p className="d-flex justify-content-center">Categories</p>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={switchAllCategories} onChange={handleChangeSwitchAllCategories}/>
              <label className="form-check-label" htmlFor="flexSwitchCheckChecked">All</label>
            </div>
            {categoryCheckboxes.map((category, index) => (
              <div key={index} className="input-group-text py-1">
                <input className="form-check-input mt-0 category" type="checkbox" value={category.name} checked={category.status} aria-label="Checkbox for following text input" onChange={handleCheckboxChange}/>
                <label>{'\xa0'} {category.name} </label>
              </div>
            ))}
          </Col>


          <Col className="d-flex flex-column justify-content-between">
            <div>
              <p className="d-flex justify-content-center">Verification</p>
              <div key={'check0'} className="form-check">
                <input className="form-check-input mt-0 verified" type="radio" value='All' name="Verified radio" id="All" defaultChecked onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="All">{'\xa0'} All </label>
              </div>
              <div key={'check1'} className="form-check">
                <input className="form-check-input mt-0 verified" type="radio" value='Check' name="Verified radio" id="Verified" onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Verified">{'\xa0'} Done </label>
              </div>
              <div key={'check2'} className="form-check">
                <input className="form-check-input mt-0 verified" type="radio" value='noCheck' name="Verified radio" id="NoVerified" onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="NoVerified">{'\xa0'} Not done </label>
              </div>
            </div>

            <div>
              <p className="d-flex justify-content-center">Last / Actual tasks</p>
              <div key={'time0'} className="form-check">
                <input className="form-check-input mt-0 time" type="radio" value='Past' name="Time radio" id="Past" onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Past">{'\xa0'} Past </label>
              </div>
              <div key={'time1'} className="form-check">
                <input className="form-check-input mt-0 time" type="radio" value='AllTime' name="Time radio" id="AllTime" defaultChecked onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="AllTime">{'\xa0'} All tasks </label>
              </div>
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