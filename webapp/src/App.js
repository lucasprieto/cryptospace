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
import DashLayout from './components/DashLayout';
import { ExchangeProvider } from './utils/useExchange';

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
      <ExchangeProvider>
        <MuiThemeProvider theme={themes[themeType]}>
          <Router>
            <DashLayout>
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
            </DashLayout>
          </Router>jh,
        </MuiThemeProvider>
      </ExchangeProvider>
    </React.Fragment>
  );
}

export default App;
