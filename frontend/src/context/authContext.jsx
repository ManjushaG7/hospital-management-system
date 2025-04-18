import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

// Initial state of the auth context
const initialState = {
  user: null,
  token: null,
  role: null,
};

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        token: null,
        role: null,
      };
    case 'LOGIN_SUCCESS':
      // ✅ Save to localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('role', action.payload.role); // ✅ Save role explicitly
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case 'LOGOUT':
      // ✅ Clear from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role'); // ✅ Clear role too
      return {
        user: null,
        token: null,
        role: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Restore from localStorage on load
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');

    if (savedToken && savedUser && savedRole) {
      const parsedUser = JSON.parse(savedUser);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: savedToken,
          user: parsedUser,
          role: savedRole,
        },
      });
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
        loading, // ✅ Expose loading state
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
