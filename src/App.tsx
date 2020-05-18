import React from 'react';
import { ThemeProvider } from 'styled-components';

import dark from './styles/themes/dark';
import GlobalStyle from './styles/global';

import ToastContainer from './components/ToastContainer';
import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={dark}>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <ToastContainer />
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
