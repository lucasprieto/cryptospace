import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme as createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import routes from './routes'
import * as ViewErrors from './views/errors'
import { useConfig } from './utils/usePersistantSettings';
import useThemePreference from './utils/useThemePreference';

const themes = {
  dark: createTheme({ palette: { type: 'dark' } }),
  light: createTheme({ palette: { type: 'light' } })
}

function App() {
  const { themeType } = useConfig()

  // dark mode preferece
  useThemePreference()

  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={themes[themeType]}>
        <Router>
          <Switch>
            {routes.map(r => (
              <Route
                key={r.name}
                path={r.route}
                component={r.view}
                exact
              />
            ))}
            <Route path="*" component={ViewErrors.NotFound} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default App;
