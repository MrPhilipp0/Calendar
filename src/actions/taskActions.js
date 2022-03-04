import { ADD_TASK, DELETE_TASK, UPDATE_TASK, CHECK_TASK } from './taskActionsTypes';

const addTask = task => {
  return {
    type: ADD_TASK,
    task,
  }
};

const deleteTask = id => {
  return {
    type: DELETE_TASK,
    id,
  }
}

const updateTask = (id, task) => {
  return {
    type: UPDATE_TASK,
    id,
    task,
  }
}

const checkTask = (id) => {
  return {
    type: CHECK_TASK,
    id,
  }
}

// const changeDate

export { addTask, deleteTask, updateTask, checkTask };