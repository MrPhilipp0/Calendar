import React, {useState} from 'react';
import Header from './components/Header/Header';
import Importants from './components/LeftSide/Importants';
import Pages from './components/Calendar/Pages';
import { BrowserRouter as Router} from 'react-router-dom';
import { TaskContext } from './components/Context/TaskToContext';

import './styles/App.css';
import { Col, Row, Container } from 'react-bootstrap';

const testTasks = [ // pomocnicza tablica z taskami
  {
    idDay:'12.11.2021',
    tasks:[
      {
        id: 0, 
        checked: true,
        shortName: 'Short name 1',
        text: 'Text 1',
        important: 3,
      },
      {
        id: 2, 
        checked: false,
        shortName: 'Short name 3',
        text: 'Text 3',
        important: 3,
      },
    ]
  },
  {
    idDay:'22.11.2021',
    tasks:[
      {
        id: 1,
        checked: false,
        shortName: 'Short name 2',
        text: 'Text 2',
        important: 1,
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
    } else if (e.target.id === 'today') {
      setDate({
        day: DATE.day,
        month: DATE.month,
        year: DATE.year,
    })
    }
  }

  return (
    <Router>
      <TaskContext.Provider value={{tasksList, setTasksList}}>
        <div className="APP">
        
          {/* komponent header */}
          <Header />
        
        <Container fluid>
          <Row>
            <Col md={4} lg={3} xxl={3} className="p-0 ps-2">
              <Importants/>
            </Col>
            <Col md={8} lg={{ span:7, offset:1}} xxl={{ span:6, offset:1}} className="p-0">
            <Pages click={handleClick} date={date}/>
            </Col>
          </Row>
        </Container>
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