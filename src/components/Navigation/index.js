import React from 'react';
// import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

/* Material Components */
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from './AppBar';
import Toolbar, { styles as toolbarStyles } from './Toolbar';

const useStyles = makeStyles(theme => {
  return ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  });
});

const Navigation = ({ authUser }) => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />

          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href={ROUTES.LANDING}>
            Test Site React Hooks
        </Link>

          <div className={classes.right}>
            {/* Home */}
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              href={ROUTES.HOME}
            >
              {'Home'}
            </Link>
            {/* Account */}
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink)}
              href={ROUTES.ACCOUNT}>
              {'Account'}
            </Link>
            {/* Admin */}
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink)}
              href={ROUTES.ADMIN}>
              {'Admin'}
            </Link>
            {/* Logout */}
            <SignOutButton />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
};
const NavigationNonAuth = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href={ROUTES.LANDING}>
            Test Site React Hooks
        </Link>

          <div className={classes.right}>
            {/* Admin */}
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink)}
              href={ROUTES.SIGN_IN}>
              {'Sign In'}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>);
};

export default Navigation;