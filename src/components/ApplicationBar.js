import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider"

import { useAuth0 } from "@auth0/auth0-react";

// import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  userImage: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ApplicationBar({ children }) {
  const classes = useStyles();
  const { isAuthenticated, user, logout, loginWithRedirect } = useAuth0();
  // const asd = useApi('/api/testonly/authtest')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (fnct) => () => {
    setAnchorEl(null);
    if (fnct) {
      fnct()
    }
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Crypto Dashboard
            </Typography>
            { isAuthenticated ? (
              <div>
                <Button
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  endIcon={
                    <Avatar variant="rounded" className={classes.userImage} alt={user.name} src={user.picture} />
                  }
                >
                  {user.name}
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  getContentAnchorEl={null}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose()}
                >
                  <MenuItem onClick={handleClose()}>Profile</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose(logout)}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                onClick={loginWithRedirect}
              >
                Login
              </Button>
            )}
        </Toolbar>
    </AppBar>
  );
}

export default ApplicationBar