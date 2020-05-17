import React from 'react';
import { ThemeProvider } from 'styled-components';

import dark from './styles/themes/dark';
import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={dark}>
      <SignIn />
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
