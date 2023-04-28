import React, { useContext, useState } from 'react';
import { ContextAll } from '../../../context/context';
import { useNavigate } from 'react-router-dom';
import styles from '../User.module.css';

interface IReg {
  name: string;
  email: string;
  password: string;
}

const initState: IReg = {
  name: '',
  email: '',
  password: '',
};

interface IChek {
  chekUser: boolean;
}

export default function Registration(): JSX.Element {
  const navigate = useNavigate();

  const [reg, setReg] = useState(initState) as [
    IReg,
    React.Dispatch<React.SetStateAction<IReg>>
  ];
  const changeHandler = (e: any) => {
    setReg((pre) => ({ ...pre, [e.target.name]: e.target.value })); // name это поле name в инпуте! лол
  };
  const { user, setUser }: any = useContext(ContextAll);

  const { chekUser, setCheckUser }: any = useContext(ContextAll);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setReg(initState);
    try {
      const userFromBack = await fetch(
        'http://localhost:3002/user/registration',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(reg),
        }
      );
      const res = await userFromBack.json();
      if (!res.email) {
        console.log(false, '<<<<<<<<reg');
        setCheckUser(true);
        setTimeout(() => setCheckUser(false), 5000);
        return;
      } else {
        navigate('/');
        setUser(res.name);
      }
    } catch (err) {
      console.log(err, 'ошибка в fetch registr front');
    }
  };

  return (
    <div className={styles.divContainer}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={submitHandler}>
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={changeHandler}
            value={reg.name}
            name="name"
            placeholder="name"
          />
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={changeHandler}
            value={reg.email}
            name="email"
            placeholder="email"
          />
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={changeHandler}
            value={reg.password}
            name="password"
            placeholder="password"
          />{' '}
          <div className={styles.formBtn}>
            {chekUser && <h6>такой пользователь уже зарегистрирован</h6>}
            <button type="submit" className="btn btn-primary">
              Вход
            </button>{' '}
          </div>
        </form>
      </div>
    </div>
  );
}
