import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Register from "./Components/Register/Register"; 
import Login from "./Components/Login/Login";
import ToDoList from "./Components/ToDoList/ToDoList";
import './App.css';

const App = () => {
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleRegister = (user) => {
    setRegisteredUser(user);
  };

  return (
    <Router>
      <Routes>
        
        <Route
          path="/"
          element={registeredUser ? <Navigate to="/login" /> : <Register onRegister={handleRegister} />}
        />
        
        <Route
          path="/login"
          element={registeredUser ? <Login registeredUser={registeredUser} /> : <Navigate to="/" replace/>}
        />
 
        <Route
          path="/todo"
          element={registeredUser ? <ToDoList /> : <Navigate to="/login" replace />}
        />

      {/* Access the ToDo component only  */}
        <Route
          path="/todos"
          element={<ToDoList />}
        />

        </Routes>
    </Router>
    
  );
};

export default App;

