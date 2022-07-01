import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/ContextProvider';
import Swal from 'sweetalert2';
import { json } from 'stream/consumers';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

const inputStyle = {
    border: '2px solid #000',
    borderRadius: '5px',
    padding: '10px 3px',
    width: '100%',
};

const AddModals = ({ status, setStatus, rows, setRows }) => {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // setRows([newData, ...rows]);

        axios
            .post(`http://localhost:9000/api/add-billing`, data)
            .then((res) => {
                if (res.status === 200) {
                    setStatus(!status);
                    handleClose();
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                });
                // if (
                //     err.response.status === 401 ||
                //     err.response.status === 403
                // ) {
                //     localStorage.clear();
                // }
            });
    };
    return (
        <div>
            <Button variant='contained' onClick={handleOpen}>
                Add new Bill
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style} className='containerForm'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
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
                                    placeholder='Enter your phone number'
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
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default AddModals;
