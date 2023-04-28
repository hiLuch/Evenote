import React, { useContext } from 'react';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Registration from './components/User/registration/Registration';
import Login from './components/User/login/Login';
import ProtectedRouter from './components/ProtecderRouter/ProtectedRouter';
import { ContextAll } from './context/context';

function App(): JSX.Element {
  const { user }: any = useContext(ContextAll);

  return (
    <div className="App">
      <header className="header">
        <div className="userEnter"></div>

        <Navbar />
      </header>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRouter authUser={true} user={user} redirectTo={'/'} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
