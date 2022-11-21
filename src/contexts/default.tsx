import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DefaultContextInterface from '../interface/default.interface';
import User from '../interface/user';
import jwtDecode from 'jwt-decode';
import Establishment from '../interface/establishment';

export const DefaultContext = createContext<DefaultContextInterface>({} as any)

export default function DefaultProvider({ children }: any) {

  const navigate = useNavigate();

  const [isMobile, setisMobile] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>({
    name: '',
    email: '',
    photoURL: '',
    phone: '',
    role: '',
  } as any);

  const [establishmentt, setEtablishment] = useState<Establishment | null>(null)
  useEffect(() => {
    function handleWindowSizeChange() {
      setisMobile(window.innerWidth <= 768);
    }
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);


  useEffect(() => {
    loadDateStorage();
  }, []);

  async function loadDateStorage() {
    const user = localStorage.getItem('User')
    if (user) {
      const parseUser: User = JSON.parse(user)

      setEtablishment(parseUser.user_establishments[0].establishments);
      setUser(parseUser);
    }
  }

  const saveUserInLocal = async (token: string) => {
    const user = jwtDecode(token) as User;

    const establishment = user.user_establishments[0].establishments;
    setUser(user);
    setEtablishment(establishment);


    if (user) {
      localStorage.setItem('Token', token)
      localStorage.setItem('User', JSON.stringify(user));
    }

  }

  const logOut = async () => {
    localStorage.clear();
    navigate(`/`)
  }

  return (
    <DefaultContext.Provider value={{
      user,
      establishmentt,
      setUser,
      isMobile,
      saveUserInLocal,
      logOut
    }}>
      {children}

    </DefaultContext.Provider>
  );
}
