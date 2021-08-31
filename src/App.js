import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { unstable_createMuiStrictModeTheme as createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import routes from './routes';
import * as ViewErrors from './views/errors';
import { useConfig } from './utils/usePersistantSettings';
import useThemePreference from './utils/useThemePreference';
import DashLayout from './components/DashLayout';
import { CoingeckoProvider } from './utils/useCoingecko';

const basePalette = {
  primary: {
    main: '#7e57c2',
  },
  secondary: {
    main: '#8e24aa',
  },
};
const themes = {
  dark: createTheme({ palette: { type: 'dark', ...basePalette } }),
  light: createTheme({ palette: { type: 'light', ...basePalette } }),
};

function App() {
  const { themeType } = useConfig();

  // dark mode preferece
  useThemePreference();

  return (
    <React.Fragment>
      <CoingeckoProvider>
        <MuiThemeProvider theme={themes[themeType]}>
          <CssBaseline />
          <Router>
            <DashLayout>
              <Switch>
                {routes.map(r => (
                  <Route key={r.name} path={r.route} component={r.view} exact />
                ))}
                <Route path="*" component={ViewErrors.NotFound} />
              </Switch>
            </DashLayout>
          </Router>
        </MuiThemeProvider>
      </CoingeckoProvider>
    </React.Fragment>
  );
}

export default App;
