import React, { useState, useContext, useEffect } from 'react';

import { Grid, FormGroup, Box, FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';

import AuthContext from '../../context/authentication/authContext';

const Login = (props) => {

    const authContext = useContext(AuthContext);
    const { authenticated, logIn } = authContext;

    //In case of the password or user dont exist
    useEffect(() => {
        if(authenticated) {
            props.history.push('/pagos');
        }

    }, [authenticated, props.history]);

    //Login State
    const [user, saveUser] = useState({
        email: '',
        password: ''
    });

    //Extract user
    const { email, password } = user;

    const onChange = e => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        });
    }

    //when de user want to login
    const onSubmit = e => {
        e.preventDefault();

        //Validation of empty fields
        if(email.trim() === '' || password.trim() === '') {
            console.log('Todos los campos son obligatorios');
        }

        //Send to action
        logIn({ email, password});
    }

    return(
        <div className="bgsky">
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>

                    <Box display="flex" justifyContent="center">
                        Login
                    </Box>

                    <Box>
                        <form onSubmit={onSubmit}>
                            <FormGroup>
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Correo electronico</InputLabel>
                                    <Input 
                                        id="email"
                                        type="email"
                                        name="email"
                                        aria-describedby="my-helper-text"
                                        onChange={onChange}
                                        value={email}
                                    />
                                    <FormHelperText id="my-helper-text" >No compartas tu correo.</FormHelperText>
                                </FormControl>
                                
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Contraseña</InputLabel>
                                    <Input 
                                        id="pwd"
                                        type="password"
                                        name="password"
                                        aria-describedby="my-helper-text"
                                        onChange={onChange}
                                        value={password}
                                    />
                                    <FormHelperText id="my-helper-text">Nunca compartas la contraseña.</FormHelperText>
                                </FormControl>

                                <br/>
                                
                                <Button type="submit" variant="outlined" color="primary">
                                    Iniciar Sesión
                                </Button>
                            </FormGroup>
                        </form>
                    </Box>

                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </div>
    );
}

export default Login;