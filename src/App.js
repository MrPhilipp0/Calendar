import React, {useState} from 'react';
import Header from './components/Header/Header';
import Importants from './components/LeftSide/Importants';
import Pages from './components/Calendar/Pages';
import { BrowserRouter as Router} from 'react-router-dom';
import { TaskContext } from './components/Context/TaskToContext';

import './styles/App.css';
import { Col, Row, Container } from 'react-bootstrap';
import Footer from './components/Footer';

const testTasks = [ // pomocnicza tablica z taskami
  {
    idDay:'12.0.2022',
    tasks:[
      {
        id: 0, 
        editing: false,
        checked: true,
        shortName: 'Short name 1',
        text: 'Text 1',
        important: 3,
        category: 'Shopping',
        time: '14:30',
      },
      {
        id: 2, 
        editing: false,
        checked: false,
        shortName: 'Short name 3',
        text: 'Text 3',
        important: 3,
        category: 'Working',
        time: '20:15',
      },
    ]
  },
  {
    idDay:'22.0.2022',
    tasks:[
      {
        id: 1,
        editing: false,
        checked: false,
        shortName: 'Short name 2',
        text: 'Text 2',
        important: 1,
        category: 'Free Time',
        time: '22:00',
      },
    ]
  }
];


const App = () => {
  
  const [date, setDate] = useState(DATE); //główny stan zarządzający datą
  const [tasksList, setTasksList] = useState(testTasks);

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
          <Header />
        
          <Container fluid>
            <Row>
              <Col md={4} lg={3} xxl={3} className="p-0 ps-sm-2">
                <Importants/>
              </Col>
              <Col md={8} lg={{ span:7, offset:1}} xxl={{ span:6, offset:1}} className="p-0">
                <Pages handleClick={handleClick} handleMonth={handleSetMonth} handleYear={handleSetYear} date={date}/>
              </Col>
            </Row>
          </Container>

          <Footer/>

        </div>
      </TaskContext.Provider>
    </Router>
  );
};

// zczytywanie aktualnej daty podczas pierwszego włączenia apki
const actualDate = new Date();
// const time = actualDate.getTime();
const DATE = {
  day: actualDate.getDate(),
  month: actualDate.getMonth(),
  year: actualDate.getFullYear(),
}

export default App;