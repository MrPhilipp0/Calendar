import React, { useRef, useState } from 'react';
import TaskInHoursList from './TaskVariants/TaskInHoursList';

import '../../../styles/App.css';
import { Col } from 'react-bootstrap';
import ModalEditTask from '../../Modals/ModalEditTask';
import gsap from 'gsap/all';

const Task = (props) => {

  const [modalDelete, setModalDelete] = useState(false);
  const handleModalDelete = () => setModalDelete(!modalDelete);

  const [modalEdit, setModalEdit] = useState(false);
  const handleModalEdit = () => setModalEdit(!modalEdit);

  
  const [editing, setEditing] = useState(false); //editing flag
  const [shortText, setShortText] = useState(props.shortName);
  const [text, setText] = useState(props.text);
  const [check, setCheck] = useState(props.checkbox);
  const [important, setImportant] = useState(props.important);
  const [category, setCategory] = useState(props.category);
  const [time, setTime] = useState(props.time);
  const [backUp, setBackUp] = useState({shortText, text, important}); //backUp state


  const handleShortTextChange = e => { //change short text
    e.target.value.length < 16 && setShortText(e.target.value);
  }

  const handleTextChange = e => { //change description task
    e.target.value.length < 80 && setText(e.target.value);
  }

  const handleImportantChange = e => { //change priority task
    setImportant(Number(e.target.value));
  }

  const handleCategoryChange = e => { //change category
    setCategory(e.target.value);
  }

  const handleTimeChange = e => { //change time
    setTime(e.target.value);
  }


  
  const editingModFunction = () => { //edit function
    setEditing(!editing);
    props.editingMod(props.id, !editing);
  }

  const handleEditClick = (e) => { //button edit task
    editingModFunction();
    handleModalEdit();
    console.log(props);
    const back = {shortText, text, important, category, time};
    setBackUp(backText => back);
  }

  const handleBackClick = () => { //buttona back editing task
    editingModFunction();
    setShortText(backUp.shortText);
    setText(backUp.text);
    setImportant(backUp.important);
    setCategory(backUp.category);
    setTime(backUp.time);
  }

  const handleSaveClick = () => { //button save
    if(shortText.length === 0) {
      setShortText(backUp.shortText);
    } else {
      editingModFunction();
      props.save(props.id, shortText, text, important, category, time);
    }
  }

  const handleDeleteClick = () => { //button delete task
    deleteTaskAnimation();
    handleModalDelete();
    setTimeout(() => {
      props.delete(props.id);
    },500)
  }

  const handleCheckedClick = e => { //button check task
    setCheck(!check);
    props.check(props.id, e.target.checked);
  }

  const taskWrapper = useRef(null);

  const deleteTaskAnimation = () => {
    gsap.to(taskWrapper.current, {duration: 1, y: 100, autoAlpha: 0, ease:'power4.out'});
  }

  return (
    <Col xl={6} className="mb-1 TASK" ref={taskWrapper}>
      <ModalEditTask 
        modalEdit={modalEdit} handleModalEdit={handleModalEdit}
        shortText={shortText} handleShortTextChange={handleShortTextChange} 
        important={important} handleImportantChange={handleImportantChange} 
        category={category} handleCategoryChange={handleCategoryChange} 
        time={time} handleTimeChange={handleTimeChange} 
        text={text} handleTextChange={handleTextChange}
        id={props.id}
        handleSaveClick={handleSaveClick} handleBackClick={handleBackClick} 
      />
      <TaskInHoursList 
        key={`NoEditingTask_${props.id}`}
        shortText={shortText} text={text} time={time} important={important} check={check} id={props.id} category={category}
        handleDeleteClick={handleDeleteClick} handleCheckedClick={handleCheckedClick} handleEditClick={handleEditClick} 
        modalDelete={modalDelete} handleModalDelete={handleModalDelete}
      />
    </Col>
  )
}
 
export default Task;