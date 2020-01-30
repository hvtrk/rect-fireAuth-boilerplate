import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

/* Start Material components */
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
/* End Material components */

/* Initial States */
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

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

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE};
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
    return (
        <form className={this.props.classes.form} noValidate onSubmit={this.onSubmit}>
          {/* Password */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Current Password"
            type="password"
            id="password"
            autoComplete="current-password"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
          />
          {/* Password */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm New Password"
            type="password"
            id="password"
            autoComplete="confirm-password"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isInvalid}
            className={this.props.classes.submit}>
              Change My Password
          </Button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForm = compose(
  withFirebase,
)(PasswordChangeForm);

const PasswordPage = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Change Password
        </Typography>
        <PasswordForm classes={classes}/>
      </div>      
    </Container>
  );
};

export default PasswordPage;
export { PasswordChangeForm };