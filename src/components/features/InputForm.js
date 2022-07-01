import React from 'react';
import { Grid } from '@mui/material';
const inputStyle = {
    border: '2px solid #000',
    borderRadius: '5px',
    padding: '10px 3px',
    width: '100%',
};

const InputForm = ({ register, errors, rows }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <input
                    placeholder='Enter your Full Name'
                    defaultValue={rows?.FullName || ''}
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
                    defaultValue={rows?.Email || ''}
                    {...register('Email', {
                        required: true,
                        pattern: /^[a-z0-9._%=-]+@+[a-z0-9.-]+\.[a-z]+$/i,
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
                    placeholder='Enter your phone number'
                    defaultValue={rows?.Phone || ''}
                    type='number'
                    {...register('Phone', {
                        required: true,
                        maxLength: 11,
                        minLength: 11,
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
            <Grid item xs={12}>
                <input
                    placeholder='Enter Paid amount'
                    defaultValue={rows?.PaidAmount || ''}
                    type='number'
                    {...register('PaidAmount', {
                        required: true,
                    })}
                    style={inputStyle}
                />
                {errors?.PaidAmount && (
                    <p
                        style={{
                            color: 'red',
                            margin: '0px',
                        }}>
                        Please Enter your paid amount
                    </p>
                )}
            </Grid>

            <Grid item xs={12}>
                <input type='submit' />
            </Grid>
        </Grid>
    );
};

export default InputForm;
