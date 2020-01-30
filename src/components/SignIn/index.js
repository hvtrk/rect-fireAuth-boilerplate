import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import { PasswordForgetLink } from '../PasswordForget';
import * as ROUTES from '../../constants/routes';
/* Start Material components */
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <div className={this.props.classes.paper}>
        <form className={this.props.classes.form} noValidate onSubmit={this.onSubmit}>
          {/* Email */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            autoFocus
            id="email"
            name="email"
            label="Email Address"
            autoComplete="email"
            value={email}
            onChange={this.onChange}
          />
          {/* Password */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={this.onChange}
          />
          {/* Remember me */}
          {/* 
             <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"/>
          */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isInvalid}
            className={this.props.classes.submit}>
            Sign In
          </Button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInPage = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}> {/*  */}
        <Avatar className={classes.avatar}> {/*  */}
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          <em>Sign in</em>
        </Typography>
        <SignInForm classes={classes}/>
        <Grid container>
          <Grid item xs>
              <PasswordForgetLink />
          </Grid>
          <Grid item >
            <SignUpLink/>         
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default SignInPage;
export { SignInForm };