import { faBriefcase, faCarSide, faCartShopping, faCouch, faPersonRunning, faPizzaSlice, faSuitcaseRolling, faPen, faClipboard, faArrowUpRightFromSquare, faUndo, faPlus, faTrashAlt, faSortDown, faSortUp, faCircleCheck, faArrowLeft, faArrowRight, faCalendarDays, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck, faCircleXmark as faCircleXmarkRegular } from '@fortawesome/free-regular-svg-icons';

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

  noCheck: faCircleXmarkRegular,
  check: faCircleCheck,

  goToTask: faArrowUpRightFromSquare,
  showTasks: faSortDown,
  hiddenTasks: faSortUp,

  back: faUndo,
  add: faPlus,
  delete: faTrashAlt,

  leftArrow: faArrowLeft,
  rightArrow: faArrowRight,
  currentMonth: faCalendarCheck,
  month: faCalendarDays,
  year: faCalendarDay,
};

const CATEGORIES = ["Shopping", "Working", "Food", "Free Time", "Sport", "Travel", "Holiday", "Other"];

const TASKS_COLORS = {
  Shopping: "rgb(251, 248, 204)",
  Working: "rgb(253, 228, 207)",
  Food: "rgb(241, 192, 232)",
  'Free Time': "rgb(207, 186, 240)",
  Sport: "rgb(163, 196, 243)",
  Travel: "rgb(144, 219, 244)",
  Holiday : "rgb(152, 245, 225)",
  Other: "rgb(185, 251, 192)",

  noCheck: faClipboard,
};

const NAMES_MONTH = ['January', 'February', 'March', 'April', 'May', 'June','July','August', 'September', 'October', 'November', 'December'];

const NAMES_WEEKDAY = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

const COLORS = {
  blue1: 'rgba(235, 243, 247, 1)',
  blue2: 'rgba(169, 214, 229, 1)',
  blue3: 'rgba(73, 180, 255, 1)',
  blue4: 'rgba(44, 125, 160, 1)',
  blue5: 'rgba(1, 79, 134, 1)',

  pink1: 'rgba(247, 230, 233, 1)',
  pink2: 'rgba(247, 213, 226, 1)',
  pink3: 'rgba(255, 179, 193, 1)',
  pink4: 'rgba(247, 106, 171, 1)',

  green1: 'rgba(194, 214, 167, 1)',
  green2: 'rgba(122, 145, 83, 1)',

  dark1: 'rgba(1, 22, 39, 1)',

  white: 'rgba(255, 255, 255, 1)',

  changeOpacity: function(color, value) {
    return color.slice(0, color.length-2) + value;
  }
}

export {ACTUAL_DATE, ICONS, TASKS_COLORS, NAMES_MONTH, NAMES_WEEKDAY, DEFAULT_FILTER_CATEGORIES, DEFAULT_FILTER_OBJECT, MOBILE, CATEGORIES, COLORS}