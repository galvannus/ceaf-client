import React, { useState } from 'react';

import { Grid, FormGroup, Box, FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';

const NewAccount = () => {

    //Login State
    const [user, saveUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    });

    //Extract user
    const { name, email, password, confirm } = user;

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

        //Passwords minimun 6 characters

        //Validate 2 passwords are equals

        //Send to action
    }

    return(
        <div className="bgsky">
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>

                    <Box display="flex" justifyContent="center">
                        Registrar Usuario
                    </Box>

                    <Box>
                        <form onSubmit={onSubmit}>
                            <FormGroup>
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Nombre</InputLabel>
                                    <Input 
                                        id="name"
                                        type="text"
                                        name="name"
                                        aria-describedby="my-helper-text"
                                        onChange={onChange}
                                        value={name}
                                    />
                                </FormControl>
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
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Confirmar Contraseña</InputLabel>
                                    <Input 
                                        id="confirm"
                                        type="password"
                                        name="confirm"
                                        aria-describedby="my-helper-text"
                                        onChange={onChange}
                                        value={confirm}
                                    />
                                    <FormHelperText id="my-helper-text">Nunca compartas la contraseña.</FormHelperText>
                                </FormControl>

                                <br/>
                                
                                <Button variant="outlined" color="primary">
                                    Registrar
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

export default NewAccount;