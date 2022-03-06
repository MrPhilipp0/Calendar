import { faBriefcase, faCarSide, faCartShopping, faCouch, faPersonRunning, faPizzaSlice, faSuitcaseRolling, faPen, faClipboard, faClipboardCheck, faArrowUpRightFromSquare, faUndo, faPlusSquare, faTrashAlt, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

const ACTUAL_DATE = new Date();

const ICONS = {
  Shopping: faCartShopping,
  Working: faBriefcase,
  Food: faPizzaSlice,
  'Free Time': faCouch,
  Sport: faPersonRunning,
  Travel: faCarSide,
  Holiday : faSuitcaseRolling,
  Other: faPen,

  noCheck: faClipboard,
  check: faClipboardCheck,

  goToTask: faArrowUpRightFromSquare,
  showTasks: faSortDown,
  hiddenTasks: faSortUp,

  back: faUndo,
  add: faPlusSquare,
  delete: faTrashAlt,

  leftArrow: <i id="left" className="bi bi-arrow-left px-sm-4 p-2"></i>,
  rightArrow: <i id="right" className="bi bi-arrow-right px-sm-4 p-2"></i>,
  currentMonth: <i id="currentMonth" className="bi bi-calendar2-check p-3"></i>,
  month: <i className="bi bi-calendar-month "></i>,
  year: <i className="bi bi-calendar3 "></i>,
};

const CATEGORIES = ["Shopping", "Working", "Food", "Free Time", "Sport", "Travel", "Holiday", "Other"];

const TASKS_COLORS = {
  Shopping: "rgba(155, 93, 229,1)",
  Working: "rgba(198, 92, 205,1)",
  Food: "rgba(241, 91, 181,1)",
  'Free Time': "rgba(248, 160, 123,1)",
  Sport: "rgba(254, 228, 64,1)",
  Travel: "rgba(127, 208, 157,1)",
  Holiday : "rgba(0, 187, 249,1)",
  Other: "rgba(0, 245, 212,1)",

  noCheck: faClipboard,
};

const NAMES_MONTH = ['January', 'February', 'March', 'April', 'May', 'June','July','August', 'September', 'October', 'November', 'December'];

const NAMES_WEEKDAY = ['Mon', 'Thu', 'Wed', 'Thr', 'Fr', 'Sat', 'Sun'];

const DEFAULT_FILTER_CATEGORIES = [
  {
    name: 'Shopping',
    status: true,
    type: 'category',
  },
  {
    name: 'Working',
    status: true,
    type: 'category',
  },
  {
    name:'Food',
    status: true,
    type: 'category',
  },
  {
    name: 'Free Time',
    status: true,
    type: 'category',
  },
  {
    name: 'Sport',
    status: true,
    type: 'category',
  },
  {
    name: 'Travel',
    status: true,
    type: 'category', 
  },
  {
    name: 'Holiday',
    status: true,
    type: 'category',
  },
  {
    name: 'Other',
    status: true,
    type: 'category',
  },
];

const DEFAULT_FILTER_OBJECT = {
  categories: DEFAULT_FILTER_CATEGORIES,
  verified: 'All',
  time: 'AllTime',
}

const MOBILE = document.body.clientWidth < 768 ? true : false;

export {ACTUAL_DATE, ICONS, TASKS_COLORS, NAMES_MONTH, NAMES_WEEKDAY, DEFAULT_FILTER_CATEGORIES, DEFAULT_FILTER_OBJECT, MOBILE, CATEGORIES}