import React, { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';

const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

const { Provider } = ColorModeContext;

function ColorModeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
      mode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                secondary: {
                  light: '#fcfcfc',
                  main: '#f0f0f0',
                  dark: '#ebebeb',
                },
              }
            : {
                secondary: {
                  light: '#424242',
                  main: '#303030',
                  dark: '#1a1a1a',
                },
              }),
        },
      }),
    [mode],
  );

  return (
    <Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
}

ColorModeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

function useColorModeContext() {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error(
      'useColorModeContext must be used inside the ColorModeProvider',
    );
  }

  return context;
}

export { useColorModeContext, ColorModeProvider };
