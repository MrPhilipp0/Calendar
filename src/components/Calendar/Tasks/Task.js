import React, { useRef, useState } from 'react';
import TaskInHoursList from './TaskVariants/TaskInHoursList';

import '../../../styles/App.css';
import { Col } from 'react-bootstrap';
import ModalEditTask from '../../Modals/ModalEditTask';
import gsap from 'gsap/all';

import { connect } from 'react-redux';
import { deleteTask, checkTask } from '../../../actions/taskActions';

const Task = (props) => {
  
  const [modalDelete, setModalDelete] = useState(false);
  const handleModalDelete = () => setModalDelete(!modalDelete);

  const [modalEdit, setModalEdit] = useState(false);
  const handleModalEdit = () => setModalEdit(!modalEdit);

  const task = props.tasksCurrent.filter(task => task.id === props.id)[0];

 
  const handleDeleteClick = () => { //button delete task
    deleteTaskAnimation();
    handleModalDelete();
    setTimeout(() => {
      props.deleteTaskFromState(task.id);
    },500)
  }

  const handleCheckClick = () => { //button check task
    props.checkTaskInState(task.id);
  }

  const taskWrapper = useRef(null);

  const deleteTaskAnimation = () => {
    gsap.to(taskWrapper.current, {duration: 1, y: 100, autoAlpha: 0, ease:'power4.out'});
  }

  return (
    <Col xl={6} className="mb-1 TASK" ref={taskWrapper}>
      <ModalEditTask 
        modalEdit={modalEdit} handleModalEdit={handleModalEdit}
        task={task}
        />
      <TaskInHoursList 
        key={`NoEditingTask_${props.id}`} task={task} 
        deleteTask={handleDeleteClick} checkTask={handleCheckClick}
        modalDelete={modalDelete} handleModalDelete={handleModalDelete}
        handleModalEdit={handleModalEdit}
        />
    </Col>
  )
}

const mapStateToProps = state => {
  return {
    tasksCurrent: state.TasksReducer.tasks,
  };
} 

const mapDispatchToProps = dispatch => {
  return {
    deleteTaskFromState : id => {
      dispatch(deleteTask(id));
    }, 
    checkTaskInState : id => {
      dispatch(checkTask(id));
    }
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Task);