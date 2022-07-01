import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { Box, Grid, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
const inputStyle = {
    border: '2px solid #000',
    borderRadius: '5px',
    padding: '10px 3px',
    width: '100%',
};
const Registration = () => {
    const navigation = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        axios
            .post(`http://localhost:9000/api/registration`, data)
            .then((res) => {
                if (res.status === 200) {
                    reset();
                    navigation('/login');
                }
            });
    };
    return (
        <Paper
            sx={{
                width: '350px',
                margin: 'auto',
                marginTop: '150px',
                padding: '20px',
                background: 'gray',
            }}>
            <Typography variant='h5'>Registration form</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <input
                            placeholder='Enter your Full Name'
                            {...register('FullName', {
                                required: true,
                                maxLength: 20,
                            })}
                            style={inputStyle}
                        />
                        {errors?.FullName && (
                            <p
                                style={{
                                    color: 'red',
                                    margin: '0px',
                                }}>
                                Enter your name
                            </p>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            placeholder='Enter your Email'
                            {...register('Email', {
                                required: true,
                                pattern:
                                    /^[a-z0-9._%=-]+@+[a-z0-9.-]+\.[a-z]+$/i,
                            })}
                            style={inputStyle}
                        />
                        {errors?.Email && (
                            <p
                                style={{
                                    color: 'red',
                                    margin: '0px',
                                }}>
                                Enter a valied email id
                            </p>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            placeholder='Enter your Password'
                            type='password'
                            {...register('Password', {
                                required: true,
                                minLength: 4,
                            })}
                            style={inputStyle}
                        />
                        {errors?.Phone && (
                            <p
                                style={{
                                    color: 'red',
                                    margin: '0px',
                                }}>
                                Phone number must be 11 digit
                            </p>
                        )}
                    </Grid>

                    <Grid item xs={12} sx={{ m: 0, p: 0 }}>
                        <p style={{ margin: '0px' }}>
                            Are you registered ?
                            <Link
                                to='/login'
                                style={{
                                    color: 'blue',
                                    margin: '0px',
                                    textDecoration: 'none',
                                }}>
                                <span>Please login..</span>
                            </Link>
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <input type='submit' value='Sing up' />
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default Registration;
