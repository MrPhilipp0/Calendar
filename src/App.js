import React, { useState } from 'react';
import Header from './components/Header/Header';
import Importants from './components/LeftSide/Importants';
import Pages from './components/Calendar/Pages';
import { BrowserRouter as Router } from 'react-router-dom';
import { TaskContext } from './components/Context/TaskToContext';
import { BlockFlagContext } from './components/Context/BlockFlagContext';

import './styles/App.css';
import { Col, Row, Container } from 'react-bootstrap';
import Footer from './components/Footer';

import { faBriefcase, faCarSide, faCartShopping, faCouch, faPersonRunning, faPizzaSlice, faSuitcaseRolling, faPen, faClipboard, faClipboardCheck, faArrowUpRightFromSquare, faUndo, faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const testTasks = [ // pomocnicza tablica z taskami
  {
    idDay: '12.02.2022',
    link: '/Calendar/tasks/12.02.2022',
    weekDay: 'Saturday',
    tasks: [
      {
        id: 0, 
        editing: false,
        checked: true,
        shortName: 'Example 1',
        text: 'Example text 1',
        important: 3,
        category: 'Shopping',
        time: '14:30',
      },
      {
        id: 2, 
        editing: false,
        checked: false,
        shortName: 'Example 3',
        text: 'Example text 3',
        important: 3,
        category: 'Working',
        time: '20:15',
      },
    ]
  },
  {
    idDay:'22.02.2022',
    link: '/Calendar/tasks/22.02.2022',
    weekDay: 'Tuesday',
    tasks:[
      {
        id: 1,
        editing: false,
        checked: false,
        shortName: 'Example 2',
        text: 'Example text 2',
        important: 1,
        category: 'Free Time',
        time: '22:00',
      },
    ]
  }
];

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
  back: faUndo,
  add: faPlusSquare,
  delete: faTrashAlt,
}


const App = () => {

  const [date, setDate] = useState(DATE); //główny stan zarządzający datą
  const [tasksList, setTasksList] = useState(testTasks);
  const [blockFlag, setBlockFlag] = useState(false);

  const handleSetBlockFlag = (value) => {
    setBlockFlag(value);
  }

  // useEffect(()=> {
  //   let editingCounter = 0;
  //   tasksList.forEach(day => {
  //     day.tasks.forEach(task => {
  //       task.editing && editingCounter++;
  //     })
  //   });
  //   editingCounter > 0 ? setBlockFlag(true) : setBlockFlag(false);
  // },[tasksList])

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
    <Router>
      <TaskContext.Provider value={{tasksList, setTasksList}}>
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
      </TaskContext.Provider>
    </Router>
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

export default App;