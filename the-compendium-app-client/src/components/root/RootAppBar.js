import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AdapterLink from '../common';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },

  hide: {
    display: 'none'
  }
}));

function RootAppBar({ drawerShown, toggleDrawer, drawerItems }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="fixed" className={clsx(classes.appBar, drawerShown && classes.appBarShift)}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            className={clsx(classes.menuButton, drawerShown && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            The Compendium
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerShown}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {drawerItems.map(listItem =>
            listItem === 'DIVIDER' ? (
              <Divider key="Divider" />
            ) : (
              <ListItem
                button
                component={AdapterLink}
                key={listItem.text}
                to={listItem.to}
                disabled={listItem.disabled}
              >
                <ListItemIcon>{listItem.icon}</ListItemIcon>
                <ListItemText primary={listItem.text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </React.Fragment>
  );
}

RootAppBar.defaultProps = {
  drawerShown: false,
  toggleDrawer: () => null,
  drawerItems: []
};

RootAppBar.propTypes = {
  drawerShown: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  drawerItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object]))
};

export default RootAppBar;
