import { Route, Routes } from 'react-router-dom';

import Calendar from './Calendar';
import Tasks from './Tasks/Tasks';
import AddTask from './Tasks/AddTask.js'

const Routing = ({handleClick, date, handleSetBlockFlag, handleChangeDate}) => {

  return (
    <Routes>
      <Route path="/" element={<Calendar click={handleClick} date={date} handleChangeDate={handleChangeDate}/>} />
      <Route path="/calendar/tasks/:id" element={<Tasks/>} />
      <Route path="/calendar/tasks/:id/addTask" element ={<AddTask setBlockFlag={handleSetBlockFlag}/>} />
    </Routes>
  );
}

export default Routing;