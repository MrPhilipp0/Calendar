import { useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import YourTasks from '../components/LeftSide/YourTasks';
import Routing from '../components/Calendar/Routing';
import { ACTUAL_DATE, COLORS } from '../store/constants';
import { BlockFlagContext } from '../components/Context/BlockFlagContext';

import '../styles/App.css';
import { Col, Row, Container } from 'react-bootstrap';

const DATE = {
  day: ACTUAL_DATE.getDate(),
  month: ACTUAL_DATE.getMonth(),
  year: ACTUAL_DATE.getFullYear(),
}

const Schedule = () => {

  const [date, setDate] = useState(DATE); //główny stan zarządzający datą
  const [blockFlag, setBlockFlag] = useState(false);

  // blokowanie apki (głównie przy dodawaniu nowego taska);
  const handleSetBlockFlag = value => setBlockFlag(value);

  // funkcje zarządzająca przyciskami na głównej stronie kalendarza (przejście w lewo, prawo, today, zmiana roku i miesiaca)
  const handleClick = e => {
    let newDate = JSON.parse(JSON.stringify(date));
    const target = e.target.id;

    switch (target) {
      case 'left':
        newDate.month--;
        break;
      case 'right':
        newDate.month +=1;
        break;
      case 'currentMonth':
        newDate = DATE;
        break
      default:
        break;
    }

    if (newDate.month < 0) {
      newDate.month = 11;
      newDate.year -=1;
    } else if (newDate.month > 11) {
      newDate.month = 0;
      newDate.year +=1;
    }

    setDate(newDate);
  }

  const handleChangeDate = (type, index) => {
    setDate({
      ...date,
      [type]: index,
    });
  }


  return (
    <div className="d-flex flex-column APP">
      <Container fluid>
        <Row>
          <BlockFlagContext.Provider value={{blockFlag, setBlockFlag}}>
            <Col md={4} lg={3} xxl={3} className="p-0 px-1 ps-sm-2" style={{backgroundColor: COLORS.changeOpacity(COLORS.dark1, .85)}}>
              <Header />
              <YourTasks/>
            </Col>
            <Col md={8} lg={{ span:7, offset:1}} xxl={{ span:6, offset:1}} className="p-0">
              <Routing 
                handleClick={handleClick} 
                handleChangeDate={handleChangeDate} 
                date={date} 
                handleSetBlockFlag={handleSetBlockFlag}
              />
            </Col>
          </BlockFlagContext.Provider>
        </Row>
      </Container>

      <Footer/>
    </div>
  );
};

export default Schedule;