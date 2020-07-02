import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import { Grid, FormGroup, Box, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import AuthContext from '../../context/authentication/authContext';

const Payments = () => {

    //Extract the authentication data
    const authContext = useContext(AuthContext);
    const { userAuthenticated } = authContext;

    useEffect(() => {
        userAuthenticated();
        //eslint-disable-next-line
    }, [])


    const [payment, setPayment] = useState({
        name: '',
        receiptId: '',
        fieldPrice: [
            {
                price: '',
                concept: ''
            }
        ]
    });

    const onChange = (e, index) => {
        if(e.target.name === "name" || e.target.name === "receiptId"){
            setPayment({
                ...payment,
                [e.target.name] : e.target.value
            });
        } else {
            const listFields = [...payment.fieldPrice];
            listFields[index][e.target.name] = e.target.value;

            setPayment({
                ...payment,
                fieldPrice: listFields
            });
            
        }
    }

    const createAndDownloadPdf = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-pdf`, payment)
            .then(() => axios.get(`${process.env.REACT_APP_BACKEND_URL}/fetch-pdf`, { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'aplication.pdf' });
                saveAs(pdfBlob, 'newPdf.pdf');
            })
    }

    const onSubmit = () => {

    }

    const addInput = () => {
        const newField = {price: ''};
        setPayment({
            ...payment,
            fieldPrice: [...payment.fieldPrice, newField]
        });
    }
    
    return(
        <div className="bgsky">
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>

                    <Box display="flex" justifyContent="center">
                        Pagos
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
                                    />
                                </FormControl>
                                
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Folio</InputLabel>
                                    <Input 
                                        id="receiptId"
                                        type="number"
                                        name="receiptId"
                                        aria-describedby="my-helper-text"
                                        onChange={onChange}
                                    />
                                </FormControl>

                                {payment.fieldPrice.map(( item, i ) => {
                                    return(
                                        <Grid key={i} container direction="row" justify="center" alignItems="center">
                                            <Grid item xs={11}>
                                                <FormControl>
                                                    <InputLabel htmlFor="my-input">Concepto {i+1}</InputLabel>
                                                    <Input 
                                                        id="concept"
                                                        type="text"
                                                        name="concept"
                                                        aria-describedby="my-helper-text"
                                                        onChange={e => onChange(e, i)}
                                                        value={item.concept}
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <InputLabel htmlFor="my-input">Importe {i+1}</InputLabel>
                                                    <Input 
                                                        id="price"
                                                        type="number"
                                                        name="price"
                                                        aria-describedby="my-helper-text"
                                                        onChange={e => onChange(e, i)}
                                                        value={item.price}
                                                    />
                                                </FormControl>
                                                
                                            </Grid>
                                            {
                                                payment.fieldPrice.length -1 === i && <Grid item xs={1}>
                                                    <AddCircleIcon fontSize="large" color="primary" onClick={addInput} />
                                                </Grid>
                                                ?
                                                    <Grid item xs={1}>
                                                        <AddCircleIcon
                                                            fontSize="large"
                                                            color="primary"
                                                            onClick={addInput}
                                                            id="cursor-pointer"
                                                        />
                                                    </Grid>
                                                : <Grid item xs={1}></Grid>
                                            }
                                        </Grid>
                                    );
                                })
                                }

                                
                                <br/>
                                
                                <Button variant="outlined" color="primary" onClick={createAndDownloadPdf}>
                                    Generar Recibo
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

export default Payments;