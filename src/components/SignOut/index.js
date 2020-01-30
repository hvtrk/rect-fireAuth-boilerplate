import React from 'react';
import { withFirebase } from '../Firebase';

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 24,
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
    cursor: 'pointer',
  },
}));

const SignOutButton = ({ firebase }) => {
  const classes = useStyles();
  return (
    <Link
      variant="h6"
      underline="none"
      className={clsx(classes.rightLink, classes.linkSecondary)}
      onClick={firebase.doSignOut}>
      {'Sign Out'}
    </Link>
  )
};
export default withFirebase(SignOutButton);