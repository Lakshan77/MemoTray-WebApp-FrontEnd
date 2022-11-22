import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signin, signup} from '../../actions/auth';

import useStyle from './styles';
import Input from './input';
import Icon from './icon';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
    const state = null;
    const classes = useStyle();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState(initialState);
    

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup){
            dispatch(signup(formData, history));
        }else{
            dispatch(signin(formData, history));
        }

    };
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: {result, token}});
            history.push('./');

        } catch (error) { 
            console.log(error);
        }

    };
    
    const googleError = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try Again Later");
    };

    const handleShowPassword = () =>  setShowPassword ((prevShowPassword) => !prevShowPassword); 

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevationn={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                        <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text": "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color='primary' className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    {/* <GoogleLogin 
                        clientId="95313947924-5i5vkuetj6f4sshg2habqu76sc2824s2.apps.googleusercontent.com"
                        render={(renderProps) => (
                          <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained"> 
                            Google Sign In
                          </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    /> */}
                    <Grid container justify="flex-end" >
                        <Button onClick={switchMode} >
                            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                        </Button>
                       
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth