import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

const TokenFetch = createContext();
export const useTokenFetch = () => useContext(TokenFetch);
export const TokenProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);

      setUser(decodedToken);
    }
  }, []);

  return <TokenFetch.Provider value={{ user }}>{children}</TokenFetch.Provider>;
};
