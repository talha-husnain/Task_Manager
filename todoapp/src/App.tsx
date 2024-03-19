import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './pages/todomain';
import SignUp from './pages/signup';
import LogIn from './pages/login';



const App: React.FC = () => {
  return (
    <Router>
      <Routes> {/* Wrap all Route components in a Routes component */}
        <Route path="/" element={<SignUp />} />

        <Route path="/todo" element={<Todo />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
};

export default App;
