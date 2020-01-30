import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordForgetPage from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

/* Start Material components */
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
/* End Material components */

/* CSS Styles */
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AccountPage = () => {
  const classes = useStyles();
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <Container component="main">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h3">
              <b>Account: {authUser.email}</b>
            </Typography>
            <Grid container>
              <Grid item xs>
                <PasswordForgetPage />
              </Grid>
              <Grid item >
                <PasswordChangeForm />
              </Grid>
            </Grid>
          </div>
        </Container>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);