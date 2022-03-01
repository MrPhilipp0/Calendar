import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Calendar from './Calendar';
import Tasks from '../Calendar/Tasks/Tasks';
import AddTask from '../Calendar/Tasks/AddTask.js'

const Pages = ({handleClick, date, handleMonth, handleYear, handleSetBlockFlag}) => {

  return (
    <Routes>
      <Route path="/" element={<Calendar click={handleClick} date={date} setMonth={handleMonth} setYear={handleYear}/>} />
      <Route path="/calendar/tasks/:id" element={<Tasks/>} />
      <Route path="/calendar/tasks/:id/addTask" element ={<AddTask setBlockFlag={handleSetBlockFlag}/>} />
      {/*<Route path="/Calendar/tasks/:id/addTask/:id" element ={<AddTask/>} /> */}
    </Routes>
  );
}

export default Pages;