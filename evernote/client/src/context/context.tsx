import React, { FC, createContext, useState, useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export const ContextAll: any = createContext({});

export const ContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState('') as [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];

  const [chekUser, setCheckUser] = useState(false) as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];
  const [chekPass, setCheckPass] = useState(false) as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];
  const [error, setErorr] = useState('') as [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];

  useEffect((): void => {
    (async function (): Promise<void> {
      try {
        const response: Response = await fetch('http://localhost:3002/user', {
          credentials: 'include',
        });
        const result = await response.json();
        setUser(result.user);
      } catch (err) {
        console.log(err);
      }
    })();
  });

  const contextValue: any = {
    user,
    setUser,
    chekUser,
    setCheckUser,
    chekPass,
    setCheckPass,
    error,
    setErorr,
  };

  return (
    <ContextAll.Provider value={contextValue}>{children}</ContextAll.Provider>
  );
};

// export function ProtectedRouter({ authUser, user, redirectTo }) {
//   if (authUser === Boolean(user)) {
//     return <Navigate to={redirectTo} replace />;
//   }
//   return <Outlet />;
// }
