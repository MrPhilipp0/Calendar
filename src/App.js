import React, { useState } from 'react';
import Header from './components/Header/Header';
import Importants from './components/LeftSide/Importants';
import Pages from './components/Calendar/Pages';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { BlockFlagContext } from './components/Context/BlockFlagContext';

import { Provider } from 'react-redux';
import store from './store/Store';

import './styles/App.css';
import { Col, Row, Container } from 'react-bootstrap';
import Footer from './components/Footer';

import { faBriefcase, faCarSide, faCartShopping, faCouch, faPersonRunning, faPizzaSlice, faSuitcaseRolling, faPen, faClipboard, faClipboardCheck, faArrowUpRightFromSquare, faUndo, faPlusSquare, faTrashAlt, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import StartSide from './layouts/StartSide';

export const IconsCategory = {
  Shopping: faCartShopping,
  Working: faBriefcase,
  Food: faPizzaSlice,
  'Free Time': faCouch,
  Sport: faPersonRunning,
  Travel: faCarSide,
  Holiday : faSuitcaseRolling,
  Other: faPen,

  noCheck: faClipboard,
  check: faClipboardCheck,

  goToTask: faArrowUpRightFromSquare,
  showTasks: faSortDown,
  hiddenTasks: faSortUp,

  back: faUndo,
  add: faPlusSquare,
  delete: faTrashAlt,
}

export const TasksColors = {
  Shopping: "rgba(155, 93, 229,1)",
  Working: "rgba(198, 92, 205,1)",
  Food: "rgba(241, 91, 181,1)",
  'Free Time': "rgba(248, 160, 123,1)",
  Sport: "rgba(254, 228, 64,1)",
  Travel: "rgba(127, 208, 157,1)",
  Holiday : "rgba(0, 187, 249,1)",
  Other: "rgba(0, 245, 212,1)",

  noCheck: faClipboard,
}


const App = () => {

  const [date, setDate] = useState(DATE); //główny stan zarządzający datą
  const [blockFlag, setBlockFlag] = useState(false);

  const handleSetBlockFlag = (value) => {
    setBlockFlag(value);
  }
  // funkcja zarządzająca przyciskami na głównej stronie kalendarza (przejście w lewo, prawo, today itd)
  const handleClick = e => {
    let month = date.month;
    let year = date.year;

    if (e.target.id === 'left') {
      month -= 1;
      if (month < 0) {
        year -= 1;
        month = 11;
      }
      setDate({
          day: date.day,
          month: month,
          year: year,
      })
    } else if (e.target.id === 'right') {
      month += 1;
      if (month > 11) {
        year += 1;
        month = 0;
      }
      setDate({
        day: date.day,
        month: month,
        year: year,
    })
    } else if (e.target.id === 'currentMonth') {
      setDate({
        day: DATE.day,
        month: DATE.month,
        year: DATE.year,
    })
    }
  }

  const handleSetMonth = (index) => {
    setDate({
      day: date.day,
      month: index,
      year: date.year,
    })
  }
  
  const handleSetYear = (index) => {
    setDate({
      day: date.day,
      month: date.month,
      year: index,
    })
  }


  return (
    // <TaskContext.Provider value={{tasksList, setTasksList}}>
      <div className="d-flex flex-column APP">
        
      
        {/* komponent header */}
        
      
        <Container fluid>
          <Row>
        
            <BlockFlagContext.Provider value={{blockFlag, setBlockFlag}}>
              <Col md={4} lg={3} xxl={3} className="p-0 px-1 ps-sm-2" style={{backgroundColor:"rgba(1, 22, 39, 0.85)"}}>
                <Header />
                <Importants/>
              </Col>
              <Col md={8} lg={{ span:7, offset:1}} xxl={{ span:6, offset:1}} className="p-0">
                <Pages handleClick={handleClick} handleMonth={handleSetMonth} handleYear={handleSetYear} date={date} handleSetBlockFlag={handleSetBlockFlag}/>
              </Col>
            </BlockFlagContext.Provider>
          </Row>
        </Container>
        <Footer/>

      </div>
    // </TaskContext.Provider>
  );
};

// wczytywanie aktualnej daty podczas pierwszego włączenia apki
export const actualDate = new Date();
// const time = actualDate.getTime();
const DATE = {
  day: actualDate.getDate(),
  month: actualDate.getMonth(),
  year: actualDate.getFullYear(),
}

const APPP = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/start-side/" element={<StartSide />} />
          <Route path="*" element={<App/>} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default APPP;