import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
/* Material component */
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
/* End */
/* CSS Style */
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
/* End */

const SignUpPage = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="md">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <CssBaseline />
                <SignUpForm classes={classes} />
                <Grid container justify="flex-end">
                    <Grid item>
                        Already have an account?
                    <Link to={ROUTES.SIGN_IN} variant="body2">Sign in</Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;


        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit} className={this.props.classes.form} noValidate>
                <Grid container spacing={2}>
                    {/* Full Name */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="username"
                            variant="outlined"
                            id="fullName"
                            label="Full Name"
                            fullWidth
                            required
                            value={username}
                            onChange={this.onChange}
                            autoFocus
                        />
                    </Grid>
                    {/* Email Address */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            name="email"
                            value={email}
                            onChange={this.onChange}
                        />
                    </Grid>
                    {/* Password */}
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                        />
                    </Grid>
                    {/* Confirm Password */}
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Confirm Password"
                            id="password"
                            autoComplete="confirm-password"
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                        />
                    </Grid>
                    {/* Allow Promotional email */}
                    {/* 
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."/>
                            </Grid>
                        */}
                </Grid>
                {/* Submit Buttons */}
                <div style={{
                    width: '100px',
                    margin: '0 auto'
                }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={this.props.classes.submit}
                    disabled={isInvalid}>
                    Sign Up
                    </Button>
                </div>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);
export default SignUpPage;
export { SignUpForm, SignUpLink };