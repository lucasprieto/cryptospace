import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Sidebar from './Sidebar';
import ApplicationBar from './ApplicationBar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function DashLayout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ApplicationBar />
      <Sidebar />
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
}

export default DashLayout;
