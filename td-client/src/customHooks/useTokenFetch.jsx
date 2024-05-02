import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const TokenFetch = createContext();
export const useTokenFetch = () => useContext(TokenFetch);
export const TokenProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDataUpdated, setUserDataUpdated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);

      const profileImage = localStorage.getItem('profileImage');
      if (profileImage) {
        setUser((prevUser) => ({ ...prevUser, profileImage }));
      }
    }
  }, [userDataUpdated]);

  const updateUserProfileImage = (profileImage) => {
    setUser((prevUser) => ({
      ...prevUser,
      profileImage,
    }));
    setUserDataUpdated(true);
  };

  return (
    <TokenFetch.Provider value={{ user, updateUserProfileImage }}>
      {children}
    </TokenFetch.Provider>
  );
};
