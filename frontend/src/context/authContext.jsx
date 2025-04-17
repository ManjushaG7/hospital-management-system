import { createContext, useContext, useEffect, useReducer } from 'react';

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
      // Save to localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,  // Ensure the role is handled correctly
      };
    case 'LOGOUT':
      // Clear from localStorage when logging out
      localStorage.removeItem('token');
      localStorage.removeItem('user');
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

  useEffect(() => {
    // Restore auth state from localStorage on page load
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      const parsedUser = JSON.parse(savedUser);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: savedToken,
          user: parsedUser,
          role: parsedUser?.role || 'patient', // Default to 'patient' if role is missing
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
