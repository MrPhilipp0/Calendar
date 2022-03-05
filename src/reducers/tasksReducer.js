import { ADD_TASK, DELETE_TASK, UPDATE_TASK, CHECK_TASK } from '../actions/taskActionsTypes';

const testState = [
  {
    category: "Shopping",
    check: false,
    id: 0,
    idDay: "17.03.2022",
    link: "/schedule/tasks/17.03.2022",
    name: "ExampleTask1",
    priority: "3",
    text: "Example1",
    time: "04:00",
    weekDay: "Thursday",
  },
  {
    category: "Holiday",
    check: false,
    id: 1,
    idDay: "17.03.2022",
    link: "/schedule/tasks/17.03.2022",
    name: "ExampleTask2",
    priority: 1,
    text: "Example2",
    time: "09:00",
    weekDay: "Thursday",
  },
  {
    category: "Free Time",
    check: false,
    id: 2,
    idDay: "17.03.2022",
    link: "/schedule/tasks/17.03.2022",
    name: "ExampleTask3",
    priority: "2",
    text: "Example3",
    time: "06:00",
    weekDay: "Thursday",
  },
  {
    category: "Shopping",
    check: false,
    id: 3,
    idDay: "23.03.2022",
    link: "/schedule/tasks/23.03.2022",
    name: "ExampleTask4",
    priority: 1,
    text: "Example4",
    time: "04:00",
    weekDay: "Wednesday",
  },
  {
    category: "Other",
    check: false,
    id: 4,
    idDay: "30.03.2022",
    link: "/schedule/tasks/30.03.2022",
    name: "ExampleTask5",
    priority: 1,
    text: "Example5",
    time: "02:00",
    weekDay: "Wednesday",
  },
  {
    category: "Free Time",
    check: false,
    id: 5,
    idDay: "27.03.2022",
    link: "/schedule/tasks/27.03.2022",
    name: "ExampleTask6",
    priority: 1,
    text: "Example6",
    time: "02:00",
    weekDay: "Sunday",
  },
];

let taskCounter = testState.length;

const initialState = {
  tasks: testState,
}

const TasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const newTask = { id: ++taskCounter, check: false,  ...action.task};
      return {
        tasks: [...state.tasks, newTask],
      }
    case DELETE_TASK:
      return {
        tasks: state.tasks.filter(task => task.id !== action.id),
      }  
    case UPDATE_TASK:
      const index = state.tasks.findIndex(task => task.id === action.id);
      const tasks = [...state.tasks];
      tasks[index] = {...action.task};
      return {
        tasks: tasks,
      }
    case CHECK_TASK:
      let tasks2 = [...state.tasks];
      tasks2 = tasks2.map(task => {
        task.check = task.id === action.id ? !task.check : task.check;
        return task;
      })
      return {
        tasks: tasks2,
      }
    default:
      break;
  }
  return state;
}

export default TasksReducer;