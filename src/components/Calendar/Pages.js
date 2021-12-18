import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Calendar from './Calendar';
import Tasks from './Tasks';
import AddTask from './AddTask';

const Pages = ({click, date}) => {
  return (
    <Routes>
      <Route path="/" element={<Calendar click={click} date={date}/>} />
      <Route path="/tasks/:id" element={<Tasks/>} />
      <Route path="/tasks/:id/addTask" element ={<AddTask/>} />
    </Routes>
  );
}
 
export default Pages;