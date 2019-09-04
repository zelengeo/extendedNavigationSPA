import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  navButton: {
    alignSelf: 'baseline',
    flexGrow: 1,
    position: 'relative'
  },
  popper: { width: '100%' },
  emptyPlaceholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '36px',
    backgroundColor: theme.palette.grey['200']
  },
  emptyPlaceholderIcon: {
    color: theme.palette.grey['600']
  }
}));

function SideNodeView({ orientedTop, sideNodes, setFocusedNode }) {
  const classes = useStyles();
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const buttonGroupRef = React.useRef(null);

  function handleToggle() {
    setOpenDropdown(prevOpen => !prevOpen);
  }

  function handleClose(event) {
    if (buttonGroupRef.current && buttonGroupRef.current.contains(event.target)) return;

    setOpenDropdown(false);
  }

  const icon = orientedTop ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />;

  return sideNodes.length ? (
    <React.Fragment>
      <ButtonGroup variant="contained" color="primary" ref={buttonGroupRef} aria-label="sibling node navigation button">
        <Button
          key={sideNodes[0].getTitle() + sideNodes[0].getIndex()}
          className={classes.navButton}
          onClick={() => setFocusedNode(sideNodes[0])}
        >
          {icon}
          {sideNodes[0].getTitle()}
        </Button>
        <Button
          disabled={sideNodes.length <= 1}
          color="primary"
          size="small"
          aria-owns={openDropdown ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      {sideNodes.length < 2 ? null : (
        <Popper
          open={openDropdown}
          placement={orientedTop ? 'bottom-start' : 'top-start'}
          anchorEl={buttonGroupRef.current}
          transition
          style={{
            width: buttonGroupRef && buttonGroupRef.current ? buttonGroupRef.current.clientWidth : 'auto'
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    {sideNodes.map((node, index) => (
                      <MenuItem
                        key={node.getTitle() + node.getIndex()}
                        selected={!index}
                        onClick={event => setFocusedNode(node)}
                      >
                        {node.getTitle()}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </React.Fragment>
  ) : (
    <Paper className={classes.emptyPlaceholder}>
      <NotInterestedIcon className={classes.emptyPlaceholderIcon} />
    </Paper>
  );
}

SideNodeView.defaultProps = {
  sideNodes: [],
  setFocusedNode: (...args) => console.warn('setFocusedNode was not defined', args),
  orientedTop: true
};

SideNodeView.propTypes = {
  sideNodes: PropTypes.arrayOf(PropTypes.object),
  setFocusedNode: PropTypes.func,
  orientedTop: PropTypes.bool
};

export default SideNodeView;
