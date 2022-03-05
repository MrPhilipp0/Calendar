import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import Schedule from './layouts/Schedule';
import StartSide from './layouts/StartSide';
import store from './store/Store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/start-side/" element={<StartSide />} />
          <Route path="*" element={<Schedule />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;