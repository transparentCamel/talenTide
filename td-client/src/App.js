import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './screens/Landing';

import LogIn from './screens/LogIn';
import Dashboard from './screens/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
