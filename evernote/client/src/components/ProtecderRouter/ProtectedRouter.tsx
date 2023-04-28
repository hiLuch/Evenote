import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Notes from '../Notes/Notes';

type PropsRoute = {
  authUser: boolean;
  user: string;
  redirectTo: string;
};

export default function ProtectedRouter({
  authUser,
  user,
}: PropsRoute): JSX.Element {
  const checkHandler = (): JSX.Element => {
    if (authUser === Boolean(user)) {
      return <Notes />;
    } else {
      return <Outlet />;
    }
  };

  return checkHandler();
}
