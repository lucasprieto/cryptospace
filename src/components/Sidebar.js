import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import {
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';

import routes from '../routes';
import { useLocation, matchPath, useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  }
});

export default function Sidebar() {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
          paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
        {routes.map(({ name, route, icon: Icon }) => (
          <ListItem
            button
            selected={!!matchPath(location.pathname, { path: route, exact: true })}
            onClick={() => history.push(route)}
            key={name}>
            <ListItemIcon><Icon /></ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
        </List>
      </div>
    </Drawer>
  );
}
