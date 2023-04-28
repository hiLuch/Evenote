import React, { useContext, useState } from 'react';
import { ContextAll } from '../../../context/context';
import { useNavigate } from 'react-router-dom';
import styles from '../User.module.css';

interface ILogin {
  email: string;
  password: string;
}
const initLogin: ILogin = {
  email: '',
  password: '',
};

export default function Login(): JSX.Element {
  const navigate = useNavigate();

  const [login, setLogin] = useState(initLogin) as [
    ILogin,
    React.Dispatch<React.SetStateAction<ILogin>>
  ];
  console.log(login, '<<<<login');
  const changeHandler = (e: any) => {
    setLogin((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const { user, setUser }: any = useContext(ContextAll);
  const { chekUser, setCheckUser }: any = useContext(ContextAll);
  const { error, setErorr }: any = useContext(ContextAll);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    console.log(login);
    setLogin(initLogin);
    try {
      const response = await fetch('http://localhost:3002/user/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(login),
      });

      const res = await response.json();
      if (response.status === 401) {
        setErorr(res.text);
        setCheckUser(true);
        setTimeout(() => setCheckUser(false), 5000);
        return;
      } else {
        navigate('/');
        setUser(res.name);
      }
    } catch (err) {
      console.log(err, 'ошибка в fetch login');
    }
  };

  return (
    <div className={styles.divContainer}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={submitHandler}>
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={changeHandler}
            value={login.email}
            name="email"
            placeholder="email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={changeHandler}
            value={login.password}
            name="password"
            placeholder="password"
          />
          <div className={styles.formBtn}>
            {chekUser && <h6>{error}</h6>}
            <button type="submit" className="btn btn-primary">
              Вход
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
