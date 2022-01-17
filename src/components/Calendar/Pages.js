import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Calendar from './Calendar';
import Tasks from '../Calendar/Tasks/Tasks';
import AddTask from '../Calendar/Tasks/AddTask.js'

const Pages = ({handleClick, date, handleMonth, handleYear}) => {
  return (
    <Routes>
      <Route path="/Calendar/" element={<Calendar click={handleClick} date={date} setMonth={handleMonth} setYear={handleYear}/>} />
      <Route path="/Calendar/tasks/:id" element={<Tasks/>} />
      <Route path="/Calendar/tasks/:id/addTask" element ={<AddTask/>} />
    </Routes>
  );
}

export default Pages;