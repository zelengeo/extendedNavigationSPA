import React from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import BarChartIcon from '@material-ui/icons/BarChart';
import QuestionIcon from '@material-ui/icons/QuestionAnswer';
import { ROUTE_PATH } from './constants';
import RootAppBar from './components/root/RootAppBar';
import ReaderRouteView from './components/reader_route/ReaderRouteView';
import Home from './components/home_route/Home';
import ListingRouteView from './components/listing_route/ListingRouteView';
import About from './components/about_route/About';
import StatsView from './components/stats_route/StatsView';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
  contentRoot: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    maxWidth: 'unset',
    marginLeft: -drawerWidth,
    marginTop: theme.mixins.toolbar.minHeight,
    '@media (min-width:600px)': {
      marginTop: theme.mixins.toolbar['@media (min-width:600px)'].minHeight
    }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

function App() {
  const classes = useStyles();
  const [drawerShown, setDrawerShown] = React.useState(true);

  function toggleDrawer() {
    setDrawerShown(!drawerShown);
  }

  return (
    <Router>
      <main className={classes.root}>
        <CssBaseline />
        <RootAppBar
          drawerShown={drawerShown}
          toggleDrawer={toggleDrawer}
          drawerItems={[
            { text: 'Home', icon: <HomeIcon />, to: ROUTE_PATH.HOME },
            {
              text: 'Publications',
              icon: <BookIcon />,
              to: ROUTE_PATH.PUBLICATIONS
            },
            {
              text: 'Stats',
              icon: <BarChartIcon />,
              to: ROUTE_PATH.STATS,
              disabled: true
            },
            'DIVIDER',
            { text: 'About', icon: <QuestionIcon />, to: ROUTE_PATH.ABOUT }
          ]}
        />
        <Container className={clsx(classes.contentRoot, drawerShown && classes.contentShift)}>
          <Route exact path={ROUTE_PATH.DEFAULT} component={About} />
          <Route path={ROUTE_PATH.HOME} component={Home} />
          <Route path={ROUTE_PATH.STATS} component={StatsView} />
          <Route path={ROUTE_PATH.PUBLICATIONS} component={ListingRouteView} />
          <Route path={`${ROUTE_PATH.READER}/:id`} component={ReaderRouteView} />
          <Route path={ROUTE_PATH.ABOUT} component={About} />
        </Container>
      </main>
    </Router>
  );
}

export default App;
