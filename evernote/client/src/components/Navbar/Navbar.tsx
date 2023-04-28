import React, { useContext, useEffect } from 'react';
import { ContextAll } from '../../context/context';
import styles from './Navbar.module.css';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

export default function Navbar(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  const { user, setUser }: any = useContext(ContextAll);

  const logoutHandler = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3002/user/logout', {
        method: 'DELETE',
        credentials: 'include',
      });
      const result = await response.json();
      setUser(result.user);
    } catch (err) {
      console.log(err, 'no destroy cookie from front');
    }
  };

  return (
    <div className={styles.navbar}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div>
          <h3 className="btn-home">Home</h3>
        </div>
      </Link>

      {user ? (
        <div className={styles.logoutContainer}>
          <h5>hi {user}</h5>
          <button onClick={logoutHandler}>Log out</button>
        </div>
      ) : (
        <div>
          <button onClick={(): void => navigate('/registration')}>
            Регистрация
          </button>
          <button onClick={(): void => navigate('/login')}>Вход</button>
        </div>
      )}
      {/* <Link to="/login">
        <button>Вход</button>
      </Link> создаст тег а*/}
    </div>
  );
}
